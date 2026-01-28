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
 */
export function useIsAuthenticated(): boolean {
  const { data: session, status } = useSession();
  return status === "authenticated" && session?.user?.role === "admin";
}
