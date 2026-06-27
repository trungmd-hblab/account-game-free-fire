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
  "vinh phuc", "yen bai", "lai chau", "dien bien",
];

function isBlockedRegion(region, city) {
  const normalize = (s) =>
    s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const r = normalize(region);
  const c = normalize(city || "");
  return BLOCKED_REGIONS.some((b) => r.includes(b) || c.includes(b));
}

async function checkGeoBlocked(ip) {
  // Localhost / private IPs — skip geo check
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return false;
  }
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=regionName,city,status`,
      { signal: AbortSignal.timeout(3000) }
    );
    const data = await res.json();
    if (data.status !== "success") return false;
    return isBlockedRegion(data.regionName || "", data.city || "");
  } catch {
    return false;
  }
}

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;

  const geoStatus = req.cookies.get("_geo");
  if (geoStatus?.value === "blocked") {
    return new NextResponse(null, { status: 502 });
  }

  if (!geoStatus) {
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const blocked = await checkGeoBlocked(ip);

    if (blocked) {
      const res = new NextResponse(null, { status: 502 });
      res.cookies.set("_geo", "blocked", { maxAge: 3600, httpOnly: true });
      return res;
    }

    const response = await handleAuth(req, pathname, origin);
    response.cookies.set("_geo", "ok", { maxAge: 3600, httpOnly: true });
    return response;
  }

  return handleAuth(req, pathname, origin);
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
