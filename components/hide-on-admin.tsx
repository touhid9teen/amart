"use client";

import { usePathname } from "next/navigation";

/**
 * Hides its children on admin routes to prevent storefront components
 * from leaking into the admin panel layout.
 */
export function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <>{children}</>;
}
