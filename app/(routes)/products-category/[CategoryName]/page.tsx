import ProductsByCategoryClient from "./products-by-category-client";

interface Props {
  params: Promise<{ CategoryName: string }>;
}

export default async function ProductsByCategory({ params }: Props) {
  const { CategoryName } = await params;

  return <ProductsByCategoryClient categoryName={CategoryName} />;
}
