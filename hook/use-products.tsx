import { useState, useEffect, useCallback } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";

const fetchProductsFromAPI = async (): Promise<Product[]> => {
  try {
    const response = await GlobalApi.getProducts();
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await fetchProductsFromAPI();
        setProducts(fetchedProducts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

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
