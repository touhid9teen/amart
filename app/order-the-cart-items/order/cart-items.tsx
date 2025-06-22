"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Shield, Clock, Truck } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  sellingPice: number;
  quantity: number;
  image?: string;
}

export default function CartItems() {
  const { cartItems, totalAmount } = useCart();
  const items = Object.values(cartItems) as CartItem[];
  const deliveryCharge = 40;
  const grandTotal = totalAmount + deliveryCharge;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "";

  return (
    <div className="space-y-6">
      {/* Order Summary Card */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg font-bold">Order Summary</CardTitle>
            </div>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary font-medium"
            >
              {items.length} item{items.length > 1 ? "s" : ""}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Delivery Info */}
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Fast Delivery</p>
                <p className="text-sm text-green-600">
                  Estimated delivery in 16 minutes
                </p>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm">
                Items in your order
              </h3>
              {items.map((item) => {
                const imgUrl = item.image
                  ? baseUrl + item.image
                  : "/placeholder.svg?height=300&width=300";
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 border-2 border-white rounded-lg overflow-hidden shadow-sm">
                        <Image
                          src={imgUrl || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-contain bg-white"
                          unoptimized
                        />
                      </div>
                      <Badge
                        variant="secondary"
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-white font-bold"
                      >
                        {item.quantity}
                      </Badge>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        ৳{item.sellingPice} × {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ৳{item.sellingPice * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Pricing Breakdown */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm">
                Bill Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items total</span>
                  <span className="font-medium">৳{totalAmount}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Truck className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Delivery charge</span>
                  </div>
                  <span className="font-medium">৳{deliveryCharge}</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-bold text-gray-900">Grand Total</p>
                    <p className="text-xs text-gray-500">Including all taxes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      ৳{grandTotal}
                    </p>
                    <p className="text-xs text-gray-500">BDT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3 text-green-700">
                <Shield className="w-5 h-5" />
                <div>
                  <p className="text-sm font-semibold">Secure Checkout</p>
                  <p className="text-xs text-green-600">
                    Your payment information is protected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info Card */}
      <Card className="shadow-lg border-0">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3 text-sm">
            Cancellation Policy
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Orders cannot be cancelled once packed for delivery. In case of
            unexpected delays, a refund will be provided, if applicable.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
