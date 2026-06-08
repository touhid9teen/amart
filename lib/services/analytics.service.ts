import { apiClient } from "./api-client";

export const getDashboardStats = async () => {
  const { data } = await apiClient.get("/admin/analytics/dashboard/");
  return data;
};

export const getSalesTrend = async () => {
  const { data } = await apiClient.get("/admin/analytics/sales-trend/");
  return data;
};

export const getTopProducts = async () => {
  const { data } = await apiClient.get("/admin/analytics/top-products/");
  return data;
};

export const getRevenueData = async () => {
  const { data } = await apiClient.get("/admin/analytics/revenue/");
  return data;
};
