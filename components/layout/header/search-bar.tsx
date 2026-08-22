"use client";
import { Search, X, FolderOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProducts } from "@/hooks/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import { searchItems, categories } from "@/lib/config";
import type { Product } from "@/lib/types";

interface MatchedCategory {
  name: string;
  slug: string;
}

export default function SearchBar() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [productResults, setProductResults] = useState<Product[]>([]);
  const [categoryResults, setCategoryResults] = useState<MatchedCategory[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchProducts } = useProducts();
  const debouncedQuery = useDebounce(input, 300);

  // Rotate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchItems.length);
    }, 3000);
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasResults = productResults.length > 0 || categoryResults.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (query) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setInput("");
    }
  };

  const handleProductClick = (productId: number) => {
    setShowDropdown(false);
    setInput("");
    router.push(`/products/${productId}`);
  };

  const handleCategoryClick = (slug: string) => {
    setShowDropdown(false);
    setInput("");
    router.push(`/products-category/${slug}`);
  };

  const handleClear = () => {
    setInput("");
    setProductResults([]);
    setCategoryResults([]);
    inputRef.current?.focus();
  };

  const imgUrl = (product: Product) => product.image || "/placeholder.svg";

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="w-full flex">
        <div className="flex-1 flex items-center bg-gray-100 px-4">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => input.trim() && setShowDropdown(true)}
            placeholder={searchItems[placeholderIndex]}
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 py-3"
          />
          {input && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={14} className="text-gray-500" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-8 py-3 font-bold text-sm tracking-wide hover:bg-primary/90 transition-colors"
        >
          SEARCH
        </button>
      </form>

      {/* Dropdown */}
      {showDropdown && input.trim() && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[480px] overflow-y-auto">
          {/* Loading */}
          {isSearching && (
            <div className="flex justify-center py-6">
              <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!isSearching && (
            <div className="py-1">
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
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
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
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      {/* Product Image */}
                      <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                        <Image
                          src={imgUrl(product)}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain p-1"
                          unoptimized
                        />
                      </div>

                      {/* Product Info */}
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

                      <Search
                        size={14}
                        className="text-gray-300 flex-shrink-0"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* View all results link */}
              {hasResults && (
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    router.push(
                      `/search?q=${encodeURIComponent(input.trim())}`
                    );
                    setInput("");
                  }}
                  className="w-full px-4 py-3 text-sm text-primary font-medium hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  View all results for &quot;{input.trim()}&quot;
                </button>
              )}
            </div>
          )}

          {/* No results */}
          {!isSearching && !hasResults && (
            <div className="px-4 py-6 text-center">
              <Search size={24} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">
                No products found for &quot;{input.trim()}&quot;
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
