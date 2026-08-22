"use client";

import React from "react";
import Image from "next/image";
import CategoryList from "./category-list";

interface CategorySidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

export default function CategorySidebar({
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="font-extrabold text-gray-900 tracking-wider text-lg mb-4">
          Categories
        </h3>
        
        {/* Category List */}
        <CategoryList variant="sidebar" onSelectCategory={onSelectCategory} selectedCategory={selectedCategory} />
      </div>

      {/* Promo Banner */}
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mt-8">
         <Image
            src="/sale-banner.png"
            alt="Sale Discounts Up To 30%"
            fill
            className="object-cover"
         />
      </div>
    </div>
  );
}

