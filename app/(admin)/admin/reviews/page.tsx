"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Check, X, Trash2, Star, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "../_components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getReviews, approveReview, rejectReview, deleteReview } from "@/lib/services/review.service";
import type { AdminReview, Column } from "@/lib/admin-types";

export default function AdminReviewsPage() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: res, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: getReviews,
  });

  const approveMutation = useMutation({
    mutationFn: (id: number) => approveReview(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-reviews"] }); toast.success("Review approved"); },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) => rejectReview(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-reviews"] }); toast.success("Review rejected"); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteReview(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-reviews"] }); toast.success("Review deleted"); setDeleteId(null); },
  });

  const reviews: AdminReview[] = res?.data || [];

  const columns: Column<AdminReview>[] = [
    { key: "product_name", header: "Product", sortable: true },
    { key: "customer_name", header: "Customer", sortable: true },
    {
      key: "rating",
      header: "Rating",
      sortable: true,
      render: (r) => (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
          ))}
        </div>
      ),
    },
    { key: "review", header: "Review", render: (r) => <span className="text-sm line-clamp-1 max-w-xs">{r.review}</span> },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (r) => (
        <Badge variant={r.status === "approved" ? "default" : r.status === "pending" ? "secondary" : "destructive"} className="capitalize">
          {r.status}
        </Badge>
      ),
    },
    { key: "created_at", header: "Date", sortable: true, render: (r) => <span className="text-muted-foreground text-sm">{new Date(r.created_at).toLocaleDateString()}</span> },
    {
      key: "actions", header: "Actions",
      render: (r) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {r.status === "pending" && (
              <>
                <DropdownMenuItem onClick={() => approveMutation.mutate(r.id)}>
                  <Check className="mr-2 h-4 w-4 text-emerald-600" /> Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => rejectMutation.mutate(r.id)}>
                  <X className="mr-2 h-4 w-4 text-red-600" /> Reject
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem className="text-destructive" onClick={() => setDeleteId(r.id)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground text-sm">Manage product reviews</p>
      </div>
      <DataTable columns={columns} data={reviews} isLoading={isLoading} isError={isError} onRefresh={refetch} emptyMessage="No reviews found" />

      <Dialog open={deleteId != null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete Review</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Are you sure? This cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteId && deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
