import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest } from "./requests";
import { AnyType, EndpointType } from "./types";

export { useMutation, useQuery, useQueryClient };

export const GetQuery = (
  url: keyof EndpointType,
  query: { pathname?: string; params?: unknown } = { pathname: "", params: {} },
  enabled: boolean = true,
  initialData: AnyType = null,
  gcTime: number = 0,
) => {
  return useQuery({
    queryKey: [url, JSON.stringify(query)],
    queryFn: () => getRequest(url, query),
    enabled,
    refetchOnWindowFocus: false,
    retry: false,
    gcTime: gcTime > 0 ? gcTime : 1000 * 60 * 60,
    staleTime: gcTime > 0 ? gcTime : 1000 * 60 * 60,
    ...(initialData ? { initialData } : {}),
  });
};
