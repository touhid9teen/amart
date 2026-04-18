"use client";

import {
  logoutUserServer,
  refreshAuthTokenServer
} from "@/lib/actions";
import {
  checkAuthState,
  getStoredAuthData,
  isTokenExpired,
  removeStoredAuthData,
} from "@/lib/auth-utils";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

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
  logout: () => void;
  isAuthLoading: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setAuthState: (state: AuthState) => void;
  setAuthId: (id: string | null) => void;
  getValidAuthToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>("unauthenticated");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authId, setAuthId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const isAuthLoading = isActionLoading;

  useEffect(() => {
    // --- Rehydrate auth state ---
    const { token, id, email: storedEmail } = getStoredAuthData();
    const state = checkAuthState();
    
    setAuthState(state);
    
    if (token && state === "authenticated") {
      setAuthToken(token);
      setAuthId(id || null);
    }
    
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



 


  // isTokenExpired is now imported from @/lib/auth-utils

  const refreshAuthToken = async () => {
    try {
      const result = await refreshAuthTokenServer();
      if (!result?.success || !result?.data?.access_token) {
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
    removeStoredAuthData();
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
        logout,
        isAuthLoading,
        isLoading,
        setIsLoading,
        setAuthState,
        setAuthId,
        // productList,
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
