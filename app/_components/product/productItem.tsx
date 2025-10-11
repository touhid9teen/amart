"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductDetails from "./productItem-details";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductItemProps, Product } from "@/lib/types";

export default function ProductItem({
  product,
  onQuickView,
  isFeatured = false,
}: ProductItemProps) {
  const [quantity, setQuantity] = useState(0);
  const { cartItems, updateCart } = useCart();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const imgUrl = product.image
    ? baseUrl + product.image
    : "/placeholder.svg?height=200&width=200";

  const cleanProduct = (product: Product) => ({
    id: product?.id,
    name: product?.name,
    sellingPice: product?.sellingPice,
    quantity: 1,
    image: product?.image,
  });

  useEffect(() => {
    const existing = cartItems[product.id];
    setQuantity(existing?.quantity || 0);
  }, [cartItems, product.id]);

  const handleAddToCart = (product: Product) => {
    const clean = cleanProduct(product);
    const existing = cartItems[clean.id] || { ...clean, quantity: 0 };
    const updated = {
      ...cartItems,
      [clean.id]: {
        ...clean,
        quantity: existing.quantity + 1,
      },
    };
    updateCart(updated);
    setQuantity(existing.quantity + 1);
  };

  const incrementQuantity = (product: Product) => {
    const clean = cleanProduct(product);
    const existing = cartItems[clean.id] || { ...clean, quantity: 0 };
    const updated = {
      ...cartItems,
      [clean.id]: {
        ...clean,
        quantity: existing.quantity + 1,
      },
    };
    updateCart(updated);
    setQuantity(existing.quantity + 1);
  };

  const decrementQuantity = (product: Product) => {
    const existing = cartItems[product.id];
    if (!existing) return;

    const updated = { ...cartItems };
    if (existing.quantity <= 1) {
      delete updated[product.id];
      setQuantity(0);
    } else {
      updated[product.id].quantity -= 1;
      setQuantity(updated[product.id].quantity);
    }
    updateCart(updated);
  };

  const discountPercentage = product.mrp
    ? Math.round(((product.mrp - product.sellingPice) / product.mrp) * 100)
    : 0;

  if (!isFeatured) {
    return (
      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300">
        <div className="w-14 h-14 border rounded overflow-hidden bg-gray-50">
          <Image
            src={imgUrl || "/placeholder.svg"}
            alt={product.name}
            width={56}
            height={56}
            className="w-full h-full object-contain p-1"
            unoptimized
          />
        </div>
        <ProductDetails
          product={product}
          quantity={quantity}
          loading={false}
          handleAddToCart={handleAddToCart}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300">
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-1 left-1 z-10 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
            -{discountPercentage}%
          </div>
        )}

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView?.();
          }}
          className="absolute top-1 right-1 z-10 bg-white border border-gray-200 p-1 rounded hover:bg-gray-50"
          aria-label="Quick view"
        >
          <Eye className="w-3 h-3 text-gray-700" />
        </button>

        {/* Product Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView?.();
          }}
          className="w-full h-full"
        >
          <Image
            src={imgUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain p-2"
            unoptimized
          />
        </button>
      </div>

      {/* Product Details */}
      <ProductDetails
        product={product}
        quantity={quantity}
        loading={false}
        handleAddToCart={handleAddToCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
    </div>
  );
}
