"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { countryCodes } from "@/lib/variables";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { jwtDecode as jwt_decode } from "jwt-decode";

type AuthState = "unauthenticated" | "login" | "verifying" | "authenticated";

interface AuthContextType {
  authState: AuthState;
  authToken: string | null;
  authId: string | null;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  showLoginModal: () => void;
  showVerificationModal: () => void;
  hideModals: () => void;
  login: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  categoryList: Category[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>("unauthenticated");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authId, setAuthId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("authId");
    if (token) {
      setAuthState("authenticated");
      setAuthToken(token);
      setAuthId(id);
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await GlobalApi.getCategoryList();
        if (Array.isArray(res)) {
          setCategoryList(res);
        } else {
          setCategoryList([]);
        }
      } catch (error) {
        setCategoryList([]);
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const showLoginModal = () => {
    setAuthState("login");
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

  const login = async (phone: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/auth/phone-login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_code: countryCodes[0].code as string,
          phone_number: phone,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setPhoneNumber(phone);
      setAuthState("verifying");

      toast("OTP Sent", {
        description: "Please check your phone for the verification code",
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to send OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };

  const setTokens = (access: string, refresh: string) => {
    localStorage.setItem("authToken", access);
    setAuthToken(access);
    if (refresh) {
      localStorage.setItem("refreshToken", refresh);
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
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      logout();
      return null;
    }
    try {
      const response = await fetch(`${baseUrl}/auth/refresh-token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      const data = await response.json();
      if (!response.ok || !data.access) {
        logout();
        return null;
      }
      setTokens(data.access, data.refresh || refreshToken);
      return data.access;
    } catch (error) {
      logout();
      return null;
    }
  };

  // On mount, check if token is expired and refresh if needed
  useEffect(() => {
    const checkAndRefresh = async () => {
      const token = localStorage.getItem("authToken");
      const refreshToken = getRefreshToken();
      if (token && isTokenExpired(token) && refreshToken) {
        await refreshAuthToken();
      }
    };
    checkAndRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyOtp = async (otp: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/auth/verify-otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country_code: countryCodes[0].code as string,
          phone_number: phoneNumber,
          phoneNumber,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP");
      }

      // Store auth token and refresh token
      if (data.access_token) {
        setTokens(data.access_token, data.refresh_token);
        // Set cookie for server-side auth (middleware)
        document.cookie = `authToken=${data.access_token}; path=/;`;
      }
      if (data.user_id) {
        localStorage.setItem("authId", data.user_id);
        setAuthId(data.user_id);
      }

      setAuthState("authenticated");

      toast("Success", {
        description: "Phone number verified successfully",
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error", {
        description:
          error instanceof Error ? error.message : "Failed to verify OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("authId");
    setAuthState("unauthenticated");
    setPhoneNumber("");
    setAuthToken(null);
    setAuthId(null);
    // Remove cookies by setting them to expired
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        authToken,
        authId,
        phoneNumber,
        setPhoneNumber,
        showLoginModal,
        showVerificationModal,
        hideModals,
        login,
        verifyOtp,
        logout,
        isLoading,
        categoryList,
        // numberOfCartItems,
        // handleCartItemCountChange,
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
