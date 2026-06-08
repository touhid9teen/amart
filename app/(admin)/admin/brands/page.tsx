"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getBrands, createBrand, updateBrand, deleteBrand } from "@/lib/services/brand.service";
import type { AdminBrand } from "@/lib/admin-types";

export default function AdminBrandsPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<AdminBrand | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", description: "", website: "" });

  const { data: res, isLoading } = useQuery({ queryKey: ["admin-brands"], queryFn: getBrands });
  const brands: AdminBrand[] = res?.data || [];

  const createMutation = useMutation({
    mutationFn: () => createBrand(formData),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-brands"] }); toast.success("Brand created"); closeModal(); },
    onError: () => toast.error("Failed to create brand"),
  });

  const updateMutation = useMutation({
    mutationFn: () => updateBrand(editingBrand!.id, formData),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-brands"] }); toast.success("Brand updated"); closeModal(); },
    onError: () => toast.error("Failed to update brand"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteBrand(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-brands"] }); toast.success("Brand deleted"); setDeleteId(null); },
    onError: () => toast.error("Failed to delete brand"),
  });

  const openCreateModal = () => {
    setEditingBrand(null);
    setFormData({ name: "", slug: "", description: "", website: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (brand: AdminBrand) => {
    setEditingBrand(brand);
    setFormData({ name: brand.name, slug: brand.slug, description: brand.description, website: brand.website || "" });
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingBrand(null); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editingBrand ? updateMutation.mutate() : createMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Brands</h1>
          <p className="text-muted-foreground text-sm">Manage product brands</p>
        </div>
        <Button onClick={openCreateModal}><Plus className="h-4 w-4 mr-2" /> Add Brand</Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : brands.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No brands found. Create your first brand.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Card key={brand.id} className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{brand.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{brand.product_count} products</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditModal(brand)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setDeleteId(brand.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{brand.description || "No description"}</p>
                {brand.website && (
                  <a href={brand.website} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 mt-2 hover:underline">
                    <ExternalLink className="h-3 w-3" /> {brand.website}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingBrand ? "Edit Brand" : "Create Brand"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} required />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://" />
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={closeModal}>Cancel</Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingBrand ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId != null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete Brand</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure? This cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
