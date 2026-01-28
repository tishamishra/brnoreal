import { getServerSession } from "next-auth";
import { authOptions } from "./config";

/**
 * Get the current session on the server side
 * Use this in Server Components, API routes, and Server Actions
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Check if user is authenticated as admin
 * Use this in Server Components, API routes, and Server Actions
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session && session.user?.role === "admin";
}

/**
 * Require authentication - throws error if not authenticated
 * Use this in API routes and Server Actions that require auth
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session || session.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
}
