import type { OrderStatus } from "@/lib/admin-types";
import { apiClient } from "./api-client";

export const getOrders = async () => {
  const { data } = await apiClient.get("/admin/orders/");
  return data;
};

export const getOrder = async (id: number) => {
  const { data } = await apiClient.get(`/admin/orders/${id}/`);
  return data;
};

export const updateOrderStatus = async (id: number, status: OrderStatus) => {
  const { data } = await apiClient.patch(`/admin/orders/${id}/status/`, { status });
  return data;
};
