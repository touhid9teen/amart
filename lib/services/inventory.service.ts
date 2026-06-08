import { apiClient } from "./api-client";

export const getInventory = async () => {
  const { data } = await apiClient.get("/admin/inventory/");
  return data;
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
