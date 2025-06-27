import dynamic from "next/dynamic";

const ProductsByCategoryClient = dynamic(
  () => import("./products-by-category-client"),
  { ssr: false }
);

export default function ProductsByCategory({
  params,
}: {
  params: { CategoryName: string };
}) {
  return <ProductsByCategoryClient categoryName={params.CategoryName} />;
}
