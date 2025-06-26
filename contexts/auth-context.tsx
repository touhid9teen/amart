"use client";

import { GetQuery } from "@/lib/queries";
import { countryCodes } from "@/lib/variables";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useRehydrateAuth } from "./useRehydrateAuth";
import {
  loginWithPhone,
  verifyOtpServer,
  refreshAuthTokenServer,
  setCookie,
  logoutUserServer,
} from "@/lib/actions";
import type { Category } from "@/lib/types";

export type AuthState =
  | "unauthenticated"
  | "login"
  | "verifying"
  | "authenticated";

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
  const { data: categoryList = [] } = GetQuery("getCategoryList");
  const [isLoading, setIsLoading] = useState(false);

  // Rehydrate auth state from cookies on mount
  useRehydrateAuth(setAuthState, setAuthToken, setAuthId);

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
      const result = await loginWithPhone(
        phone,
        countryCodes[0].code as string
      );
      if (!result.success) {
        throw new Error(result.message || "Failed to send OTP");
      }
      setPhoneNumber(phone);
      setAuthState("verifying");
      toast("OTP Sent", {
        description: "Please check your phone for the verification code",
      });
    } catch {
      toast.error("Error", {
        description: "Failed to send OTP",
      });
    } finally {
      setIsLoading(false);
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
      if (!result.success || !result.data?.access) {
        logout();
        return null;
      }
      setTokens(result.data.access, result.data.refresh || "");
      return result.data.access;
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
    setIsLoading(true);
    try {
      const result = await verifyOtpServer(
        phoneNumber,
        countryCodes[0].code as string,
        otp
      );
      if (!result.success) {
        throw new Error(result.message || "Failed to verify OTP");
      }
      setAuthState("authenticated");
      toast("Success", {
        description: "Phone number verified successfully",
      });
    } catch {
      toast.error("Error", {
        description: "Failed to verify OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setAuthState("unauthenticated");
    setPhoneNumber("");
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
