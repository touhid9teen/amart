"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Download, FileText, FileSpreadsheet, Loader2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getSalesTrend, getRevenueData } from "@/lib/services/analytics.service";
import { getOrders } from "@/lib/services/order.service";
import { getProducts } from "@/lib/services/product.service";
import { getCustomers } from "@/lib/services/customer.service";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  if (data.length === 0) {
    toast.error("No data to export");
    return;
  }
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => String(row[h] ?? "")).join(",")
    ),
  ].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success(`${filename}.csv downloaded`);
};

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState("sales");

  const { data: salesRes, isLoading: salesLoading } = useQuery({
    queryKey: ["admin-sales-trend"],
    queryFn: getSalesTrend,
  });

  const { data: orderRes, isLoading: orderLoading } = useQuery({
    queryKey: ["admin-orders-report"],
    queryFn: getOrders,
  });

  const { data: productRes, isLoading: prodLoading } = useQuery({
    queryKey: ["admin-products-report"],
    queryFn: getProducts,
  });

  const { data: custRes, isLoading: custLoading } = useQuery({
    queryKey: ["admin-customers-report"],
    queryFn: getCustomers,
  });

  const salesData = salesRes?.data || [];
  const orders = orderRes?.data || [];
  const products = productRes?.data || [];
  const customers = custRes?.data || [];

  const handleExport = (type: string, format: "csv" | "excel" | "pdf") => {
    let data: Record<string, unknown>[] = [];
    let filename = "";

    switch (type) {
      case "sales":
        data = salesData;
        filename = "sales-report";
        break;
      case "orders":
        data = orders.map((o: { order_id: unknown; customer_name: unknown; total_amount: unknown; status: unknown; payment_status: unknown; created_at: string }) => ({
          "Order ID": o.order_id,
          Customer: o.customer_name,
          Total: o.total_amount,
          Status: o.status,
          Payment: o.payment_status,
          Date: new Date(o.created_at).toLocaleDateString(),
        }));
        filename = "orders-report";
        break;
      case "products":
        data = products.map((p: { name: unknown; sku: unknown; price: unknown; stock: unknown; status: unknown }) => ({
          Name: p.name,
          SKU: p.sku,
          Price: p.price,
          Stock: p.stock,
          Status: p.status,
        }));
        filename = "products-report";
        break;
      case "customers":
        data = customers.map((c: { name: unknown; email: unknown; phone: unknown; total_orders: unknown; total_spent: unknown }) => ({
          Name: c.name,
          Email: c.email,
          Phone: c.phone,
          Orders: c.total_orders,
          "Total Spent": c.total_spent,
        }));
        filename = "customers-report";
        break;
    }

    if (format === "csv") {
      exportToCSV(data, filename);
    } else {
      toast.info(`${format.toUpperCase()} export coming with DRF backend integration`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground text-sm">Generate and export business reports</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sales">Sales Report</TabsTrigger>
          <TabsTrigger value="orders">Orders Report</TabsTrigger>
          <TabsTrigger value="products">Products Report</TabsTrigger>
          <TabsTrigger value="customers">Customers Report</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Sales Report</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExport("sales", "csv")}>
                    <FileSpreadsheet className="h-4 w-4 mr-2" /> CSV
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("sales", "excel")}>
                    <FileDown className="h-4 w-4 mr-2" /> Excel
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("sales", "pdf")}>
                    <FileText className="h-4 w-4 mr-2" /> PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {salesLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
              ) : (
                <>
                  <div className="h-72 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                        <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="rounded-md border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Month</th>
                          <th className="text-right p-3 font-medium">Revenue</th>
                          <th className="text-right p-3 font-medium">Orders</th>
                          <th className="text-right p-3 font-medium">Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesData.map((row: { month: string; revenue: number; orders: number; growth: number }) => (
                          <tr key={row.month} className="border-t">
                            <td className="p-3">{row.month}</td>
                            <td className="p-3 text-right font-medium">৳{row.revenue.toLocaleString()}</td>
                            <td className="p-3 text-right">{row.orders}</td>
                            <td className="p-3 text-right">
                              <Badge variant={row.growth >= 0 ? "default" : "destructive"}>
                                {row.growth >= 0 ? "+" : ""}{row.growth}%
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Orders Report</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExport("orders", "csv")}><FileSpreadsheet className="h-4 w-4 mr-2" /> CSV</Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("orders", "excel")}><FileDown className="h-4 w-4 mr-2" /> Excel</Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("orders", "pdf")}><FileText className="h-4 w-4 mr-2" /> PDF</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {orderLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Order ID</th>
                        <th className="text-left p-3 font-medium">Customer</th>
                        <th className="text-right p-3 font-medium">Total</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o: { order_id: string; customer_name: string; total_amount: number; status: string; created_at: string }) => (
                        <tr key={o.order_id} className="border-t">
                          <td className="p-3 font-medium">{o.order_id}</td>
                          <td className="p-3">{o.customer_name}</td>
                          <td className="p-3 text-right">৳{o.total_amount.toLocaleString()}</td>
                          <td className="p-3"><Badge className="capitalize">{o.status}</Badge></td>
                          <td className="p-3 text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Products Report</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExport("products", "csv")}><FileSpreadsheet className="h-4 w-4 mr-2" /> CSV</Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("products", "excel")}><FileDown className="h-4 w-4 mr-2" /> Excel</Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("products", "pdf")}><FileText className="h-4 w-4 mr-2" /> PDF</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {prodLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">SKU</th>
                        <th className="text-right p-3 font-medium">Price</th>
                        <th className="text-right p-3 font-medium">Stock</th>
                        <th className="text-left p-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p: { name: string; sku: string; price: number; stock: number; status: string }) => (
                        <tr key={p.sku} className="border-t">
                          <td className="p-3 font-medium">{p.name}</td>
                          <td className="p-3 text-muted-foreground">{p.sku}</td>
                          <td className="p-3 text-right">৳{p.price}</td>
                          <td className="p-3 text-right">{p.stock}</td>
                          <td className="p-3"><Badge className="capitalize">{p.status}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Customers Report</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExport("customers", "csv")}><FileSpreadsheet className="h-4 w-4 mr-2" /> CSV</Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("customers", "excel")}><FileDown className="h-4 w-4 mr-2" /> Excel</Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("customers", "pdf")}><FileText className="h-4 w-4 mr-2" /> PDF</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {custLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">Email</th>
                        <th className="text-left p-3 font-medium">Phone</th>
                        <th className="text-right p-3 font-medium">Orders</th>
                        <th className="text-right p-3 font-medium">Total Spent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c: { email: string; name: string; phone: string; total_orders: number; total_spent: number }) => (
                        <tr key={c.email} className="border-t">
                          <td className="p-3 font-medium">{c.name}</td>
                          <td className="p-3 text-muted-foreground">{c.email}</td>
                          <td className="p-3 text-muted-foreground">{c.phone}</td>
                          <td className="p-3 text-right">{c.total_orders}</td>
                          <td className="p-3 text-right">৳{c.total_spent.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
