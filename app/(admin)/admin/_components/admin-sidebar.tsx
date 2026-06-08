"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ListTree,
  Building2,
  ShoppingCart,
  Users,
  Star,
  TicketPercent,
  PackageSearch,
  BarChart3,
  FileText,
  Settings,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePermissions } from "../_hooks/use-admin-auth";

const sidebarItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, permission: "view_dashboard" as const },
  { href: "/admin/products", label: "Products", icon: Package, permission: "manage_products" as const },
  { href: "/admin/categories", label: "Categories", icon: ListTree, permission: "manage_categories" as const },
  { href: "/admin/brands", label: "Brands", icon: Building2, permission: "manage_brands" as const },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart, permission: "manage_orders" as const },
  { href: "/admin/customers", label: "Customers", icon: Users, permission: "manage_customers" as const },
  { href: "/admin/reviews", label: "Reviews", icon: Star, permission: "manage_reviews" as const },
  { href: "/admin/coupons", label: "Coupons", icon: TicketPercent, permission: "manage_coupons" as const },
  { href: "/admin/inventory", label: "Inventory", icon: PackageSearch, permission: "manage_inventory" as const },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3, permission: "view_analytics" as const },
  { href: "/admin/reports", label: "Reports", icon: FileText, permission: "view_reports" as const },
  { href: "/admin/settings", label: "Settings", icon: Settings, permission: "manage_settings" as const },
  { href: "/admin/profile", label: "Profile", icon: UserCircle, permission: "view_dashboard" as const },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function AdminSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { can } = usePermissions();

  const filteredItems = sidebarItems.filter((item) => can(item.permission));

  const sidebarContent = (
    <div className="flex h-full flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/admin" className="flex items-center gap-2">
          <Store className="h-6 w-6 text-primary" />
          {!collapsed && (
            <span className="font-bold text-lg text-sidebar-foreground">Amart Admin</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            onToggle();
            onMobileClose();
          }}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-1">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Collapsed tooltip item */}
      {collapsed && (
        <div className="px-2 pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="w-full text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden lg:block h-screen transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={onMobileClose} />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar shadow-xl animate-in slide-in-from-left">
            <div className="flex h-16 items-center justify-end px-4 border-b border-sidebar-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMobileClose}
                className="text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
