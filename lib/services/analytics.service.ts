import {
  mockDashboardStats,
  mockSalesTrend,
  mockTopProducts,
  mockRevenueData,
} from "@/lib/admin-mock-data";
import {
  USE_MOCK_DATA,
  apiClient,
  simulateDelay,
  mockSuccessResponse,
} from "./api-client";

const mockGetDashboardStats = async () => {
  await simulateDelay(500);
  return mockSuccessResponse(mockDashboardStats, "Dashboard stats fetched");
};

const mockGetSalesTrend = async () => {
  await simulateDelay(400);
  return mockSuccessResponse(mockSalesTrend, "Sales trend fetched");
};

const mockGetTopProducts = async () => {
  await simulateDelay(300);
  return mockSuccessResponse(mockTopProducts, "Top products fetched");
};

const mockGetRevenueData = async () => {
  await simulateDelay(400);
  return mockSuccessResponse(mockRevenueData, "Revenue data fetched");
};

export const getDashboardStats = async () => {
  if (USE_MOCK_DATA) return mockGetDashboardStats();
  const { data } = await apiClient.get("/admin/analytics/dashboard/");
  return data;
};

export const getSalesTrend = async () => {
  if (USE_MOCK_DATA) return mockGetSalesTrend();
  const { data } = await apiClient.get("/admin/analytics/sales-trend/");
  return data;
};

export const getTopProducts = async () => {
  if (USE_MOCK_DATA) return mockGetTopProducts();
  const { data } = await apiClient.get("/admin/analytics/top-products/");
  return data;
};

export const getRevenueData = async () => {
  if (USE_MOCK_DATA) return mockGetRevenueData();
  const { data } = await apiClient.get("/admin/analytics/revenue/");
  return data;
};
