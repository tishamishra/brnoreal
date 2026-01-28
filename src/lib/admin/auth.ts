"use client";

// Re-export NextAuth functions for backward compatibility
export { useSession, logout, useIsAuthenticated } from "@/lib/auth/client";

// Legacy functions - now use NextAuth
export function isAdminAuthenticated(): boolean {
  // This is now handled by NextAuth session
  // Keep for backward compatibility but it won't work properly
  // Use useIsAuthenticated() hook instead
  if (typeof window === "undefined") return false;
  return false; // Always return false, use NextAuth session instead
}

export function setAdminAuthenticated(value: boolean) {
  // No-op - authentication is now handled by NextAuth
  // This function is kept for backward compatibility
}

export function logoutAdmin() {
  // Use NextAuth logout instead
  const { logout } = require("@/lib/auth/client");
  logout();
}

