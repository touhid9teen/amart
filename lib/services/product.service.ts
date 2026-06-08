import type { AdminProduct, AdminProductFormData } from "@/lib/admin-types";
import { mockProducts, mockCategories, mockBrands } from "@/lib/admin-mock-data";
import {
  USE_MOCK_DATA,
  apiClient,
  simulateDelay,
  mockSuccessResponse,
} from "./api-client";

const mockGetProducts = async () => {
  await simulateDelay(400);
  return mockSuccessResponse(mockProducts, "Products fetched successfully");
};

const mockGetProduct = async (id: number) => {
  await simulateDelay(300);
  const product = mockProducts.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  return mockSuccessResponse(product, "Product fetched successfully");
};

const mockCreateProduct = async (data: AdminProductFormData) => {
  await simulateDelay(500);
  const newProduct: AdminProduct = {
    id: mockProducts.length + 1,
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockProducts.push(newProduct);
  return mockSuccessResponse(newProduct, "Product created successfully");
};

const mockUpdateProduct = async (id: number, data: Partial<AdminProductFormData>) => {
  await simulateDelay(400);
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Product not found");
  mockProducts[index] = { ...mockProducts[index], ...data, updated_at: new Date().toISOString() };
  return mockSuccessResponse(mockProducts[index], "Product updated successfully");
};

const mockDeleteProduct = async (id: number) => {
  await simulateDelay(300);
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) throw new Error("Product not found");
  mockProducts.splice(index, 1);
  return mockSuccessResponse(null, "Product deleted successfully");
};

const mockDuplicateProduct = async (id: number) => {
  await simulateDelay(400);
  const product = mockProducts.find((p) => p.id === id);
  if (!product) throw new Error("Product not found");
  const duplicate: AdminProduct = {
    ...product,
    id: mockProducts.length + 1,
    name: `${product.name} (Copy)`,
    slug: `${product.slug}-copy-${Date.now()}`,
    sku: `${product.sku}-CPY`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockProducts.push(duplicate);
  return mockSuccessResponse(duplicate, "Product duplicated successfully");
};

// Get reference data for forms
export const getProductFormData = async () => {
  await simulateDelay(200);
  return {
    success: true,
    data: {
      categories: mockCategories,
      brands: mockBrands,
    },
  };
};

export const getProducts = async () => {
  if (USE_MOCK_DATA) return mockGetProducts();
  const { data } = await apiClient.get("/admin/products/");
  return data;
};

export const getProduct = async (id: number) => {
  if (USE_MOCK_DATA) return mockGetProduct(id);
  const { data } = await apiClient.get(`/admin/products/${id}/`);
  return data;
};

export const createProduct = async (productData: AdminProductFormData) => {
  if (USE_MOCK_DATA) return mockCreateProduct(productData);
  const { data } = await apiClient.post("/admin/products/", productData);
  return data;
};

export const updateProduct = async (id: number, productData: Partial<AdminProductFormData>) => {
  if (USE_MOCK_DATA) return mockUpdateProduct(id, productData);
  const { data } = await apiClient.patch(`/admin/products/${id}/`, productData);
  return data;
};

export const deleteProduct = async (id: number) => {
  if (USE_MOCK_DATA) return mockDeleteProduct(id);
  const { data } = await apiClient.delete(`/admin/products/${id}/`);
  return data;
};

export const duplicateProduct = async (id: number) => {
  if (USE_MOCK_DATA) return mockDuplicateProduct(id);
  const { data } = await apiClient.post(`/admin/products/${id}/duplicate/`);
  return data;
};
