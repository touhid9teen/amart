"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductDetails from "./productItem-details";
import { Eye } from "lucide-react";

export default function ProductItem({
  product,
  onQuickView,
  isFeatured = false,
}: ProductItemProps) {
  const [quantity, setQuantity] = useState(0);
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

  return (
    <div
      className={`${
        isFeatured
          ? "flex flex-col border rounded-lg overflow-hidden bg-white text-sm transition-shadow hover:shadow-md"
          : "flex items-center gap-4 p-4"
      }`}
    >
      {isFeatured ? (
        <div className="relative">
          <div className="absolute top-1 right-1 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.();
              }}
              className="bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
            >
              <Eye className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          <div className="h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.();
              }}
            >
              <Image
                src={imgUrl}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                unoptimized
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-16 h-16 border rounded-md overflow-hidden">
          <Image
            src={imgUrl}
            alt={product.name}
            width={64}
            height={64}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>
      )}

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
