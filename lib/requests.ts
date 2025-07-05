"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { getEndpoint } from "@/lib/endpoint";

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

export async function getRequest(
  url: keyof EndpointType,
  query: QueryParamType = queryParamDefaultValue
) {
  const pathname = query.pathname || (query.params?.slug as string);
  const endpoint = await getEndpoint(url, pathname);


  const time = new Date().getTime();
  return await api
    .get(endpoint, {
      params: {
        ...(query?.params || {}),
        time,
      },
    })
    .then((response) => {
      if (response && response.data !== undefined) {
        return response.data;
      }
      return [];
    })
    .catch(async (error) => {
      if (error?.status === 401) {
        redirect("/");
      }
      return [];
    });
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
