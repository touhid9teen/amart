import type { AdminReview, ApiReview, ApiResponse } from "@/lib/admin-types";
import { apiClient } from "./api-client";

// Normalize review from API format to UI format
const normalizeReview = (review: ApiReview): AdminReview => ({
  id: review.id,
  product: review.product,
  product_name: review.product_name,
  product_image: "",
  customer: review.id,
  customer_name: review.customer_name || review.customer_email,
  customer_avatar: null,
  rating: review.rating,
  review: review.comment || "",
  status: review.status,
  created_at: review.created_at || "",
});

export const getReviews = async (params?: {
  status?: string;
  product_id?: number;
  search?: string;
}): Promise<ApiResponse<AdminReview[]>> => {
  const { data } = await apiClient.get("/admin/reviews/", { params });
  const reviews: ApiReview[] = data?.data || [];
  return {
    ...data,
    data: reviews.map(normalizeReview),
  };
};

export const approveReview = async (id: number) => {
  const { data } = await apiClient.post(`/admin/reviews/${id}/approve/`);
  return data;
};

export const rejectReview = async (id: number) => {
  const { data } = await apiClient.post(`/admin/reviews/${id}/reject/`);
  return data;
};

export const deleteReview = async (id: number) => {
  const { data } = await apiClient.delete(`/admin/reviews/${id}/`);
  return data;
};
