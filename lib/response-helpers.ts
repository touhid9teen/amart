"use server";

import type {
  AnyType,
  ApiSuccessResponse,
  ApiErrorResponse,
} from "@/lib/types";

// ─── Axios-style response shape we expect from the backend ───

interface AxiosResponse {
  data?: {
    message?: string;
    data?: unknown;
    code?: number | string;
    [key: string]: unknown;
  };
  status?: number;
  statusText?: string;
}

// ─── Success ──────────────────────────────────────────────────

/**
 * Format a successful API response into a standard shape.
 *
 * @param response - The raw axios response object
 * @returns A typed ApiSuccessResponse
 */
export async function handleSuccess<T = AnyType>(
  response: AxiosResponse
): Promise<ApiSuccessResponse<T>> {
  return {
    success: true,
    message: response?.data?.message,
    data: (response?.data?.data ?? response?.data) as T,
    code: response?.data?.code,
    errors: null,
  };
}

// ─── Error ────────────────────────────────────────────────────

/**
 * Format an error into a standard API error response.
 *
 * @param error - The caught error (usually an AxiosError)
 * @returns A typed ApiErrorResponse
 */
export async function handleError(
  error: AnyType
): Promise<ApiErrorResponse> {
  const err = error as {
    response?: {
      data?: {
        message?: string;
        code?: number | string;
        errors?: unknown;
      };
      status?: number;
      statusText?: string;
    };
    code?: string;
    message?: string;
  };

  // Network / timeout errors (no response from server)
  if (!err?.response) {
    if (err?.code === "ECONNABORTED") {
      return {
        success: false,
        message: "Request timed out. Please check your connection.",
        data: undefined,
        code: "TIMEOUT",
        errors: null,
      };
    }
    return {
      success: false,
      message: "Network error. Please check your internet connection.",
      data: undefined,
      code: "NETWORK_ERROR",
      errors: null,
    };
  }

  // Server returned a response with an error status
  return {
    success: false,
    message:
      err?.response?.data?.message ||
      "Something went wrong. Please try again.",
    data: err?.response?.data,
    code: err?.response?.data?.code,
    errors: err?.response?.data?.errors ?? null,
  };
}
