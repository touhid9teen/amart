import type { AdminBrand } from "@/lib/admin-types";
import { apiClient } from "./api-client";

export const getBrands = async () => {
  const { data } = await apiClient.get("/admin/brands/");
  return data;
};

export const getBrand = async (id: number) => {
  const { data } = await apiClient.get(`/admin/brands/${id}/`);
  return data;
};

export const createBrand = async (brandData: Partial<AdminBrand>) => {
  const { data } = await apiClient.post("/admin/brands/", brandData);
  return data;
};

export const updateBrand = async (id: number, brandData: Partial<AdminBrand>) => {
  const { data } = await apiClient.patch(`/admin/brands/${id}/`, brandData);
  return data;
};

export const deleteBrand = async (id: number) => {
  const { data } = await apiClient.delete(`/admin/brands/${id}/`);
  return data;
};
