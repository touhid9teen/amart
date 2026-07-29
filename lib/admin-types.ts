// ========================================
// API Response Wrapper Types
// ========================================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  code?: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
}

// ========================================
// Admin User & Auth Types (API shapes)
// ========================================

export type AdminRole = "admin" | "superadmin";

export interface ApiAdminUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: AdminRole;
  is_active: boolean;
  date_joined: string;
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
    user: ApiAdminUser;
    tokens: AdminAuthTokens;
  };
}

// Normalized AdminUser for UI (combines first_name + last_name)
export interface AdminUser extends Omit<ApiAdminUser, 'first_name' | 'last_name' | 'date_joined'> {
  name: string;
  avatar: string | null;
  created_at: string;
}

// ========================================
// Category Types
// ========================================

export interface ApiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  parent: number | null;
  parent_name: string | null;
  image: string | null;
  image_alt: string | null;
  products_count: number;
  createdAt: string;
  updatedAt: string;
}

// Normalized AdminCategory for UI
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

// ========================================
// Brand Types
// ========================================

export interface ApiBrand {
  id: number;
  name: string;
  slug: string;
  description: string;
  website: string;
  products_count: number;
  created_at: string;
  updated_at: string;
}

// Normalized AdminBrand for UI
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

// ========================================
// Product Types
// ========================================

export interface ApiProductListItem {
  id: number;
  name: string;
  slug: string;
  mrp: number;
  sellingPice: number;
  discount_price: number | null;
  stock: number;
  sku: string | null;
  ItemQuantityType: string;
  image: string | null;
  category_names: string[];
  brand_name: string | null;
  brand: number | null;
  is_featured: boolean;
  status: 'active' | 'draft' | 'archived';
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiProductDetail extends Omit<ApiProductListItem, 'category_names' | 'brand_name'> {
  categories: { id: number; name: string }[];
  description: string;
  short_description: string;
  tags: string[];
  image_alt: string;
}

export interface ApiProductFormData {
  name: string;
  description?: string;
  short_description?: string;
  mrp: number;
  sellingPice: number;
  discount_price?: number | null;
  stock?: number;
  sku?: string;
  ItemQuantityType: string;
  image?: string;
  image_alt?: string;
  tags?: string[];
  category_ids?: number[];
  brand?: number | null;
  is_featured?: boolean;
  status?: 'active' | 'draft' | 'archived';
  is_active?: boolean;
}

// Normalized AdminProduct for UI
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
  status: 'active' | 'draft' | 'archived';
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminProductFormData {
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  price: number;
  mrp?: number;
  sellingPice?: number;
  discount_price?: number | null;
  stock?: number;
  sku?: string;
  ItemQuantityType?: string;
  category?: number;
  category_ids?: number[];
  brand?: number | null;
  tags?: string[];
  images?: string[];
  image?: string;
  status: 'active' | 'draft' | 'archived';
  is_featured?: boolean;
  is_active?: boolean;
}

// ========================================
// Order Types
// ========================================

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface ApiOrderListItem {
  id: number;
  order_id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  delivery_charge: number;
  status: OrderStatus;
  items_count: number;
  created_at: string;
}

export interface ApiOrderDetail extends ApiOrderListItem {
  items: ApiOrderItem[];
  customer: { id: number; email: string; name: string };
  address: string;
  order_notes: string | null;
  updated_at: string;
}

export interface ApiOrderItem {
  id: number;
  product: number;
  product_name: string;
  product_image: string;
  product_price: number;
  quantity: number;
}

// Normalized AdminOrder for UI
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
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string;
  shipping_address: AdminAddress;
  order_notes: string;
  created_at: string;
  updated_at: string;
}

// ========================================
// Customer Types
// ========================================

export interface ApiCustomer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_verified: boolean;
  total_orders: number;
  total_spent: number;
  date_joined: string;
  last_login: string | null;
}

export interface ApiCustomerDetail extends ApiCustomer {
  recent_orders: { id: number; total_amount: number; status: OrderStatus; created_at: string }[];
  role: 'user';
}

// Normalized AdminCustomer for UI
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

// ========================================
// Review Types
// ========================================

