"use client";

import { useState, useEffect } from "react";
import ProductItem from "./productItem";
import ProductModal from "./product-modal";
import { slugify } from "@/app/_utils/slugify";
import Link from "next/link";
import type { Product } from "@/lib/types";

interface ProductsProps {
  productList: Product[];
  isLoading?: boolean;
}

function groupProductsByCategory(products: Product[]): [string, Product[]][] {
  const grouped: Record<string, Product[]> = {};

  products.forEach((product) => {
    (product.categories as string[] | undefined)?.forEach((category) => {
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
    });
  });

  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, items]) => [
      category,
      items.sort((a, b) => a.name.localeCompare(b.name)),
    ]);
}

export default function Products({
  productList,
  isLoading = false,
}: ProductsProps) {
  const [groupedProducts, setGroupedProducts] = useState<[string, Product[]][]>(
    []
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (productList && productList.length > 0) {
      const grouped = groupProductsByCategory(productList);
      setGroupedProducts(grouped);
    }
  }, [productList]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (!Array.isArray(productList) || productList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
        <div className="w-12 h-12 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No products found
        </h3>
        <p className="text-sm text-gray-600">
          Please check back later for available products.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white py-6">
      {groupedProducts.map(([category, products]) => (
        <div key={category} className="space-y-3">
          {/* Category Header */}
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{category}</h2>
              <Link
                href={`/products-category/${slugify(category)}`}
                className="text-sm text-primary hover:text-gray-900 font-semibold "
              >
                See All
              </Link>
            </div>
          </div>

          {/* Products Container */}
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {products.map((product, index) => (
                <div
                  key={product.id || index}
                  className="flex-shrink-0 w-[140px]"
                >
                  <ProductItem
                    product={product}
                    onQuickView={() => openModal(product)}
                    isFeatured={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div className="space-y-6 bg-white py-6">
      {Array.from({ length: 3 }).map((_, categoryIndex) => (
        <div key={categoryIndex} className="space-y-3">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="h-5 w-16 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-hidden pb-2">
              {Array.from({ length: 6 }).map((_, productIndex) => (
                <div key={productIndex} className="flex-shrink-0 w-[140px]">
                  <ProductItemSkeleton />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductItemSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="aspect-square bg-gray-100 rounded-t-lg" />
      <div className="p-2 space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-6 w-14 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
