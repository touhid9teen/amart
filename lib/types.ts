export type AuthToken = string;

export type ProductItemProps = {
  product: Product;
  onQuickView?: () => void;
  isFeatured?: boolean;
};

export type ProductDetailsProps = {
  product: Product;
  quantity: number;
  loading: boolean;
  handleAddToCart: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
};

export type Category = {
  id?: string | number;
  slug?: string;
  name?: string;
  image?: string;
  image_alt?: string;
};

export type CartItem = {
  id: number;
  name: string;
  sellingPice: number;
  quantity: number;
  image?: string;
};

export type OrderPayload = {
  user: string;
  address: string;
  total_amount: number;
  delivery_charge: number;
  items: {
    product_name: string;
    product_id: string | number;
    quantity: number;
    price: number;
    image: string;
  }[];
};

export type LocationState = {
  loading: boolean;
  error: string | null;
  coordinates: { lat: number; lng: number } | null;
  address: string;
};

export type CheckoutComponentProps = {
  onOrderSubmit: (formData: CheckoutFormData) => void;
};

export type EndpointType = {
  removeAllCartItems: string;
  getCartItems: string;
  removeCartItem: string;
  addToCart: string;
  getProducts: string;
  getCategoryList: string;
  getProductByCategory: string;
  getOrders: string;
};

export type QueryParamType = {
  pathname?: string;
  params?: {
    slug?: string;
    [key: string]: unknown;
  };
};

export type Product = {
  id: number;
  name: string;
  description: string;
  mrp: string;
  sellingPice: string;
  ItemQuantityType: string;
  image: string | null;
  categories: unknown[];
  is_featured: boolean;
};

export type OrderItem = {
  id: number;
  product: Product;
  quantity: number;
};

export type OrderData = {
  address: string;
  total_amount: number;
  delivery_charge: number;
  status: string;
  order_notes: string;
  items: OrderItem[];
};

export type CheckoutFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  area: string;
  address: string;
  postalCode: string;
  orderNotes: string;
};

export type Order = {
  id: number;
  order_id: string;
  user: string;
  created_at: string;
  address: string;
  total_amount: string;
  delivery_charge: string;
  status: string;
  order_notes: string;
  items: OrderItem[];
};

// For legacy code, provide a generic type
export type AnyType = unknown;
