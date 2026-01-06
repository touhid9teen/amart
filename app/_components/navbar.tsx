"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about-us" },
  { label: "ARTICLES", href: "/articles" },
  { label: "SERVICES", href: "/our-services" },
  { label: "SUPPORT", href: "/help&support" },
  { label: "FAQ", href: "/faqs" },
  { label: "TERMS", href: "/terms&condition" },
  { label: "PRIVACY ", href: "/privacy-policy" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  return (
    <nav className="container mx-auto px-4 mt-8 mb-0">
      <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
        <ul 
          className="flex items-center w-full min-w-max border-t border-b border-gray-200"
          onMouseLeave={() => setHoveredLabel(null)}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <li 
                key={item.label} 
                className="relative shrink-0 flex-1 text-center border-r border-gray-200 last:border-r-0"
                onMouseEnter={() => setHoveredLabel(item.label)}
              >
                {(hoveredLabel === item.label || (hoveredLabel === null && isActive)) && (
                  <motion.div
                    layoutId="nav-hover"
                    className="absolute inset-0 bg-primary z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Link
                  href={item.href}
                  className={cn(
                    "block px-6 py-4 text-sm font-bold uppercase tracking-wide transition-colors duration-200 w-full h-full relative z-10",
                    (hoveredLabel === item.label || (hoveredLabel === null && isActive))
                      ? "text-white"
                      : "text-gray-800"
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
