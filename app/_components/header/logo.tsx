"use client";

import Link from "next/link";

export default function Logo({ isHeader }: { isHeader?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center group transition-all duration-200  pr-4 sm:pr-6 lg:pr-8 h-16 sm:h-18 lg:h-20 ${
        isHeader ? "" : ""
      }`}
      aria-label="Go to homepage"
    >
      <div className="flex items-baseline">
        <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-500 leading-none group-hover:scale-105 transition-transform duration-200">
          a
        </span>
        <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary tracking-tight leading-none group-hover:scale-105 transition-transform duration-200">
          mart
        </span>
      </div>
    </Link>
  );
}
