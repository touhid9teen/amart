"use client";

import { useAuth } from "@/contexts/auth-context";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Grid3X3, Sparkles } from "lucide-react";
import { useRef } from "react";

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

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Grid3X3 className="w-4 h-4" />
            Shop by Category
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-primary">Fresh Categories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover thousands of fresh products organized into convenient
            categories for easy shopping
          </p>
        </div>

        {/* Categories Container */}
        <div className="relative">
          {isLoading && (!categories || categories.length === 0) ? (
            <>
              {/* Mobile Skeleton - Horizontal scroll */}
              <div className="flex lg:hidden gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0">
                    <div className="w-32 h-40 bg-gray-200 rounded-2xl animate-pulse" />
                  </div>
                ))}
              </div>
              {/* Desktop Skeleton - Grid */}
              <div className="hidden lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-48 bg-gray-200 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            </>
          ) : Array.isArray(categories) && categories.length > 0 ? (
            <>
              {/* Mobile & Tablet View - Horizontal Scroll */}
              <div className="relative lg:hidden">
                {/* Navigation Buttons */}
                {/* {showLeftButton && (
                  <button
                    onClick={scrollLeft}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                )}
                {showRightButton && (
                  <button
                    onClick={scrollRight}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                )} */}

                {/* Scrollable Container */}
                <div
                  ref={scrollContainerRef}
                  className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth px-6"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {categories.map((category, index) => {
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
                        className="group flex-shrink-0"
                      >
                        <div className="w-32 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:border-green-200 hover:shadow-lg hover:-translate-y-2 hover:scale-105 overflow-hidden">
                          {/* Image Container */}
                          <div className="relative w-full h-24 mb-3 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50" />
                            <Image
                              src={imgUrl || "/placeholder.svg"}
                              alt={category.image_alt || category.name}
                              fill
                              className="object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                              sizes="128px"
                              unoptimized
                            />
                            {/* Sparkle Effect */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                          </div>

                          {/* Category Info */}
                          <div className="px-3 pb-4">
                            <h3 className="text-sm font-semibold text-gray-800 text-center leading-tight group-hover:primary transition-colors duration-300 line-clamp-2">
                              {category.name}
                            </h3>
                            {/* Category Index Badge */}
                            <div className="flex justify-center mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                #{index + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Desktop View - Grid */}
              <div className="hidden lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {categories.map((category, index) => {
                  const imgUrl =
                    category.image && category.image.startsWith("http")
                      ? category.image
                      : category.image
                      ? `${baseUrl}${category.image}`
                      : "/placeholder.svg?height=160&width=160";

                  return (
                    <Link
                      href={`/products-category/${category.slug}`}
                      key={category.id}
                      className="group"
                    >
                      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:border-green-200 hover:shadow-xl hover:-translate-y-3 hover:scale-105 overflow-hidden">
                        {/* Image Container */}
                        <div className="relative w-full aspect-square mb-4 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50" />
                          <Image
                            src={imgUrl || "/placeholder.svg"}
                            alt={category.image_alt || category.name}
                            fill
                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                            unoptimized
                          />
                          {/* Overlay Effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Sparkle Effect */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Sparkles className="w-5 h-5 text-primary" />
                          </div>

                          {/* Category Index Badge */}
                          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-primary text-white">
                              {index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Category Info */}
                        <div className="px-4 pb-6">
                          <h3 className="text-base font-semibold text-gray-800 text-center leading-tight group-hover:text-green-700 transition-colors duration-300 line-clamp-2 mb-2">
                            {category.name}
                          </h3>

                          {/* Action Indicator */}
                          <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                              Shop Now
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* View All Categories Button */}
              {categories.length > 12 && (
                <div className="text-center mt-12">
                  <Link
                    href="/categories"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Grid3X3 className="w-5 h-5" />
                    View All Categories
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col justify-center items-center min-h-[300px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Grid3X3 className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                No Categories Available
              </h3>
              <p className="text-gray-500 text-center max-w-md leading-relaxed">
                {`We're working on adding amazing product categories for you.
                Check back soon for fresh updates!`}
              </p>
              <div className="mt-6">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-300">
                  Refresh Page
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Stats */}
        {categories && categories.length > 0 && (
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {categories.length}+
              </div>
              <div className="text-sm text-gray-600 font-medium">
                Categories
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-blue-600 mb-1">10K+</div>
              <div className="text-sm text-gray-600 font-medium">Products</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                Fresh
              </div>
              <div className="text-sm text-gray-600 font-medium">Daily</div>
            </div>
            <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                24/7
              </div>
              <div className="text-sm text-gray-600 font-medium">Available</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
