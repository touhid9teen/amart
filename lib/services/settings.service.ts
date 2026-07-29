import type {
  StoreSettings,
  TaxSettings,
  ShippingSettings,
  PaymentSettings,
  EmailSettings,
  NotificationSettings,
  ApiStoreSettings,
  ApiTaxSettings,
  ApiShippingSettings,
  ApiPaymentSettings,
  ApiEmailSettings,
  ApiNotificationSettings,
  ApiResponse,
} from "@/lib/admin-types";
import { apiClient } from "./api-client";

// ==============================
// Store Settings
// ==============================
const normalizeStoreSettings = (api: ApiStoreSettings): StoreSettings => ({
  store_name: api.store_name || "My Store",
  store_email: api.store_email || "",
  store_phone: api.store_phone || "",
  store_address: api.address || "",
  currency: api.currency || "BDT",
  currency_symbol: api.currency_symbol || "৳",
  timezone: api.timezone || "Asia/Dhaka",
  logo: api.logo_url || null,
  favicon: api.favicon_url || null,
});

const denormalizeStoreSettings = (ui: Partial<StoreSettings>): Partial<ApiStoreSettings> => ({
  store_name: ui.store_name,
  store_email: ui.store_email,
  store_phone: ui.store_phone,
  address: ui.store_address,
  currency: ui.currency,
  currency_symbol: ui.currency_symbol || undefined,
  timezone: ui.timezone,
  logo_url: ui.logo || undefined,
  favicon_url: ui.favicon || undefined,
});

export const getStoreSettings = async (): Promise<ApiResponse<StoreSettings>> => {
  const { data } = await apiClient.get("/admin/settings/store/");
  return {
    ...data,
    data: data?.data ? normalizeStoreSettings(data.data as ApiStoreSettings) : undefined,
  };
};

export const updateStoreSettings = async (settings: Partial<StoreSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/store/", denormalizeStoreSettings(settings));
  return data;
};

// ==============================
// Tax Settings
// ==============================
const normalizeTaxSettings = (api: ApiTaxSettings): TaxSettings => ({
  tax_enabled: api.enable_tax ?? false,
  tax_rate: api.tax_percentage ?? 0,
  tax_inclusive: api.tax_included_in_price ?? false,
  tax_label: api.tax_name || "VAT",
});

const denormalizeTaxSettings = (ui: Partial<TaxSettings>): Partial<ApiTaxSettings> => ({
  tax_percentage: ui.tax_rate,
  tax_included_in_price: ui.tax_inclusive,
  tax_name: ui.tax_label,
  enable_tax: ui.tax_enabled,
});

export const getTaxSettings = async (): Promise<ApiResponse<TaxSettings>> => {
  const { data } = await apiClient.get("/admin/settings/tax/");
  return {
    ...data,
    data: data?.data ? normalizeTaxSettings(data.data as ApiTaxSettings) : undefined,
  };
};

export const updateTaxSettings = async (settings: Partial<TaxSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/tax/", denormalizeTaxSettings(settings));
  return data;
};

// ==============================
// Shipping Settings
// ==============================
const normalizeShippingSettings = (api: ApiShippingSettings): ShippingSettings => ({
  free_shipping_min_amount: api.free_shipping_min_amount ?? 0,
  standard_shipping_fee: api.standard_shipping_charge ?? 0,
  express_shipping_fee: api.express_shipping_charge ?? 0,
  shipping_zones: api.shipping_zones || [],
});

const denormalizeShippingSettings = (ui: Partial<ShippingSettings>): Partial<ApiShippingSettings> => ({
  free_shipping_min_amount: ui.free_shipping_min_amount,
  standard_shipping_charge: ui.standard_shipping_fee,
  express_shipping_charge: ui.express_shipping_fee,
  shipping_zones: ui.shipping_zones,
});

export const getShippingSettings = async (): Promise<ApiResponse<ShippingSettings>> => {
  const { data } = await apiClient.get("/admin/settings/shipping/");
  return {
    ...data,
    data: data?.data ? normalizeShippingSettings(data.data as ApiShippingSettings) : undefined,
  };
};

export const updateShippingSettings = async (settings: Partial<ShippingSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/shipping/", denormalizeShippingSettings(settings));
  return data;
};

