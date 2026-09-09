import { NextResponse } from "next/server";

const url_private = [
  "/admin/statistic",
  "/admin/account_game/list",
  "/admin/account_game/sold",
  "/admin/staff_request",
];

// Region names as returned by ip-api.com for Vietnamese provinces
const BLOCKED_REGIONS = [
  "hanoi", "hai phong", "quang ninh", "bac giang", "bac kan",
  "bac ninh", "cao bang", "ha giang", "hai duong", "hoa binh",
  "hung yen", "lang son", "lao cai", "nam dinh", "ninh binh",
  "phu tho", "son la", "thai binh", "thai nguyen", "tuyen quang",
  "vinh phuc", "yen bai", "lai chau", "dien bien", "ha nam",
];

// Android được bypass toàn bộ (kể cả vùng bị chặn như Hà Nội).
function isAndroidUserAgent(ua) {
  return /Android/i.test(ua || "");
}

// Điện thoại nói chung (Android + iPhone) — chỉ dùng để loại trừ khỏi rule
// chặn máy tính; iPhone vẫn phải qua check geo bình thường bên dưới.
function isPhoneUserAgent(ua) {
  return /Android|iPhone|iPad|iPod/i.test(ua || "");
}

function isBlockedRegion(region, city) {
  const normalize = (s) =>
    s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const r = normalize(region);
  const c = normalize(city || "");
  return BLOCKED_REGIONS.some((b) => r.includes(b) || c.includes(b));
}

async function isMobileBypassEnabled() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/client/config`, {
      signal: AbortSignal.timeout(3000),
    });
    const json = await res.json();
    return Boolean(json?.result?.isMobileBypassEnabled);
  } catch {
    return false;
  }
}

// Công tắc tắt toàn bộ web (config.isWebEnabled). Fail-open khi không gọi được
// API để một lỗi mạng/backend tạm thời không vô tình đánh sập cả frontend.
async function isWebEnabled() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/client/config`, {
      signal: AbortSignal.timeout(3000),
    });
    const json = await res.json();
    return json?.result?.isWebEnabled !== false;
  } catch {
    return true;
  }
}

