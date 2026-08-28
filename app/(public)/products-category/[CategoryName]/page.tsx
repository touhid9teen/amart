import { categories } from "@/lib/config";
import { getProductsByCategoryServer } from "@/lib/actions";
import ProductsByCategoryClient from "./products-by-category-client";

interface Props {
  params: Promise<{ CategoryName: string }>;
}

// SSG: pre-render every category page at build time from the static category list
export function generateStaticParams() {
  return categories.map((cat) => ({ CategoryName: cat.slug }));
}

export default async function ProductsByCategory({ params }: Props) {
  const { CategoryName } = await params;
  const products = await getProductsByCategoryServer(CategoryName);

  return <ProductsByCategoryClient categoryName={CategoryName} products={products} />;
}
