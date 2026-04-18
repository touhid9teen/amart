"use client";

import { checkAuthState, getStoredAuthData } from "@/lib/auth-utils";
import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

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
  setIsAuthLoading: (loading: boolean) => void;
  setAuthState: (state: AuthState) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>("unauthenticated");
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
      email,
      setEmail,
      showLoginModal: () => setAuthState("login"),
      showSignUpModal: () => setAuthState("signup"),
      showVerificationModal: () => setAuthState("verifying"),
      hideModals: () =>
        setAuthState((c) => (c !== "authenticated" ? "unauthenticated" : c)),
      isAuthLoading,
      setIsAuthLoading,
      isLoading,
      setIsLoading,
      setAuthState,
    }),
    [authState, email, isAuthLoading, isLoading],
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
