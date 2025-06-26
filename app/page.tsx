"use client";

import FeaturesSection from "./_components/feature-section";
import Products from "./_components/product/products";
import Slider from "./_components/Slider";
import TopCategories from "./_components/categorry/top-category";
import { useAuth } from "@/contexts/auth-context";

export default function Home() {
  const { categoryList, productList } = useAuth();

  return (
    <div>
      <Slider />
      <TopCategories categoryList={categoryList} />
      <Products productList={productList} />
      <FeaturesSection />
    </div>
  );
}
