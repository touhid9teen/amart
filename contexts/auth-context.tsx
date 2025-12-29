"use client";

import { GetQuery } from "@/lib/queries";
import { countryCodes } from "@/lib/variables";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { jwtDecode as jwt_decode } from "jwt-decode";
import {
  loginWithEmail,
  verifyOtpServer,
  refreshAuthTokenServer,
  setCookie,
  logoutUserServer,
  signupWithEmail,
} from "@/lib/actions";
import { Category, Product } from "@/lib/types";

export type AuthState =
  | "unauthenticated"
  | "login"
  | "signup"
  | "verifying"
  | "authenticated";

interface AuthContextType {
  authState: AuthState;
  authToken: string | null;
  authId: string | null;
  email: string;
  setEmail: (email: string) => void;
  showLoginModal: () => void;
  showSignUpModal: () => void;
  showVerificationModal: () => void;
  hideModals: () => void;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  categoryList: Category[];
  productList: Product[];
  getValidAuthToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>("unauthenticated");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authId, setAuthId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [categoryList, setCategoryList] = useState<Category[]>([]);
  // const [productList, setProductList] = useState<Product[]>([]);

  const { data: categoryList = [], isLoading: isCategoryLoading } = GetQuery(
    "getCategoryList",
    {},
    true,
    null,
    Infinity
  );
  const { data: productList = [], isLoading: isProductLoading } = GetQuery(
    "getProducts",
    {},
    true,
    null,
    Infinity
  );

  const isLoading = isCategoryLoading || isProductLoading;

  // useEffect(() => {
  //   async function fetchData() {
  //     setIsLoading(true); // start loading

  //     try {
  //       const categoryResult = await GetQuery(
  //         "getCategoryList",
  //         {},
  //         true,
  //         null,
  //         Infinity
  //       );
  //       const productResult = await GetQuery(
  //         "getProducts",
  //         {},
  //         true,
  //         null,
  //         Infinity
  //       );

  //       setCategoryList(categoryResult.data ? categoryResult : []);
  //       setProductList(productResult.data ? productResult : []);
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //       setCategoryList([]);
  //       setProductList([]);
  //     } finally {
  //       setIsLoading(false); // finish loading
  //     }
  //   }

  //   fetchData();
  // }, []);

  // Rehydrate auth state from cookies/localStorage on mount
  useEffect(() => {
    // --- Rehydrate auth state from cookies ---
    function getCookieValue(name: string): string | null {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    }
    const token = getCookieValue("authToken");
    const id = getCookieValue("authId");
    if (token) {
      setAuthState("authenticated");
      setAuthToken(token);
      setAuthId(id || null);
    }
    // --- Rehydrate email from localStorage ---
    const storedEmail =
      typeof window !== "undefined" ? localStorage.getItem("email") : null;
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Persist email to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (email) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }
    }
  }, [email]);

  const showLoginModal = () => {
    setAuthState("login");
  };

  const showSignUpModal = () => {
    setAuthState("signup");
  };

  const showVerificationModal = () => {
    setAuthState("verifying");
  };

  const hideModals = () => {
    if (authState !== "authenticated") {
      setAuthState("unauthenticated");
      setAuthToken(null);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const result = await signupWithEmail(email, password);

      console.log("result-------------------------------", result);

      if (!result.success) {
        throw new Error(result.message || "Something went wrong");
      }
      setEmail(email); // Persist email
      setAuthState("verifying");
      toast("OTP Sent", {
        description: "Please check your email for the verification code",
      });
    } catch {
      toast.error("Error", {
        description: "Failed to send OTP",
      });
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const result = await loginWithEmail(email, password);

      if (!result.success) {
        throw new Error(result.message || "Something went wrong");
      }

      // Set tokens in state after successful verification
      if (result.data?.access_token) {
        await setTokens(
          result.data.access_token,
          result.data.refresh_token || ""
        );
      }
      if (result.data?.user_id) {
        setAuthId(result.data.user_id);
      }
      // Set email if present in response
      if (result.data?.email) {
        setEmail(result.data.email);
      }
      setEmail(email); // Persist email
      setAuthState("authenticated");

      toast("Welcome Back!", {
        description: "You've logged in successfully.",
      });
    } catch {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const setTokens = async (access: string, refresh: string) => {
    try {
      await setCookie("authToken", access);
      setAuthToken(access);
      if (refresh) {
        await setCookie("refreshToken", refresh);
      }
    } catch {
      // Optionally handle error
    }
  };

  const isTokenExpired = (token: string | null) => {
    if (!token) return true;
    try {
      const decoded = jwt_decode<{ exp?: number }>(token);
      if (!decoded.exp) return true;
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  const refreshAuthToken = async () => {
    try {
      const result = await refreshAuthTokenServer();
      if (!result.success || !result.data?.access_token) {
        logout();
        return null;
      }
      setTokens(result.data.access, result.data.refresh_token || "");
      return result.data.access_token;
    } catch {
      logout();
      return null;
    }
  };

  // On mount, check if token is expired and refresh if needed
  useEffect(() => {
    const checkAndRefresh = async () => {
      const token = authToken;
      // Use rehydrated authToken, not localStorage or cookies
      if (token && isTokenExpired(token)) {
        await refreshAuthToken();
      }
    };
    checkAndRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const verifyOtp = async (otp: string) => {
    try {
      await verifyOtpServer(email, otp);
      toast("Welcome!", {
        description: "Signup completed successfully.",
      });
    } catch {
      toast.error("Error", {
        description: "Failed to verify OTP",
      });
    }
  };

  // Utility to get a valid token, refreshing if needed
  const getValidAuthToken = async (): Promise<string | null> => {
    let token = authToken;
    if (!token || isTokenExpired(token)) {
      token = await refreshAuthToken();
      if (!token) return null;
    }
    return token;
  };

  const logout = async () => {
    setAuthState("unauthenticated");
    setEmail(""); // This will also clear from localStorage
    setAuthToken(null);
    setAuthId(null);
    try {
      await logoutUserServer();
    } catch {
      // Optionally handle error
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        authToken,
        authId,
        email,
        setEmail,
        showLoginModal,
        showSignUpModal,
        showVerificationModal,
        hideModals,
        signup,
        login,
        verifyOtp,
        logout,
        isLoading,
        categoryList,
        productList,
        getValidAuthToken, // Expose utility
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
