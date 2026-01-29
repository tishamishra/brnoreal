import { auth } from "./nextauth";

export async function getSession() {
  return await auth();
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session && (session.user as any)?.role === "admin";
}

export async function requireAuth() {
  const session = await getSession();
  if (!session || (session.user as any)?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
}
