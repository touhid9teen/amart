"use client";

import CheckoutComponent from "./checkout-component";
import CartItems from "./cart-items";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, totalAmount } = useCart();
  const { authId, authToken } = useAuth();

  // Helper to build order payload from cart and checkout form
  const buildOrderPayload = (formData: { address: string }) => {
    return {
      user: authId || "", // Ensure user is always a string
      address: formData.address,
      total_amount: totalAmount,
      delivery_charge: 50, // or your logic
      items: Object.values(cartItems).map((item) => ({
        product_name: (item as CartItem).name,
        product_id: (item as CartItem).id,
        quantity: (item as CartItem).quantity,
        price: (item as CartItem).sellingPice,
        image: (item as CartItem).image || "", // Ensure image is always a string
      })),
    } as OrderPayload;
  };

  // Example: handle order submit (to be passed to CheckoutComponent)
  const handleOrderSubmit = async (formData: { address: string }) => {
    const orderData: OrderPayload = buildOrderPayload(formData);
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";
    try {
      const res = await fetch(`${baseUrl}/detail/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Order failed");
      const data = await res.json();

      router.push(`/order-conformation?page=success&id=${data.order_id}`);
    } catch (err) {
      // Handle error (show toast, etc.)
      console.error(err);
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
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="text-sm font-medium text-primary">Cart</span>
            </div>
            <div className="w-12 h-0.5 bg-primary"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium text-primary">Checkout</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-gray-500">Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Checkout Details */}
          <div className="lg:col-span-2">
            <CheckoutComponent onOrderSubmit={handleOrderSubmit} />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartItems
                buildOrderPayload={buildOrderPayload}
                authToken={authToken}
                router={router}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
