import type {
  DashboardStats,
  SalesTrend,
  TopProduct,
  RevenueData,
  ApiDashboardStats,
  ApiSalesTrendItem,
  ApiTopProduct,
  ApiRevenueItem,
  ApiResponse,
} from "@/lib/admin-types";
import { apiClient } from "./api-client";

// Normalize dashboard stats from API format to UI format
const normalizeDashboardStats = (api: ApiDashboardStats): DashboardStats => ({
  total_revenue: api.overview?.total_revenue ?? 0,
  total_orders: api.overview?.total_orders ?? 0,
  total_customers: api.overview?.total_customers ?? 0,
  total_products: api.overview?.total_products ?? 0,
  pending_orders: api.orders_by_status?.pending ?? 0,
  cancelled_orders: api.orders_by_status?.cancelled ?? 0,
  low_stock_products: api.alerts?.low_stock_products ?? 0,
  revenue_growth: 0, // Not directly available from API
  orders_growth: 0,
  customers_growth: 0,
});

// Normalize sales trend item from API format to UI format
const normalizeSalesTrend = (item: ApiSalesTrendItem): SalesTrend => ({
  month: item.date,
  revenue: item.total_revenue ?? 0,
  orders: item.total_orders ?? 0,
  growth: 0,
});

// Normalize top product from API format to UI format
const normalizeTopProduct = (item: ApiTopProduct): TopProduct => ({
  id: item.id,
  name: item.name,
  image: "",
  total_sold: item.total_quantity ?? 0,
  revenue: item.total_revenue ?? 0,
});

export const getDashboardStats = async (): Promise<ApiResponse<DashboardStats>> => {
  const { data } = await apiClient.get("/admin/analytics/dashboard/");
  const apiStats: ApiDashboardStats = data?.data;
  if (!apiStats) {
    return { success: false, message: "No data", data: undefined as any };
  }
  return {
    ...data,
    data: normalizeDashboardStats(apiStats),
  };
};

export const getSalesTrend = async (days: number = 30): Promise<ApiResponse<SalesTrend[]>> => {
  const { data } = await apiClient.get("/admin/analytics/sales-trend/", { params: { days } });
  const items: ApiSalesTrendItem[] = data?.data || [];
  return {
    ...data,
    data: items.map(normalizeSalesTrend),
  };
};

export const getTopProducts = async (limit: number = 10, days: number = 30): Promise<ApiResponse<TopProduct[]>> => {
  const { data } = await apiClient.get("/admin/analytics/top-products/", { params: { limit, days } });
  const items: ApiTopProduct[] = data?.data || [];
  return {
    ...data,
    data: items.map(normalizeTopProduct),
  };
};

export const getRevenueData = async (months: number = 12): Promise<ApiResponse<RevenueData[]>> => {
  const { data } = await apiClient.get("/admin/analytics/revenue/", { params: { months } });
  const items: ApiRevenueItem[] = data?.data || [];
  return {
    ...data,
    data: items.map((item: ApiRevenueItem) => ({
      date: item.date,
      revenue: item.revenue ?? 0,
      orders: item.orders ?? 0,
    })),
  };
};
