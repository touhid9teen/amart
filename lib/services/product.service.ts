import type { AdminProduct, AdminProductFormData } from "@/lib/admin-types";
import { apiClient } from "./api-client";

export const getProducts = async () => {
  const { data } = await apiClient.get("/admin/products/");
  return data;
};

export const getProduct = async (id: number) => {
  const { data } = await apiClient.get(`/admin/products/${id}/`);
  return data;
};

export const createProduct = async (productData: AdminProductFormData) => {
  const { data } = await apiClient.post("/admin/products/", productData);
  return data;
};

export const updateProduct = async (id: number, productData: Partial<AdminProductFormData>) => {
  const { data } = await apiClient.patch(`/admin/products/${id}/`, productData);
  return data;
};

export const deleteProduct = async (id: number) => {
  const { data } = await apiClient.delete(`/admin/products/${id}/`);
  return data;
};

export const duplicateProduct = async (id: number) => {
  const { data } = await apiClient.post(`/admin/products/${id}/duplicate/`);
  return data;
};

// Fetch reference data for product forms (categories & brands)
export const getProductFormData = async () => {
  const [categoriesRes, brandsRes] = await Promise.all([
    apiClient.get("/admin/categories/"),
    apiClient.get("/admin/brands/"),
  ]);
  return {
    success: true,
    data: {
      categories: categoriesRes.data?.data || [],
      brands: brandsRes.data?.data || [],
    },
  };
};
