"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import CartActionButton from "@/components/cart/cart-action-button";
import { useState, useEffect } from "react";
import type { Product } from "@/lib/types";

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const { cartItems, updateCart } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (product) {
      const existing = cartItems[product.id] as any;
      setQuantity(existing?.quantity || 0);
    }
  }, [cartItems, product]);

  const imgUrl = product.image || "/placeholder.svg";
  const discountPercentage = product.mrp
    ? Math.round(
        ((Number(product.mrp) - Number(product.sellingPice)) /
          Number(product.mrp)) *
          100
      )
    : 0;

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  const cleanProduct = (p: Product) => ({
    id: p.id,
    name: p.name,
    sellingPice: p.sellingPice,
    quantity: 1,
    image: p.image,
  });

  const handleAddToCart = () => {
    setAdding(true);
    const clean = cleanProduct(product);
    const existing = (cartItems[clean.id] as any) || { ...clean, quantity: 0 };
    const updated = {
      ...cartItems,
      [clean.id]: { ...clean, quantity: existing.quantity + 1 },
    };
    updateCart(updated);
    setQuantity(existing.quantity + 1);
    setAdding(false);
  };

  const incrementQuantity = () => {
    const clean = cleanProduct(product);
    const existing = (cartItems[clean.id] as any) || { ...clean, quantity: 0 };
    const updated = {
      ...cartItems,
      [clean.id]: { ...clean, quantity: existing.quantity + 1 },
    };
    updateCart(updated);
    setQuantity(existing.quantity + 1);
  };

  const decrementQuantity = () => {
    const existing = cartItems[product.id] as any;
    if (!existing || existing.quantity <= 1) {
      const updated = { ...cartItems };
      delete updated[product.id];
      updateCart(updated);
      setQuantity(0);
    } else {
      const updated = {
        ...cartItems,
        [product.id]: { ...existing, quantity: existing.quantity - 1 },
      };
      updateCart(updated);
      setQuantity(existing.quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="flex-1 bg-gray-50 p-4 sm:p-8 lg:p-12">
              <div className="relative aspect-square bg-white rounded-xl overflow-hidden max-w-md mx-auto">
                <Image
                  src={imgUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  unoptimized
                  onError={onImgError}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{discountPercentage}%
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 p-6 sm:p-8 lg:p-12 space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                {product.ItemQuantityType && (
                  <span className="inline-block mt-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {product.ItemQuantityType}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ৳{product.sellingPice}
                  </span>
                  {product.mrp &&
                    Number(product.mrp) > Number(product.sellingPice) && (
                      <span className="text-lg text-gray-400 line-through">
                        ৳{product.mrp}
                      </span>
                    )}
                </div>
                {discountPercentage > 0 && (
                  <p className="text-sm text-green-600 font-medium">
                    You save ৳
                    {(
                      Number(product.mrp) - Number(product.sellingPice)
                    ).toFixed(0)}{" "}
                    ({discountPercentage}% off)
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description ||
                    "Premium quality product with excellent features. Perfect for everyday use."}
                </p>
              </div>

              {/* Add to Cart */}
              <div className="pt-2">
                <CartActionButton
                  product={product}
                  quantity={quantity}
                  loading={adding}
                  size="modal"
                  handleAddToCart={handleAddToCart}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                />
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs text-gray-600">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                    <RefreshCw className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-xs text-gray-600">Easy Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
