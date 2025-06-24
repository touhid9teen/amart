"use client";

import { useCart } from "@/contexts/cart-context";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import CartModal from "./cart-modal";

export default function CartButton() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount, totalAmount } = useCart();

  return (
    <>
      <button
        onClick={() => setCartOpen(!cartOpen)}
        className={`
          relative flex items-center gap-2 px-3 py-2 rounded-lg
          text-sm font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
          sm:px-4 sm:py-2.5
          ${
            cartCount > 0
              ? "bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:ring-gray-300"
          }
        `}
      >
        <div className="flex items-center justify-center">
          <ShoppingCart className="h-5 w-5" />
        </div>

        <div className="sm:flex flex-col justify-center min-w-[50px]">
          {/* Top line: item count or "My Cart" */}
          <span className="flex text-xs font-extrabold opacity-90 leading-tight text-left">
            {cartCount > 0
              ? `${cartCount} item${cartCount > 1 ? "s" : ""}`
              : "My Cart"}
          </span>

          {/* Bottom line: total or empty with opacity-0 for consistent spacing */}
          {cartCount !== 0 && (
            <span className="text-sm font-semibold leading-tight text-left">
              ৳{totalAmount.toLocaleString()}
            </span>
          )}
        </div>
      </button>

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
