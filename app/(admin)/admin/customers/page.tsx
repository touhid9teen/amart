"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Eye, MoreHorizontal, Ban, CheckCircle, Trash2 } from "lucide-react";
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
import { getCustomers, blockCustomer, unblockCustomer, deleteCustomer } from "@/lib/services/customer.service";
import type { AdminCustomer, Column } from "@/lib/admin-types";

export default function AdminCustomersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: res, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-customers", search],
    queryFn: () => getCustomers({ search: search || undefined }),
  });

  const blockMutation = useMutation({
    mutationFn: (id: number) => blockCustomer(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-customers"] }); toast.success("Customer blocked"); },
    onError: () => toast.error("Failed to block customer"),
  });

  const unblockMutation = useMutation({
    mutationFn: (id: number) => unblockCustomer(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-customers"] }); toast.success("Customer unblocked"); },
    onError: () => toast.error("Failed to unblock customer"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCustomer(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-customers"] }); toast.success("Customer deleted"); setDeleteId(null); },
    onError: () => toast.error("Failed to delete customer"),
  });

  const customers: AdminCustomer[] = res?.data || [];
  const filtered = search ? customers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())) : customers;

  const columns: Column<AdminCustomer>[] = [
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email", sortable: true },
    { key: "phone", header: "Phone" },
    { key: "total_orders", header: "Orders", sortable: true },
    { key: "total_spent", header: "Total Spent", sortable: true, render: (c) => `৳${c.total_spent.toLocaleString()}` },
    { key: "is_active", header: "Status", render: (c) => <Badge variant={c.is_active && !c.is_blocked ? "default" : "destructive"}>{c.is_blocked ? "Blocked" : c.is_active ? "Active" : "Inactive"}</Badge> },
    { key: "joined_at", header: "Joined", sortable: true, render: (c) => <span className="text-muted-foreground text-sm">{new Date(c.joined_at).toLocaleDateString()}</span> },
    {
      key: "actions", header: "Actions",
      render: (c) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/customers/${c.id}`}><Eye className="mr-2 h-4 w-4" /> View</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {c.is_blocked ? (
              <DropdownMenuItem onClick={() => unblockMutation.mutate(c.id)}>
                <CheckCircle className="mr-2 h-4 w-4" /> Unblock
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => blockMutation.mutate(c.id)}>
                <Ban className="mr-2 h-4 w-4" /> Block
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-destructive" onClick={() => setDeleteId(c.id)}>
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
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground text-sm">Manage your customers</p>
      </div>
      <DataTable columns={columns} data={filtered} isLoading={isLoading} isError={isError} searchable searchPlaceholder="Search by name or email..." onSearch={setSearch} onRefresh={refetch} emptyMessage="No customers found" />

      <Dialog open={deleteId != null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete Customer</DialogTitle></DialogHeader>
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
