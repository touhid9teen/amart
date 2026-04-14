import type { Product } from "@/lib/types";
import { getRequest } from "@/lib/requests";
import Home from "./home";

export default function Page() {
  const productListPromise = getRequest<Product[]>("getProducts");

  return <Home productListPromise={productListPromise} />;
}
