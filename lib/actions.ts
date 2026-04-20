"use server";

import { getEndpoint } from "@/lib/endpoint";
import { handleError, handleSuccess } from "@/lib/request";
import {
  AnyType,
  LoginCredentials,
  LoginResponse,
  OtpVerifyCredentials,
  OtpVerifyResponse,
  SignupCredentials,
  SignupResponse,
} from "@/lib/types";
import { BASE_URL } from "@/lib/variables";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

// 1. Get all cart items

export async function getCartItems(jwt: string) {
  try {
    const endpoint = await getEndpoint("getCartItems");
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    // return response;
    return { ...(await handleSuccess(response)), data: response };
  } catch (error) {
    // return error;
    return handleError(error);
  }
}

// 2. Remove one item from cart
export async function removeOneFromCart(jwt: string, itemId: number) {
  try {
    // Convert itemId to string if required by getEndpoint
    const endpoint = await getEndpoint(`removeCartItem`, String(itemId));
    const response = await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

// 3. Remove all items from cart
export async function removeAllFromCart(jwt: string) {
  try {
    const endpoint = await getEndpoint("removeAllCartItems");
    const response = await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

// 4. Add item to cart
export async function addToCart(data: AnyType, jwt: string) {
  try {
    const endpoint = await getEndpoint("addToCart");
    const response = await axios.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

// AUTH SERVER ACTIONS

const SIGNUP_ENDPOINT = `${BASE_URL}/auth/email-signup/`;

export async function signupWithEmail(
  credentials: SignupCredentials,
): Promise<SignupResponse> {
  console.log("ppppppppppppppppp", credentials);
  try {
    const { data } = await axios.post<SignupResponse>(
      SIGNUP_ENDPOINT,
      credentials,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10_000,
      },
    );
    console.log("ppppppppppppppppp", data);
    return data;
  } catch (error) {
    return resolveSignupError(error);
  }
}

function resolveSignupError(error: unknown): SignupResponse {
  if (axios.isAxiosError(error)) {
    const serverResponse = error.response?.data as SignupResponse | undefined;

    // Server returned a structured error response
    if (serverResponse?.code) {
      return {
        success: false,
        code: serverResponse.code,
        message: serverResponse.message ?? "Signup failed. Please try again.",
      };
    }

    if (error.code === "ECONNABORTED") {
      return {
        success: false,
        code: "SIGNUP_TIMEOUT",
        message: "Request timed out. Please check your connection.",
      };
    }

    if (!error.response) {
      return {
        success: false,
        code: "SIGNUP_NETWORK_ERROR",
        message: "Network error. Please check your internet connection.",
      };
    }
  }

  return {
    success: false,
    code: "SIGNUP_UNKNOWN_ERROR",
    message: "Something went wrong. Please try again.",
  };
}

// 1. Login with email
const ACCESS_TOKEN_COOKIE = "authToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

export async function loginWithEmail(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  try {
    const endpoint = `${BASE_URL}auth/email-login/`;
    const { data } = await axios.post<LoginResponse>(endpoint, credentials, {
      headers: { "Content-Type": "application/json" },
      timeout: 10_000, // 10s timeout
    });

    if (data.success && data.data) {
      await Promise.all([
        setCookie(ACCESS_TOKEN_COOKIE, data.data.access_token),
        setCookie(REFRESH_TOKEN_COOKIE, data.data.refresh_token),
      ]);
    }

    return data;
  } catch (error) {
    return resolveLoginError(error);
  }
}

function resolveLoginError(error: unknown): LoginResponse {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<LoginResponse>;
    const serverResponse = axiosError.response?.data;

    // Server returned a structured error response
    if (serverResponse?.code) {
      return {
        success: false,
        code: serverResponse.code,
        message: serverResponse.message ?? "Login failed. Please try again.",
      };
    }

    // Network-level errors
    if (axiosError.code === "ECONNABORTED") {
      return {
        success: false,
        code: "AUTH_TIMEOUT",
        message: "Request timed out. Please check your connection.",
      };
    }
    if (!axiosError.response) {
      return {
        success: false,
        code: "AUTH_NETWORK_ERROR",
        message: "Network error. Please check your internet connection.",
      };
    }
  }

  return {
    success: false,
    code: "AUTH_UNKNOWN_ERROR",
    message: "Something went wrong. Please try again.",
  };
}

const OTP_VERIFY_ENDPOINT = `${BASE_URL}/auth/verify-otp/`;

export async function verifyOtpServer(
  credentials: OtpVerifyCredentials,
): Promise<OtpVerifyResponse> {
  try {
    const { data } = await axios.post<OtpVerifyResponse>(
      OTP_VERIFY_ENDPOINT,
      credentials,
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10_000,
      },
    );

    return data;
  } catch (error) {
    return resolveOtpError(error);
  }
}

function resolveOtpError(error: unknown): OtpVerifyResponse {
  if (axios.isAxiosError(error)) {
    const serverResponse = error.response?.data as
      | OtpVerifyResponse
      | undefined;

    if (serverResponse?.code) {
      return {
        success: false,
        code: serverResponse.code,
        message:
          serverResponse.message ??
          "OTP verification failed. Please try again.",
      };
    }

    if (error.code === "ECONNABORTED") {
      return {
        success: false,
        code: "OTP_TIMEOUT",
        message: "Request timed out. Please check your connection.",
      };
    }

    if (!error.response) {
      return {
        success: false,
        code: "OTP_NETWORK_ERROR",
        message: "Network error. Please check your internet connection.",
      };
    }
  }

  return {
    success: false,
    code: "OTP_UNKNOWN_ERROR",
    message: "Something went wrong. Please try again.",
  };
}

// 3. Refresh Auth Token
export async function refreshAuthTokenServer() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (!refreshToken) throw new Error("No refresh token");
    const endpoint = `${BASE_URL}auth/refresh-token/`;
    const response = await axios.post(endpoint, { refresh: refreshToken });
    if (response.data.access_token) {
      await setCookie("authToken", response.data.access_token);
      if (response.data.refresh_token) {
        await setCookie("refreshToken", response.data.refresh_token);
      }
    }
    return response;
  } catch (error) {
    return handleError(error);
  }
}

// Cookie management functions
export async function setCookie(key: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
}

// 4. Logout
export async function logoutUserServer() {
  try {
    const cookieStore = await cookies();
    cookieStore.set("authToken", "");
    cookieStore.set("refreshToken", "");
    cookieStore.set("authId", "");
    return { success: true };
  } catch (error) {
    return handleError(error);
  }
}

// Get order by ID
export async function getOrderById(orderId: string, authToken: string) {
  const baseUrl = BASE_URL;
  const headers: Record<string, string> = {};
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  const res = await axios.get(`${baseUrl}detail/orders/${orderId}/`, {
    headers,
  });
  return res.data;
}

// Get all products (server action)
export async function getProductsServer() {
  try {
    const endpoint = await getEndpoint("getProducts");
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

// Get all categories (server action)
export async function getCategoryListServer() {
  try {
    const endpoint = await getEndpoint("getCategoryList");
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
}

// Submit Order (server action)
export async function submitOrderServer(orderData: AnyType) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      throw new Error("Authentication required. Please login again.");
    }

    const res = await axios.post(`${BASE_URL}detail/orders/`, orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return handleSuccess(res);
  } catch (error) {
    return handleError(error);
  }
}
