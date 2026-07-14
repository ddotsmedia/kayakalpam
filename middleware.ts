import { NextRequest, NextResponse } from "next/server";

const COOKIE = "kayakalpam_admin";

// Cheap gate: presence check only. Full cryptographic validation happens
// server-side in requireAdmin() (admin layout + every /api/admin route).
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasCookie = Boolean(req.cookies.get(COOKIE)?.value);

  if (pathname.startsWith("/api/admin")) {
    // Public endpoints: login + analytics beacon.
    if (pathname === "/api/admin/auth" || pathname === "/api/admin/track") {
      return NextResponse.next();
    }
    if (!hasCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    if (!hasCookie) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
