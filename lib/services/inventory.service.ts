import type { AdminInventoryItem, ApiInventoryItem, ApiInventoryLog, ApiStockAdjustment, ApiResponse } from "@/lib/admin-types";
import { apiClient } from "./api-client";

// Normalize inventory item from API format to UI format
const normalizeInventoryItem = (item: ApiInventoryItem): AdminInventoryItem => ({
  id: item.id,
  product: item.id,
  product_name: item.name || "",
  product_image: item.image || "",
  sku: item.sku || "",
  stock: item.stock ?? 0,
  reserved_stock: 0,
  available_stock: item.stock ?? 0,
  low_stock_threshold: 10,
  is_low_stock: (item.stock ?? 0) <= 10,
  updated_at: item.createdAt || "",
});

export const getInventory = async (params?: {
  low_stock?: boolean;
  search?: string;
}): Promise<ApiResponse<AdminInventoryItem[]>> => {
  const { data } = await apiClient.get("/admin/inventory/", { params });
  const items: ApiInventoryItem[] = data?.data || [];
  return {
    ...data,
    data: items.map(normalizeInventoryItem),
  };
};

export const getInventoryItem = async (id: number) => {
  const { data } = await apiClient.get(`/admin/inventory/${id}/`);
  return data;
};

export const adjustStock = async (productId: number, quantity: number, reason: string) => {
  const { data } = await apiClient.post("/admin/inventory/adjust/", {
    product_id: productId,
    quantity,
    reason,
  });
  return data;
};
