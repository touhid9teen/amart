"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isCartRoute = pathname === "/cart";
  const isOrderConfirmationRoute = pathname.startsWith("/order-conformation");
  const isCheckoutRoute = pathname.startsWith("/order-the-cart-items");

  if (isCartRoute || isOrderConfirmationRoute || isCheckoutRoute) return null;

  return <Navbar />;
}
