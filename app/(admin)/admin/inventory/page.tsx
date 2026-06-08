"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Loader2, PackagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "../_components/data-table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { getInventory, adjustStock } from "@/lib/services/inventory.service";
import type { AdminInventoryItem, Column } from "@/lib/admin-types";

export default function AdminInventoryPage() {
  const queryClient = useQueryClient();
  const [adjustProduct, setAdjustProduct] = useState<{ id: number; product: number; name: string } | null>(null);
  const [adjustQty, setAdjustQty] = useState(0);
  const [adjustReason, setAdjustReason] = useState("");

  const { data: res, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-inventory"],
    queryFn: getInventory,
  });

  const adjustMutation = useMutation({
    mutationFn: () => adjustStock(adjustProduct!.product, adjustQty, adjustReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inventory"] });
      toast.success("Stock adjusted");
      setAdjustProduct(null);
      setAdjustQty(0);
      setAdjustReason("");
    },
    onError: () => toast.error("Failed to adjust stock"),
  });

  const inventory: AdminInventoryItem[] = res?.data || [];

  const columns: Column<AdminInventoryItem>[] = [
    { key: "product_name", header: "Product", sortable: true },
    { key: "sku", header: "SKU" },
    {
      key: "stock",
      header: "In Stock",
      sortable: true,
      render: (item) => (
        <span className={`font-medium ${item.is_low_stock ? "text-destructive" : ""}`}>
          {item.stock}
        </span>
      ),
    },
    {
      key: "reserved_stock",
      header: "Reserved",
      render: (item) => <span className="text-muted-foreground">{item.reserved_stock}</span>,
    },
    {
      key: "available_stock",
      header: "Available",
      sortable: true,
      render: (item) => (
        <span className={`font-medium ${item.is_low_stock ? "text-amber-600" : "text-emerald-600"}`}>
          {item.available_stock}
        </span>
      ),
    },
    {
      key: "is_low_stock",
      header: "Status",
      render: (item) =>
        item.is_low_stock ? (
          <Badge variant="destructive" className="flex items-center gap-1 w-fit">
            <AlertTriangle className="h-3 w-3" /> Low Stock
          </Badge>
        ) : (
          <Badge variant="default">In Stock</Badge>
        ),
    },
    {
      key: "updated_at",
      header: "Last Updated",
      render: (item) => (
        <span className="text-muted-foreground text-sm">
          {new Date(item.updated_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (item) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setAdjustProduct({
              id: item.id,
              product: item.product,
              name: item.product_name,
            })
          }
        >
          <PackagePlus className="h-4 w-4 mr-1" /> Adjust
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground text-sm">Track and manage product stock levels</p>
      </div>

      <DataTable
        columns={columns}
        data={inventory}
        isLoading={isLoading}
        isError={isError}
        onRefresh={refetch}
        emptyMessage="No inventory data found"
      />

      <Dialog open={adjustProduct != null} onOpenChange={(o) => !o && setAdjustProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm font-medium">{adjustProduct?.name}</p>
            <div className="space-y-2">
              <Label>Quantity Change</Label>
              <Input
                type="number"
                value={adjustQty || ""}
                onChange={(e) => setAdjustQty(parseInt(e.target.value) || 0)}
                placeholder="Positive to add, negative to remove"
              />
              <p className="text-xs text-muted-foreground">
                Use positive numbers to add stock, negative to remove.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Reason</Label>
              <Textarea
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                placeholder="e.g. New shipment received, damaged item, etc."
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustProduct(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => adjustMutation.mutate()}
              disabled={adjustMutation.isPending || adjustQty === 0}
            >
              {adjustMutation.isPending ? "Adjusting..." : "Save Adjustment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
