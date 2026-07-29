import type { OrderStatus, AdminOrder, ApiOrderListItem, ApiOrderDetail, ApiResponse } from "@/lib/admin-types";
import { apiClient } from "./api-client";

// Normalize order list item from API format to UI format
const normalizeOrder = (order: ApiOrderListItem | ApiOrderDetail): AdminOrder => {
  const detail = order as ApiOrderDetail;
  return {
    id: order.id,
    order_id: order.order_id,
    customer_name: order.customer_name,
    customer_email: order.customer_email,
    total_amount: order.total_amount,
    delivery_charge: order.delivery_charge,
    status: order.status,
    created_at: order.created_at,
    updated_at: (order as any).updated_at || order.created_at,
    // UI-only fields with defaults
    user: (order as any).customer?.id || 0,
    items: detail.items?.map((item: any) => ({
      id: item.id,
      product_name: item.product_name,
      product_id: item.product,
      quantity: item.quantity,
      price: item.product_price || 0,
      image: item.product_image || "",
      total: (item.product_price || 0) * item.quantity,
    })) || [],
    discount: 0,
    payment_status: "pending",
    payment_method: "cod",
    shipping_address: {
      id: 0,
      label: "Default",
      full_name: order.customer_name,
      phone: "",
      street: detail.address || "",
      city: "",
      area: "",
      postal_code: "",
      is_default: true,
    },
    order_notes: detail.order_notes || "",
  };
};

export const getOrders = async (params?: {
  status?: string;
  search?: string;
  date_from?: string;
  date_to?: string;
}): Promise<ApiResponse<AdminOrder[]>> => {
  const { data } = await apiClient.get("/admin/orders/", { params });
  const orders: ApiOrderListItem[] = data?.data || [];
  return {
    ...data,
    data: orders.map(normalizeOrder),
  };
};

export const getOrder = async (id: number): Promise<ApiResponse<AdminOrder>> => {
  const { data } = await apiClient.get(`/admin/orders/${id}/`);
  const order: ApiOrderDetail = data?.data;
  return {
    ...data,
    data: order ? normalizeOrder(order) : undefined,
  };
};

export const updateOrderStatus = async (id: number, status: OrderStatus) => {
  const { data } = await apiClient.patch(`/admin/orders/${id}/status/`, { status });
  return data;
};
