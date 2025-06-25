"use server";

import { getEndpoint } from "@/lib/endpoint";
import { handleError, handleSuccess } from "@/lib/request";
import axios from "axios";
import { setCookie, deleteCookie, cookies } from "next/headers";

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

// 1. Login with phone (send OTP)
export async function loginWithPhone(phone: string, countryCode: string) {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/phone-login/`;
    const response = await axios.post(endpoint, {
      country_code: countryCode,
      phone_number: phone,
    });
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

// 2. Verify OTP
export async function verifyOtpServer(
  phone: string,
  countryCode: string,
  otp: string
) {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/verify-otp/`;
    const response = await axios.post(endpoint, {
      country_code: countryCode,
      phone_number: phone,
      otp,
    });
    // Set cookies for access and refresh tokens
    if (response.data.access_token) {
      await setCookie("authToken", response.data.access_token, { path: "/" });
      if (response.data.refresh_token) {
        await setCookie("refreshToken", response.data.refresh_token, {
          path: "/",
        });
      }
    }
    // Set user id in cookie if present
    if (response.data.user_id) {
      await setCookie("authId", response.data.user_id, { path: "/" });
    }
    return handleSuccess(response);
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
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/refresh-token/`;
    const response = await axios.post(endpoint, { refresh: refreshToken });
    if (response.data.access) {
      await setCookie("authToken", response.data.access, { path: "/" });
      if (response.data.refresh) {
        await setCookie("refreshToken", response.data.refresh, { path: "/" });
      }
    }
    return handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
}

// 4. Logout
export async function logoutUserServer() {
  try {
    await deleteCookie("authToken", { path: "/" });
    await deleteCookie("refreshToken", { path: "/" });
    await deleteCookie("authId", { path: "/" });
    return { success: true };
  } catch (error) {
    return handleError(error);
  }
}
