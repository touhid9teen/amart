"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const NAVBAR_ROUTES = [
  "/",
  "/about-us",
  "/articles",
  "/our-services",
  "/help&support",
  "/faqs",
  "/terms&condition",
  "/privacy-policy",
];

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (!NAVBAR_ROUTES.includes(pathname)) return null;

  return <Navbar />;
}
