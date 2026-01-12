"use client";

import { useState } from "react";
import FeaturesSection from "./_components/feature-section";
import Products from "./_components/product/products";
import HeroSection from "./_components/hero-section";
import ArticleSection from "./_components/article-section";
import SignupBanner from "./_components/signup-banner";
import CategorySidebar from "./_components/category/category-sidebar";

import { useAuth } from "@/contexts/auth-context";

export default function Home() {
  const { productList, isLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? productList.filter((product) =>
        (product.categories as string[])?.includes(selectedCategory)
      )
    : productList;

  return (
    <div>
      <HeroSection />
      
      <div id="products-section" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop only (hidden on mobile) */}
          <aside className="hidden lg:block w-full lg:w-1/4 shrink-0">
            <CategorySidebar 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory}
            />
          </aside>

          {/* Main Product Area - Adjusts based on sidebar visibility */}
          <main className="w-full lg:w-3/4">
             {/* Use filteredProducts */}
            <Products productList={filteredProducts} isLoading={isLoading} />
          </main>
        </div>
      </div>

      <ArticleSection />
      <SignupBanner />
      <FeaturesSection />
    </div>
  );
}
