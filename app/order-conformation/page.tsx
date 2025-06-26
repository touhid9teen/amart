"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { useQuery } from "@/lib/queries";
import { getOrderById } from "@/lib/actions";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "";
  const { authToken } = useAuth();

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

  console.log("order data------------", orderData);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <div className="text-lg font-semibold text-gray-700">
          Loading order details...
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-lg font-semibold text-red-600 mb-2">
          {error instanceof Error ? error.message : "Order not found."}
        </div>
        <Button onClick={() => router.push("/")}>Go Home</Button>
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600">
            Congratulations! Your order has been successfully placed.{" "}
            <Link
              href={`/order-details?id=${orderId}`}
              className="text-blue-600 hover:underline"
            >
              Order details
            </Link>
          </p>
        </div>

        {/* Order Summary Card */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  Order {order.id || orderId}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleString()
                    : ""}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                {order.status ? order.status.toUpperCase() : "CONFIRMED"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Delivery Info */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Delivery Address
                  </h3>
                  <p className="text-sm text-gray-600">{order.address}</p>
                </div>
              </div>

              {/* Payment Info */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Payment Method
                  </h3>
                  <p className="text-sm text-gray-600">
                    {order.payment_method || "COD"}
                  </p>
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">৳</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Total Amount</h3>
                  <p className="text-sm text-gray-600">
                    ৳
                    {order.total_amount
                      ? Number(order.total_amount).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items && order.items.length > 0 ? (
                order.items?.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <Image
                      src={item.product?.image || "/placeholder.svg"}
                      alt={item.product?.name || "Product"}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-md border"
                      unoptimized
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.product?.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ID: {item.product?.id}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ৳{(item.product?.price ?? item.price ?? 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">
                  No items found in this order.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push(`/order-details?id=${orderId}`)}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8"
          >
            Order Details
          </Button>
          <Button
            onClick={() => router.push("/orders")}
            variant="outline"
            className="px-8"
          >
            View Orders
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="px-8"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
