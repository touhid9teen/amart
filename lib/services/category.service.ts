import type { AdminCategory } from "@/lib/admin-types";
import { apiClient } from "./api-client";

export const getCategories = async () => {
  const { data } = await apiClient.get("/admin/categories/");
  return data;
};

export const getCategory = async (id: number) => {
  const { data } = await apiClient.get(`/admin/categories/${id}/`);
  return data;
};

export const createCategory = async (categoryData: Partial<AdminCategory>) => {
  const { data } = await apiClient.post("/admin/categories/", categoryData);
  return data;
};

export const updateCategory = async (id: number, categoryData: Partial<AdminCategory>) => {
  const { data } = await apiClient.patch(`/admin/categories/${id}/`, categoryData);
  return data;
};

export const deleteCategory = async (id: number) => {
  const { data } = await apiClient.delete(`/admin/categories/${id}/`);
  return data;
};