// ==============================
// Payment Settings
// ==============================
const normalizePaymentSettings = (api: ApiPaymentSettings): PaymentSettings => ({
  stripe_enabled: api.online_payment_enabled ?? false,
  stripe_publishable_key: "",
  cod_enabled: api.cod_enabled ?? true,
  bkash_enabled: api.bkash_enabled ?? false,
  nagad_enabled: api.nagad_enabled ?? false,
  rocket_enabled: api.rocket_enabled ?? false,
  bkash_number: api.bkash_number || "",
  nagad_number: api.nagad_number || "",
  rocket_number: api.rocket_number || "",
});

const denormalizePaymentSettings = (ui: Partial<PaymentSettings>): Partial<ApiPaymentSettings> => ({
  cod_enabled: ui.cod_enabled,
  online_payment_enabled: ui.stripe_enabled,
  bkash_enabled: ui.bkash_enabled,
  nagad_enabled: ui.nagad_enabled,
  rocket_enabled: ui.rocket_enabled,
  bkash_number: ui.bkash_number || undefined,
  nagad_number: ui.nagad_number || undefined,
  rocket_number: ui.rocket_number || undefined,
});

export const getPaymentSettings = async (): Promise<ApiResponse<PaymentSettings>> => {
  const { data } = await apiClient.get("/admin/settings/payment/");
  return {
    ...data,
    data: data?.data ? normalizePaymentSettings(data.data as ApiPaymentSettings) : undefined,
  };
};

export const updatePaymentSettings = async (settings: Partial<PaymentSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/payment/", denormalizePaymentSettings(settings));
  return data;
};

// ==============================
// Email Settings
// ==============================
const normalizeEmailSettings = (api: ApiEmailSettings): EmailSettings => ({
  smtp_host: api.smtp_host || "smtp.gmail.com",
  smtp_port: api.smtp_port ?? 587,
  smtp_user: api.smtp_username || "",
  smtp_password: api.smtp_password || "",
  from_email: api.from_email || "",
  from_name: "",
});

const denormalizeEmailSettings = (ui: Partial<EmailSettings>): Partial<ApiEmailSettings> => ({
  smtp_host: ui.smtp_host,
  smtp_port: ui.smtp_port,
  smtp_username: ui.smtp_user,
  smtp_password: ui.smtp_password,
  from_email: ui.from_email,
});

export const getEmailSettings = async (): Promise<ApiResponse<EmailSettings>> => {
  const { data } = await apiClient.get("/admin/settings/email/");
  return {
    ...data,
    data: data?.data ? normalizeEmailSettings(data.data as ApiEmailSettings) : undefined,
  };
};

export const updateEmailSettings = async (settings: Partial<EmailSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/email/", denormalizeEmailSettings(settings));
  return data;
};

// ==============================
// Notification Settings
// ==============================
const normalizeNotificationSettings = (api: ApiNotificationSettings): NotificationSettings => ({
  email_notifications: api.email_notifications ?? true,
  order_confirmation: api.order_confirmation ?? true,
  order_shipped: api.order_shipped ?? true,
  order_delivered: api.order_delivered ?? true,
  low_stock_alert: api.low_stock_alert ?? true,
  new_customer_welcome: api.new_customer_signup ?? true,
  admin_new_order: api.new_order_admin ?? true,
});

const denormalizeNotificationSettings = (ui: Partial<NotificationSettings>): Partial<ApiNotificationSettings> => ({
  email_notifications: ui.email_notifications,
  order_confirmation: ui.order_confirmation,
  order_shipped: ui.order_shipped,
  order_delivered: ui.order_delivered,
  low_stock_alert: ui.low_stock_alert,
  new_customer_signup: ui.new_customer_welcome,
  new_order_admin: ui.admin_new_order,
});

export const getNotificationSettings = async (): Promise<ApiResponse<NotificationSettings>> => {
  const { data } = await apiClient.get("/admin/settings/notification/");
  return {
    ...data,
    data: data?.data ? normalizeNotificationSettings(data.data as ApiNotificationSettings) : undefined,
  };
};

export const updateNotificationSettings = async (settings: Partial<NotificationSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/notification/", denormalizeNotificationSettings(settings));
  return data;
};
