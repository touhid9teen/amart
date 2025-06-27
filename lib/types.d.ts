type AuthToken = string;

type ProductItemProps = {
  product: Product;
  onQuickView?: () => void;
  isFeatured?: boolean;
};

type ProductDetailsProps = {
  product: Product;
  quantity: number;
  loading: boolean;
  handleAddToCart: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
};

// Define a Category type inline for mapping
type Category = {
  id?: string | number;
  slug?: string;
  name?: string;
};

type CartItem = {
  id: number;
  name: string;
  sellingPice: number;
  quantity: number;
  image?: string;
};

type OrderPayload = {
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

type LocationState = {
  loading: boolean;
  error: string | null;
  coordinates: { lat: number; lng: number } | null;
  address: string;
};

type CheckoutComponentProps = {
  onOrderSubmit: (formData: typeof initialFormData) => void;
};

type EndpointType = {
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

type QueryParamType = {
  pathname?: string;
  params?: unknown;
};

type Product = {
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

type Category = {
  id?: string | number;
  slug?: string;
  name?: string;
  image?: string;
  image_alt?: string;
};

type OrderItem = {
  product_name: string;
  product_id: number;
  quantity: number;
  price: number;
  image?: string;
};

type OrderData = {
  address: string;
  total_amount: number;
  delivery_charge: number;
  status: string;
  order_notes: string;
  items: OrderItem[];
};

type CheckoutFormData = {
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
