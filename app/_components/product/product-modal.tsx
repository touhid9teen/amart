"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import {
  X,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Heart,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
import CartActionButton from "../cart-action-button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product"; // Import Product type

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { cartItems, updateCart } = useCart();

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
  const imgUrl = product.image
    ? baseUrl + product.image
    : "/placeholder.svg?height=600&width=600";

  // Mock multiple images for demo - replace with actual product images array
  const productImages = [imgUrl, imgUrl, imgUrl];

  const cleanProduct = (product: Product) => ({
    id: product.id,
    name: product.name,
    sellingPice: product.sellingPice,
    quantity: 1,
  });

  useEffect(() => {
    const existing = cartItems[product.id];
    setQuantity(existing?.quantity || 0);
  }, [cartItems, product.id]);

  const handleAddToCart = (product: Product) => {
    setLoading(true);
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
    setLoading(false);
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
    const clean = cleanProduct(product);
    const existing = cartItems[clean.id];
    if (!existing || existing.quantity <= 1) {
      const updated = { ...cartItems };
      delete updated[clean.id];
      updateCart(updated);
      setQuantity(0);
    } else {
      const updated = {
        ...cartItems,
        [clean.id]: {
          ...clean,
          quantity: existing.quantity - 1,
        },
      };
      updateCart(updated);
      setQuantity(existing.quantity - 1);
    }
  };

  const discountPercentage = product.mrp
    ? Math.round(((product.mrp - product.sellingPice) / product.mrp) * 100)
    : 0;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl lg:max-w-6xl w-full max-h-[95vh] overflow-hidden rounded-xl p-0 gap-0">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>

        {/* Close Button */}
        <DialogClose className="absolute right-3 top-3 z-50 text-gray-500 hover:text-gray-700 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all hover:shadow-xl">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
          {/* Left: Image Gallery */}
          <div className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={productImages[selectedImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
                {discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    -{discountPercentage}%
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {productImages.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-blue-500 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain p-1"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex-1 bg-white p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="space-y-6">
              {/* Product Title & Actions */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    (4.8) • 124 reviews
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    ৳{product.sellingPice}
                  </span>
                  {product.mrp && (
                    <span className="text-lg text-gray-500 line-through">
                      ৳{product.mrp}
                    </span>
                  )}
                </div>
                <p className="text-sm text-green-600 font-medium">
                  Free delivery on orders over ৳500
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description ||
                    "Premium quality product with excellent features and durability. Perfect for everyday use with outstanding performance and reliability."}
                </p>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <CartActionButton
                  product={product}
                  quantity={quantity}
                  loading={loading}
                  size="modal"
                  handleAddToCart={handleAddToCart}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                />
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center">
                    <RefreshCw className="h-4 w-4 text-orange-600" />
                  </div>
                  <span>Easy Return</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-purple-600" />
                  </div>
                  <span>Top Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
