import type { AdminCoupon } from "@/lib/admin-types";
import { mockCoupons } from "@/lib/admin-mock-data";
import {
  USE_MOCK_DATA,
  apiClient,
  simulateDelay,
  mockSuccessResponse,
} from "./api-client";

const mockGetCoupons = async () => {
  await simulateDelay(300);
  return mockSuccessResponse(mockCoupons, "Coupons fetched successfully");
};

const mockGetCoupon = async (id: number) => {
  await simulateDelay(200);
  const coupon = mockCoupons.find((c) => c.id === id);
  if (!coupon) throw new Error("Coupon not found");
  return mockSuccessResponse(coupon, "Coupon fetched successfully");
};

const mockCreateCoupon = async (data: Partial<AdminCoupon>) => {
  await simulateDelay(400);
  const newCoupon: AdminCoupon = {
    id: mockCoupons.length + 1,
    code: data.code || "",
    discount_type: data.discount_type || "percentage",
    discount_value: data.discount_value || 0,
    min_order_amount: data.min_order_amount || 0,
    max_uses: data.max_uses || 100,
    used_count: 0,
    is_active: data.is_active ?? true,
    start_date: data.start_date || new Date().toISOString(),
    expiry_date: data.expiry_date || "",
    created_at: new Date().toISOString(),
  };
  mockCoupons.push(newCoupon);
  return mockSuccessResponse(newCoupon, "Coupon created successfully");
};

const mockUpdateCoupon = async (id: number, data: Partial<AdminCoupon>) => {
  await simulateDelay(300);
  const index = mockCoupons.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Coupon not found");
  mockCoupons[index] = { ...mockCoupons[index], ...data };
  return mockSuccessResponse(mockCoupons[index], "Coupon updated successfully");
};

const mockDeleteCoupon = async (id: number) => {
  await simulateDelay(200);
  const index = mockCoupons.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Coupon not found");
  mockCoupons.splice(index, 1);
  return mockSuccessResponse(null, "Coupon deleted successfully");
};

export const getCoupons = async () => {
  if (USE_MOCK_DATA) return mockGetCoupons();
  const { data } = await apiClient.get("/admin/coupons/");
  return data;
};

export const getCoupon = async (id: number) => {
  if (USE_MOCK_DATA) return mockGetCoupon(id);
  const { data } = await apiClient.get(`/admin/coupons/${id}/`);
  return data;
};

export const createCoupon = async (couponData: Partial<AdminCoupon>) => {
  if (USE_MOCK_DATA) return mockCreateCoupon(couponData);
  const { data } = await apiClient.post("/admin/coupons/", couponData);
  return data;
};

export const updateCoupon = async (id: number, couponData: Partial<AdminCoupon>) => {
  if (USE_MOCK_DATA) return mockUpdateCoupon(id, couponData);
  const { data } = await apiClient.patch(`/admin/coupons/${id}/`, couponData);
  return data;
};

export const deleteCoupon = async (id: number) => {
  if (USE_MOCK_DATA) return mockDeleteCoupon(id);
  const { data } = await apiClient.delete(`/admin/coupons/${id}/`);
  return data;
};
