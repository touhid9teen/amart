"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductItem from "./productItem";
import ProductModal from "./product-modal";
import { slugify } from "@/app/_utils/slugify";
import Link from "next/link";
import type { Product } from "@/lib/types";

interface ProductsProps {
  productList: Product[];
  isLoading?: boolean;
}

function groupProductsByCategory(
  products: Product[]
): Record<string, Product[]> {
  const grouped: Record<string, Product[]> = {};

  products.forEach((product) => {
    (product.categories as string[] | undefined)?.forEach((category) => {
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
    });
  });

  return grouped;
}

export default function Products({
  productList,
  isLoading = false,
}: ProductsProps) {
  const [groupedProducts, setGroupedProducts] = useState<[string, Product[]][]>(
    []
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollStates, setScrollStates] = useState<
    Record<string, { showLeft: boolean; showRight: boolean }>
  >({});
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (productList && productList.length > 0) {
      const grouped = groupProductsByCategory(productList);
      setGroupedProducts(Object.entries(grouped));
    }
  }, [productList]);

  const checkScrollButtons = (category: string) => {
    const container = scrollRefs.current[category];
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setScrollStates((prev) => ({
        ...prev,
        [category]: {
          showLeft: scrollLeft > 0,
          showRight: scrollLeft < scrollWidth - clientWidth - 10,
        },
      }));
    }
  };

  const handleScroll = (category: string, direction: "left" | "right") => {
    const container = scrollRefs.current[category];
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      // Check buttons after scroll animation
      setTimeout(() => checkScrollButtons(category), 300);
    }
  };

  // Initialize scroll states when products are loaded
  useEffect(() => {
    groupedProducts.forEach(([category]) => {
      setTimeout(() => checkScrollButtons(category), 100);
    });
  }, [groupedProducts]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (!Array.isArray(productList) || productList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <div className="w-16 h-16 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-sm text-gray-600">
          Please check back later for available products.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12 bg-white py-4 sm:py-6 lg:py-10">
      {groupedProducts.map(([category, products]) => (
        <div key={category} className="space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Category Header - Responsive */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold lg:font-bold text-gray-900  pr-4 line-clamp-2">
                {category}
              </h2>
              <Link
                href={`/products-category/${slugify(category)}`}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-primary font-bold lg:font-extrabold hover:underline transition-all duration-200 hover:text-primary/80 flex-shrink-0"
              >
                See All
              </Link>
            </div>
          </div>

          {/* Products Container - Responsive */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative group">
              {/* Left Navigation Button - Only show if can scroll left */}
              {scrollStates[category]?.showLeft && (
                <button
                  type="button"
                  className="hidden sm:block absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 rounded-full p-2 sm:p-3 opacity-100 transition-opacity duration-200 hover:bg-gray-50 hover:shadow-xl"
                  onClick={() => handleScroll(category, "left")}
                  aria-label="Scroll Left"
                  tabIndex={0}
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              )}

              {scrollStates[category]?.showRight && (
                <button
                  type="button"
                  className="hidden sm:block absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 rounded-full p-2 sm:p-3 opacity-100 transition-opacity duration-200 hover:bg-gray-50 hover:shadow-xl"
                  onClick={() => handleScroll(category, "right")}
                  aria-label="Scroll Right"
                  tabIndex={0}
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              )}

              {/* Scrollable Products Container - Responsive */}
              <div
                ref={(el) => {
                  scrollRefs.current[category] = el;
                }}
                onScroll={() => checkScrollButtons(category)}
                className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto scrollbar-hide pb-2 px-6 sm:px-8 lg:px-12"
              >
                {products.map((product, index) => (
                  <div
                    key={product.id || index}
                    className="flex-shrink-0 w-[160px] sm:w-[180px] lg:w-[200px]"
                  >
                    <ProductItem
                      product={product}
                      onQuickView={() => openModal(product)}
                      isFeatured={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// Enhanced Skeleton component with responsive design
function ProductsSkeleton() {
  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12 bg-white py-4 sm:py-6 lg:py-10">
      {Array.from({ length: 4 }).map((_, categoryIndex) => (
        <div
          key={categoryIndex}
          className="space-y-3 sm:space-y-4 lg:space-y-6"
        >
          {/* Category Header Skeleton - Responsive */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 sm:h-7 md:h-8 lg:h-9 w-32 sm:w-40 md:w-48 lg:w-56 rounded" />
              <Skeleton className="h-4 sm:h-5 md:h-6 lg:h-7 w-12 sm:w-16 md:w-20 lg:w-24 rounded" />
            </div>
          </div>

          {/* Products Row Skeleton - Responsive */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative group">
              <div className="flex gap-3 sm:gap-4 lg:gap-5 overflow-hidden pb-2 px-6 sm:px-8 lg:px-12">
                {Array.from({ length: 6 }).map((_, productIndex) => (
                  <div
                    key={productIndex}
                    className="flex-shrink-0 w-[160px] sm:w-[180px] lg:w-[200px]"
                  >
                    <ProductItemSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Enhanced Product Card Skeleton with responsive design
function ProductItemSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      {/* Product Image Skeleton */}
      <div className="aspect-square bg-gray-50 p-3 sm:p-4">
        <Skeleton className="w-full h-full rounded animate-pulse" />
      </div>

      {/* Product Details Skeleton */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* Delivery Time Skeleton */}
        <div className="flex items-center gap-1">
          <Skeleton className="w-3 h-3 rounded-full animate-pulse" />
          <Skeleton className="h-3 w-10 sm:w-12 rounded animate-pulse" />
        </div>

        {/* Product Name Skeleton */}
        <div className="space-y-1">
          <Skeleton className="h-3 sm:h-4 w-full rounded animate-pulse" />
          <Skeleton className="h-3 sm:h-4 w-3/4 rounded animate-pulse" />
        </div>

        {/* Product Weight/Size Skeleton */}
        <Skeleton className="h-3 w-10 sm:w-12 rounded animate-pulse" />

        {/* Price and Button Skeleton */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 sm:h-5 w-10 sm:w-12 rounded animate-pulse" />
            <Skeleton className="h-3 w-8 sm:w-10 rounded animate-pulse" />
          </div>
          <Skeleton className="h-7 sm:h-8 w-12 sm:w-16 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
