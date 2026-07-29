import type { AdminCustomer, ApiCustomer, ApiCustomerDetail, ApiResponse } from "@/lib/admin-types";
import { apiClient } from "./api-client";

// Normalize customer from API format to UI format
const normalizeCustomer = (customer: ApiCustomer | ApiCustomerDetail): AdminCustomer => {
  const detail = customer as ApiCustomerDetail;
  return {
    id: customer.id as any, // API uses UUID string
    email: customer.email,
    name: `${customer.first_name || ""} ${customer.last_name || ""}`.trim() || customer.email,
    phone: "",
    avatar: null,
    total_orders: customer.total_orders ?? 0,
    total_spent: customer.total_spent ?? 0,
    is_active: customer.is_active ?? true,
    is_blocked: !customer.is_active,
    joined_at: customer.date_joined || "",
    last_order_at: detail.recent_orders?.[0]?.created_at || null,
    addresses: [],
  };
};

export const getCustomers = async (search?: string): Promise<ApiResponse<AdminCustomer[]>> => {
  const params = search ? { search } : {};
  const { data } = await apiClient.get("/admin/customers/", { params });
  const customers: ApiCustomer[] = data?.data || [];
  return {
    ...data,
    data: customers.map(normalizeCustomer),
  };
};

export const getCustomer = async (id: number | string): Promise<ApiResponse<AdminCustomer>> => {
  const { data } = await apiClient.get(`/admin/customers/${id}/`);
  const customer: ApiCustomerDetail = data?.data;
  if (!customer) {
    return { ...data, data: undefined as any };
  }
  return {
    ...data,
    data: normalizeCustomer(customer),
  };
};

export const blockCustomer = async (id: number | string) => {
  const { data } = await apiClient.post(`/admin/customers/${id}/block/`);
  return data;
};

export const unblockCustomer = async (id: number | string) => {
  const { data } = await apiClient.post(`/admin/customers/${id}/unblock/`);
  return data;
};

export const deleteCustomer = async (id: number | string) => {
  const { data } = await apiClient.delete(`/admin/customers/${id}/`);
  return data;
};
