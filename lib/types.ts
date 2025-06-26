export type AnyType = unknown;

export type EndpointType = {
  // Cart Endpoints
  removeAllCartItems: string;
  getCartItems: string;
  removeCartItem: string;
  addToCart: string;
  getProducts: string;
  getCategoryList: string;
  getProductByCategory: string;
  // Add other endpoints as needed
};

export type QueryParamType = {
  pathname?: string;
  params?: unknown;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  mrp: string;
  sellingPice: string;
  ItemQuantityType: string;
  image: string | null;
  categories: any[];
  is_featured: boolean;
};

export type Category = {
  id?: string | number;
  slug?: string;
  name?: string;
  image?: string;
  image_alt?: string;
};
