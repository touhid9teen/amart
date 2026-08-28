"use client";

import { SkeletonProductItem } from "@/components/product/skeleton-product-item";
import ProductItem from "@/components/product/product-item";
import { Product } from "@/lib/types";

export default function AllProducts({
  productList,
}: {
  productList: Product[];
}) {
  return (
    <div className="flex flex-col pt-6 px-4 md:px-10 max-w-7xl mx-auto">
      {/* Optional heading and controls can go here */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5">
        {!productList || productList.length === 0 ? (
          Array.from({ length: 12 }).map((_, i) => (
            <SkeletonProductItem key={i} />
          ))
        ) : Array.isArray(productList) && productList.length > 0 ? (
          productList.map((product, index) => (
            <ProductItem
              key={product.id || index}
              product={product}
              isFeatured={true}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
