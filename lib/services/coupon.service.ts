import type { AdminCoupon, ApiCoupon, ApiResponse } from "@/lib/admin-types";
import { apiClient } from "./api-client";

// Normalize coupon from API format to UI format
const normalizeCoupon = (coupon: ApiCoupon): AdminCoupon => ({
  id: coupon.id,
  code: coupon.code,
  discount_type: coupon.discount_type,
  discount_value: coupon.discount_value,
  min_order_amount: coupon.min_order_amount ?? 0,
  max_uses: coupon.max_uses ?? 100,
  used_count: coupon.current_uses ?? 0,
  is_active: coupon.is_active ?? true,
  start_date: coupon.start_date || "",
  expiry_date: coupon.expiry_date || "",
  created_at: coupon.created_at || "",
});

export const getCoupons = async (params?: {
  search?: string;
  is_active?: boolean;
}): Promise<ApiResponse<AdminCoupon[]>> => {
  const { data } = await apiClient.get("/api/admin/coupons/", { params });
  const coupons: ApiCoupon[] = data?.data || [];
  return {
    ...data,
    data: coupons.map(normalizeCoupon),
  };
};

export const getCoupon = async (id: number): Promise<ApiResponse<AdminCoupon>> => {
  const { data } = await apiClient.get(`/api/admin/coupons/${id}/`);
  const coupon: ApiCoupon = data?.data;
  return {
    ...data,
    data: coupon ? normalizeCoupon(coupon) : undefined,
  };
};

export const createCoupon = async (couponData: Partial<AdminCoupon>) => {
  const { data } = await apiClient.post("/api/admin/coupons/", {
    code: couponData.code,
    discount_type: couponData.discount_type,
    discount_value: couponData.discount_value,
    min_order_amount: couponData.min_order_amount ?? 0,
    max_uses: couponData.max_uses ?? 100,
    is_active: couponData.is_active ?? true,
    start_date: couponData.start_date,
    expiry_date: couponData.expiry_date,
  });
  return data;
};

export const updateCoupon = async (id: number, couponData: Partial<AdminCoupon>) => {
  const { data } = await apiClient.patch(`/api/admin/coupons/${id}/`, {
    code: couponData.code,
    discount_type: couponData.discount_type,
    discount_value: couponData.discount_value,
    min_order_amount: couponData.min_order_amount,
    max_uses: couponData.max_uses,
    is_active: couponData.is_active,
    start_date: couponData.start_date,
    expiry_date: couponData.expiry_date,
  });
  return data;
};

export const deleteCoupon = async (id: number) => {
  const { data } = await apiClient.delete(`/api/admin/coupons/${id}/`);
  return data;
};
