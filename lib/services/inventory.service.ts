import type { AdminInventoryItem } from "@/lib/admin-types";
import { mockInventory } from "@/lib/admin-mock-data";
import {
  USE_MOCK_DATA,
  apiClient,
  simulateDelay,
  mockSuccessResponse,
} from "./api-client";

const mockGetInventory = async () => {
  await simulateDelay(400);
  return mockSuccessResponse(mockInventory, "Inventory fetched successfully");
};

const mockGetInventoryItem = async (id: number) => {
  await simulateDelay(200);
  const item = mockInventory.find((i) => i.id === id);
  if (!item) throw new Error("Inventory item not found");
  return mockSuccessResponse(item, "Inventory item fetched");
};

const mockAdjustStock = async (productId: number, quantity: number, reason: string) => {
  await simulateDelay(300);
  const item = mockInventory.find((i) => i.product === productId);
  if (!item) throw new Error("Product not found in inventory");
  item.stock += quantity;
  item.available_stock = item.stock - item.reserved_stock;
  item.is_low_stock = item.available_stock < item.low_stock_threshold;
  item.updated_at = new Date().toISOString();
  return mockSuccessResponse(item, "Stock adjusted successfully");
};

export const getInventory = async () => {
  if (USE_MOCK_DATA) return mockGetInventory();
  const { data } = await apiClient.get("/admin/inventory/");
  return data;
};

export const getInventoryItem = async (id: number) => {
  if (USE_MOCK_DATA) return mockGetInventoryItem(id);
  const { data } = await apiClient.get(`/admin/inventory/${id}/`);
  return data;
};

export const adjustStock = async (productId: number, quantity: number, reason: string) => {
  if (USE_MOCK_DATA) return mockAdjustStock(productId, quantity, reason);
  const { data } = await apiClient.post("/admin/inventory/adjust/", {
    product_id: productId,
    quantity,
    reason,
  });
  return data;
};
