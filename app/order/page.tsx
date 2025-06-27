"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Eye, Download } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  status: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  paymentMethod: string;
  vendor: string;
  outlet: string;
}

export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: "452671",
      status: "Open",
      customerName: "Touhidul Islam",
      customerEmail: "touhidul@gmail.com",
      date: "21-06-2025, 15:49",
      total: 1100.0,
      paymentMethod: "COD",
      vendor: "RFL Exclusive",
      outlet: "",
    },
  ]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (order) => order.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalAmount = filteredOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-gray-700">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Orders</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Search Options</CardTitle>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by Order ID, Customer Name, or Email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">
                      Order ID
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">
                      User Data
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">
                      Date
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">
                      Order Total
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">
                      Payment Method
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">
                      Vendor
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">
                      Outlet
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <Link
                          href={`/order-details?id=${order.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          #{order.id}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant="secondary"
                          className={getStatusColor(order.status)}
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.customerName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {order.customerEmail}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {order.date}
                      </td>
                      <td className="py-4 px-6 font-medium">
                        ৳{order.total.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {order.paymentMethod}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {order.vendor}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {order.outlet || "-"}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/order-details?id=${order.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No orders found matching your criteria.
                </p>
              </div>
            )}

            {/* Total Summary */}
            {filteredOrders.length > 0 && (
              <div className="border-t bg-gray-50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Showing {filteredOrders.length} order
                    {filteredOrders.length !== 1 ? "s" : ""}
                  </span>
                  <span className="font-medium text-gray-900">
                    Total: ৳{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
