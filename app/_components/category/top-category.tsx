"use client";

import { useAuth } from "@/contexts/auth-context";
import { getImageUrl } from "@/lib/utils";
import { Grid3X3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  const categories = categoryList;
  console.log("categories", categories);

  return (
    <section className="bg-white py-8 sm:py-12">
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
        <div>
          {isLoading && (!categories || categories.length === 0) ? (
            <>
              {/* Mobile Skeleton */}
              <div className="flex lg:hidden gap-3 overflow-x-auto pb-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0">
                    <div className="w-24 h-32 bg-gray-200 rounded-lg" />
                  </div>
                ))}
              </div>
              {/* Desktop Skeleton */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-8 xl:grid-cols-10 gap-4 grid-rows-2">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-24 h-32 bg-gray-200 rounded-lg mx-auto"
                    />
                  ))}
                </div>
              </div>
            </>
          ) : Array.isArray(categories) && categories.length > 0 ? (
            <>
              {/* Mobile View - Horizontal Scroll */}
              <div className="lg:hidden">
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                  {categories.map((category) => {
                    const imgUrl = getImageUrl(category.image);
                    console.log("hhhhhhhhhhhhhhhhhhhhhhhh", imgUrl);
                    return (
                      <Link
                        href={`/products-category/${category.slug}`}
                        key={category.id}
                        className="flex-shrink-0"
                      >
                        <div className="w-24 bg-white rounded-lg p-2">
                          <div className="relative w-20 h-20 mx-auto mb-2 bg-gray-50 border-2 border-gray-300 rounded">
                            <Image
                              src={imgUrl || "/placeholder.svg"}
                              alt={category.image_alt || category.name}
                              fill
                              className="object-contain p-1"
                              sizes="80px"
                              unoptimized
                            />
                          </div>
                          <h3 className="text-xs font-extrabold text-gray-900 text-center line-clamp-2 leading-tight">
                            {category.name}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Desktop View - Grid with 2 Rows */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-8 xl:grid-cols-10 gap-4 grid-rows-2 justify-items-center">
                  {categories.map((category) => {
                    const imgUrl = getImageUrl(category.image);

                    return (
                      <Link
                        href={`/products-category/${category.slug}`}
                        key={category.id}
                      >
                        <div className="bg-white rounded-lg p-2 hover:bg-gray-50">
                          <div className="relative w-24 h-24 mx-auto mb-2 bg-gray-50 border-2 border-gray-300 rounded">
                            <Image
                              src={imgUrl || "/placeholder.svg"}
                              alt={category.image_alt || category.name}
                              fill
                              className="object-contain p-2"
                              sizes="96px"
                              unoptimized
                            />
                          </div>
                          <h3 className="text-sm font-extrabold text-gray-900 text-center line-clamp-2 leading-tight">
                            {category.name}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* View All Button */}
              {categories.length > 16 && (
                <div className="text-center mt-8">
                  <Link
                    href="/categories"
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800"
                  >
                    View All Categories
                  </Link>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col justify-center items-center min-h-[200px] bg-gray-50 rounded-lg border border-gray-200">
              <Grid3X3 className="w-12 h-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                No Categories Available
              </h3>
              <p className="text-gray-500 text-sm text-center max-w-md">
                Categories will appear here once they are added.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
