import {
  mockStoreSettings,
  mockTaxSettings,
  mockShippingSettings,
  mockPaymentSettings,
  mockEmailSettings,
  mockNotificationSettings,
} from "@/lib/admin-mock-data";
import type {
  StoreSettings,
  TaxSettings,
  ShippingSettings,
  PaymentSettings,
  EmailSettings,
  NotificationSettings,
} from "@/lib/admin-types";
import {
  USE_MOCK_DATA,
  apiClient,
  simulateDelay,
  mockSuccessResponse,
} from "./api-client";

export const getStoreSettings = async () => {
  await simulateDelay(300);
  if (USE_MOCK_DATA) return mockSuccessResponse(mockStoreSettings);
  const { data } = await apiClient.get("/admin/settings/store/");
  return data;
};

export const updateStoreSettings = async (settings: Partial<StoreSettings>) => {
  await simulateDelay(400);
  Object.assign(mockStoreSettings, settings);
  return mockSuccessResponse(mockStoreSettings, "Store settings updated");
};

export const getTaxSettings = async () => {
  await simulateDelay(200);
  if (USE_MOCK_DATA) return mockSuccessResponse(mockTaxSettings);
  const { data } = await apiClient.get("/admin/settings/tax/");
  return data;
};

export const updateTaxSettings = async (settings: Partial<TaxSettings>) => {
  await simulateDelay(300);
  Object.assign(mockTaxSettings, settings);
  return mockSuccessResponse(mockTaxSettings, "Tax settings updated");
};

export const getShippingSettings = async () => {
  await simulateDelay(200);
  if (USE_MOCK_DATA) return mockSuccessResponse(mockShippingSettings);
  const { data } = await apiClient.get("/admin/settings/shipping/");
  return data;
};

export const updateShippingSettings = async (settings: Partial<ShippingSettings>) => {
  await simulateDelay(300);
  Object.assign(mockShippingSettings, settings);
  return mockSuccessResponse(mockShippingSettings, "Shipping settings updated");
};

export const getPaymentSettings = async () => {
  await simulateDelay(200);
  if (USE_MOCK_DATA) return mockSuccessResponse(mockPaymentSettings);
  const { data } = await apiClient.get("/admin/settings/payment/");
  return data;
};

export const updatePaymentSettings = async (settings: Partial<PaymentSettings>) => {
  await simulateDelay(300);
  Object.assign(mockPaymentSettings, settings);
  return mockSuccessResponse(mockPaymentSettings, "Payment settings updated");
};

export const getEmailSettings = async () => {
  await simulateDelay(200);
  if (USE_MOCK_DATA) return mockSuccessResponse(mockEmailSettings);
  const { data } = await apiClient.get("/admin/settings/email/");
  return data;
};

export const updateEmailSettings = async (settings: Partial<EmailSettings>) => {
  await simulateDelay(300);
  Object.assign(mockEmailSettings, settings);
  return mockSuccessResponse(mockEmailSettings, "Email settings updated");
};

export const getNotificationSettings = async () => {
  await simulateDelay(200);
  if (USE_MOCK_DATA) return mockSuccessResponse(mockNotificationSettings);
  const { data } = await apiClient.get("/admin/settings/notifications/");
  return data;
};

export const updateNotificationSettings = async (settings: Partial<NotificationSettings>) => {
  await simulateDelay(300);
  Object.assign(mockNotificationSettings, settings);
  return mockSuccessResponse(mockNotificationSettings, "Notification settings updated");
};
