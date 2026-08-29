// API Client for Admin Services
// Connects to the Django REST Framework backend

import axios from "axios";
import { getAdminToken, clearAdminSession } from "@/lib/cookie-utils";
import { API_BASE_URL } from "@/lib/config";

// Axios instance for real API calls
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = getAdminToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Use server action for token refresh
        const { adminRefreshToken } = await import("@/lib/admin-actions");
        const result = await adminRefreshToken();

        if (result.success && result.data) {
          originalRequest.headers.Authorization = `Bearer ${result.data.access_token}`;
          return apiClient(originalRequest);
        }
      } catch {
        // Refresh failed
      }

      // Clear everything and redirect to login
      clearAdminSession();
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);
