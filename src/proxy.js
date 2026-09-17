import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("luminous_token")?.value;

  const isLoginPage = pathname === "/login";
  const isAdmin = pathname.startsWith("/admin");
  const isOldDashboard = pathname.startsWith("/dashboard");

  // Redirect legacy /dashboard to /admin
  if (isOldDashboard) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isAdmin && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login"],
};
