"use server";

import { getEndpoint } from "@/lib/endpoint";
import { handleError, handleSuccess } from "@/lib/request";
import { AnyType, LoginResponseType } from "@/lib/types";
import { BASE_URL } from "@/lib/variables";
import axios from "axios";
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

export async function signupWithEmail(email: string, password: string) {
  try {
    const endpoint = `${BASE_URL}auth/email-signup/`;
    const response = await axios.post(endpoint, {
      email: email,
      password: password,
    });
    console.log("#######", response);
    return response.data; // will contain { success, message, data }
  } catch (error) {
    console.log("*********", error);
    return handleError(error); // make sure this returns { success: false, message, ... }
  }
}

// 1. Login with email
export async function loginWithEmail(
  email: string,
  password: string
): Promise<LoginResponseType> {
  try {
    const endpoint = `${BASE_URL}auth/email-login/`;
    const response = await axios.post(endpoint, {
      email,
      password,
    });

    const responseData = response.data;
    if (responseData.access_token) {
      await setCookie("authToken", responseData.access_token);
      if (responseData.refresh_token) {
        await setCookie("refreshToken", responseData.refresh_token);
      }
    }
    return {
      success: responseData.success,
      message: responseData.message,
      code: responseData.code,
    };
  } catch (error: unknown) {
    let message = "Something went wrong. Please try again.";
    let code = "UNKNOWN_ERROR";
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || message;
      code = error.response?.data?.code || code;
    } else if (error instanceof Error) {
      message = error.message;
    }
    return {
      success: false,
      message,
      code,
    };
  }
}

// 2. Verify OTP
export async function verifyOtpServer(email: string, otp: string) {
  try {
    const endpoint = `${BASE_URL}auth/verify-otp/`;
    const response = await axios.post(endpoint, {
      email: email,
      otp,
    });

    const { data } = response;

    if (data.success && data.data?.access_token) {
      await setCookie("authToken", data.data.access_token);
      if (data.data.refresh_token) {
        await setCookie("refreshToken", data.data.refresh_token);
      }
      if(data.data.email){
        await setCookie("authEmail", data.data.email);
      }
      if (data.data.user_id) {
        await setCookie("authId", data.data.user_id);
      }
    }

    return data;
  } catch (error) {
    return handleError(error);
  }
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
