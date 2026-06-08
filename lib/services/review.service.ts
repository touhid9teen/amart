import { apiClient } from "./api-client";

export const getReviews = async () => {
  const { data } = await apiClient.get("/admin/reviews/");
  return data;
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
