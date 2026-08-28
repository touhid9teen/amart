import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import {
  getProductByIdServer,
  getAllProductIdsServer,
} from "@/lib/actions";
import type { Product } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// SSG: pre-render every product page at build time
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const ids = await getAllProductIdsServer();
  return ids.map((id) => ({ id }));
}

// Dynamic import the client component — keeps it out of initial JS bundle
const ProductDetailClient = dynamic(
  () => import("./product-detail-client"),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    ),
  }
);

// Generate metadata for SEO (runs on server only)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const result = await getProductByIdServer(id);

  if (!result.success || !result.data) {
    return { title: "Product Not Found" };
  }

  const product = result.data as any;

  return {
    title: product.name || "Product Detail",
    description:
      product.description ||
      `${product.name} - ৳${product.sellingPice}`,
    openGraph: {
      title: product.name,
      description: product.description || `${product.name} - ৳${product.sellingPice}`,
      images: product.image ? [{ url: product.image, alt: product.name }] : [],
    },
  };
}

// Server component — fetches single product directly from backend
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getProductByIdServer(id);

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <p className="text-gray-500 text-lg mb-4">Product not found</p>
        <Link
          href="/"
          className="text-primary font-medium hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Go back
        </Link>
      </div>
    );
  }

  // Map backend response to Product type
  const raw = result.data as any;
  const product: Product = {
    id: raw.id,
    name: raw.name,
    description: raw.description || "",
    mrp: String(raw.mrp),
    sellingPice: String(raw.sellingPice),
    ItemQuantityType: raw.ItemQuantityType || "piece",
    image: raw.image || null,
    categories: raw.categories || [],
    is_featured: raw.is_featured ?? false,
  };

  return <ProductDetailClient product={product} />;
}
