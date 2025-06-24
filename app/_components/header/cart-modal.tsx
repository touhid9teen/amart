"use client";

import { useCart } from "@/contexts/cart-context";
import { X, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProductItem from "../product/productItem";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, cartCount, totalAmount } = useCart();
  const { authState, showLoginModal } = useAuth();
  const router = useRouter();

  const deliveryCharge = 25;
  const handlingCharge = 2;
  const grandTotal = Math.floor(totalAmount + deliveryCharge + handlingCharge);

  if (!isOpen) return null;
  const handleProceed = () => {
    if (authState !== "authenticated") {
      showLoginModal();
    } else {
      // Use startTransition for non-blocking navigation
      import("react").then(({ startTransition }) => {
        startTransition(() => {
          router.push("/order-the-cart-items");
        });
      });
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity overflow-y-auto"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-lg">
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

        {/* Content */}
        <div className="flex-1 bg-gray-100 px-4 py-3 space-y-4 pb-36 overflow-y-auto">
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
                Object.values(cartItems).map((item: AnyType, indx) => {
                  return (
                    <ProductItem
                      key={indx}
                      product={item as Product}
                      isFeatured={false}
                    />
                  );
                })
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

        {/* Bottom Button */}
        <div className="fixed bottom-0 right-0 max-w-sm w-full mx-auto bg-white p-4 border-t border-gray-200 z-50">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-base shadow"
            onClick={handleProceed}
          >
            <div className="flex items-center justify-between w-full">
              <span>৳{grandTotal}</span>
              <span>
                {authState !== "authenticated"
                  ? "Login to Proceed →"
                  : "Complete Order →"}
              </span>
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
