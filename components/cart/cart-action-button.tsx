"use client";

import { Loader2 } from "lucide-react";
import type { Product } from "@/lib/types";

interface CartActionButtonProps {
  product: Product;
  quantity: number;
  loading?: boolean;
  size?: "sm" | "modal"; // `modal` will be a little narrower than `sm`
  handleAddToCart: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
}

export default function CartActionButton({
  product,
  quantity,
  loading = false,
  size,
  handleAddToCart,
  incrementQuantity,
  decrementQuantity,
}: CartActionButtonProps) {
  // Define consistent width based on size
  const sizeKey = size ?? "sm";
  const sizeClass = {
    modal: {
      width: "w-[80px] sm:w-[90px]",
      height: "h-8 sm:h-9",
      text: "text-sm sm:text-base",
      padding: "py-1.5 px-2",
    },
    sm: {
      width: "w-[72px] sm:w-[80px]",
      height: "h-8 sm:h-9",
      text: "text-sm",
      padding: "py-1 px-1.5",
    },
  }[sizeKey];

  return quantity < 1 ? (
    <button
      onClick={() => handleAddToCart(product)}
      disabled={loading}
      className={`rounded-md font-semibold flex justify-center items-center relative ${sizeClass.text} ${sizeClass.padding} ${sizeClass.width} ${sizeClass.height} bg-green-50 border border-primary text-primary hover:bg-primary hover:text-white transition-colors`}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <span>ADD</span>
      )}
    </button>
  ) : (
    <div
      className={`flex justify-between items-center font-extrabold overflow-hidden ${sizeClass.width} ${sizeClass.height} ${sizeClass.text} border border-primary bg-primary text-white rounded-md`}
    >
      <button
        onClick={() => decrementQuantity(product)}
        className="w-1/3 h-full flex items-center justify-center"
      >
        -
      </button>
      <span className="w-1/3 text-center">{quantity}</span>
      <button
        onClick={() => incrementQuantity(product)}
        className="w-1/3 h-full flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
}
