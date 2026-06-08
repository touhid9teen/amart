import { apiClient } from "./api-client";

export const getCustomers = async () => {
  const { data } = await apiClient.get("/admin/customers/");
  return data;
};

export const getCustomer = async (id: number) => {
  const { data } = await apiClient.get(`/admin/customers/${id}/`);
  return data;
};

export const blockCustomer = async (id: number) => {
  const { data } = await apiClient.post(`/admin/customers/${id}/block/`);
  return data;
};

export const unblockCustomer = async (id: number) => {
  const { data } = await apiClient.post(`/admin/customers/${id}/unblock/`);
  return data;
};

export const deleteCustomer = async (id: number) => {
  const { data } = await apiClient.delete(`/admin/customers/${id}/`);
  return data;
};
