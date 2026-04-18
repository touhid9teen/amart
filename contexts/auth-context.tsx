"use client";

import { checkAuthState, getStoredAuthData } from "@/lib/auth-utils";
import type React from "react";
import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";

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
    // --- Rehydrate auth state ---
    const { email: storedEmail } = getStoredAuthData();
    const state = checkAuthState();

    setAuthState(state);

    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Removed redundant localStorage sync based on user instruction

  const showLoginModal = useCallback(() => {
    setAuthState("login");
  }, []);

  const showSignUpModal = useCallback(() => {
    setAuthState("signup");
  }, []);

  const showVerificationModal = useCallback(() => {
    setAuthState("verifying");
  }, []);

  const hideModals = useCallback(() => {
    setAuthState((current) => (current !== "authenticated" ? "unauthenticated" : current));
  }, []);

  const contextValue = useMemo(
    () => ({
      authState,
      email,
      setEmail,
      showLoginModal,
      showSignUpModal,
      showVerificationModal,
      hideModals,
      isAuthLoading,
      setIsAuthLoading,
      isLoading,
      setIsLoading,
      setAuthState,
    }),
    [
      authState,
      email,
      showLoginModal,
      showSignUpModal,
      showVerificationModal,
      hideModals,
      isAuthLoading,
      isLoading,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
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
