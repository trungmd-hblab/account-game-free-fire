import { NextResponse } from "next/server";

const url_private = [
  "/admin/statistic",
  "/admin/account_game/list",
  "/admin/account_game/sold",
  "/admin/staff_request",
];
export function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  const adminToken = req.cookies.get("admin_accessToken");
  const clientToken = req.cookies.get("client_accessToken");
  const role = req.cookies.get("isOwner");
  if (pathname.startsWith("/admin")) {
    if (!adminToken && pathname !== "/admin/login") {
      return NextResponse.redirect(`${origin}/admin/login`);
    } else if (
      adminToken &&
      role.value == "true" &&
      (pathname === "/admin" || pathname === "/admin/login")
    ) {
      return NextResponse.redirect(`${origin}/admin/dashboard`);
    } else if (adminToken && role.value == "false") {
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
  matcher: ["/admin/:path*", "/login"],
};
