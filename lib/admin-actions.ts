"use server";

import { cookies } from "next/headers";
import axios from "axios";
import type {
  AdminLoginCredentials,
  AdminLoginResponse,
  ApiAdminUser,
} from "@/lib/admin-types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://amart-backend-wpqx.onrender.com";

type ServerActionResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

function toPlainResponse<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// ─── Cookie helpers (server-side) ────────────

const ADMIN_TOKEN_KEY = "admin_access_token";
const ADMIN_REFRESH_KEY = "admin_refresh_token";

async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

async function removeCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

// ─── Admin Login ─────────────────────────────

export async function adminLogin(
  credentials: AdminLoginCredentials
): Promise<AdminLoginResponse> {
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/admin/auth/login/`,
      credentials,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 15_000,
      }
    );

    // Handle plain axios response (may or may not be AdminLoginResponse-shaped)
    const result = data as Record<string, unknown>;

    // Backend may return success at the top level or inside a wrapper
    const success = result.success ?? result.status === "success";
    const message =
      (typeof result.message === "string" && result.message) ||
      (typeof result.detail === "string" && result.detail) ||
      (success ? "Login successful" : "Login failed");

    // Tokens may be nested under data.tokens, data.access, or at top level
    const nestedData = (result.data ?? result) as Record<string, unknown>;
    const tokens =
      (nestedData.tokens as Record<string, string> | undefined) ?? null;
    const accessToken =
      tokens?.access_token ??
      (nestedData.access_token as string | undefined) ??
      (nestedData.access as string | undefined);
    const refreshToken =
      tokens?.refresh_token ??
      (nestedData.refresh_token as string | undefined) ??
      (nestedData.refresh as string | undefined);

    // User may be nested under data.user, data.profile, or at top level
    const user = (nestedData.user ?? nestedData) as ApiAdminUser | undefined;

    if (success && accessToken && refreshToken && user) {
      // Set httpOnly cookies so the middleware can read them
      await Promise.all([
        setCookie(ADMIN_TOKEN_KEY, accessToken),
        setCookie(ADMIN_REFRESH_KEY, refreshToken),
      ]);

      return {
        success: true,
        message,
        data: {
          user,
          tokens: {
            access_token: accessToken,
            refresh_token: refreshToken,
          },
        },
      };
    }

    // Credentials were wrong or backend returned an error payload
    return {
      success: false,
      message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const serverData = error.response?.data;

      // Try to extract a meaningful message from the backend error
      const detail =
        (serverData as Record<string, unknown>)?.detail ??
        (serverData as Record<string, unknown>)?.message ??
        (serverData as Record<string, unknown>)?.error ??
        null;

      if (detail && typeof detail === "string") {
        return { success: false, message: detail };
      }

      // If the server returned a response body, forward it so the client can
      // surface whatever message the API provided.
      if (serverData && typeof serverData === "object") {
        return toPlainResponse(serverData) as AdminLoginResponse;
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
        message: `Server returned status ${status ?? "unknown"}. Please try again.`,
      };
    }

    // Non-axios error (e.g. JSON.parse, runtime error)
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
      await Promise.all([
        setCookie(ADMIN_TOKEN_KEY, data.data.access_token),
        setCookie(ADMIN_REFRESH_KEY, data.data.refresh_token),
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
  await Promise.all([
    removeCookie(ADMIN_TOKEN_KEY),
    removeCookie(ADMIN_REFRESH_KEY),
  ]);
  return { success: true, message: "Logged out successfully" };
}
