"use client";

import type { Product } from "@/lib/types";
import { Suspense, use, useState } from "react";
import ArticleSection from "./_components/article-section";
import CategorySidebar from "./_components/category/category-sidebar";
import FeaturesSection from "./_components/feature-section";
import HeroSection from "./_components/hero-section";
import Products from "./_components/product/products";
import SignupBanner from "./_components/signup-banner";

interface HomeProps {
  productListPromise: Promise<Product[]>;
}

interface HomeProductsProps {
  productListPromise: Promise<Product[]>;
  selectedCategory: string | null;
}

function HomeProducts({
  productListPromise,
  selectedCategory,
}: HomeProductsProps) {
  const resolvedProducts = use(productListPromise);
  const productList = Array.isArray(resolvedProducts) ? resolvedProducts : [];

  const filteredProducts = selectedCategory
    ? productList.filter((product) =>
        (product.categories as string[])?.includes(selectedCategory),
      )
    : productList;

  return <Products productList={filteredProducts} />;
}

export default function Home({ productListPromise }: HomeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
            <Suspense fallback={<Products productList={[]} isLoading />}>
              <HomeProducts
                productListPromise={productListPromise}
                selectedCategory={selectedCategory}
              />
            </Suspense>
          </main>
        </div>
      </div>

      <ArticleSection />
      <SignupBanner />
      <FeaturesSection />
    </div>
  );
}
