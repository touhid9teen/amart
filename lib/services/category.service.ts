import type { AdminCategory } from "@/lib/admin-types";
import { mockCategories } from "@/lib/admin-mock-data";
import {
  USE_MOCK_DATA,
  apiClient,
  simulateDelay,
  mockSuccessResponse,
} from "./api-client";

const mockGetCategories = async () => {
  await simulateDelay(300);
  return mockSuccessResponse(mockCategories, "Categories fetched successfully");
};

const mockGetCategory = async (id: number) => {
  await simulateDelay(200);
  const category = mockCategories.find((c) => c.id === id);
  if (!category) throw new Error("Category not found");
  return mockSuccessResponse(category, "Category fetched successfully");
};

const mockCreateCategory = async (data: Partial<AdminCategory>) => {
  await simulateDelay(400);
  const newCategory: AdminCategory = {
    id: mockCategories.length + 1,
    name: data.name || "",
    slug: data.slug || "",
    description: data.description || "",
    image: data.image || null,
    parent: data.parent || null,
    product_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockCategories.push(newCategory);
  return mockSuccessResponse(newCategory, "Category created successfully");
};

const mockUpdateCategory = async (id: number, data: Partial<AdminCategory>) => {
  await simulateDelay(300);
  const index = mockCategories.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Category not found");
  mockCategories[index] = { ...mockCategories[index], ...data, updated_at: new Date().toISOString() };
  return mockSuccessResponse(mockCategories[index], "Category updated successfully");
};

const mockDeleteCategory = async (id: number) => {
  await simulateDelay(300);
  const index = mockCategories.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Category not found");
  mockCategories.splice(index, 1);
  return mockSuccessResponse(null, "Category deleted successfully");
};

export const getCategories = async () => {
  if (USE_MOCK_DATA) return mockGetCategories();
  const { data } = await apiClient.get("/admin/categories/");
  return data;
};

export const getCategory = async (id: number) => {
  if (USE_MOCK_DATA) return mockGetCategory(id);
  const { data } = await apiClient.get(`/admin/categories/${id}/`);
  return data;
};

export const createCategory = async (categoryData: Partial<AdminCategory>) => {
  if (USE_MOCK_DATA) return mockCreateCategory(categoryData);
  const { data } = await apiClient.post("/admin/categories/", categoryData);
  return data;
};

export const updateCategory = async (id: number, categoryData: Partial<AdminCategory>) => {
  if (USE_MOCK_DATA) return mockUpdateCategory(id, categoryData);
  const { data } = await apiClient.patch(`/admin/categories/${id}/`, categoryData);
  return data;
};

export const deleteCategory = async (id: number) => {
  if (USE_MOCK_DATA) return mockDeleteCategory(id);
  const { data } = await apiClient.delete(`/admin/categories/${id}/`);
  return data;
};
