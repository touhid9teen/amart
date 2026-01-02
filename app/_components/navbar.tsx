"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ORGANIC", href: "/category/organic" },
  { label: "HERBS", href: "/category/herbs" },
  { label: "SNACKS", href: "/category/snacks" },
  { label: "BEVERAGES", href: "/category/beverages" },
  { label: "BAKERY", href: "/category/bakery" },
  { label: "CANNED FOODS", href: "/category/canned-foods" },
  { label: "DAIRY", href: "/category/dairy" },
  { label: "ARTICLES", href: "/articles" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="container mx-auto px-4 mt-8 mb-0">
      <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
        <ul className="flex items-center w-full min-w-max border-t border-b border-gray-200">
          {navItems.map((item, index) => {
            const isActive = item.label === "HOME";
            
            return (
              <li 
                key={item.label} 
                className={cn(
                  "shrink-0 flex-1 text-center border-r border-gray-200 last:border-r-0",
                   isActive ? "bg-[#7fad39] border-[#7fad39]" : "bg-white"
                )}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "block px-6 py-4 text-sm font-bold uppercase tracking-wide transition-colors duration-200 w-full h-full",
                     isActive
                      ? "text-white"
                      : "text-gray-800 hover:text-[#7fad39]"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
