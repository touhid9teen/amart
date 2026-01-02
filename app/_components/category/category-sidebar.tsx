"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Category = {
  id: number;
  name: string;
  image: string;
  slug: string;
  image_alt: string;
};

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
}

export default function CategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="font-extrabold text-gray-900 tracking-wider text-lg mb-4">
          Categories
        </h3>
        <div className="flex flex-col">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.name)}
                className={cn(
                  "item-center gap-3 py-3 text-sm font-normal text-gray-600 transition-colors border-b border-dashed border-gray-300 last:border-0 text-left hover:text-[#7fad39] flex",
                  isSelected ? "text-[#7fad39] font-medium" : ""
                )}
              >
                  <div className="relative w-5 h-5 shrink-0 opacity-80">
                   {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.image_alt || category.name}
                        fill
                        className="object-contain"
                        sizes="20px"
                      />
                   ) : (
                     <div className="w-full h-full bg-gray-200 rounded-full" />
                   )}
                </div>
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
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
