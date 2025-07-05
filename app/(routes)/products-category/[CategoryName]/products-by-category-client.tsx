"use client";

import BackButton from "@/app/_components/back-button";
import { GetQuery } from "@/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import AllProducts from "./all-products";

export default function ProductsByCategoryClient({
  categoryName,
}: {
  categoryName: string;
}) {
  const { data: productList, isLoading } = GetQuery(
    "getProductByCategory",
    { params: { slug: categoryName } },
    true,
    null
  );


  // Format category name for display
  const formattedCategoryName = categoryName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-6">
            <div className="flex items-center space-x-4">
              <BackButton />
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  {formattedCategoryName}
                </h1>
                <span className="text-sm sm:text-base text-gray-600 mt-1 block">
                  {isLoading ? (
                    <Skeleton className="h-4 w-32" />
                  ) : (
                    `${productList?.length || 0} products found`
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with proper margins */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isLoading ? (
          <ProductsSkeleton />
        ) : !productList || productList.length === 0 ? (
          <EmptyState categoryName={formattedCategoryName} />
        ) : (
          <div className="space-y-8">
            {/* Category Section */}
            <div className="space-y-4">
              <AllProducts productList={productList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Skeleton component for loading state
function ProductsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[180px]">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="aspect-square bg-gray-100 p-4">
                  <Skeleton className="w-full h-full rounded" />
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-8 w-16 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState({ categoryName }: { categoryName: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <svg
          className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
        No products found
      </h3>
      <p className="text-sm sm:text-base text-gray-600 max-w-md">
        We couldn&apos;t find any products in the{" "}
        <span className="font-medium">{categoryName}</span> category. Try
        browsing other categories or check back later.
      </p>
    </div>
  );
}
