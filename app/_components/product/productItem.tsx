"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductDetails from "./productItem-details";
import { Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductItemProps, Product } from "@/lib/types";

export default function ProductItem({
  product,
  onQuickView,
  isFeatured = false,
}: ProductItemProps) {
  const [quantity, setQuantity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { cartItems, updateCart } = useCart();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
  const imgUrl = product.image
    ? baseUrl + product.image
    : "/placeholder.svg?height=300&width=300";

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
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
        <div className="w-16 h-16 border rounded-md overflow-hidden bg-gray-50">
          <Image
            src={imgUrl || "/placeholder.svg"}
            alt={product.name}
            width={64}
            height={64}
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
    <div
      className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-200 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{discountPercentage}%
          </div>
        )}

        {/* Action Buttons */}
        <div
          className={`absolute top-2 right-2 z-10 flex flex-col gap-1 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView?.();
            }}
            className="bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white p-2 rounded-full"
          >
            <Eye className="w-3 h-3 text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white p-2 rounded-full"
          >
            <Heart className="w-3 h-3 text-gray-700" />
          </Button>
        </div>

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
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
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
