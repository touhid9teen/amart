"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { adminGetProfile, adminLogout } from "@/lib/admin-actions";
import { hasPermission } from "@/lib/services/auth.service";
import {
  getAdminToken,
  getAdminStoredUser,
  getAdminStoredRole,
  clearAdminSession,
} from "@/lib/cookie-utils";
import type { AdminRole, ApiAdminUser, Permission } from "@/lib/admin-types";
import { toast } from "sonner";

// ==============================
// ADMIN AUTH HOOK
// ==============================

export function useAdminAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<ApiAdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // On mount: check cookie + localStorage, then fetch profile from server
  useEffect(() => {
    const token = getAdminToken();
    const stored = getAdminStoredUser();

    if (token) {
      setIsAuthenticated(true);
      setUser(stored);

      // Background profile refresh via server action
      adminGetProfile()
        .then((res) => {
          if (res.success && res.data) {
            setUser(res.data);
            localStorage.setItem("admin_user", JSON.stringify(res.data));
          }
        })
        .catch(() => {
          // Profile failed — keep stored data
        });
    }

    setIsInitialized(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      // Login is now handled directly in the login page via adminLogin server action.
      // This is kept as a fallback / convenience for other consumers.
      setIsLoading(true);
      try {
        const { adminLogin } = await import("@/lib/admin-actions");
        const result = await adminLogin(credentials);

        if (!result.success) {
          throw new Error(result.message || "Login failed");
        }

        if (result.data) {
          localStorage.setItem("admin_user", JSON.stringify(result.data.user));
          localStorage.setItem("admin_role", result.data.user.role);
          setUser(result.data.user);
        }

        setIsAuthenticated(true);
        queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
        toast.success("Welcome to Admin Panel");
        router.push("/admin");
      } finally {
        setIsLoading(false);
      }
    },
    [queryClient, router]
  );

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await adminLogout();
      clearAdminSession();
      setIsAuthenticated(false);
      setUser(null);
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

  const role: AdminRole | null = (user?.role as AdminRole) || (getAdminStoredRole() as AdminRole | null);

  return {
    user,
    role,
    isAuthenticated,
    isInitialized,
    isLoading,
    isLoggingOut,
    login,
    logout,
    checkPermission,
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
