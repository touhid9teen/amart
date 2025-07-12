"use client";
import { Search, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hook/use-products";
import { searchItems } from "@/lib/variables";

let debounceTimer: NodeJS.Timeout;

export default function SearchBar() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [placeholder, setPlaceholder] = useState(searchItems[0]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { searchProducts } = useProducts();

  // Rotate placeholder every 2s when input is empty
  useEffect(() => {
    if (input.trim()) return;

    let index = searchItems.indexOf(placeholder);
    const interval = setInterval(() => {
      index = (index + 1) % searchItems.length;
      setPlaceholder(searchItems[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, [input, placeholder]);

  useEffect(() => {
    if (!input.trim()) {
      if (suggestions.length !== 0) setSuggestions([]);
      return;
    }

    clearTimeout(debounceTimer);
    setLoading(true);

    debounceTimer = setTimeout(() => {
      const result = searchProducts(input);
      setSuggestions(result.slice(0, 5));
      setLoading(false);
    }, 500);
  }, [input, searchProducts, suggestions.length]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (query) {
      setSuggestions([]);
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setInput("");
    }
  };

  const handleSelectSuggestion = (name: string) => {
    setInput("");
    setSuggestions([]);
    setShowDropdown(false);
    router.push(`/search?q=${encodeURIComponent(name)}`);
  };

  return (
    <div className="relative max-w-2xl w-full mx-auto" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 px-4 py-2">
          <Search className="mr-2" size={20} />
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder={input.trim() ? "" : placeholder}
            className="flex-1 outline-none text-sm bg-transparent p-1"
          />
        </div>
      </form>

      {showDropdown && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow z-50 max-h-60 overflow-y-auto">
          {loading && (
            <div className="flex justify-center py-4">
              <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading &&
            suggestions.length > 0 &&
            suggestions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectSuggestion(item.name)}
                className="cursor-pointer px-4 py-2 text-sm flex items-center justify-between hover:bg-gray-100 hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Search
                    size={14}
                    className="text-gray-400 group-hover:text-primary"
                  />
                  {item.name}
                </div>
                <ChevronRight
                  size={16}
                  className="text-gray-400 group-hover:text-primary"
                />
              </div>
            ))}

          {!loading && input && suggestions.length === 0 && (
            <div className="px-4 py-2 text-gray-500 text-sm">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
