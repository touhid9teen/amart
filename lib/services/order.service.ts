import type { AdminOrder, OrderStatus } from "@/lib/admin-types";
import { mockOrders } from "@/lib/admin-mock-data";
import {
  USE_MOCK_DATA,
  apiClient,
  simulateDelay,
  mockSuccessResponse,
  mockErrorResponse,
} from "./api-client";

const mockGetOrders = async () => {
  await simulateDelay(400);
  return mockSuccessResponse(mockOrders, "Orders fetched successfully");
};

const mockGetOrder = async (id: number) => {
  await simulateDelay(300);
  const order = mockOrders.find((o) => o.id === id);
  if (!order) throw new Error("Order not found");
  return mockSuccessResponse(order, "Order fetched successfully");
};

const mockUpdateOrderStatus = async (id: number, status: OrderStatus) => {
  await simulateDelay(300);
  const index = mockOrders.findIndex((o) => o.id === id);
  if (index === -1) throw new Error("Order not found");
  mockOrders[index] = { ...mockOrders[index], status, updated_at: new Date().toISOString() };
  return mockSuccessResponse(mockOrders[index], "Order status updated successfully");
};

export const getOrders = async () => {
  if (USE_MOCK_DATA) return mockGetOrders();
  const { data } = await apiClient.get("/admin/orders/");
  return data;
};

export const getOrder = async (id: number) => {
  if (USE_MOCK_DATA) return mockGetOrder(id);
  const { data } = await apiClient.get(`/admin/orders/${id}/`);
  return data;
};

export const updateOrderStatus = async (id: number, status: OrderStatus) => {
  if (USE_MOCK_DATA) return mockUpdateOrderStatus(id, status);
  const { data } = await apiClient.patch(`/admin/orders/${id}/`, { status });
  return data;
};
