import { NextRequest, NextResponse } from "next/server";

const authRoutes: string[] = ["/"];
const adminRoutes: string[] = ["/admin"];

export default async function middleware(req: NextRequest) {
  const currentRoute = req.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(currentRoute);
  const isAdminRoute = adminRoutes.some((route) =>
    currentRoute.startsWith(route)
  );

  // Admin routes: check for admin access token cookie
  if (isAdminRoute && currentRoute !== "/admin/login") {
    const adminToken = req.cookies.get("admin_access_token")?.value;
    if (!adminToken) {
      // Use 303 to force GET method (avoid 405 on POST requests)
      return NextResponse.redirect(new URL("/admin/login", req.url), { status: 303 });
    }
  }

  const access = req.cookies.get("authToken")?.value;

  if (isAuthRoute && access) {
    return NextResponse.redirect(new URL("/order-the-cart-items", req.url), { status: 303 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
