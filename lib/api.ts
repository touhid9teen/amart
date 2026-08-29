"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios, { AxiosError } from "axios";
import { getEndpoint } from "@/lib/endpoint";
import { handleError } from "@/lib/response-helpers";
import type { AnyType, EndpointType, QueryParamType } from "./types";

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

export async function getRequest<T = AnyType>(
  url: keyof EndpointType,
  query: QueryParamType = queryParamDefaultValue
): Promise<T> {
  try {
    const pathname =
      query.pathname ?? (query.params?.slug ? String(query.params.slug) : "");

    const endpoint = getEndpoint(url, pathname);

    const response = await api.get(endpoint, {
      params: { ...(query?.params || {}) },
    });

    // Return the raw data directly (unwrap .data.data or .data)
    return (response.data?.data ?? response.data) as T;
  } catch (error) {
    const result = await handleError(error);
    throw new Error(result.message);
  }
}

export async function postRequest<T = AnyType>(
  url: keyof EndpointType,
  values: unknown,
  query: QueryParamType = queryParamDefaultValue,
  hasFile = false
): Promise<T> {
  try {
    const endpoint = getEndpoint(url, query.pathname);

    const response = await api.post(endpoint, values, {
      headers: {
        "Content-Type": hasFile ? "multipart/form-data" : "application/json",
      },
    });

    return (response.data?.data ?? response.data) as T;
  } catch (error) {
    if ((error as AxiosError)?.response?.status === 401) {
      redirect("/");
    }
    const result = await handleError(error);
    throw new Error(result.message);
  }
}
