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
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
      >
        <ShoppingCart className="h-6 w-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#7fad39] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
