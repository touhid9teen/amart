"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AnyType, EndpointType } from "./types";
import { getRequest } from "./requests";

export { useMutation, useQuery, useQueryClient };

export const GetQuery = (
  url: keyof EndpointType,
  query: { pathname?: string; params?: unknown } = { pathname: "", params: {} },
  enabled: boolean = true,
  initialData: AnyType = null,
  gcTime: number = 0
) => {
  return useQuery({
    queryKey: [url, JSON.stringify(query)],
    queryFn: () => getRequest(url, query),
    enabled,
    refetchOnWindowFocus: false,
    retry: false,
    gcTime,
    ...(initialData ? { initialData } : {}),
  });
};
