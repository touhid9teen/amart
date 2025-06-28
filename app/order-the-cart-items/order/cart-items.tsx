"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Shield, Clock, Truck, Package } from "lucide-react";
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
    <div className="space-y-4">
      {/* Order Summary Card */}
      <Card className="shadow-sm border border-gray-100 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
                Order Summary
              </CardTitle>
            </div>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary font-medium text-xs px-2 py-1"
            >
              {items.length} item{items.length > 1 ? "s" : ""}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Delivery Info */}
            <div className="flex items-start gap-3 p-3 sm:p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-emerald-800 text-sm sm:text-base">
                  Fast Delivery
                </p>
                <p className="text-xs sm:text-sm text-emerald-600 mt-0.5">
                  Estimated delivery in 16 minutes
                </p>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-500" />
                <h3 className="font-semibold text-gray-900 text-sm">
                  Items in your order
                </h3>
              </div>

              <div className="space-y-2">
                {items.map((item) => {
                  const imgUrl = item.image
                    ? baseUrl + item.image
                    : "/placeholder.svg?height=300&width=300";

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                          <Image
                            src={imgUrl || "/placeholder.svg"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain"
                            unoptimized
                          />
                        </div>
                        <Badge
                          variant="secondary"
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-white font-bold border-2 border-white"
                        >
                          {item.quantity}
                        </Badge>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          ৳{item.sellingPice} × {item.quantity}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-gray-900 text-sm">
                          ৳{item.sellingPice * item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Pricing Breakdown */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <span>Bill Details</span>
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items total</span>
                  <span className="font-medium text-gray-900">
                    ৳{totalAmount}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">Delivery charge</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    ৳{deliveryCharge}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between items-center py-2 bg-gray-50 rounded-lg px-3">
                  <div>
                    <p className="font-bold text-gray-900">Grand Total</p>
                    <p className="text-xs text-gray-500">Including all taxes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg sm:text-xl font-bold text-primary">
                      ৳{grandTotal}
                    </p>
                    <p className="text-xs text-gray-500">BDT</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="p-3 sm:p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex items-center gap-3 text-blue-700">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Secure Checkout</p>
                  <p className="text-xs text-blue-600">
                    Your payment information is protected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Info Card */}
      <Card className="shadow-sm border border-gray-100">
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">
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
