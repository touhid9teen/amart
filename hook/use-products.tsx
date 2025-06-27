import { useCallback } from "react";
import { GetQuery } from "@/lib/queries";

export const useProducts = () => {
  const {
    data: products = [],
    isLoading: loading,
    error,
  } = GetQuery("getProducts", {}, true, null, Infinity) as {
    data: Product[];
    isLoading: boolean;
    error: any;
  };

  const searchProducts = useCallback(
    (query: string): Product[] => {
      const searchTerm = query.toLowerCase();
      return products.filter((product) => {
        const name = product.name.toLowerCase();
        const category = product.categories?.[0]?.name?.toLowerCase() || "";
        return name.includes(searchTerm) || category.includes(searchTerm);
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
