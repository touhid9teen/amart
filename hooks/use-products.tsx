import { getRequest } from "@/lib/api";
import type { Product } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

const PRODUCTS_QUERY_KEY = ["products"] as const;
const EMPTY_PRODUCTS: Product[] = [];

export const useProducts = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Product[]>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: () => getRequest("getProducts"),
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const products = useMemo(() => data ?? EMPTY_PRODUCTS, [data]);

  const searchProducts = useCallback(
    (query: string): Product[] => {
      const searchTerm = query.toLowerCase();
      return products.filter((product) => {
        const name = product.name.toLowerCase();
        const categoryNames = product.categories
          .map((category) => {
            if (typeof category === "string") {
              return category.toLowerCase();
            }

            if (
              typeof category === "object" &&
              category !== null &&
              "name" in category &&
              typeof category.name === "string"
            ) {
              return category.name.toLowerCase();
            }

            return "";
          })
          .filter(Boolean);

        return (
          name.includes(searchTerm) ||
          categoryNames.some((category) => category.includes(searchTerm))
        );
      });
    },
    [products]
  );

  return {
    products,
    loading,
    error,
    searchProducts,
  };
};
