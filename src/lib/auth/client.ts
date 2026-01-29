"use client";

import { useSession as useNextAuthSession, signOut } from "next-auth/react";

/**
 * Client-side hook to get the current session
 * Use this in Client Components
 */
export function useSession() {
  return useNextAuthSession();
}

/**
 * Client-side function to sign out
 */
export function logout() {
  signOut({ callbackUrl: "/admin/login" });
}

/**
 * Client-side check if user is authenticated
 * Returns: { isAuthenticated: boolean, isLoading: boolean }
 */
export function useIsAuthenticated(): { isAuthenticated: boolean; isLoading: boolean } {
  const { data: session, status } = useSession();
  return {
    isAuthenticated: status === "authenticated" && session?.user?.role === "admin",
    isLoading: status === "loading",
  };
}
