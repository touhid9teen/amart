// Directly read from environment — no import from config
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// ─── All endpoint paths (single source of truth) ────────────

const ENDPOINTS: Record<string, string> = {
  // Auth
  login: "auth/email-login/",
  signup: "auth/email-signup/",
  verifyOtp: "auth/verify-otp/",
  refreshAuthToken: "auth/refresh-token/",

  // Admin Auth
  adminLogin: "api/admin/auth/login/",
  adminProfile: "api/admin/auth/profile/",
  adminRefreshToken: "api/admin/auth/refresh/",

  // Store
  getProducts: "store/products/",
  getCategoryList: "store/categories/",
  getProductByCategory: "store/products/category/",

  // Cart
  getCartItems: "store/user-cart/",
  addToCart: "store/user-cart/",
  removeCartItem: "store/user-cart/",
  removeAllCartItems: "store/user-cart/",

  // Orders
  getOrders: "detail/orders/user/all/",
  getOrderById: "detail/orders/",
  submitOrder: "detail/orders/",
};

// ─── URL builder ─────────────────────────────────────────────

/**
 * Build a full API URL from a key.
 *
 * Usage:
 *   getEndpoint("login")                        → "https://api.example.com/auth/email-login/"
 *   getEndpoint("login", "extra/path/")         → "https://api.example.com/auth/email-login/extra/path/"
 *   getEndpoint("getOrderById", "123")          → "https://api.example.com/detail/orders/123/"
 *
 * @param key   - One of the keys defined in ENDPOINTS above
 * @param param - Optional extra path segment to append
 * @returns The full absolute URL
 */
export function getEndpoint(key: string, param?: string): string {
  const path = ENDPOINTS[key];
  if (!path) {
    throw new Error(`Unknown endpoint key: "${key}". Check amart/lib/endpoint.ts`);
  }

  // Ensure BASE_URL ends with "/"
  const safeBase = baseUrl?.endsWith("/") ? baseUrl : `${baseUrl}/`;

  // Ensure path starts with "/" if it doesn't already
  const safePath = path.startsWith("/") ? path : `/${path}`;

  let url = `${safeBase}${safePath}`;

  // Append optional param
  if (param) {
    const safeParam = param.startsWith("/") ? param.slice(1) : param;
    const safeParamEnd = safeParam.endsWith("/") ? safeParam : `${safeParam}/`;
    url += safeParamEnd;
  }

  // Ensure trailing slash
  if (!url.endsWith("/")) {
    url += "/";
  }

  return url;
}


