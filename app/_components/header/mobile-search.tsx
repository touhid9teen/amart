"use client";
import { Search, X, FolderOpen } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProducts } from "@/hook/use-products";
import { useDebounce } from "@/hook/use-debounce";
import { searchItems, categories } from "@/lib/variables";
import type { Product } from "@/lib/types";

interface MatchedCategory {
  name: string;
  slug: string;
}

interface Props {
  onClose: () => void;
}

export default function MobileSearch({ onClose }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [productResults, setProductResults] = useState<Product[]>([]);
  const [categoryResults, setCategoryResults] = useState<MatchedCategory[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { searchProducts } = useProducts();
  const debouncedQuery = useDebounce(inputValue, 300);

  useEffect(() => {
    inputRef.current?.focus();
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchItems.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Search products + categories when debounced value changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setProductResults([]);
      setCategoryResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const lower = debouncedQuery.toLowerCase();

      // Match products
      const matchedProducts = searchProducts(debouncedQuery).slice(0, 5);
      setProductResults(matchedProducts);

      // Match categories
      const matchedCategories = categories
        .filter((cat) => cat.name.toLowerCase().includes(lower))
        .map((cat) => ({ name: cat.name, slug: cat.slug }))
        .slice(0, 3);
      setCategoryResults(matchedCategories);

      setIsSearching(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [debouncedQuery, searchProducts]);

  const hasResults = productResults.length > 0 || categoryResults.length > 0;

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      onClose();
    }
  };

  const handleProductClick = (productId: number) => {
    setInputValue("");
    onClose();
    router.push(`/products/${productId}`);
  };

  const handleCategoryClick = (slug: string) => {
    setInputValue("");
    onClose();
    router.push(`/products-category/${slug}`);
  };

  const imgUrl = (product: Product) => product.image || "/placeholder.svg";

  return (
    <div className="w-full animate-in slide-in-from-top-2 duration-200">
      <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20">
        <div className="pl-3 pr-2">
          <Search size={18} className="text-gray-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={searchItems[placeholderIndex]}
          className="w-full py-3 pr-12 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
        />

        <button
          onClick={onClose}
          className="absolute right-3 flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <X size={14} className="text-gray-500" />
        </button>
      </div>

      {/* Results dropdown */}
      <div className="mt-2">
        {isSearching && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
          </div>
        )}

        {!isSearching && hasResults && (
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
            {/* ── Categories Section ── */}
            {categoryResults.length > 0 && (
              <div>
                <div className="px-4 pt-3 pb-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Categories
                  </span>
                </div>
                {categoryResults.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategoryClick(cat.slug)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FolderOpen size={14} className="text-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* ── Products Section ── */}
            {productResults.length > 0 && (
              <div>
                <div className="px-4 pt-3 pb-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Products
                  </span>
                </div>
                {productResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-11 h-11 rounded-md bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                      <Image
                        src={imgUrl(product)}
                        alt={product.name}
                        width={44}
                        height={44}
                        className="w-full h-full object-contain p-0.5"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-bold text-green-700">
                          ৳{product.sellingPice}
                        </span>
                        {product.mrp &&
                          Number(product.mrp) >
                            Number(product.sellingPice) && (
                            <span className="text-xs text-gray-400 line-through">
                              ৳{product.mrp}
                            </span>
                          )}
                      </div>
                    </div>
                    <Search size={14} className="text-gray-300 flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}

            {/* View all results */}
            <button
              onClick={() => {
                router.push(
                  `/search?q=${encodeURIComponent(inputValue.trim())}`
                );
                onClose();
              }}
              className="w-full px-4 py-3 text-sm text-primary font-medium hover:bg-gray-50 transition-colors"
            >
              View all results for &quot;{inputValue.trim()}&quot;
            </button>
          </div>
        )}

        {!isSearching && inputValue.trim() && !hasResults && (
          <div className="text-sm text-center text-gray-500 py-4">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}
