"use client";

import Link from "next/link";
import { ShoppingBasket } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Amart Home">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-sm">
        <ShoppingBasket size={22} strokeWidth={2.5} />
      </div>
      <span className="text-2xl font-extrabold tracking-tight text-gray-900">
        Amart<span className="text-primary">.</span>
      </span>
    </Link>
  );
}
