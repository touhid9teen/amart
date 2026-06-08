import type { AdminCoupon } from "@/lib/admin-types";
import { apiClient } from "./api-client";

export const getCoupons = async () => {
  const { data } = await apiClient.get("/admin/coupons/");
  return data;
};

export const getCoupon = async (id: number) => {
  const { data } = await apiClient.get(`/admin/coupons/${id}/`);
  return data;
};

export const createCoupon = async (couponData: Partial<AdminCoupon>) => {
  const { data } = await apiClient.post("/admin/coupons/", couponData);
  return data;
};

export const updateCoupon = async (id: number, couponData: Partial<AdminCoupon>) => {
  const { data } = await apiClient.patch(`/admin/coupons/${id}/`, couponData);
  return data;
};

export const deleteCoupon = async (id: number) => {
  const { data } = await apiClient.delete(`/admin/coupons/${id}/`);
  return data;
};
