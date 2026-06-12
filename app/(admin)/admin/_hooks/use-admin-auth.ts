"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login as loginService,
  getProfile,
  logout as logoutService,
  hasPermission,
} from "@/lib/services/auth.service";
import type { AdminRole, AdminLoginCredentials, Permission } from "@/lib/admin-types";
import { toast } from "sonner";

// ==============================
// ADMIN AUTH HOOK
// ==============================

export function useAdminAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_access_token");
    const userData = localStorage.getItem("admin_user");
    if (token && userData) {
      setIsAuthenticated(true);
    }
    setIsInitialized(true);
  }, []);

  const {
    data: user,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const result = await getProfile();
      if (result.success && result.data) {
        return result.data;
      }
      return null;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });

  const login = useCallback(
    async (credentials: AdminLoginCredentials) => {
      setIsLoggingIn(true);
      try {
        const result = await loginService(credentials);

        localStorage.setItem("admin_access_token", result.data!.tokens.access_token);
        localStorage.setItem("admin_refresh_token", result.data!.tokens.refresh_token);
        localStorage.setItem("admin_user", JSON.stringify(result.data!.user));
        localStorage.setItem("admin_role", result.data!.user.role);
        // Set a simple cookie so middleware can detect the session
        document.cookie = `admin_access_token=${result.data!.tokens.access_token}; path=/; max-age=${60 * 60 * 24}; SameSite=Strict`;
        setIsAuthenticated(true);
        queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
        toast.success("Welcome to Admin Panel");
        router.push("/admin");
      } finally {
        setIsLoggingIn(false);
      }
    },
    [queryClient, router]
  );

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await logoutService();
      setIsAuthenticated(false);
      queryClient.clear();
      router.push("/admin/login");
      toast.success("Logged out successfully");
    } finally {
      setIsLoggingOut(false);
    }
  }, [queryClient, router]);

  const checkPermission = useCallback(
    (permission: Permission) => {
      return hasPermission((user?.role as AdminRole) || null, permission);
    },
    [user]
  );

  const getStoredRole = (): AdminRole | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("admin_role") as AdminRole | null;
  };

  return {
    user: user ?? null,
    role: (user?.role as AdminRole) || getStoredRole(),
    isAuthenticated,
    isInitialized,
    isLoading: isLoggingIn || profileLoading,
    isLoggingOut,
    login,
    logout,
    checkPermission,
    refetchProfile,
  };
}

// ==============================
// PERMISSION HOOK
// ==============================
export function usePermissions() {
  const { user } = useAdminAuth();
  const role = (user?.role as AdminRole) || null;

  const can = useCallback(
    (permission: Permission) => hasPermission(role, permission),
    [role]
  );

  return { role, can };
}