async function checkGeoBlocked(ip) {
  // Localhost / private IPs — skip geo check
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return false;
  }
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=countryCode,regionName,city,status`,
      { signal: AbortSignal.timeout(3000) }
    );
    const data = await res.json();
    if (data.status !== "success") return false;
    if (data.countryCode && data.countryCode !== "VN") return true;
    return isBlockedRegion(data.regionName || "", data.city || "");
  } catch {
    return false;
  }
}

const BYPASS_SECRET = "ff_bypass_2026";

/**
 * Host được miễn toàn bộ rule chặn (geo, chặn desktop, VPN).
 *
 * Domain mới phải mở hoàn toàn để Googlebot crawl được, nếu không thì Google
 * chỉ thấy 503 + noindex và không index được domain mới. Domain cũ giữ nguyên
 * mọi rule chặn, nhưng nó không còn vào app này nữa — traffic domain cũ giờ đi
 * qua service old-domain-gate riêng rồi 301 sang đây.
 *
 * Khai báo qua biến UNBLOCKED_HOSTS, ngăn cách bằng dấu phẩy. Để TRỐNG thì
 * middleware chạy y như trước khi có patch này, không đổi hành vi gì cả.
 *
 * KHÔNG suy ra từ SITE_URL: ở giai đoạn chuẩn bị, SITE_URL vẫn là domain cũ
 * trong khi domain mới đã cần được mở.
 */
const UNBLOCKED_HOSTS = new Set(
  (process.env.UNBLOCKED_HOSTS || "")
    .split(",")
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean),
);

/**
 * Host thật của request. Sau nginx thì phải đọc từ header — nginx BẮT BUỘC có
 * `proxy_set_header Host $host`, thiếu là host thành "127.0.0.1:5000", không
 * khớp danh sách, và domain mới bị chặn y domain cũ mà không có lỗi nào hiện ra.
 */
function getRequestHost(req) {
  const raw =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    req.nextUrl.host ||
    "";
  // x-forwarded-host có thể là list; "Domain.COM:443" -> "domain.com".
  return raw.split(",")[0].trim().toLowerCase().split(":")[0];
}

function isUnblockedHost(req) {
  if (UNBLOCKED_HOSTS.size === 0) return false;

  const host = getRequestHost(req);
  if (!host) return false;

  // Khớp cả apex lẫn www để không phải khai báo hai dòng.
  return UNBLOCKED_HOSTS.has(host) || UNBLOCKED_HOSTS.has(host.replace(/^www\./, ""));
}

export async function middleware(req) {
  const { pathname, origin, searchParams } = req.nextUrl;
   return handleAuth(req, pathname, origin);

  // Công tắc tắt toàn bộ web — ưu tiên cao nhất, chặn trước mọi bypass khác
  // (query param, cookie, dev, mobile bypass...).
  if (!(await isWebEnabled())) {
    return showMaintenance(req);
  }

  // Domain mới: bỏ qua mọi rule chặn bên dưới, nhưng VẪN phải chạy handleAuth.
  // Middleware là lớp bảo vệ DUY NHẤT cho /admin — src/app/admin/layout.jsx
  // không kiểm tra token, nó chỉ chặn route theo `role` lấy từ store phía
  // client. Trả NextResponse.next() ở đây là mở admin panel cho bất kỳ ai.
  if (isUnblockedHost(req)) {
    return handleAuth(req, pathname, origin);
  }

  const ua = req.headers.get("user-agent");
  const isAndroid = isAndroidUserAgent(ua);
  const isPhone = isPhoneUserAgent(ua);

  // Bypass qua query param (?bypass=ff_bypass_2026): set luôn cookie để các
  // lần request sau (không còn query param, vd click link nội bộ) vẫn bypass.
  if (searchParams.get("bypass") === BYPASS_SECRET) {
    const res = handleAuth(req, pathname, origin);
    res.cookies.set("bypass_secret", BYPASS_SECRET, {
      maxAge: 600 * 60 * 24 * 30,
      httpOnly: true,
    });
    return res;
  }

  // Android vào đâu cũng được, kể cả vùng bị chặn (Hà Nội...), bỏ qua check geo.
  // Chỉ áp dụng khi admin bật cờ isMobileBypassEnabled trong config.
  if (isAndroid && (await isMobileBypassEnabled())) {
    return handleAuth(req, pathname, origin);
  }

  if (process.env.NODE_ENV === "development") {
    return handleAuth(req, pathname, origin);
  }

  if (req.cookies.get("bypass_secret")?.value === BYPASS_SECRET) {
    return handleAuth(req, pathname, origin);
  }

  // TẠM THỜI: chặn toàn bộ máy tính (không phải điện thoại) vì geo-check theo IP
  // (ip-api.com) không đáng tin cậy với hạ tầng ISP VN — IP ở Hà Nội có thể bị
  // nhận nhầm thành TP.HCM nên lọt qua chặn vùng. iPhone không được bypass toàn bộ
  // như Android nên vẫn rơi xuống check geo bên dưới (bị chặn ở Hà Nội, vào được nơi khác).
  if (!isPhone) {
    return showMaintenance(req);
  }

  const ip =
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const geoStatus = req.cookies.get("_geo");
  const [cachedIp, cachedResult] = (geoStatus?.value || "").split("|");

  // Re-check nếu IP thay đổi (VPN bật/tắt)
  if (geoStatus && cachedIp === ip) {
    if (cachedResult === "blocked") return showMaintenance(req);
    return handleAuth(req, pathname, origin);
  }

  const blocked = await checkGeoBlocked(ip);

  if (blocked) {
    const res = showMaintenance(req);
    res.cookies.set("_geo", `${ip}|blocked`, { maxAge: 3600, httpOnly: true });
    return res;
  }

  const response = handleAuth(req, pathname, origin);
  response.cookies.set("_geo", `${ip}|ok`, { maxAge: 3600, httpOnly: true });
  return response;
}

function showMaintenance(req) {
  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  const res = NextResponse.rewrite(url, { status: 503 });
  res.headers.set("x-robots-tag", "noindex");
  return res;
}

function handleAuth(req, pathname, origin) {
  const adminToken = req.cookies.get("admin_accessToken");
  const clientToken = req.cookies.get("client_accessToken");
  const role = req.cookies.get("isOwner");

  if (pathname.startsWith("/admin")) {
    if (!adminToken && pathname !== "/admin/login") {
      return NextResponse.redirect(`${origin}/admin/login`);
    } else if (
      adminToken &&
      role?.value == "true" &&
      (pathname === "/admin" || pathname === "/admin/login")
    ) {
      return NextResponse.redirect(`${origin}/admin/dashboard`);
    } else if (adminToken && role?.value == "false") {
      if (pathname === "/admin" || pathname === "/admin/login") {
        return NextResponse.redirect(`${origin}/admin/statistic`);
      } else if (!url_private.includes(pathname)) {
        return NextResponse.redirect(`${origin}/404`);
      }
    }
  } else if (clientToken && pathname === "/login") {
    return NextResponse.redirect(`${origin}/`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
