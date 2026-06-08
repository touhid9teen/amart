import type { AdminBrand } from "@/lib/admin-types";
import { mockBrands } from "@/lib/admin-mock-data";
import {
  USE_MOCK_DATA,
  apiClient,
  simulateDelay,
  mockSuccessResponse,
} from "./api-client";

const mockGetBrands = async () => {
  await simulateDelay(300);
  return mockSuccessResponse(mockBrands, "Brands fetched successfully");
};

const mockGetBrand = async (id: number) => {
  await simulateDelay(200);
  const brand = mockBrands.find((b) => b.id === id);
  if (!brand) throw new Error("Brand not found");
  return mockSuccessResponse(brand, "Brand fetched successfully");
};

const mockCreateBrand = async (data: Partial<AdminBrand>) => {
  await simulateDelay(400);
  const newBrand: AdminBrand = {
    id: mockBrands.length + 1,
    name: data.name || "",
    slug: data.slug || "",
    description: data.description || "",
    logo: data.logo || null,
    website: data.website || null,
    product_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockBrands.push(newBrand);
  return mockSuccessResponse(newBrand, "Brand created successfully");
};

const mockUpdateBrand = async (id: number, data: Partial<AdminBrand>) => {
  await simulateDelay(300);
  const index = mockBrands.findIndex((b) => b.id === id);
  if (index === -1) throw new Error("Brand not found");
  mockBrands[index] = { ...mockBrands[index], ...data, updated_at: new Date().toISOString() };
  return mockSuccessResponse(mockBrands[index], "Brand updated successfully");
};

const mockDeleteBrand = async (id: number) => {
  await simulateDelay(300);
  const index = mockBrands.findIndex((b) => b.id === id);
  if (index === -1) throw new Error("Brand not found");
  mockBrands.splice(index, 1);
  return mockSuccessResponse(null, "Brand deleted successfully");
};

export const getBrands = async () => {
  if (USE_MOCK_DATA) return mockGetBrands();
  const { data } = await apiClient.get("/admin/brands/");
  return data;
};

export const getBrand = async (id: number) => {
  if (USE_MOCK_DATA) return mockGetBrand(id);
  const { data } = await apiClient.get(`/admin/brands/${id}/`);
  return data;
};

export const createBrand = async (brandData: Partial<AdminBrand>) => {
  if (USE_MOCK_DATA) return mockCreateBrand(brandData);
  const { data } = await apiClient.post("/admin/brands/", brandData);
  return data;
};

export const updateBrand = async (id: number, brandData: Partial<AdminBrand>) => {
  if (USE_MOCK_DATA) return mockUpdateBrand(id, brandData);
  const { data } = await apiClient.patch(`/admin/brands/${id}/`, brandData);
  return data;
};

export const deleteBrand = async (id: number) => {
  if (USE_MOCK_DATA) return mockDeleteBrand(id);
  const { data } = await apiClient.delete(`/admin/brands/${id}/`);
  return data;
};
