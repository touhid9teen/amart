import { useEffect } from "react";
import type { AuthState } from "./auth-context";

// Helper to get a cookie value from document.cookie
function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function useRehydrateAuth(
  setAuthState: (state: AuthState) => void,
  setAuthToken: (token: string) => void,
  setAuthId: (id: string | null) => void
) {
  useEffect(() => {
    const token = getCookieValue("authToken");
    const id = getCookieValue("authId");
    if (token) {
      setAuthState("authenticated");
      setAuthToken(token);
      setAuthId(id || null);
    }
  }, [setAuthState, setAuthToken, setAuthId]);
}
