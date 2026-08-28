"use client";

import { useState } from "react";
import ArticleSection from "@/components/layout/article-section";
import CategorySidebar from "@/components/category/category-sidebar";
import FeaturesSection from "@/components/layout/feature-section";
import HeroSection from "@/components/layout/hero-section";
import Products from "@/components/product/products";
import SignupBanner from "@/components/layout/signup-banner";
import type { Product } from "@/lib/types";

export default function Home({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const products = initialProducts;
  const loading = false;

  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        (product.categories as string[])?.includes(selectedCategory),
      )
    : products;

  return (
    <div>
      <HeroSection />

      <div
        id="products-section"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-full lg:w-1/4 shrink-0">
            <CategorySidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </aside>

          <main className="w-full lg:w-3/4">
            <Products productList={filteredProducts} isLoading={loading} />
          </main>
        </div>
      </div>

      <ArticleSection />
      <SignupBanner />
      <FeaturesSection />
    </div>
  );
}
