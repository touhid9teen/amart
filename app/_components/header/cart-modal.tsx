"use client";

import { useCart } from "@/contexts/cart-context";
import { X, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProductItem from "../product/productItem";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import type { Product } from "@/lib/types";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, cartCount, totalAmount } = useCart();
  const { authState, showLoginModal } = useAuth();
  const router = useRouter();
  const [proceeding, setProceeding] = useState(false);

  const deliveryCharge = 40;
  const handlingCharge = 2;
  const grandTotal = Math.floor(totalAmount + deliveryCharge + handlingCharge);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProceed = () => {
    if (authState !== "authenticated") {
      showLoginModal();
    } else {
      setProceeding(true);
      router.push("/order-the-cart-items");
      onClose();
      setTimeout(() => setProceeding(false), 1000);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 flex flex-col shadow-lg overflow-hidden">
        <h2 className="sr-only">My Cart</h2>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-extrabold text-gray-900">My Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close cart"
          >
            <X size={20} className="text-gray-600" strokeWidth={2.5} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100 px-4 py-3 space-y-4 pb-32">
          <div className="rounded-2xl bg-white">
            {/* Delivery Info */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full border-2 border-green-600 flex items-center justify-center">
                  <Clock size={14} className="text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">
                    Delivery in 16 minutes
                  </p>
                  <p className="text-xs text-gray-500">
                    Shipment of {cartCount} item{cartCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-gray-100">
              {Object.keys(cartItems).length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                </div>
              ) : (
                Object.values(cartItems).map((item: unknown, indx) => (
                  <ProductItem
                    key={indx}
                    product={item as Product}
                    isFeatured={false}
                  />
                ))
              )}
            </div>
          </div>

          {/* Bill Summary */}
          {Object.keys(cartItems).length > 0 && (
            <div className="p-6 bg-white rounded-xl space-y-2">
              <h3 className="text-sm font-bold text-gray-900">Bill Details</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-gray-600">
                    Items total
                  </span>
                  <span className="font-medium">৳{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-gray-600">
                    Delivery charge
                  </span>
                  <span className="font-medium">৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 font-extrabold">
                  <span>Grand total</span>
                  <span>৳{grandTotal}</span>
                </div>
              </div>
            </div>
          )}

          {/* Cancellation Policy */}
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Cancellation Policy
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Orders cannot be cancelled once packed for delivery. In case of
              unexpected delays, a refund will be provided, if applicable.
            </p>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        {Object.keys(cartItems).length > 0 && (
          <div className="fixed left-0 right-0 bottom-0 z-[100] px-2 pb-2 sm:px-4 sm:pb-4 pointer-events-none">
            <div className="max-w-sm mx-auto pointer-events-auto">
              <Button
                className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-3 rounded-full font-bold text-base shadow-lg flex items-center justify-between gap-2 transition-all duration-200 focus:ring-2 focus:ring-green-400 focus:outline-none"
                style={{ minHeight: 56 }}
                onClick={handleProceed}
                disabled={proceeding}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg font-extrabold">৳{grandTotal}</span>
                  <span className="hidden xs:inline text-xs font-medium text-white/80">
                    Total
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  {proceeding ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : authState !== "authenticated" ? (
                    <>
                      <span className="hidden xs:inline">Login to Proceed</span>
                      <span className="inline xs:hidden">Login</span>
                      <span aria-hidden>→</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden xs:inline">Complete Order</span>
                      <span className="inline xs:hidden">Order</span>
                      <span aria-hidden>→</span>
                    </>
                  )}
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
