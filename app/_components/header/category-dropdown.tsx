"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
} from "lucide-react";
import CategoryList from "../category/category-list";

export default function CategoryDropdown() {
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
        <div className="max-h-[70vh] overflow-y-auto p-2">
          <CategoryList variant="dropdown" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
