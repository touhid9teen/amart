"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import {
  getStoreSettings,
  updateStoreSettings,
  getTaxSettings,
  updateTaxSettings,
  getShippingSettings,
  updateShippingSettings,
  getPaymentSettings,
  updatePaymentSettings,
  getEmailSettings,
  updateEmailSettings,
  getNotificationSettings,
  updateNotificationSettings,
} from "@/lib/services/settings.service";
import type { StoreSettings, TaxSettings, ShippingSettings, PaymentSettings, EmailSettings, NotificationSettings } from "@/lib/admin-types";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("store");

  // Store Settings
  const { data: storeRes, isLoading: storeLoading } = useQuery({ queryKey: ["admin-settings-store"], queryFn: getStoreSettings });
  const [store, setStore] = useState<StoreSettings | null>(null);
  useEffect(() => { if (storeRes?.data && !store) setStore(storeRes.data); }, [storeRes?.data]);
  const storeMut = useMutation({
    mutationFn: () => updateStoreSettings(store || {}),
    onSuccess: () => { toast.success("Store settings saved"); },
  });

  // Tax Settings
  const { data: taxRes, isLoading: taxLoading } = useQuery({ queryKey: ["admin-settings-tax"], queryFn: getTaxSettings });
  const [tax, setTax] = useState<TaxSettings | null>(null);
  useEffect(() => { if (taxRes?.data && !tax) setTax(taxRes.data); }, [taxRes?.data]);
  const taxMut = useMutation({
    mutationFn: () => updateTaxSettings(tax || {}),
    onSuccess: () => { toast.success("Tax settings saved"); },
  });

  // Shipping Settings
  const { data: shipRes, isLoading: shipLoading } = useQuery({ queryKey: ["admin-settings-shipping"], queryFn: getShippingSettings });
  const [shipping, setShipping] = useState<ShippingSettings | null>(null);
  useEffect(() => { if (shipRes?.data && !shipping) setShipping(shipRes.data); }, [shipRes?.data]);
  const shipMut = useMutation({
    mutationFn: () => updateShippingSettings(shipping || {}),
    onSuccess: () => { toast.success("Shipping settings saved"); },
  });

  // Payment Settings
  const { data: payRes, isLoading: payLoading } = useQuery({ queryKey: ["admin-settings-payment"], queryFn: getPaymentSettings });
  const [payment, setPayment] = useState<PaymentSettings | null>(null);
  useEffect(() => { if (payRes?.data && !payment) setPayment(payRes.data); }, [payRes?.data]);
  const payMut = useMutation({
    mutationFn: () => updatePaymentSettings(payment || {}),
    onSuccess: () => { toast.success("Payment settings saved"); },
  });

  // Email Settings
  const { data: emailRes, isLoading: emailLoading } = useQuery({ queryKey: ["admin-settings-email"], queryFn: getEmailSettings });
  const [email, setEmail] = useState<EmailSettings | null>(null);
  useEffect(() => { if (emailRes?.data && !email) setEmail(emailRes.data); }, [emailRes?.data]);
  const emailMut = useMutation({
    mutationFn: () => updateEmailSettings(email || {}),
    onSuccess: () => { toast.success("Email settings saved"); },
  });

  // Notification Settings
  const { data: notifRes, isLoading: notifLoading } = useQuery({ queryKey: ["admin-settings-notifications"], queryFn: getNotificationSettings });
  const [notif, setNotif] = useState<NotificationSettings | null>(null);
  useEffect(() => { if (notifRes?.data && !notif) setNotif(notifRes.data); }, [notifRes?.data]);
  const notifMut = useMutation({
    mutationFn: () => updateNotificationSettings(notif || {}),
    onSuccess: () => { toast.success("Notification settings saved"); },
  });

  if (storeLoading || taxLoading || shipLoading || payLoading || emailLoading || notifLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Configure your store settings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Store Settings</CardTitle>
                <Button size="sm" onClick={() => storeMut.mutate()} disabled={storeMut.isPending}>
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Store Name</Label>
                  <Input value={store?.store_name || ""} onChange={(e) => setStore(prev => prev ? { ...prev, store_name: e.target.value } : null)} />
                </div>
                <div className="space-y-2">
                  <Label>Store Email</Label>
                  <Input type="email" value={store?.store_email || ""} onChange={(e) => setStore(prev => prev ? { ...prev, store_email: e.target.value } : null)} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Store Phone</Label>
                  <Input value={store?.store_phone || ""} onChange={(e) => setStore(prev => prev ? { ...prev, store_phone: e.target.value } : null)} />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Input value={store?.currency || ""} onChange={(e) => setStore(prev => prev ? { ...prev, currency: e.target.value } : null)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Store Address</Label>
                <Input value={store?.store_address || ""} onChange={(e) => setStore(prev => prev ? { ...prev, store_address: e.target.value } : null)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Input value={store?.timezone || ""} onChange={(e) => setStore(prev => prev ? { ...prev, timezone: e.target.value } : null)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Tax Settings</CardTitle>
                <Button size="sm" onClick={() => taxMut.mutate()} disabled={taxMut.isPending}>
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch
                  checked={tax?.tax_enabled ?? false}
                  onCheckedChange={(c) => setTax(prev => prev ? { ...prev, tax_enabled: c } : null)}
                />
                <Label>Enable Tax</Label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tax Rate (%)</Label>
                  <Input
                    type="number"
                    value={tax?.tax_rate || 0}
                    onChange={(e) => setTax(prev => prev ? { ...prev, tax_rate: parseFloat(e.target.value) || 0 } : null)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tax Label</Label>
                  <Input value={tax?.tax_label || ""} onChange={(e) => setTax(prev => prev ? { ...prev, tax_label: e.target.value } : null)} />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={tax?.tax_inclusive ?? false}
                  onCheckedChange={(c) => setTax(prev => prev ? { ...prev, tax_inclusive: c } : null)}
                />
                <Label>Prices include tax</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Shipping Settings</CardTitle>
                <Button size="sm" onClick={() => shipMut.mutate()} disabled={shipMut.isPending}>
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Free Shipping Min (৳)</Label>
                  <Input type="number" value={shipping?.free_shipping_min_amount || 0} onChange={(e) => setShipping(prev => prev ? { ...prev, free_shipping_min_amount: parseFloat(e.target.value) || 0 } : null)} />
                </div>
                <div className="space-y-2">
                  <Label>Standard Fee (৳)</Label>
                  <Input type="number" value={shipping?.standard_shipping_fee || 0} onChange={(e) => setShipping(prev => prev ? { ...prev, standard_shipping_fee: parseFloat(e.target.value) || 0 } : null)} />
                </div>
                <div className="space-y-2">
                  <Label>Express Fee (৳)</Label>
                  <Input type="number" value={shipping?.express_shipping_fee || 0} onChange={(e) => setShipping(prev => prev ? { ...prev, express_shipping_fee: parseFloat(e.target.value) || 0 } : null)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Payment Settings</CardTitle>
                <Button size="sm" onClick={() => payMut.mutate()} disabled={payMut.isPending}>
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch checked={payment?.cod_enabled ?? false} onCheckedChange={(c) => setPayment(prev => prev ? { ...prev, cod_enabled: c } : null)} />
                <Label>Cash on Delivery</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={payment?.bkash_enabled ?? false} onCheckedChange={(c) => setPayment(prev => prev ? { ...prev, bkash_enabled: c } : null)} />
                <Label>bKash</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch checked={payment?.nagad_enabled ?? false} onCheckedChange={(c) => setPayment(prev => prev ? { ...prev, nagad_enabled: c } : null)} />
                <Label>Nagad</Label>
              </div>
              <div className="space-y-2">
                <Label>Stripe Publishable Key</Label>
                <Input value={payment?.stripe_publishable_key || ""} onChange={(e) => setPayment(prev => prev ? { ...prev, stripe_publishable_key: e.target.value } : null)} placeholder="pk_..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Email Settings</CardTitle>
                <Button size="sm" onClick={() => emailMut.mutate()} disabled={emailMut.isPending}>
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>SMTP Host</Label>
                  <Input value={email?.smtp_host || ""} onChange={(e) => setEmail(prev => prev ? { ...prev, smtp_host: e.target.value } : null)} />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Port</Label>
                  <Input type="number" value={email?.smtp_port || 587} onChange={(e) => setEmail(prev => prev ? { ...prev, smtp_port: parseInt(e.target.value) || 587 } : null)} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>SMTP User</Label>
                  <Input value={email?.smtp_user || ""} onChange={(e) => setEmail(prev => prev ? { ...prev, smtp_user: e.target.value } : null)} />
                </div>
                <div className="space-y-2">
                  <Label>SMTP Password</Label>
                  <Input type="password" value={email?.smtp_password || ""} onChange={(e) => setEmail(prev => prev ? { ...prev, smtp_password: e.target.value } : null)} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>From Email</Label>
                  <Input type="email" value={email?.from_email || ""} onChange={(e) => setEmail(prev => prev ? { ...prev, from_email: e.target.value } : null)} />
                </div>
                <div className="space-y-2">
                  <Label>From Name</Label>
                  <Input value={email?.from_name || ""} onChange={(e) => setEmail(prev => prev ? { ...prev, from_name: e.target.value } : null)} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Notification Settings</CardTitle>
                <Button size="sm" onClick={() => notifMut.mutate()} disabled={notifMut.isPending}>
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "order_confirmation", label: "Order Confirmation" },
                { key: "order_shipped", label: "Order Shipped" },
                { key: "order_delivered", label: "Order Delivered" },
                { key: "low_stock_alert", label: "Low Stock Alert" },
                { key: "new_customer_welcome", label: "New Customer Welcome" },
                { key: "admin_new_order", label: "Admin New Order Notification" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <Label>{label}</Label>
                  <Switch
                    checked={(notif?.[key as keyof NotificationSettings] as boolean) ?? false}
                    onCheckedChange={(c) => setNotif(prev => prev ? { ...prev, [key]: c } : null)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
