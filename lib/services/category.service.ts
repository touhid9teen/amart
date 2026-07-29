import type { AdminCategory, ApiCategory, ApiResponse } from "@/lib/admin-types";
import { apiClient } from "./api-client";

// Normalize a single category from API format to UI format
const normalizeCategory = (cat: ApiCategory): AdminCategory => ({
  id: cat.id,
  name: cat.name,
  slug: cat.slug,
  description: cat.description || "",
  image: cat.image || null,
  parent: cat.parent,
  children: [],
  product_count: cat.products_count ?? 0,
  created_at: cat.createdAt || "",
  updated_at: cat.updatedAt || "",
});

export const getCategories = async (search?: string): Promise<ApiResponse<AdminCategory[]>> => {
  const params = search ? { search } : {};
  const { data } = await apiClient.get("/admin/categories/", { params });
  const categories: ApiCategory[] = data?.data || [];
  return {
    ...data,
    data: categories.map(normalizeCategory),
  };
};

export const getCategory = async (id: number): Promise<ApiResponse<AdminCategory>> => {
  const { data } = await apiClient.get(`/admin/categories/${id}/`);
  const cat: ApiCategory = data?.data;
  return {
    ...data,
    data: cat ? normalizeCategory(cat) : undefined,
  };
};

export const createCategory = async (categoryData: Partial<AdminCategory> & { image?: string; image_alt?: string; colore?: string }) => {
  const { data } = await apiClient.post("/admin/categories/", {
    name: categoryData.name,
    description: categoryData.description,
    parent: categoryData.parent || null,
    image: categoryData.image || undefined,
    image_alt: categoryData.image_alt || undefined,
    colore: categoryData.colore || undefined,
  });
  return data;
};

export const updateCategory = async (id: number, categoryData: Partial<AdminCategory> & { image?: string; image_alt?: string; colore?: string }) => {
  const { data } = await apiClient.patch(`/admin/categories/${id}/`, {
    name: categoryData.name,
    description: categoryData.description,
    parent: categoryData.parent,
    image: categoryData.image,
    image_alt: categoryData.image_alt,
    colore: categoryData.colore,
  });
  return data;
};

export const deleteCategory = async (id: number) => {
  const { data } = await apiClient.delete(`/admin/categories/${id}/`);
  return data;
};
