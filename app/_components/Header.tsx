"use client";
import { useState } from "react";

import { Search, List, Bookmark } from "lucide-react";
import Logo from "./header/logo";
import CategoryDropdown from "./header/category-dropdown";
import SearchBar from "./header/search-bar";
import LoginLogout from "./header/login-logout";
import CartButton from "./header/cart-button";
import MobileSearch from "./header/mobile-search";
import CategorySidebar from "./header/category-sidebar";

export default function Header() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showCategorySidebar, setShowCategorySidebar] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 z-50 w-full">
        {/* Main header border */}
        <div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Single row layout */}
            <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Logo isHeader={true} />
              </div>

              {/* Desktop: Category + Search Group */}
              <div className="hidden lg:flex items-center flex-1 max-w-4xl mx-8">
                <div className="flex items-center w-full border border-gray-200 rounded-md overflow-hidden bg-gray-100">
                  <CategoryDropdown />
                  <SearchBar />
                </div>
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-4">
                {/* Mobile: Search Icon */}
                <button
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5 text-gray-600" />
                </button>

                {/* Mobile: Category Icon */}
                <button
                  onClick={() => setShowCategorySidebar(true)}
                  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Categories"
                >
                  <List className="h-5 w-5 text-gray-600" />
                </button>

                {/* Desktop login/logout (User Icon) */}
                <div className="hidden sm:block">
                  <LoginLogout />
                </div>

                {/* Wishlist (Bookmark) */}
                <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700">
                   <Bookmark className="h-6 w-6" />
                </button>


                {/* Cart button - always visible */}
                <CartButton />

                {/* Mobile login */}
                <div className="sm:hidden">
                  <LoginLogout />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile search bar (expandable) - full width border */}
        {showMobileSearch && (
          <div className="lg:hidden border-b border-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <MobileSearch onClose={() => setShowMobileSearch(false)} />
            </div>
          </div>
        )}
      </header>

      {/* Category Sidebar Modal */}
      <CategorySidebar
        isOpen={showCategorySidebar}
        onClose={() => setShowCategorySidebar(false)}
      />
    </>
  );
}
