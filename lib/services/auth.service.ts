import type {
  AdminLoginCredentials,
  AdminLoginResponse,
  AdminUser,
  AdminRole,
  Permission,
} from "@/lib/admin-types";
import { BASE_URL } from "@/lib/variables";
import { apiClient } from "./api-client";

// ==============================
// PERMISSIONS MAP
// ==============================
const rolePermissions: Record<string, Permission[]> = {
  admin: [
    "view_dashboard",
    "manage_products",
    "manage_categories",
    "manage_brands",
    "manage_orders",
    "manage_customers",
    "manage_reviews",
    "manage_coupons",
    "manage_inventory",
    "view_analytics",
    "view_reports",
    "manage_settings",
    "manage_staff",
  ],
  manager: [
    "view_dashboard",
    "manage_products",
    "manage_categories",
    "manage_brands",
    "manage_orders",
    "manage_customers",
    "manage_reviews",
    "manage_coupons",
    "manage_inventory",
    "view_analytics",
    "view_reports",
  ],
  staff: [
    "view_dashboard",
    "manage_products",
    "manage_categories",
    "manage_brands",
    "manage_orders",
    "view_analytics",
  ],
};

// ==============================
// AUTH SERVICE
// ==============================

export const login = async (
  credentials: AdminLoginCredentials
): Promise<AdminLoginResponse> => {
  const endpoint = `${BASE_URL.replace(/\/$/, "")}/admin/auth/login/`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  });

  let data: AdminLoginResponse;
  try {
    data = (await response.json()) as AdminLoginResponse;
  } catch {
    throw new Error("Login failed");
  }

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const getProfile = async (): Promise<{
  success: boolean;
  data?: AdminUser;
  message: string;
}> => {
  const { data } = await apiClient.get("/admin/auth/profile/");
  return data;
};

export const refreshToken = async (
  refreshToken: string
): Promise<{ success: boolean; data?: { access_token: string }; message: string }> => {
  const { data } = await apiClient.post("/admin/auth/refresh/", {
    refresh: refreshToken,
  });
  return data;
};

export const logout = async (): Promise<{ success: boolean; message: string }> => {
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_refresh_token");
  localStorage.removeItem("admin_user");
  localStorage.removeItem("admin_role");
  document.cookie = "admin_access_token=; path=/; max-age=0; SameSite=Strict";
  return { success: true, message: "Logged out successfully" };
};

// ==============================
// PERMISSION HELPERS
// ==============================
export const hasPermission = (role: AdminRole | null, permission: Permission): boolean => {
  if (!role) return false;
  const permissions = rolePermissions[role];
  return permissions?.includes(permission) ?? false;
};

export const getRolePermissions = (role: AdminRole | null): Permission[] => {
  if (!role) return [];
  return rolePermissions[role] || [];
};
