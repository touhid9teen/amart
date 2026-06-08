import type { AdminCustomer } from "@/lib/admin-types";
import { mockCustomers } from "@/lib/admin-mock-data";
import {
  USE_MOCK_DATA,
  apiClient,
  simulateDelay,
  mockSuccessResponse,
} from "./api-client";

const mockGetCustomers = async () => {
  await simulateDelay(400);
  return mockSuccessResponse([...mockCustomers], "Customers fetched successfully");
};

const mockGetCustomer = async (id: number) => {
  await simulateDelay(300);
  const customer = mockCustomers.find((c) => c.id === id);
  if (!customer) throw new Error("Customer not found");
  return mockSuccessResponse(customer, "Customer fetched successfully");
};

const mockBlockCustomer = async (id: number) => {
  await simulateDelay(300);
  const index = mockCustomers.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Customer not found");
  mockCustomers[index].is_blocked = true;
  return mockSuccessResponse(mockCustomers[index], "Customer blocked successfully");
};

const mockUnblockCustomer = async (id: number) => {
  await simulateDelay(300);
  const index = mockCustomers.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Customer not found");
  mockCustomers[index].is_blocked = false;
  return mockSuccessResponse(mockCustomers[index], "Customer unblocked successfully");
};

const mockDeleteCustomer = async (id: number) => {
  await simulateDelay(300);
  const index = mockCustomers.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Customer not found");
  mockCustomers.splice(index, 1);
  return mockSuccessResponse(null, "Customer deleted successfully");
};

export const getCustomers = async () => {
  if (USE_MOCK_DATA) return mockGetCustomers();
  const { data } = await apiClient.get("/admin/customers/");
  return data;
};

export const getCustomer = async (id: number) => {
  if (USE_MOCK_DATA) return mockGetCustomer(id);
  const { data } = await apiClient.get(`/admin/customers/${id}/`);
  return data;
};

export const blockCustomer = async (id: number) => {
  if (USE_MOCK_DATA) return mockBlockCustomer(id);
  const { data } = await apiClient.post(`/admin/customers/${id}/block/`);
  return data;
};

export const unblockCustomer = async (id: number) => {
  if (USE_MOCK_DATA) return mockUnblockCustomer(id);
  const { data } = await apiClient.post(`/admin/customers/${id}/unblock/`);
  return data;
};

export const deleteCustomer = async (id: number) => {
  if (USE_MOCK_DATA) return mockDeleteCustomer(id);
  const { data } = await apiClient.delete(`/admin/customers/${id}/`);
  return data;
};
