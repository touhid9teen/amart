"use client";

import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { SkeletonCategoryItem } from "../skeleton/category-item-skeleton";

type Category = {
  id: number;
  documentId: string;
  name: string;
  colore: string | null;
  slug: string;
  image: string;
  image_alt: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type TopCategoriesProps = {
  categoryList?: Category[];
};

export default function TopCategories({ categoryList }: TopCategoriesProps) {
  const { isLoading } = useAuth();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const categories = categoryList;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // State for scroll button visibility
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  // Check scroll position and update button visibility
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      // Show left button if scrolled right
      setShowLeftButton(scrollLeft > 0);

      // Show right button if there's more content to scroll
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Initialize scroll buttons on mount and when categories change
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Initial check
      checkScrollButtons();

      // Add scroll event listener
      container.addEventListener("scroll", checkScrollButtons);

      // Add resize event listener to handle orientation changes
      window.addEventListener("resize", checkScrollButtons);

      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, [categories]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}

        {/* Categories Container */}
        <div className="relative">
          {isLoading && (!categories || categories.length === 0) ? (
            <>
              {/* Mobile Skeleton - Horizontal scroll */}
              <div className="flex sm:hidden gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCategoryItem key={i} />
                ))}
              </div>

              {/* Desktop Skeleton - Grid */}
              <div className="hidden sm:grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonCategoryItem key={i} />
                ))}
              </div>
            </>
          ) : Array.isArray(categories) && categories.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Shop by Category
                </h2>
              </div>
              {/* Mobile View - Horizontal Scroll with Navigation Buttons */}
              <div className="relative sm:hidden">
                {/* Left Scroll Button */}
                {showLeftButton && (
                  <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                )}

                {/* Right Scroll Button */}
                {showRightButton && (
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                )}

                {/* Scrollable Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide scroll-smooth px-4"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {categories.map((category) => {
                    const imgUrl =
                      category.image && category.image.startsWith("http")
                        ? category.image
                        : category.image
                        ? `${baseUrl}${category.image}`
                        : "/placeholder.svg?height=80&width=80";

                    return (
                      <Link
                        href={`/products-category/${category.slug}`}
                        key={category.id}
                        className="group flex-shrink-0"
                      >
                        <div className="w-20 bg-white rounded-xl border border-gray-100 p-3 transition-all duration-300 hover:border-gray-200 hover:shadow-md hover:-translate-y-1">
                          {/* Image Container */}
                          <div className="relative w-14 h-14 mx-auto mb-2 overflow-hidden rounded-lg bg-gray-50">
                            <Image
                              src={imgUrl || "/placeholder.svg"}
                              alt={category.image_alt || category.name}
                              fill
                              className="object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                              sizes="56px"
                              unoptimized
                            />
                          </div>

                          {/* Category Name */}
                          <h3 className="text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900 transition-colors duration-200 line-clamp-2">
                            {category.name}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Desktop View - Grid */}
              <div className="hidden sm:grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                {categories.map((category) => {
                  const imgUrl =
                    category.image && category.image.startsWith("http")
                      ? category.image
                      : category.image
                      ? `${baseUrl}${category.image}`
                      : "/placeholder.svg?height=120&width=120";

                  return (
                    <Link
                      href={`/products-category/${category.slug}`}
                      key={category.id}
                      className="group"
                    >
                      <div className="bg-white rounded-xl border border-gray-100 p-4 transition-all duration-300 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1">
                        {/* Image Container */}
                        <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-lg bg-gray-50">
                          <Image
                            src={imgUrl || "/placeholder.svg"}
                            alt={category.image_alt || category.name}
                            fill
                            className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 640px) 25vw, (max-width: 768px) 16vw, (max-width: 1024px) 12vw, 10vw"
                            unoptimized
                          />
                        </div>

                        {/* Category Name */}
                        <h3 className="text-sm font-semibold text-gray-700 text-center leading-tight group-hover:text-gray-900 transition-colors duration-200 line-clamp-2">
                          {category.name}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center min-h-[200px] bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
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
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No Categories Found
              </h3>
              <p className="text-gray-500 text-center">
                Categories will appear here when available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
