"use client";

import { useState } from "react";
import Navbar from "./_components/navbar";
import FeaturesSection from "./_components/feature-section";
import Products from "./_components/product/products";
import HeroSection from "./_components/hero-section";
import ArticleSection from "./_components/article-section";
import CategorySidebar from "./_components/category/category-sidebar";

import { useAuth } from "@/contexts/auth-context";

export default function Home() {
  const { categoryList, productList, isLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? productList.filter((product) =>
        (product.categories as string[])?.includes(selectedCategory)
      )
    : productList;

  return (
    <div>
      <Navbar />
      <HeroSection />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop Only for now, or could make responsive */}
          <aside className="w-full lg:w-1/4 shrink-0">
             {/* Pass categoryList or empty array to avoid type errors if undefined */}
            <CategorySidebar 
              categories={categoryList || []} 
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory}
            />
          </aside>

          {/* Main Product Area */}
          <main className="w-full lg:w-3/4">
             {/* Use filteredProducts */}
            <Products productList={filteredProducts} isLoading={isLoading} />
          </main>
        </div>
      </div>

      <ArticleSection />
      <FeaturesSection />
    </div>
  );
}
