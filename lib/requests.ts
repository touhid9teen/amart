"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { getEndpoint } from "@/lib/endpoint";
import { AnyType, EndpointType, QueryParamType } from "./types";

const api = axios.create();

api.interceptors.request.use(async (request) => {
  const cookieStore = await cookies();
  const access = cookieStore.get("authToken")?.value;
  if (access) {
    request.headers["Authorization"] = `Bearer ${access}`;
  }
  return request;
});

const queryParamDefaultValue: QueryParamType = {
  pathname: "",
  params: {},
};

import { AxiosError } from "axios";
interface ApiResponse<T = AnyType> {
  success: boolean;
  message: string;
  data?: T;
}
export async function getRequest<T = AnyType>(
  url: keyof EndpointType,
  query: QueryParamType = queryParamDefaultValue
): Promise<ApiResponse<T>> {
  try {
    console.log("REQUEST:", url, query);

    const pathname =
      query.pathname ?? (query.params?.slug ? String(query.params.slug) : "");

    const endpoint = await getEndpoint(url, pathname);

    console.log("ENDPOINT:", endpoint);

    const response = await api.get<ApiResponse<T>>(endpoint, {
      params: { ...(query?.params || {}) },
    });

    return response.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse>;

    console.log("❌ STATUS:", err.response?.status);
    console.log("❌ DATA:", err.response?.data);

    // 🔥 Handle server error
    if (err.response?.status === 500) {
      return {
        success: false,
        message: "Server error. Please try again later.",
      };
    }

    // 🔥 Handle known API error
    if (err.response?.data) {
      return {
        success: false,
        message: err.response.data.message || "Request failed",
      };
    }

    // 🔥 Network / unknown error
    return {
      success: false,
      message: err.message || "Network error",
    };
  }
}

export async function postRequest(
  url: keyof EndpointType,
  values: unknown,
  query: QueryParamType = queryParamDefaultValue,
  hasFile = false
) {
  const endpoint = await getEndpoint(url, query.pathname);
  // const locale = await getLocale(); // Add if you have locale logic
  return await api
    .post(endpoint, values, {
      headers: {
        "Content-Type": hasFile ? "multipart/form-data" : "application/json",
        // 'Accept-Language': locale,
      },
    })
    .then((res) => res.data)
    .catch(async (error) => {
      if (error?.status === 401) {
        redirect("/");
      }
      return Promise.reject(error?.response?.data);
    });
}
