"use client";

import { checkAuthState, getStoredAuthData } from "@/lib/auth-utils";
import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AuthState =
  | "unauthenticated"
  | "authenticated";

export type AuthModalState = "closed" | "login" | "signup" | "verifying";

interface AuthContextType {
  authState: AuthState;
  authModal: AuthModalState;
  email: string;
  setEmail: (email: string) => void;
  showLoginModal: () => void;
  showSignUpModal: () => void;
  showVerificationModal: () => void;
  hideModals: () => void;
  isAuthLoading: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setIsAuthLoading: (loading: boolean) => void;
  setAuthState: (state: AuthState) => void;
  setAuthModal: (state: AuthModalState) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>("unauthenticated");
  const [authModal, setAuthModal] = useState<AuthModalState>("closed");
  const [email, setEmail] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { email: storedEmail } = getStoredAuthData();
    const state = checkAuthState();
    setAuthState(state);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const contextValue = useMemo(
    () => ({
      authState,
      authModal,
      email,
      setEmail,
      showLoginModal: () => setAuthModal("login"),
      showSignUpModal: () => setAuthModal("signup"),
      showVerificationModal: () => setAuthModal("verifying"),
      hideModals: () => setAuthModal("closed"),
      isAuthLoading,
      setIsAuthLoading,
      isLoading,
      setIsLoading,
      setAuthState,
      setAuthModal,
    }),
    [authState, authModal, email, isAuthLoading, isLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
