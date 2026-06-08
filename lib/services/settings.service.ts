import type {
  StoreSettings,
  TaxSettings,
  ShippingSettings,
  PaymentSettings,
  EmailSettings,
  NotificationSettings,
} from "@/lib/admin-types";
import { apiClient } from "./api-client";

export const getStoreSettings = async () => {
  const { data } = await apiClient.get("/admin/settings/store/");
  return data;
};

export const updateStoreSettings = async (settings: Partial<StoreSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/store/", settings);
  return data;
};

export const getTaxSettings = async () => {
  const { data } = await apiClient.get("/admin/settings/tax/");
  return data;
};

export const updateTaxSettings = async (settings: Partial<TaxSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/tax/", settings);
  return data;
};

export const getShippingSettings = async () => {
  const { data } = await apiClient.get("/admin/settings/shipping/");
  return data;
};

export const updateShippingSettings = async (settings: Partial<ShippingSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/shipping/", settings);
  return data;
};

export const getPaymentSettings = async () => {
  const { data } = await apiClient.get("/admin/settings/payment/");
  return data;
};

export const updatePaymentSettings = async (settings: Partial<PaymentSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/payment/", settings);
  return data;
};

export const getEmailSettings = async () => {
  const { data } = await apiClient.get("/admin/settings/email/");
  return data;
};

export const updateEmailSettings = async (settings: Partial<EmailSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/email/", settings);
  return data;
};

export const getNotificationSettings = async () => {
  const { data } = await apiClient.get("/admin/settings/notification/");
  return data;
};

export const updateNotificationSettings = async (settings: Partial<NotificationSettings>) => {
  const { data } = await apiClient.patch("/admin/settings/notification/", settings);
  return data;
};
