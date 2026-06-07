"use client";

import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import {
  ShoppingCart,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  Package,
  Truck,
  Zap,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import CartPageSkeleton from "@/app/_components/skeleton/cart-page-skeleton";

export default function CartPage() {
  const { cartItems, cartCount, totalAmount, updateCart } = useCart();
  const { authState, showLoginModal } = useAuth();
  const router = useRouter();
  const [proceeding, setProceeding] = useState(false);

  const deliveryCharge = 40;
  const handlingCharge = 2;
  const grandTotal = Math.floor(totalAmount + deliveryCharge + handlingCharge);
  const items = Object.values(cartItems) as Product[];

  const handleProceed = () => {
    if (authState !== "authenticated") {
      showLoginModal();
    } else {
      setProceeding(true);
      router.push("/order-the-cart-items");
      setTimeout(() => setProceeding(false), 1000);
    }
  };

  const handleQuantityChange = (
    product: Product,
    action: "increment" | "decrement"
  ) => {
    const existing = cartItems[product.id] as any;
    const updated = { ...cartItems } as any;

    if (action === "increment") {
      if (existing) {
        updated[product.id] = { ...existing, quantity: existing.quantity + 1 };
      } else {
        updated[product.id] = {
          id: product.id,
          name: product.name,
          sellingPice: product.sellingPice,
          quantity: 1,
          image: product.image,
        };
      }
    } else {
      if (!existing) return;
      if (existing.quantity <= 1) {
        delete updated[product.id];
      } else {
        updated[product.id] = { ...existing, quantity: existing.quantity - 1 };
      }
    }
    updateCart(updated);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const isEmpty = Object.keys(cartItems).length === 0;

  if (loading) return <CartPageSkeleton />;

  return (
    <main className="min-h-screen" style={{ background: "#f5f4f0" }}>
      {/* Top Bar */}
      <div
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          borderColor: "#e8e5de",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            style={{ textDecoration: "none" }}
          >
            <span
              className="flex items-center justify-center transition-all duration-200 group-hover:bg-gray-100"
              style={{
                width: 40,
                height: 40,
                background: "transparent",
                borderRadius: 10,
              }}
            >
              <ArrowLeft size={22} strokeWidth={3} style={{ color: "#333" }} />
            </span>
            <span
              className="hidden sm:inline"
              style={{
                color: "#333",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              Continue Shopping
            </span>
          </Link>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <ShoppingCart size={16} style={{ color: "#888" }} />
            <span className="text-sm font-semibold" style={{ color: "#222" }}>
              Cart
              {cartCount > 0 && (
                <span
                  className="ml-1.5 inline-flex items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    background: "#2d6a3f",
                    color: "#fff",
                    width: 20,
                    height: 20,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-36">
        {isEmpty ? (
          /* ── Empty State ── */
          <div className="flex flex-col items-center justify-center py-28 px-4">
            <div
              className="flex items-center justify-center rounded-full mb-8"
              style={{
                width: 96,
                height: 96,
                background: "#fff",
                border: "1.5px solid #e0ddd5",
              }}
            >
              <ShoppingCart size={38} style={{ color: "#c4bfb5" }} />
            </div>
            <h2
              className="text-2xl font-bold mb-3 text-center"
              style={{ color: "#1a1a1a", letterSpacing: "-0.02em" }}
            >
              Your cart is empty
            </h2>
            <p
              className="text-base mb-10 text-center max-w-sm leading-relaxed"
              style={{ color: "#888" }}
            >
              Browse our fresh selection and add items you love.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-200"
              style={{
                background: "#1f5c2e",
                color: "#fff",
                textDecoration: "none",
                boxShadow: "0 2px 12px rgba(31,92,46,0.25)",
              }}
            >
              <ShoppingCart size={16} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-5 lg:gap-8 items-start">

            {/* ── LEFT: Cart Items ── */}
            <div className="lg:col-span-3 space-y-4">

              {/* Section header */}
              <div className="flex items-center justify-between pb-1">
                <h1
                  className="text-xl font-bold"
                  style={{ color: "#1a1a1a", letterSpacing: "-0.02em" }}
                >
                  Your Order
                </h1>
                <span className="text-sm" style={{ color: "#999" }}>
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Items card */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "#fff",
                  border: "1px solid #e8e4dc",
                }}
              >
                {/* Card header */}
                <div
                  className="flex items-center gap-2.5 px-5 py-3.5 border-b"
                  style={{ borderColor: "#f0ece4" }}
                >
                  <Package size={15} style={{ color: "#888" }} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#333" }}
                  >
                    Items in your order
                  </span>
                </div>

                {/* Item rows */}
                <div>
                  {items.map((item, idx) => {
                    const qty = (cartItems[item.id] as any)?.quantity || 0;
                    const imgUrl =
                      item.image || "/placeholder.svg?height=300&width=300";
                    const lineTotal = Number(item.sellingPice) * qty;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50"
                        style={{
                          borderTop: idx === 0 ? "none" : "1px solid #f0ece4",
                        }}
                      >
                        {/* Image */}
                        <div className="relative flex-shrink-0">
                          <div
                            className="overflow-hidden rounded-xl"
                            style={{
                              width: 72,
                              height: 72,
                              background: "#f8f6f2",
                              border: "1px solid #eae6de",
                            }}
                          >
                            <Image
                              src={imgUrl}
                              alt={item.name}
                              width={72}
                              height={72}
                              className="w-full h-full object-contain"
                              unoptimized
                            />
                          </div>
                          {qty > 1 && (
                            <span
                              className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full text-xs font-bold"
                              style={{
                                width: 20,
                                height: 20,
                                background: "#1f5c2e",
                                color: "#fff",
                                fontSize: 10,
                                border: "2px solid #fff",
                              }}
                            >
                              {qty}
                            </span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-medium text-sm leading-snug line-clamp-2 mb-1"
                            style={{ color: "#1a1a1a" }}
                          >
                            {item.name}
                          </p>
                          <p className="text-xs" style={{ color: "#aaa" }}>
                            ৳{item.sellingPice} × {qty}
                          </p>
                          <p
                            className="text-base font-bold mt-1"
                            style={{ color: "#1a1a1a" }}
                          >
                            ৳{lineTotal}
                          </p>
                        </div>

                        {/* Quantity stepper */}
                        <div className="flex-shrink-0">
                          <div
                            className="flex items-center rounded-xl overflow-hidden"
                            style={{
                              border: "1px solid #e0dcd4",
                              background: "#fafaf8",
                            }}
                          >
                            <button
                              onClick={() =>
                                handleQuantityChange(item, "decrement")
                              }
                              className="flex items-center justify-center transition-colors hover:bg-gray-100"
                              style={{
                                width: 34,
                                height: 34,
                                color: "#555",
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                              }}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={13} />
                            </button>
                            <span
                              className="flex items-center justify-center text-sm font-bold"
                              style={{
                                width: 32,
                                height: 34,
                                color: "#1a1a1a",
                                borderLeft: "1px solid #e8e4dc",
                                borderRight: "1px solid #e8e4dc",
                              }}
                            >
                              {qty}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item, "increment")
                              }
                              className="flex items-center justify-center transition-colors hover:bg-gray-100"
                              style={{
                                width: 34,
                                height: 34,
                                color: "#1f5c2e",
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                              }}
                              aria-label="Increase quantity"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

          
            </div>

            {/* ── RIGHT: Summary ── */}
            <div className="mt-6 lg:mt-0 lg:col-span-2 space-y-4 lg:sticky lg:top-20">

              {/* Bill details */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "#fff",
                  border: "1px solid #e8e4dc",
                }}
              >
                <div
                  className="px-5 py-4 border-b"
                  style={{ borderColor: "#f0ece4" }}
                >
                  <h2
                    className="text-sm font-semibold"
                    style={{ color: "#333" }}
                  >
                    Bill Summary
                  </h2>
                </div>

                <div className="px-5 py-4 space-y-3">
                  {[
                    { label: "Items total", value: `৳${totalAmount}` },
                    { label: "Delivery charge", value: `৳${deliveryCharge}` },
                    { label: "Handling charge", value: `৳${handlingCharge}` },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm" style={{ color: "#777" }}>
                        {label}
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#333" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}

                  {/* Divider */}
                  <div
                    style={{
                      height: "1px",
                      background: "#f0ece4",
                      margin: "4px 0",
                    }}
                  />

                  {/* Grand total */}
                  <div className="flex justify-between items-end pt-1">
                    <div>
                      <p
                        className="text-base font-bold"
                        style={{ color: "#1a1a1a" }}
                      >
                        Grand Total
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#aaa" }}>
                        All charges included
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-2xl font-extrabold"
                        style={{
                          color: "#1f5c2e",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        ৳{grandTotal}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#aaa" }}>
                        BDT
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA button — visible on desktop inside the sidebar */}
              <button
                onClick={handleProceed}
                disabled={proceeding}
                className="w-full hidden lg:flex items-center justify-between rounded-2xl font-bold text-sm px-5 transition-all duration-200"
                style={{
                  height: 56,
                  background: proceeding ? "#5a9e72" : "#1f5c2e",
                  color: "#fff",
                  border: "none",
                  cursor: proceeding ? "default" : "pointer",
                  boxShadow: "0 4px 16px rgba(31,92,46,0.3)",
                }}
              >
                <span className="text-lg font-extrabold">৳{grandTotal}</span>
                <span className="flex items-center gap-1.5">
                  {proceeding ? (
                    <span className="animate-pulse">Processing…</span>
                  ) : authState !== "authenticated" ? (
                    <>Login to Proceed <ChevronRight size={16} /></>
                  ) : (
                    <>Complete Order <ChevronRight size={16} /></>
                  )}
                </span>
              </button>

              {/* Cancellation policy */}
              <div
                className="rounded-xl px-4 py-3.5 flex gap-3"
                style={{
                  background: "#faf9f6",
                  border: "1px solid #e8e4dc",
                }}
              >
                <Shield
                  size={15}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "#999" }}
                />
                <div>
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: "#444" }}
                  >
                    Cancellation Policy
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "#999" }}
                  >
                    Orders cannot be cancelled once packed for delivery. Refunds
                    apply where eligible for unexpected delays.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Fixed Bottom CTA (mobile + tablet) ── */}
      {!isEmpty && (
        <div
          className="fixed left-0 right-0 bottom-0 z-50 lg:hidden px-4 pb-5 pt-6"
          style={{
            background:
              "linear-gradient(to top, #f5f4f0 70%, rgba(245,244,240,0))",
          }}
        >
          <button
            onClick={handleProceed}
            disabled={proceeding}
            className="w-full flex items-center justify-between rounded-2xl font-bold text-sm px-5 transition-all duration-200"
            style={{
              height: 58,
              background: proceeding ? "#5a9e72" : "#1f5c2e",
              color: "#fff",
              border: "none",
              cursor: proceeding ? "default" : "pointer",
              boxShadow: "0 4px 20px rgba(31,92,46,0.35)",
            }}
          >
            <span className="text-lg font-extrabold">৳{grandTotal}</span>
            <span className="flex items-center gap-1.5 text-sm">
              {proceeding ? (
                <span className="animate-pulse">Processing…</span>
              ) : authState !== "authenticated" ? (
                <>Login to Proceed <ChevronRight size={16} /></>
              ) : (
                <>Complete Order <ChevronRight size={16} /></>
              )}
            </span>
          </button>
        </div>
      )}
    </main>
  );
}