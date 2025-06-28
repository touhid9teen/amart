"use server";

interface ApiResponse {
  data?: {
    message?: string;
    data?: unknown;
    code?: number | string;
    [key: string]: unknown;
  };
  status?: number;
  statusText?: string;
  [key: string]: unknown;
}

export async function handleSuccess(response: ApiResponse) {
  return {
    success: true,
    message: response?.data?.message,
    data: response?.data?.data || response?.data || response,
    code: response?.data?.code,
    status: response?.status,
    statusText: response?.statusText,
    errors: null,
  };
}

export async function handleError(error: unknown) {
  const err = error as { response?: { data?: { message?: string; code?: number | string; errors?: unknown }; status?: number; statusText?: string } };
  return {
    success: false,
    message:
      err?.response?.data?.message ||
      "Something went wrong. Please try again.",
    data: err?.response?.data,
    code: err?.response?.data?.code,
    status: err?.response?.status,
    statusText: err?.response?.statusText,
    errors: err?.response?.data?.errors,
  };
}
