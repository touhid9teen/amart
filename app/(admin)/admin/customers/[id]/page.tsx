"use client";

import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Mail, Phone, MapPin, ShoppingBag, Ban, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { toast } from "sonner";
import { getCustomer, blockCustomer, unblockCustomer } from "@/lib/services/customer.service";

export default function CustomerDetailPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const customerId = Number(params.id);

  const { data: res, isLoading } = useQuery({
    queryKey: ["admin-customer", customerId],
    queryFn: () => getCustomer(customerId),
    enabled: !!customerId,
  });

  const blockMutation = useMutation({
    mutationFn: () => blockCustomer(customerId),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-customer", customerId] }); toast.success("Customer blocked"); },
  });

  const unblockMutation = useMutation({
    mutationFn: () => unblockCustomer(customerId),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-customer", customerId] }); toast.success("Customer unblocked"); },
  });

  const customer = res?.data;

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  if (!customer) return <div className="text-center py-12 text-muted-foreground">Customer not found</div>;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild><Link href="/admin/customers"><ArrowLeft className="h-5 w-5" /></Link></Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{customer.name}</h1>
            <p className="text-muted-foreground text-sm">Customer since {new Date(customer.joined_at).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {customer.is_blocked ? (
            <Button variant="outline" onClick={() => unblockMutation.mutate()}><CheckCircle className="h-4 w-4 mr-2" /> Unblock</Button>
          ) : (
            <Button variant="outline" onClick={() => blockMutation.mutate()}><Ban className="h-4 w-4 mr-2" /> Block</Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base">Contact</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />{customer.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" />{customer.phone}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base">Stats</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Orders</span><span className="font-semibold">{customer.total_orders}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Spent</span><span className="font-semibold">৳{customer.total_spent.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant={customer.is_blocked ? "destructive" : "default"}>{customer.is_blocked ? "Blocked" : "Active"}</Badge></div>
              {customer.last_order_at && <div className="flex justify-between"><span className="text-muted-foreground">Last Order</span><span>{new Date(customer.last_order_at).toLocaleDateString()}</span></div>}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {customer.addresses.length > 0 && (
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><MapPin className="h-4 w-4" /> Addresses</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {customer.addresses.map((addr) => (
                  <div key={addr.id} className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{addr.label}</span>
                      {addr.is_default && <Badge variant="secondary" className="text-xs">Default</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{addr.full_name} - {addr.phone}</p>
                    <p className="text-sm text-muted-foreground">{addr.street}, {addr.area}, {addr.city} - {addr.postal_code}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><ShoppingBag className="h-4 w-4" /> Activity Log</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Customer activity logs will be available when connected to the DRF backend.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
