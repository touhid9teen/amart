import { jwtDecode } from "jwt-decode";
import { AuthState } from "@/contexts/auth-context";

// Professional interface reflecting a standard PyJWT/Django payload
export interface AuthTokenPayload {
  exp: number;
  iat?: number;
  jti?: string;
  user_id?: string | number;
  email?: string;
  [key: string]: any;
}

// Helper to reliably get a cookie value on the client side
export function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}



// Handle getting auth data from storage (cookies / localStorage)
export function getStoredAuthData() {
  const token = getCookieValue("authToken");
  const id = getCookieValue("authId");
  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;
  
  return { token, id, email };
}

// Handle removing direct stored auth data
export function removeStoredAuthData(): void {
  // Clear any local storage items
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
}

// Safely decode the token payload without verifying the signature (which is the backend's job)
export function decodeAuthToken(token: string | null): AuthTokenPayload | null {
  if (!token) return null;
  try {
    return jwtDecode<AuthTokenPayload>(token);
  } catch (error) {
    console.error("Failed to decode auth token:", error);
    return null;
  }
}

// Check if a token has expired based on its 'exp' claim
export function isTokenExpired(token: string | null): boolean {
  const decoded = decodeAuthToken(token);
  if (!decoded || !decoded.exp) return true;
  
  // exp is in seconds, Date.now() is in milliseconds
  return decoded.exp * 1000 < Date.now();
}

// Check auth state by decoding the access token
export function checkAuthState(): AuthState {
  const { token } = getStoredAuthData();
  if (token && !isTokenExpired(token)) {
    return "authenticated";
  }
  return "unauthenticated";
}
