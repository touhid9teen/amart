import { getAllProductsServer } from "@/lib/actions";
import Home from "./home";

// Guarantee static generation at build time (SSG)
export const dynamic = "force-static";

export default async function Page() {
  const rawProducts = await getAllProductsServer();

  const products = rawProducts.map((p) => ({
    id: p?.id,
    name: p?.name,
    description: p?.description || "",
    mrp: String(p?.mrp ?? ""),
    sellingPice: String(p?.sellingPice ?? ""),
    ItemQuantityType: p?.ItemQuantityType || "piece",
    image: p?.image || null,
    categories: p?.categories || [],
    is_featured: p?.is_featured ?? false,
  }));

  return <Home initialProducts={products} />;
}
