// ========================================
// Admin Cookie Utilities
// ========================================
// Client-side helpers for reading/writing admin auth cookies.
// Server-side cookie management uses next/headers `cookies()`.

const COOKIE_OPTIONS = "path=/; max-age=86400; SameSite=Strict";

// ─── Get ─────────────────────────────────────

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

// ─── Set ─────────────────────────────────────

export function setCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; ${COOKIE_OPTIONS}`;
}

// ─── Remove ──────────────────────────────────

export function removeCookie(name: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Strict`;
}

// ─── Admin Auth Cookies (typed helpers) ──────

const ADMIN_TOKEN_KEY = "admin_access_token";
const ADMIN_REFRESH_KEY = "admin_refresh_token";

export function getAdminToken(): string | null {
  return getCookie(ADMIN_TOKEN_KEY);
}

export function getAdminRefreshToken(): string | null {
  return getCookie(ADMIN_REFRESH_KEY);
}

export function setAdminTokens(accessToken: string, refreshToken: string): void {
  setCookie(ADMIN_TOKEN_KEY, accessToken);
  setCookie(ADMIN_REFRESH_KEY, refreshToken);
}

export function removeAdminTokens(): void {
  removeCookie(ADMIN_TOKEN_KEY);
  removeCookie(ADMIN_REFRESH_KEY);
}

// ─── Admin LocalStorage ──────────────────────

const ADMIN_USER_KEY = "admin_user";
const ADMIN_ROLE_KEY = "admin_role";

export function getAdminStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAdminStoredUser(user: unknown): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
}

export function getAdminStoredRole(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_ROLE_KEY);
}

export function setAdminStoredRole(role: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_ROLE_KEY, role);
}

export function clearAdminSession(): void {
  removeAdminTokens();
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_USER_KEY);
    localStorage.removeItem(ADMIN_ROLE_KEY);
  }
}
