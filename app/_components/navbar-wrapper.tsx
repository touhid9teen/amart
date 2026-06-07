"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isCartRoute = pathname === "/cart";

  if (isCartRoute) return null;

  return <Navbar />;
}
