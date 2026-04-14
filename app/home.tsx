"use client";

import { useState } from "react";
import ArticleSection from "./_components/article-section";
import CategorySidebar from "./_components/category/category-sidebar";
import FeaturesSection from "./_components/feature-section";
import HeroSection from "./_components/hero-section";
import Products from "./_components/product/products";
import SignupBanner from "./_components/signup-banner";
import { useProducts } from "@/hook/use-products";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { products, loading } = useProducts();

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
