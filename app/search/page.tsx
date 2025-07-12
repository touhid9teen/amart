"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Search } from "lucide-react";
import { useProducts } from "@/hook/use-products";
import Products from "../_components/product/products";
import BackButton from "../_components/back-button";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { loading, error, searchProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!query || loading) return;

    setSearchLoading(true);

    const timer = setTimeout(() => {
      const result = searchProducts(query);
      setFilteredProducts(result);
      setSearchLoading(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [query, searchProducts, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-6">
            <div className="flex items-center space-x-4">
              <BackButton />
            </div>
          </div>
        </div>
      </div>
      {query ? (
        <div className="px-4 md:px-10 max-w-7xl mx-auto">
          <h1 className="font-extrabold text-gray-800 mb-4">
            Showing results for &quot;{query}&quot;
          </h1>

          {searchLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <Products productList={filteredProducts} />
          ) : (
            <p className="text-center text-gray-500 py-20">
              No results found for &quot;{query}&quot;
            </p>
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Start Searching
          </h2>
          <p className="text-gray-500">Enter a search term to find products</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
