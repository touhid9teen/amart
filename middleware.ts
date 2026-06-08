import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes: string[] = ["/order-the-cart-items"];
const authRoutes: string[] = ["/"];
const adminRoutes: string[] = ["/admin"];

export default async function middleware(req: NextRequest) {
  const currentRoute = req.nextUrl.pathname;
  const isPrivateRoute = privateRoutes.some((route) =>
    currentRoute.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(currentRoute);
  const isAdminRoute = adminRoutes.some((route) =>
    currentRoute.startsWith(route)
  );

  // Admin routes: check for admin access token cookie
  if (isAdminRoute && currentRoute !== "/admin/login") {
    const cookieStore = await cookies();
    const adminToken = cookieStore.get("admin_access_token")?.value;
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
  }

  const cookieStore = await cookies();
  const access = cookieStore.get("authToken")?.value;

  if (isAuthRoute && access) {
    return NextResponse.redirect(new URL("/order-the-cart-items", req.nextUrl));
  }

  if (isPrivateRoute && !isAuthRoute && !access) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/order-the-cart-items", "/admin/:path*"],
};
