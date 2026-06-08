import type { AdminReview } from "@/lib/admin-types";
import { mockReviews } from "@/lib/admin-mock-data";
import {
  USE_MOCK_DATA,
  apiClient,
  simulateDelay,
  mockSuccessResponse,
} from "./api-client";

const mockGetReviews = async () => {
  await simulateDelay(300);
  return mockSuccessResponse(mockReviews, "Reviews fetched successfully");
};

const mockApproveReview = async (id: number) => {
  await simulateDelay(200);
  const index = mockReviews.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Review not found");
  mockReviews[index].status = "approved";
  return mockSuccessResponse(mockReviews[index], "Review approved successfully");
};

const mockRejectReview = async (id: number) => {
  await simulateDelay(200);
  const index = mockReviews.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Review not found");
  mockReviews[index].status = "rejected";
  return mockSuccessResponse(mockReviews[index], "Review rejected successfully");
};

const mockDeleteReview = async (id: number) => {
  await simulateDelay(200);
  const index = mockReviews.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Review not found");
  mockReviews.splice(index, 1);
  return mockSuccessResponse(null, "Review deleted successfully");
};

export const getReviews = async () => {
  if (USE_MOCK_DATA) return mockGetReviews();
  const { data } = await apiClient.get("/admin/reviews/");
  return data;
};

export const approveReview = async (id: number) => {
  if (USE_MOCK_DATA) return mockApproveReview(id);
  const { data } = await apiClient.post(`/admin/reviews/${id}/approve/`);
  return data;
};

export const rejectReview = async (id: number) => {
  if (USE_MOCK_DATA) return mockRejectReview(id);
  const { data } = await apiClient.post(`/admin/reviews/${id}/reject/`);
  return data;
};

export const deleteReview = async (id: number) => {
  if (USE_MOCK_DATA) return mockDeleteReview(id);
  const { data } = await apiClient.delete(`/admin/reviews/${id}/`);
  return data;
};
