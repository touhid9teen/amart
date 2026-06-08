import {
  mockAdminUsers,
  rolePermissions,
  type Permission,
} from "@/lib/admin-mock-data";
import type {
  AdminLoginCredentials,
  AdminLoginResponse,
  AdminUser,
  AdminRole,
} from "@/lib/admin-types";
import {
  USE_MOCK_DATA,
  apiClient,
  simulateDelay,
  mockSuccessResponse,
  mockErrorResponse,
} from "./api-client";

// ==============================
// MOCK AUTH SERVICE
// ==============================
const mockLogin = async (
  credentials: AdminLoginCredentials
): Promise<AdminLoginResponse> => {
  await simulateDelay(800);

  const user = mockAdminUsers.find((u) => u.email === credentials.email);

  if (!user || credentials.password !== "password123") {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  if (!user.is_active) {
    return {
      success: false,
      message: "Your account has been deactivated. Contact an administrator.",
    };
  }

  const tokens = {
    access_token: `mock_access_token_${user.id}_${Date.now()}`,
    refresh_token: `mock_refresh_token_${user.id}_${Date.now()}`,
  };

  return {
    success: true,
    message: "Login successful",
    data: { user, tokens },
  };
};

const mockGetProfile = async (): Promise<{
  success: boolean;
  data?: AdminUser;
  message: string;
}> => {
  await simulateDelay(300);
  // Return first admin as logged-in user
  return {
    success: true,
    message: "Profile fetched",
    data: mockAdminUsers[0],
  };
};

const mockRefreshToken = async (
  refreshToken: string
): Promise<{ success: boolean; data?: { access_token: string }; message: string }> => {
  await simulateDelay(200);
  return {
    success: true,
    message: "Token refreshed",
    data: { access_token: `mock_refreshed_token_${Date.now()}` },
  };
};

// ==============================
// EXPORTED SERVICE FUNCTIONS
// ==============================

export const login = async (
  credentials: AdminLoginCredentials
): Promise<AdminLoginResponse> => {
  if (USE_MOCK_DATA) return mockLogin(credentials);
  const { data } = await apiClient.post<AdminLoginResponse>(
    "/admin/auth/login/",
    credentials
  );
  return data;
};

export const getProfile = async (): Promise<{
  success: boolean;
  data?: AdminUser;
  message: string;
}> => {
  if (USE_MOCK_DATA) return mockGetProfile();
  const { data } = await apiClient.get("/admin/auth/profile/");
  return data;
};

export const refreshToken = async (
  refreshToken: string
): Promise<{ success: boolean; data?: { access_token: string }; message: string }> => {
  if (USE_MOCK_DATA) return mockRefreshToken(refreshToken);
  const { data } = await apiClient.post("/admin/auth/refresh/", {
    refresh: refreshToken,
  });
  return data;
};

export const logout = async (): Promise<{ success: boolean; message: string }> => {
  await simulateDelay(200);
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_refresh_token");
  localStorage.removeItem("admin_user");
  localStorage.removeItem("admin_role");
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
