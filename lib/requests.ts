"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
// import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getEndpoint } from "@/lib/endpoint";
// import { logout, setCookies } from "@/app/(auth)/actions"; // Uncomment and implement if needed

const api = axios.create();

api.interceptors.request.use(async (request) => {
  const cookieStore = await cookies();
  const access = cookieStore.get("authToken")?.value;
  if (access) {
    request.headers["Authorization"] = `Bearer ${access}`;
  }
  return request;
});

// const refreshAuthLogic = async () => {
//   // Implement refresh logic if needed
//   // await setCookies(response) and update failedRequest headers
//   // await logout() on error
// };

// createAuthRefreshInterceptor(api, refreshAuthLogic);

const queryParamDefaultValue = {
  pathname: "",
  params: {},
};

export async function getRequest(
  url: keyof EndpointType,
  query: QueryParamType = queryParamDefaultValue
) {
  const endpoint = await getEndpoint(url, query.pathname);
  const time = new Date().getTime();
  return await api
    .get(endpoint, {
      params: {
        ...(query?.params || {}),
        time,
      },
      // headers: { 'Accept-Language': locale },
    })
    .then((response) => response?.data)
    .catch(async (error) => {
      if (error?.status === 401) {
        redirect("/");
      }
      return Promise.reject(error?.response?.data);
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
