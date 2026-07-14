import { NextRequest, NextResponse } from "next/server";

const COOKIE = "kayakalpam_admin";

// Known scanner / attack-tool user agents. Blocked unless the request
// originates from localhost (health checks / internal probes).
const SUSPICIOUS_UA = [
  "sqlmap",
  "nikto",
  "nmap",
  "masscan",
  "zgrab",
  "python-requests",
  "go-http-client",
  "dirbuster",
  "hydra",
  "havij",
];

// Cheap gate: cookie presence only. Full cryptographic validation happens
// server-side in requireAdmin() (admin layout + every /api/admin route).
export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent")?.toLowerCase() ?? "";
  const ip = req.headers.get("x-real-ip") ?? "";

  if (ip !== "127.0.0.1" && SUSPICIOUS_UA.some((s) => ua.includes(s))) {
    return new NextResponse(null, { status: 403 });
  }

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
  // Run on all routes (for site-wide scanner-UA blocking) except static assets.
  // Admin auth logic below is path-scoped via pathname.startsWith().
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
