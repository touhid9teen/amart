"use server";

import { EndpointType } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const endpoints: EndpointType = {
  // cart
  removeAllCartItems: "store/user-cart/",
  getCartItems: "store/user-cart/",
  removeCartItem: "store/user-cart/",
  addToCart: "store/user-cart/",
  getCategoryList: "store/categories/",
  getProducts: "store/products/",
  getProductByCategory: "store/products/category/",
  getOrders: "detail/orders/user/all/",
};

export async function getEndpoint(key: keyof EndpointType, pathname?: string) {
  // Ensure baseUrl ends with a slash if it's not empty
  const safeBaseUrl = baseUrl?.endsWith("/") ? baseUrl : `${baseUrl}/`;

  let endpoint = `${safeBaseUrl}${endpoints[key]}`;

  // Ensure single slash between base path and pathname
  if (pathname) {
     // Remove leading slash from pathname if present to avoid double slash
    const safePathname = pathname.startsWith("/") ? pathname.slice(1) : pathname;
    
    // Create the full endpoint
    if (!endpoint.endsWith("/")) {
      endpoint += "/";
    }
    endpoint += safePathname;
    
    if (!endpoint.endsWith("/")) {
      endpoint += "/";
    }
  }

  return endpoint;
}
