// Admin User & Auth Types
export type AdminRole = "admin" | "manager" | "staff";

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: AdminRole;
  avatar: string | null;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

export interface AdminAuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: AdminUser;
    tokens: AdminAuthTokens;
  };
}

// Product Types
export interface AdminProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  short_description: string;
  price: number;
  discount_price: number | null;
  stock: number;
  category: number | AdminCategory;
  brand: number | AdminBrand | null;
  tags: string[];
  images: string[];
  status: "active" | "draft" | "archived";
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminProductFormData {
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  discount_price: number | null;
  stock: number;
  sku: string;
  category: number;
  brand: number | null;
  tags: string[];
  images: string[];
  status: "active" | "draft" | "archived";
  is_featured: boolean;
}

// Category Types
export interface AdminCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  parent: number | null;
  children?: AdminCategory[];
  product_count: number;
  created_at: string;
  updated_at: string;
}

// Brand Types
export interface AdminBrand {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo: string | null;
  website: string | null;
  product_count: number;
  created_at: string;
  updated_at: string;
}

// Order Types
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface AdminOrderItem {
  id: number;
  product_name: string;
  product_id: number;
  quantity: number;
  price: number;
  image: string;
  total: number;
}

export interface AdminOrder {
  id: number;
  order_id: string;
  user: AdminCustomer | number;
  customer_name: string;
  customer_email: string;
  items: AdminOrderItem[];
  total_amount: number;
  delivery_charge: number;
  discount: number;
  status: OrderStatus;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  payment_method: string;
  shipping_address: AdminAddress;
  order_notes: string;
  created_at: string;
  updated_at: string;
}

// Customer Types
export interface AdminCustomer {
  id: number;
  email: string;
  name: string;
  phone: string;
  avatar: string | null;
  total_orders: number;
  total_spent: number;
  is_active: boolean;
  is_blocked: boolean;
  joined_at: string;
  last_order_at: string | null;
  addresses: AdminAddress[];
}

export interface AdminAddress {
  id: number;
  label: string;
  full_name: string;
  phone: string;
  street: string;
  city: string;
  area: string;
  postal_code: string;
  is_default: boolean;
}

// Review Types
export interface AdminReview {
  id: number;
  product: number;
  product_name: string;
  product_image: string;
  customer: number;
  customer_name: string;
  customer_avatar: string | null;
  rating: number;
  review: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

// Coupon Types
export interface AdminCoupon {
  id: number;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_order_amount: number;
  max_uses: number;
  used_count: number;
  is_active: boolean;
  start_date: string;
  expiry_date: string;
  created_at: string;
}

// Inventory Types
export interface AdminInventoryItem {
  id: number;
  product: number;
  product_name: string;
  product_image: string;
  sku: string;
  stock: number;
  reserved_stock: number;
  available_stock: number;
  low_stock_threshold: number;
  is_low_stock: boolean;
  updated_at: string;
}

export interface InventoryAdjustment {
  id: number;
  product: number;
  quantity_change: number;
  reason: string;
  created_at: string;
}

// Analytics Types
export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface DashboardStats {
  total_revenue: number;
  total_orders: number;
  total_customers: number;
  total_products: number;
  pending_orders: number;
  cancelled_orders: number;
  low_stock_products: number;
  revenue_growth: number;
  orders_growth: number;
  customers_growth: number;
}

export interface SalesTrend {
  month: string;
  revenue: number;
  orders: number;
  growth: number;
}

export interface TopProduct {
  id: number;
  name: string;
  image: string;
  total_sold: number;
  revenue: number;
}

// Settings Types
export interface StoreSettings {
  store_name: string;
  store_email: string;
  store_phone: string;
  store_address: string;
  currency: string;
  timezone: string;
  logo: string | null;
  favicon: string | null;
}

export interface TaxSettings {
  tax_enabled: boolean;
  tax_rate: number;
  tax_inclusive: boolean;
  tax_label: string;
}

export interface ShippingSettings {
  free_shipping_min_amount: number;
  standard_shipping_fee: number;
  express_shipping_fee: number;
  shipping_zones: string[];
}

export interface PaymentSettings {
  stripe_enabled: boolean;
  stripe_publishable_key: string;
  cod_enabled: boolean;
  bkash_enabled: boolean;
  nagad_enabled: boolean;
}

export interface EmailSettings {
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_password: string;
  from_email: string;
  from_name: string;
}

export interface NotificationSettings {
  order_confirmation: boolean;
  order_shipped: boolean;
  order_delivered: boolean;
  low_stock_alert: boolean;
  new_customer_welcome: boolean;
  admin_new_order: boolean;
}

// ==============================
// PERMISSION TYPES (moved from admin-mock-data)
// ==============================
export type Permission =
  | "view_dashboard"
  | "manage_products"
  | "manage_categories"
  | "manage_brands"
  | "manage_orders"
  | "manage_customers"
  | "manage_reviews"
  | "manage_coupons"
  | "manage_inventory"
  | "view_analytics"
  | "view_reports"
  | "manage_settings"
  | "manage_staff";

// DataTable Types
export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface PaginationMeta {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

export interface FilterConfig {
  key: string;
  value: string;
  operator?: "eq" | "neq" | "contains" | "gt" | "lt" | "gte" | "lte";
}
