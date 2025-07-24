"use client";

import CheckoutComponent from "./checkout-component";
import CartItems from "./cart-items";
import { CheckoutFormSkeleton, CartItemsSkeleton } from "./skeleton-loader";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import ProcessIndicator from "@/app/_components/other/process-indicator";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/lib/variables";
import BackButton from "@/app/_components/back-button";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
  postalCode: string;
  orderNotes: string;
}

interface OrderItem {
  product_name: string;
  product_id: number;
  quantity: number;
  price: number;
  image: string;
}

interface OrderData {
  address: string;
  total_amount: number;
  delivery_charge: number;
  status: string;
  order_notes: string;
  items: OrderItem[];
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, totalAmount, updateCart } = useCart();
  const { getValidAuthToken, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleOrderSubmit = async (formData: CheckoutFormData) => {
    setLoading(true);

    try {
      const delivery_charge = 40;
      const address = `${formData.address}, ${formData.area}, ${formData.city}, ${formData.postalCode}`;

      const items: OrderItem[] = (Object.values(cartItems) as CartItem[]).map(
        (item: CartItem) => ({
          product_name: item.name,
          product_id: item.id,
          quantity: item.quantity,
          price: item.sellingPice,
          image: item.image || "",
        })
      );

      const orderData: OrderData = {
        address,
        total_amount: totalAmount + delivery_charge,
        delivery_charge,
        status: "open",
        order_notes: formData.orderNotes,
        items,
      };

      const validToken = await getValidAuthToken();
      if (!validToken)
        throw new Error("Authentication required. Please login again.");

      // console.log("orderData++++++++++++++++++", orderData);

      const res = await axios.post(`${BASE_URL}detail/orders/`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${validToken}`,
        },
      });

      const data = res.data;

      // console.log("orde++++++++++++++++++", data);
      router.replace(`/order-conformation?page=success&id=${data.order_id}`);
      setTimeout(() => updateCart({}), 0);
    } catch (err) {
      toast.error("Order failed. Please try again or check your login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
            {/* Mobile Loading Layout */}
            <div className="block sm:hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="w-full h-2 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Desktop Loading Layout */}
            <div className="hidden sm:flex sm:items-center sm:gap-4 sm:min-h-[52px]">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="flex-1 h-2 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <CheckoutFormSkeleton />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-20 sm:top-24">
                <CartItemsSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          {/* Mobile Layout (< sm) */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-between mb-2">
              <BackButton />
              <div className="text-xs text-gray-500 font-medium">Checkout</div>
            </div>
            <div className="w-full">
              <ProcessIndicator />
            </div>
          </div>

          {/* Desktop/Tablet Layout (>= sm) */}
          <div className="hidden sm:flex sm:items-center sm:gap-4 sm:min-h-[52px]">
            <div className="flex-shrink-0">
              <BackButton />
            </div>
            <div className="flex-1">
              <ProcessIndicator />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Left Column - Checkout Details */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <CheckoutComponent
              onOrderSubmit={handleOrderSubmit}
              loading={loading}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-20 sm:top-24">
              <CartItems />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