export interface ApiReview {
  id: number;
  product: number;
  product_name: string;
  customer_email: string;
  customer_name: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

// Normalized AdminReview for UI
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
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

// ========================================
// Coupon Types
// ========================================

export interface ApiCoupon {
  id: number;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_uses: number;
  current_uses: number;
  is_active: boolean;
  start_date: string;
  expiry_date: string;
  created_at: string;
  updated_at: string;
}

// Normalized AdminCoupon for UI
export interface AdminCoupon {
  id: number;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  max_uses: number;
  used_count: number;
  is_active: boolean;
  start_date: string;
  expiry_date: string;
  created_at: string;
}

// ========================================
// Inventory Types
// ========================================

export interface ApiInventoryItem {
  id: number;
  name: string;
  sku: string | null;
  image: string | null;
  stock: number;
  createdAt: string;
}

export interface ApiInventoryDetail extends ApiInventoryItem {
  logs: ApiInventoryLog[];
}

export interface ApiInventoryLog {
  id: number;
  quantity: number;
  reason: string;
  created_at: string;
}

export interface ApiStockAdjustment {
  product_id: number;
  product_name: string;
  new_stock: number;
  adjustment: number;
}

// Normalized AdminInventoryItem for UI
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

// ========================================
// Analytics Types
// ========================================

export interface ApiDashboardStats {
  overview: {
    total_products: number;
    total_categories: number;
    total_customers: number;
    total_orders: number;
    total_revenue: number;
  };
  today: {
    orders: number;
    revenue: number;
  };
  this_month: {
    orders: number;
    revenue: number;
  };
  orders_by_status: Record<OrderStatus, number>;
  alerts: {
    low_stock_products: number;
    pending_reviews: number;
  };
}

export interface ApiSalesTrendItem {
  date: string;
  total_orders: number;
  total_revenue: number;
  total_items: number;
}

export interface ApiTopProduct {
  id: number;
  name: string;
  total_quantity: number;
  total_revenue: number;
}

export interface ApiRevenueItem {
  date: string;
  revenue: number;
  orders: number;
}

// Normalized types for UI
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

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

// ========================================
// Settings Types
// ========================================

export interface ApiStoreSettings {
  store_name: string;
  store_email: string;
  store_phone: string;
  address: string;
  currency: string;
  currency_symbol: string;
  timezone: string;
  logo_url: string;
  favicon_url: string;
}

export interface ApiTaxSettings {
  tax_percentage: number;
  tax_included_in_price: boolean;
  tax_name: string;
  tax_id: string;
  enable_tax: boolean;
}

export interface ApiShippingSettings {
  free_shipping_min_amount: number;
  standard_shipping_charge: number;
  express_shipping_charge: number;
  estimated_delivery_days: number;
  shipping_zones: string[];
  enable_free_shipping: boolean;
}

export interface ApiPaymentSettings {
  accepted_cards: string[];
  cod_enabled: boolean;
  online_payment_enabled: boolean;
  bkash_enabled: boolean;
  nagad_enabled: boolean;
  rocket_enabled: boolean;
  bkash_number: string;
  nagad_number: string;
  rocket_number: string;
}

export interface ApiEmailSettings {
  smtp_host: string;
  smtp_port: number;
  smtp_username: string;
  smtp_password: string;
  smtp_use_tls: boolean;
  from_email: string;
  order_notification_emails: string[];
}

export interface ApiNotificationSettings {
  email_notifications: boolean;
  order_confirmation: boolean;
  order_shipped: boolean;
  order_delivered: boolean;
  new_order_admin: boolean;
  low_stock_alert: boolean;
  low_stock_threshold: number;
  new_customer_signup: boolean;
}

// Normalized types for UI
export interface StoreSettings {
  store_name: string;
  store_email: string;
  store_phone: string;
  store_address: string;
  currency: string;
  currency_symbol: string;
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
  rocket_enabled: boolean;
  bkash_number: string;
  nagad_number: string;
  rocket_number: string;
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
  email_notifications: boolean;
  order_confirmation: boolean;
  order_shipped: boolean;
  order_delivered: boolean;
  low_stock_alert: boolean;
  new_customer_welcome: boolean;
  admin_new_order: boolean;
}

// ========================================
// PERMISSION TYPES
// ========================================
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

// ========================================
// DataTable Types
// ========================================
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
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  key: string;
  value: string;
  operator?: 'eq' | 'neq' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte';
}
