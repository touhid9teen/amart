import type { AdminBrand, ApiBrand, ApiResponse } from "@/lib/admin-types";
import { apiClient } from "./api-client";

// Normalize a single brand from API format to UI format
const normalizeBrand = (brand: ApiBrand): AdminBrand => ({
  id: brand.id,
  name: brand.name,
  slug: brand.slug,
  description: brand.description || "",
  logo: null, // API doesn't have a logo field in the docs
  website: brand.website || null,
  product_count: brand.products_count ?? 0,
  created_at: brand.created_at || "",
  updated_at: brand.updated_at || "",
});

export const getBrands = async (search?: string): Promise<ApiResponse<AdminBrand[]>> => {
  const params = search ? { search } : {};
  const { data } = await apiClient.get("/api/admin/brands/", { params });
  const brands: ApiBrand[] = data?.data || [];
  return {
    ...data,
    data: brands.map(normalizeBrand),
  };
};

export const getBrand = async (id: number): Promise<ApiResponse<AdminBrand>> => {
  const { data } = await apiClient.get(`/api/admin/brands/${id}/`);
  const brand: ApiBrand = data?.data;
  return {
    ...data,
    data: brand ? normalizeBrand(brand) : undefined,
  };
};

export const createBrand = async (brandData: Partial<AdminBrand>) => {
  const { data } = await apiClient.post("/api/admin/brands/", {
    name: brandData.name,
    description: brandData.description || "",
    website: brandData.website || "",
  });
  return data;
};

export const updateBrand = async (id: number, brandData: Partial<AdminBrand>) => {
  const { data } = await apiClient.patch(`/api/admin/brands/${id}/`, {
    name: brandData.name,
    description: brandData.description,
    website: brandData.website,
  });
  return data;
};

export const deleteBrand = async (id: number) => {
  const { data } = await apiClient.delete(`/api/admin/brands/${id}/`);
  return data;
};
