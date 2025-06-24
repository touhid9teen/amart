"use client";

import CheckoutComponent from "./checkout-component";
import CartItems from "./cart-items";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import ProcessIndicator from "@/app/_components/other/process-indicator";
import type { CheckoutFormData } from "./checkout-component";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, totalAmount, updateCart } = useCart();
  const { authToken } = useAuth();
  const [loading, setLoading] = useState(false);

  // Build the order payload from cart and checkout form data
  const handleOrderSubmit = async (formData: CheckoutFormData) => {
    setLoading(true);
    try {
      const delivery_charge = 40;
      const address = `${formData.address}, ${formData.area}, ${formData.city}, ${formData.postalCode}`;
      const items = Object.values(cartItems).map((item) => ({
        product_name: item.name,
        product_id: item.id,
        quantity: item.quantity,
        price: item.sellingPice,
        image: item.image || "",
      }));
      const orderData = {
        address,
        total_amount: totalAmount + delivery_charge,
        delivery_charge,
        status: "open",
        order_notes: formData.orderNotes,
        items,
      };
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
      const res = await axios.post(`${baseUrl}/detail/orders/`, orderData, {
        headers: {
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        // withCredentials: true,
      });
      const data = res.data;
      console.log("Order created successfully:", data);
      // Clear cart after successful order using updateCart to sync context and localStorage
      updateCart({});
      // Use startTransition for non-blocking navigation
      import("react").then(({ startTransition }) => {
        startTransition(() => {
          router.replace(
            `/order-conformation?page=success&id=${data.order_id}`
          );
        });
      });
    } catch (err) {
      toast.error("Order failed. Please try again or check your login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          {/* Back Button */}
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          {/* Progress Indicator */}
          <ProcessIndicator />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Checkout Details */}
          <div className="lg:col-span-2">
            <CheckoutComponent
              onOrderSubmit={handleOrderSubmit}
              loading={loading}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartItems />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
