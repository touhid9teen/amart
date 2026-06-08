"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Edit,
  Eye,
  Trash2,
  Copy,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "../_components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getProducts, deleteProduct, duplicateProduct } from "@/lib/services/product.service";
import type { AdminProduct } from "@/lib/admin-types";
import type { Column } from "@/lib/admin-types";

export default function AdminProductsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: res, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-products", search],
    queryFn: () => getProducts(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted successfully");
      setDeleteId(null);
    },
    onError: () => toast.error("Failed to delete product"),
  });

  const duplicateMutation = useMutation({
    mutationFn: (id: number) => duplicateProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product duplicated successfully");
    },
    onError: () => toast.error("Failed to duplicate product"),
  });

  const products: AdminProduct[] = res?.data || [];

  const filteredProducts = search
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  const columns: Column<AdminProduct>[] = [
    {
      key: "image",
      header: "Image",
      render: (product) => (
        <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              width={40}
              height={40}
              className="object-cover h-full w-full"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
              N/A
            </div>
          )}
        </div>
      ),
    },
    { key: "name", header: "Name", sortable: true },
    { key: "sku", header: "SKU" },
    {
      key: "category",
      header: "Category",
      render: (product) => {
        const catName = typeof product.category === "object" ? product.category?.name : `Category #${product.category}`;
        return <span className="text-sm">{catName}</span>;
      },
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (product) => (
        <span className="font-medium">
          ৳{product.discount_price || product.price}
          {product.discount_price && (
            <span className="text-muted-foreground line-through ml-1 text-xs">
              ৳{product.price}
            </span>
          )}
        </span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
      render: (product) => (
        <Badge variant={product.stock > 10 ? "default" : product.stock > 0 ? "secondary" : "destructive"}>
          {product.stock}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (product) => (
        <Badge
          variant={
            product.status === "active"
              ? "default"
              : product.status === "draft"
              ? "secondary"
              : "outline"
          }
          className="capitalize"
        >
          {product.status}
        </Badge>
      ),
    },
    {
      key: "created_at",
      header: "Created",
      sortable: true,
      render: (product) => (
        <span className="text-muted-foreground text-sm">
          {new Date(product.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (product) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/admin/products/${product.id}`}>
                <Eye className="mr-2 h-4 w-4" /> View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/products/${product.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => duplicateMutation.mutate(product.id)}>
              <Copy className="mr-2 h-4 w-4" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => setDeleteId(product.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground text-sm">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/create">
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredProducts}
        isLoading={isLoading}
        isError={isError}
        searchable
        searchPlaceholder="Search by name or SKU..."
        onSearch={setSearch}
        onRefresh={refetch}
        emptyMessage="No products found. Create your first product!"
      />

      {/* Delete Confirmation */}
      <Dialog open={deleteId != null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
