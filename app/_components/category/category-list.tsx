import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories } from "@/lib/variables";

interface CategoryListProps {
  variant?: "sidebar" | "dropdown" | "modal";
  onCategoryClick?: () => void;
}

export default function CategoryList({ 
  variant = "sidebar",
  onCategoryClick 
}: CategoryListProps) {
  
  if (variant === "dropdown") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <Link
              key={index}
              href={`/products-category/${cat.slug}`}
              onClick={onCategoryClick}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-100 focus:text-primary transition group gap-3 rounded-md"
            >
              <Icon className="h-5 w-5 text-gray-500 group-hover:text-primary transition-colors flex-shrink-0" />
              <span className="flex-1 truncate">{cat.name}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  if (variant === "modal") {
    return (
      <div className="py-2">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <Link
              key={index}
              href={`/products-category/${cat.slug}`}
              onClick={onCategoryClick}
              className="
                group flex items-center gap-3 px-6 py-3
                text-sm font-medium text-gray-700
                hover:bg-gray-50 hover:text-primary
                transition-colors duration-200
                border-l-4 border-transparent hover:border-primary
              "
            >
              <Icon className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
              <span className="flex-1 truncate">{cat.name}</span>
              <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-primary transition-colors" />
            </Link>
          );
        })}
      </div>
    );
  }

  // Default: sidebar variant
  return (
    <div className="flex flex-col">
      {categories.map((cat, index) => {
        const Icon = cat.icon;
        return (
          <Link
            key={index}
            href={`/products-category/${cat.slug}`}
            onClick={onCategoryClick}
            className="
              group flex items-center gap-3 py-3 px-2
              text-sm font-normal text-gray-600
              transition-colors
              border-b border-dashed border-gray-300 last:border-0
              hover:text-primary
            "
          >
            <div className="relative w-5 h-5 shrink-0 opacity-80 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <span className="flex-1">{cat.name}</span>
            <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
          </Link>
        );
      })}
    </div>
  );
}
