// API Client for Admin Services
// Currently using mock data. When Django REST Framework backend is ready,
// switch to real HTTP calls by toggling USE_MOCK_DATA to false.

import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export const USE_MOCK_DATA = true;

// Axios instance for future real API calls
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
      const token = localStorage.getItem("admin_access_token");
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
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("admin_refresh_token");
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/admin/auth/refresh/`, {
            refresh: refreshToken,
          });
          const newToken = res.data.access_token;
          localStorage.setItem("admin_access_token", newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        } catch {
          localStorage.removeItem("admin_access_token");
          localStorage.removeItem("admin_refresh_token");
          window.location.href = "/admin/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// Simulate network delay for mock data
export function simulateDelay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Helper to simulate API response structure
export function mockSuccessResponse<T>(data: T, message = "Success") {
  return {
    success: true,
    message,
    data,
  };
}

export function mockErrorResponse(message = "Something went wrong", code = "ERROR") {
  return {
    success: false,
    message,
    code,
    data: null,
  };
}
