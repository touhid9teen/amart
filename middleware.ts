import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/order-the-cart-items"];
const authRoutes: string[] = ["/"];

export default async function middleware(req: NextRequest) {
  const currentRoute = req.nextUrl.pathname;
  const isPrivateRoute = privateRoutes.some((route) =>
    currentRoute.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(currentRoute);

  // LocalStorage is not accessible in middleware (server-side only)
  // You must set the token as a cookie for server-side route protection to work
  // This middleware will NOT see tokens in localStorage
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
  matcher: ["/order-the-cart-items/:path*", "/order-conformation/:path*"],
};
