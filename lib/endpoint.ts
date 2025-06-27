"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const endpoints: EndpointType = {
  // cart
  removeAllCartItems: "/store/user-cart/",
  getCartItems: "/store/user-cart/",
  removeCartItem: "/store/user-cart/",
  addToCart: "/store/user-cart/",
  getCategoryList: "/store/categories/",
  getProducts: "/store/products/",
  getProductByCategory: "/store/products/category/",
  getOrders: "/detail/orders/user/all/",
};

export async function getEndpoint(key: keyof EndpointType, pathname?: string) {
  let endpoint = `${baseUrl}${endpoints[key]}`;

  if (pathname) {
    endpoint += pathname;
  }

  return endpoint;
}
