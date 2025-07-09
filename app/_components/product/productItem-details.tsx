"use client";

import CartActionButton from "../cart-action-button";
import type { ProductDetailsProps } from "@/lib/types";

export default function ProductDetails({
  product,
  quantity,
  loading,
  handleAddToCart,
  incrementQuantity,
  decrementQuantity,
}: ProductDetailsProps) {
  return (
    <div className="p-3 sm:p-4 space-y-3">
      {/* Product Name */}
      <div className="space-y-1">
        <h3 className="font-semibold text-sm sm:text-base line-clamp-2 text-gray-900 leading-tight">
          {product?.name}
        </h3>
      </div>

      {/* Weight/Unit */}
      <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md inline-block">
       1 {product?.ItemQuantityType}
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ৳{product?.sellingPice}
          </span>
          {product.mrp && (
            <span className="text-sm text-gray-500 line-through">
              ৳{product?.mrp}
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <CartActionButton
        product={product}
        quantity={quantity}
        loading={loading}
        size="sm"
        handleAddToCart={handleAddToCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
    </div>
  );
}
