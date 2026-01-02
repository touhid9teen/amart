"use client";

import TopCategories from "./_components/category/top-category";
import Navbar from "./_components/navbar";
import FeaturesSection from "./_components/feature-section";
import Products from "./_components/product/products";
import Slider from "./_components/Slider";

import { useAuth } from "@/contexts/auth-context";

export default function Home() {
  const { categoryList, productList, isLoading } = useAuth();

  return (
    <div>
      <Navbar />
      <Slider />
      <TopCategories categoryList={categoryList} isLoading={isLoading} />
      <Products productList={productList} isLoading={isLoading} />
      <FeaturesSection />
    </div>
  );
}
