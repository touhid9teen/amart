"use client";

import { checkAuthState, getStoredAuthData } from "@/lib/auth-utils";
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
  email: string;
  setEmail: (email: string) => void;
  showLoginModal: () => void;
  showSignUpModal: () => void;
  showVerificationModal: () => void;
  hideModals: () => void;
  isAuthLoading: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setAuthState: (state: AuthState) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>("unauthenticated");
  const [email, setEmail] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthLoading = isActionLoading;

  useEffect(() => {
    // --- Rehydrate auth state ---
    const { email: storedEmail } = getStoredAuthData();
    const state = checkAuthState();

    setAuthState(state);

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
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        email,
        setEmail,
        showLoginModal,
        showSignUpModal,
        showVerificationModal,
        hideModals,
        isAuthLoading,
        isLoading,
        setIsLoading,
        setAuthState,
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
