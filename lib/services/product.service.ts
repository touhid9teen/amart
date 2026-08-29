import type { AdminProduct, AdminProductFormData, ApiProductListItem, ApiProductDetail, ApiResponse, ApiCategory, ApiBrand } from "@/lib/admin-types";
import { apiClient } from "./api-client";
import { API_BASE_URL } from "@/lib/config";

function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  // Already a full URL — return as-is
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Relative path — resolve against backend base URL
  const base = API_BASE_URL.endsWith("/") ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  return `${base}${url.startsWith("/") ? url : "/" + url}`;
}

// Normalize a product list item from API format to UI format
const normalizeProduct = (product: ApiProductListItem | ApiProductDetail): AdminProduct => {
  const detail = product as ApiProductDetail;
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku || "",
    description: detail.description || "",
    short_description: detail.short_description || "",
    price: product.mrp ?? product.sellingPice ?? 0,
    discount_price: product.discount_price ?? null,
    stock: product.stock ?? 0,
    category: (product as any).category_names?.[0] || (product as any).categories?.[0]?.name || `#${product.id}`,
    brand: (product as any).brand_name || (product as any).brand || null,
    tags: detail.tags || [],
    images: product.image ? [resolveImageUrl(product.image)] : [],
    status: product.status || "active",
    is_featured: product.is_featured ?? false,
    created_at: product.createdAt || "",
    updated_at: product.updatedAt || "",
  };
};

export const getProducts = async (params?: {
  search?: string;
  category_id?: number;
  brand_id?: number;
  status?: string;
  is_featured?: boolean;
  low_stock?: boolean;
}): Promise<ApiResponse<AdminProduct[]>> => {
  const { data } = await apiClient.get("/api/admin/products/", { params });
  const products: ApiProductListItem[] = data?.data || [];
  return {
    ...data,
    data: products.map(normalizeProduct),
  };
};

export const getProduct = async (id: number): Promise<ApiResponse<AdminProduct>> => {
  const { data } = await apiClient.get(`/api/admin/products/${id}/`);
  const product: ApiProductDetail = data?.data;
  if (!product) {
    return { ...data, data: undefined as any };
  }
  return {
    ...data,
    data: normalizeProduct(product),
  };
};

export const createProduct = async (productData: AdminProductFormData) => {
  // Map UI field names to API field names
  const { data } = await apiClient.post("/api/admin/products/", {
    name: productData.name,
    description: productData.description || "",
    short_description: productData.short_description || "",
    mrp: productData.mrp ?? productData.price ?? 0,
    sellingPice: productData.sellingPice ?? productData.price ?? 0,
    discount_price: productData.discount_price || null,
    stock: productData.stock ?? 0,
    sku: productData.sku || "",
    ItemQuantityType: productData.ItemQuantityType || "piece",
    image: productData.image || "",
    image_alt: productData.name,
    tags: productData.tags || [],
    category_ids: productData.category_ids ?? (productData.category ? [productData.category] : []),
    brand: productData.brand || null,
    is_featured: productData.is_featured ?? false,
    status: productData.status || "active",
    is_active: productData.is_active ?? (productData.status === "active"),
  });
  return data;
};

export const updateProduct = async (id: number, productData: Partial<AdminProductFormData>) => {
  const { data } = await apiClient.patch(`/api/admin/products/${id}/`, {
    name: productData.name,
    description: productData.description,
    short_description: productData.short_description,
    mrp: productData.mrp ?? productData.price,
    sellingPice: productData.sellingPice ?? productData.price,
    discount_price: productData.discount_price,
    stock: productData.stock,
    sku: productData.sku,
    ItemQuantityType: productData.ItemQuantityType,
    image: productData.image,
    tags: productData.tags,
    category_ids: productData.category_ids ?? (productData.category ? [productData.category] : undefined),
    brand: productData.brand,
    is_featured: productData.is_featured,
    status: productData.status,
    is_active: productData.is_active,
  });
  return data;
};

export const deleteProduct = async (id: number) => {
  const { data } = await apiClient.delete(`/api/admin/products/${id}/`);
  return data;
};

export const duplicateProduct = async (id: number) => {
  const { data } = await apiClient.post(`/api/admin/products/${id}/duplicate/`);
  return data;
};

// Fetch reference data for product forms (categories & brands)
export const getProductFormData = async () => {
  const [categoriesRes, brandsRes] = await Promise.all([
    apiClient.get("/api/admin/categories/"),
    apiClient.get("/api/admin/brands/"),
  ]);
  return {
    success: true,
    data: {
      categories: categoriesRes.data?.data || [],
      brands: brandsRes.data?.data || [],
    },
  };
};
