"use client";

import CheckoutComponent from "./checkout-component";
import { CheckoutFormSkeleton, CartItemsSkeleton } from "./skeleton-loader";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { useState } from "react";
import { submitOrderServer } from "@/lib/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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

function LoadingSkeleton() {
  return (
    <main className="min-h-screen" style={{ background: "#f5f4f0" }}>
      {/* Top bar skeleton */}
      <div
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          borderColor: "#e8e5de",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <div
            className="rounded-full animate-pulse"
            style={{ width: 36, height: 36, background: "#e8e4dc" }}
          />
          <div
            className="flex-1 h-2 rounded-full animate-pulse"
            style={{ background: "#e8e4dc" }}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8">
          <div className="lg:col-span-3">
            <CheckoutFormSkeleton />
          </div>
          <div className="lg:col-span-2 mt-6 lg:mt-0">
            <CartItemsSkeleton />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, totalAmount, updateCart } = useCart();
  const { isAuthLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleOrderSubmit = async (formData: CheckoutFormData) => {
    setLoading(true);
    try {
      const delivery_charge = 40;
      const address = formData.address;

      const items: OrderItem[] = (Object.values(cartItems) as any[]).map(
        (item: any) => ({
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

      const res = await submitOrderServer(orderData);

      if (!res.success) {
        throw new Error(res.message || "Order submission failed.");
      }

      const data = res.data;
      router.replace(`/order-conformation?page=success&id=${data.order_id}`);
      setTimeout(() => updateCart({}), 0);
    } catch (err) {
      toast.error("Order failed. Please try again or check your login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthLoading) return <LoadingSkeleton />;

  return (
    <main className="min-h-screen" style={{ background: "#f5f4f0" }}>
      {/* ── Sticky Top Bar ── */}
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
            className="flex items-center gap-2 group"
            style={{ textDecoration: "none" }}
          >
            <span
              className="flex items-center justify-center transition-all duration-200 group-hover:bg-gray-100"
              style={{
                width: 36,
                height: 36,
                background: "#fff",
              }}
            >
              <ArrowLeft size={18} strokeWidth={3} style={{ color: "#333" }} />
            </span>
            <span
              className="hidden sm:inline"
              style={{
                color: "#333",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              Continue Shopping
            </span>
          </Link>

          <div className="flex-1" />
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <CheckoutComponent
          onOrderSubmit={handleOrderSubmit}
          loading={loading}
        />
      </div>
    </main>
  );
}
