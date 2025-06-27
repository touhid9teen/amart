"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Package,
  Calendar,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useOrders } from "@/hook/use-orders";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "confirmed":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "approved":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "delivered":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

// Mobile Card Component
function MobileOrderCard({ order }: { order: any }) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">
              #{order.order_id.slice(0, 8)}
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(order.created_at), "MMM dd, yyyy")}
            </div>
          </div>
          <Badge className={getStatusColor(order.status)} variant="secondary">
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <ShoppingBag className="h-4 w-4" />
              <span>{order.items.length} items</span>
            </div>
            <div className="text-right">
              <div className="font-semibold text-green-600">
                ${order.total_amount}
              </div>
              <div className="text-xs text-gray-500">
                +${order.delivery_charge} delivery
              </div>
            </div>
          </div>

          <div className="text-sm">
            <div className="flex items-start gap-1 text-gray-600">
              <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span className="text-xs leading-relaxed">{order.address}</span>
            </div>
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500 mb-2">Items:</p>
            <div className="flex flex-wrap gap-1">
              {order.items.map((item: any) => (
                <span
                  key={item.id}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                >
                  {item.product.name} × {item.quantity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Tablet Card Component
function TabletOrderCard({ order }: { order: any }) {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="font-semibold">#{order.order_id.slice(0, 8)}</h3>
              <Badge
                className={getStatusColor(order.status)}
                variant="secondary"
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(
                  new Date(order.created_at),
                  "MMM dd, yyyy 'at' hh:mm a"
                )}
              </div>
              <div className="flex items-center gap-1">
                <ShoppingBag className="h-4 w-4" />
                {order.items.length} items
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-lg text-green-600">
              ${order.total_amount}
            </div>
            <div className="text-sm text-gray-500">
              +${order.delivery_charge} delivery
            </div>
          </div>
        </div>

        <div className="flex items-start gap-1 text-sm text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{order.address}</span>
        </div>

        <div className="pt-3 border-t">
          <div className="flex flex-wrap gap-1">
            {order.items.map((item: any) => (
              <span
                key={item.id}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
              >
                {item.product.name} × {item.quantity}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OrdersPage() {
  const router = useRouter();
  const { orders, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-md" />
          <Skeleton className="h-6 w-24 sm:h-8 sm:w-32" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold">My Orders</h1>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center py-8 sm:py-12">
            <div className="text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Failed to load orders. Please try again.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold">My Orders</h1>
      </div>

      {!orders || orders.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-8 sm:py-12">
            <div className="text-center">
              <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                When you place orders, they will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Mobile View (< 640px) */}
          <div className="block sm:hidden">
            {orders.map((order) => (
              <MobileOrderCard key={order.id} order={order} />
            ))}
          </div>

          {/* Tablet View (640px - 1024px) */}
          <div className="hidden sm:block lg:hidden">
            {orders.map((order) => (
              <TabletOrderCard key={order.id} order={order} />
            ))}
          </div>

          {/* Desktop View (>= 1024px) */}
          <div className="hidden lg:block">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Order ID</TableHead>
                        <TableHead className="w-[140px]">Date</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[200px]">Items</TableHead>
                        <TableHead className="min-w-[250px]">Address</TableHead>
                        <TableHead className="text-right w-[120px]">
                          Total
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            #{order.order_id.slice(0, 8)}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>
                                {format(
                                  new Date(order.created_at),
                                  "MMM dd, yyyy"
                                )}
                              </div>
                              <div className="text-gray-500 text-xs">
                                {format(new Date(order.created_at), "hh:mm a")}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusColor(order.status)}
                              variant="secondary"
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">
                                {order.items.length} items
                              </div>
                              <div className="text-gray-500 text-xs max-w-[200px] py-1">
                                <div className="space-y-1">
                                  {order.items.map((item, index) => (
                                    <div
                                      key={item.id}
                                      className="leading-relaxed"
                                    >
                                      {item.product.name} × {item.quantity}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-600 max-w-[250px] truncate">
                              {order.address}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="text-sm">
                              <div className="font-semibold text-green-600">
                                ${order.total_amount}
                              </div>
                              <div className="text-gray-500 text-xs">
                                +${order.delivery_charge} delivery
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
