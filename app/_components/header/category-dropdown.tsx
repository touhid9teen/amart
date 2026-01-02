"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { ChevronDown, ChevronRight, List } from "lucide-react";
import Link from "next/link";

export default function CategoryDropdown() {
  const { categoryList } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
          flex items-center gap-2 px-4 py-3
          text-sm font-bold text-gray-700 
          bg-gray-100 hover:bg-gray-200
          transition-colors duration-200
          whitespace-nowrap
          h-full
        "
        >
          <span>ALL CATEGORIES</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="
    w-[90vw]                // mobile phones
    sm:w-[80vw]             // small tablets
    md:w-[600px]            // medium tablets
    lg:w-[800px]            // desktops
    xl:w-[900px]            // large screens
    max-w-screen-xl
  "
        align="start"
        sideOffset={8}
      >
        <div className="max-h-120 overflow-y-auto ">
          {categoryList?.length > 0 ? (
            categoryList.map((cat: Category) => (
              <DropdownMenuItem
                key={cat?.id ?? cat?.slug ?? cat?.name}
                className="font-semibold cursor-pointer hover:bg-gray-100 focus:bg-gray-100 py-2.5"
                asChild
              >
                <Link
                  href={`/products-category/${cat.slug}`}
                  className="flex items-center w-full px-2 py-1 text-sm text-gray-700 hover:text-primary focus:text-primary transition group"
                >
                  <span className="flex-1 truncate">{cat.name}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary ml-2 transition" />
                </Link>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-2 py-4 text-sm text-gray-500 text-center h-screen flex items-center justify-center">
              No categories available
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
