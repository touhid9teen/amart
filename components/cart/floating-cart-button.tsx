"use client";

import { useCart } from "@/contexts/cart-context";
import { ShoppingCart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HIDDEN_ROUTES = ["/cart", "/order-the-cart-items", "/order-conformation"];

export default function FloatingCartButton() {
  const pathname = usePathname();
  const { cartCount, totalAmount } = useCart();
  const [visible, setVisible] = useState(false);

  // Hide on cart, checkout, and order confirmation pages
  const isHiddenRoute = HIDDEN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    if (!isHiddenRoute && cartCount > 0) {
      const timer = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [cartCount, isHiddenRoute]);

  if (cartCount === 0 || isHiddenRoute) return null;

  return (
    <div
      className="fixed left-0 right-0 bottom-0 z-50 flex justify-center pointer-events-none"
      style={{
        paddingBottom: "max(env(safe-area-inset-bottom, 16px), 16px)",
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <Link
        href="/cart"
        className={`pointer-events-auto flex items-center gap-3 rounded-2xl font-bold text-sm px-5 transition-all duration-300 shadow-lg hover:shadow-xl ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
        style={{
          height: 56,
          background: "linear-gradient(135deg, #1f5c2e 0%, #2d7a3e 100%)",
          color: "#fff",
          border: "none",
          textDecoration: "none",
          boxShadow: "0 4px 24px rgba(31,92,46,0.35)",
        }}
      >
        {/* Cart icon with count badge */}
        <span className="relative flex items-center justify-center">
          <ShoppingCart size={20} />
          <span
            className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-[10px] font-bold"
            style={{
              minWidth: 18,
              height: 18,
              background: "#ff6b35",
              color: "#fff",
              border: "2px solid #fff",
              padding: "0 3px",
            }}
          >
            {cartCount}
          </span>
        </span>

        {/* Label */}
        <span className="text-sm">View Cart</span>

        {/* Divider */}
        <span
          className="block"
          style={{
            width: 1,
            height: 24,
            background: "rgba(255,255,255,0.2)",
          }}
        />

        {/* Total */}
        <span className="text-base font-extrabold">৳{totalAmount}</span>

        {/* Arrow */}
        <span
          className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{
            width: 26,
            height: 26,
            background: "rgba(255,255,255,0.15)",
          }}
        >
          <ChevronRight size={16} strokeWidth={3} />
        </span>
      </Link>
    </div>
  );
}
