"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "../_components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getOrders, updateOrderStatus } from "@/lib/services/order.service";
import type { AdminOrder, OrderStatus, Column } from "@/lib/admin-types";
import { toast } from "sonner";

const statusVariant: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "secondary",
  processing: "default",
  shipped: "outline",
  delivered: "default",
  cancelled: "destructive",
  refunded: "destructive",
};

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: res, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => getOrders(),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Order status updated");
    },
    onError: () => toast.error("Failed to update order status"),
  });

  const orders: AdminOrder[] = res?.data || [];

  const filteredOrders = search
    ? orders.filter(
        (o) =>
          o.order_id.toLowerCase().includes(search.toLowerCase()) ||
          o.customer_name.toLowerCase().includes(search.toLowerCase())
      )
    : orders;

  const columns: Column<AdminOrder>[] = [
    { key: "order_id", header: "Order ID", sortable: true },
    {
      key: "customer_name",
      header: "Customer",
      sortable: true,
    },
    {
      key: "total_amount",
      header: "Total",
      sortable: true,
      render: (order) => <span className="font-medium">৳{order.total_amount.toLocaleString()}</span>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (order) => (
        <Badge variant={statusVariant[order.status]} className="capitalize">
          {order.status}
        </Badge>
      ),
    },
    {
      key: "payment_status",
      header: "Payment",
      render: (order) => (
        <Badge
          variant={
            order.payment_status === "paid"
              ? "default"
              : order.payment_status === "pending"
              ? "secondary"
              : "destructive"
          }
          className="capitalize"
        >
          {order.payment_status}
        </Badge>
      ),
    },
    {
      key: "created_at",
      header: "Date",
      sortable: true,
      render: (order) => (
        <span className="text-muted-foreground text-sm">
          {new Date(order.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (order) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/orders/${order.id}`}>
                <Eye className="mr-2 h-4 w-4" /> View Details
              </Link>
            </DropdownMenuItem>
            {order.status === "pending" && (
              <DropdownMenuItem onClick={() => statusMutation.mutate({ id: order.id, status: "processing" })}>
                Mark Processing
              </DropdownMenuItem>
            )}
            {order.status === "processing" && (
              <DropdownMenuItem onClick={() => statusMutation.mutate({ id: order.id, status: "shipped" })}>
                Mark Shipped
              </DropdownMenuItem>
            )}
            {order.status === "shipped" && (
              <DropdownMenuItem onClick={() => statusMutation.mutate({ id: order.id, status: "delivered" })}>
                Mark Delivered
              </DropdownMenuItem>
            )}
            {!["cancelled", "refunded", "delivered"].includes(order.status) && (
              <>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => statusMutation.mutate({ id: order.id, status: "cancelled" })}
                >
                  Cancel Order
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground text-sm">Manage customer orders</p>
      </div>

      <DataTable
        columns={columns}
        data={filteredOrders}
        isLoading={isLoading}
        isError={isError}
        searchable
        searchPlaceholder="Search by order ID or customer..."
        onSearch={setSearch}
        onRefresh={refetch}
        emptyMessage="No orders found"
      />
    </div>
  );
}
