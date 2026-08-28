"use server";

import { cookies } from "next/headers";
import axios from "axios";
import type {
  AdminLoginCredentials,
  AdminLoginResponse,
  ApiAdminUser,
} from "@/lib/admin-types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

// ─── Cookie helpers (server-side) ────────────

const ADMIN_TOKEN_KEY = "admin_access_token";
const ADMIN_REFRESH_KEY = "admin_refresh_token";

async function safeSetCookie(name: string, value: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
  } catch (err) {
    // Non-fatal: client-side code in cookie-utils.ts also sets the same
    // cookies via document.cookie so the middleware can still read them.
    console.warn(`[admin-actions] safeSetCookie failed for "${name}":`, err);
  }
}

async function removeCookie(name: string) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  } catch (err) {
    console.warn(`[admin-actions] removeCookie failed for "${name}":`, err);
  }
}

// ─── Admin Login ─────────────────────────────

export async function adminLogin(
  credentials: AdminLoginCredentials
): Promise<AdminLoginResponse> {
  try {
    const { data } = await axios.post<Record<string, unknown>>(
      `${API_BASE_URL}/api/admin/auth/login/`,
      credentials,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 15_000,
      }
    );

    const success =
      (data.success as boolean) ?? (data.status as string) === "success";
    const message = [
      data.message,
      data.detail,
      success ? "Login successful" : "Login failed",
    ].find((item) => typeof item === "string") as string;

    const nestedData = (data.data ?? data) as Record<string, unknown>;
    const tokens = nestedData.tokens as Record<string, string> | undefined;
    const accessToken =
      tokens?.access_token ??
      (nestedData.access_token as string) ??
      (nestedData.access as string);
    const refreshToken =
      tokens?.refresh_token ??
      (nestedData.refresh_token as string) ??
      (nestedData.refresh as string);
    const user = (nestedData.user ?? nestedData) as ApiAdminUser | undefined;

    if (success && accessToken && refreshToken && user) {
      await Promise.allSettled([
        safeSetCookie(ADMIN_TOKEN_KEY, accessToken),
        safeSetCookie(ADMIN_REFRESH_KEY, refreshToken),
      ]);

      return {
        success: true,
        message,
        data: {
          user,
          tokens: { access_token: accessToken, refresh_token: refreshToken },
        },
      };
    }

    return { success: false, message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverData = error.response?.data as Record<string, unknown> | undefined;
      const detail = serverData
        ? (serverData.detail ?? serverData.message ?? serverData.error)
        : null;

      if (typeof detail === "string") {
        return { success: false, message: detail };
      }
      if (serverData && typeof serverData === "object") {
        return JSON.parse(JSON.stringify(serverData)) as AdminLoginResponse;
      }
      if (error.code === "ECONNABORTED") {
        return {
          success: false,
          message: "Request timed out. Please check your connection.",
        };
      }
      if (!error.response) {
        return {
          success: false,
          message: "Network error. Please check your internet connection.",
        };
      }
      return {
        success: false,
        message: `Server returned status ${error.response.status ?? "unknown"}. Please try again.`,
      };
    }

    console.error("[admin-actions] adminLogin non-axios error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// ─── Admin Profile ───────────────────────────

export async function adminGetProfile(): Promise<{
  success: boolean;
  data?: ApiAdminUser;
  message: string;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_TOKEN_KEY)?.value;

    if (!token) {
      return {
        success: false,
        message: "No authentication token found.",
      };
    }

    const { data } = await axios.get(
      `${API_BASE_URL}/api/admin/auth/profile/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 15_000,
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverResponse = error.response?.data;
      if (serverResponse) {
        return serverResponse;
      }
    }
    return {
      success: false,
      message: "Failed to fetch profile.",
    };
  }
}

// ─── Admin Token Refresh ─────────────────────

export async function adminRefreshToken(): Promise<{
  success: boolean;
  data?: { access_token: string; refresh_token: string };
  message: string;
}> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(ADMIN_REFRESH_KEY)?.value;

    if (!refreshToken) {
      return {
        success: false,
        message: "No refresh token found.",
      };
    }

    const { data } = await axios.post(
      `${API_BASE_URL}/api/admin/auth/refresh/`,
      { refresh_token: refreshToken },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 15_000,
      }
    );

    if (data.success && data.data) {
      await Promise.allSettled([
        safeSetCookie(ADMIN_TOKEN_KEY, data.data.access_token),
        safeSetCookie(ADMIN_REFRESH_KEY, data.data.refresh_token),
      ]);
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverResponse = error.response?.data;
      if (serverResponse) {
        return serverResponse;
      }
    }
    return {
      success: false,
      message: "Failed to refresh token.",
    };
  }
}

// ─── Admin Logout ────────────────────────────

export async function adminLogout(): Promise<{ success: boolean; message: string }> {
  await Promise.allSettled([
    removeCookie(ADMIN_TOKEN_KEY),
    removeCookie(ADMIN_REFRESH_KEY),
  ]);
  return { success: true, message: "Logged out successfully" };
}
