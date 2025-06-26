"use client";
import Products from "@/app/_components/product/products";
import BackButton from "@/app/_components/back-button";
import { GetQuery } from "@/lib/queries";

export default function ProductsByCategoryClient({
  categoryName,
}: {
  categoryName: string;
}) {
  const { data: productList, isLoading } = GetQuery(
    "getProductByCategory",
    { params: { slug: categoryName } },
    true,
    null,
    Infinity
  );

  if (isLoading) return <div>Loading...</div>;

  if (!productList || productList.length === 0) {
    return (
      <div>
        <BackButton />
        <div className="col-span-full flex flex-col justify-center items-center min-h-[40vh]">
          <svg
            className="w-12 h-12 mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-500 text-lg font-semibold">
            No product found for {categoryName} !
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BackButton />
      <Products productList={productList} />
    </div>
  );
}
