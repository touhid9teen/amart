"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Loader2,
  ArrowLeft,
  MapPin,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "@/lib/actions";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "";
  const { authToken } = useAuth();
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";

  // Use TanStack Query for order details
  const {
    data: orderData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!orderId || !authToken)
        throw new Error("Missing orderId or authToken");
      return await getOrderById(orderId, authToken);
    },
    enabled: !!orderId && !!authToken,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Order Confirmation</h1>
          </div>
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <div className="text-lg font-semibold text-gray-700">
              Loading order details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Order Confirmation</h1>
          </div>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-lg font-semibold text-red-600 mb-4">
              {error instanceof Error ? error.message : "Order not found."}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Type assertion for orderData
  const order = orderData as {
    id?: string | number;
    order_id?: string;
    created_at?: string;
    status?: string;
    address?: string;
    payment_method?: string;
    total_amount?: number | string;
    delivery_charge?: number | string;
    order_notes?: string;
    user?: string;
    items?: Array<{
      id?: string | number;
      quantity?: number;
      price?: number;
      product?: {
        id?: string | number;
        name?: string;
        image?: string;
        price?: number;
      };
    }>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Order Confirmation</h1>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 text-lg">
            Your order has been successfully placed and is being processed.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-lg mb-6">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Order #{order.order_id?.slice(0, 8) || order.id}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 border-green-200"
              >
                {order.status ? order.status.toUpperCase() : "CONFIRMED"}
              </Badge>
            </div>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Delivery Address */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Delivery Address
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {order.address}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Payment Method
                  </h4>
                  <p className="text-sm text-gray-600">
                    {order.payment_method || "Cash on Delivery"}
                  </p>
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-lg">৳</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Total Amount
                  </h4>
                  <p className="text-lg font-semibold text-gray-900">
                    ৳
                    {order.total_amount
                      ? Number(order.total_amount).toFixed(2)
                      : "0.00"}
                  </p>
                  {order.delivery_charge && (
                    <p className="text-xs text-gray-500">
                      (includes ৳{Number(order.delivery_charge).toFixed(2)}{" "}
                      delivery)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="border-b border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">Order Items</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {order.items && order.items.length > 0 ? (
                order.items?.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="relative w-16 h-16 bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <Image
                        src={
                          item.product?.image
                            ? item.product.image.startsWith("http")
                              ? item.product.image
                              : `${baseUrl}${item.product.image}`
                            : "/placeholder.svg?height=64&width=64"
                        }
                        alt={item.product?.name || "Product"}
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {item.product?.name}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Qty: {item.quantity}</span>
                        <span>•</span>
                        <span>
                          ৳{(item.product?.price ?? item.price ?? 0).toFixed(2)}{" "}
                          each
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ৳
                        {(
                          (item.product?.price ?? item.price ?? 0) *
                          (item.quantity ?? 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No items found in this order.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Notes */}
        {order.order_notes && (
          <div className="bg-white border border-gray-200 rounded-lg mt-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Order Notes
              </h3>
              <p className="text-gray-600">{order.order_notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
