import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

        console.log("Auth attempt:", { 
          emailProvided: !!email, 
          passwordProvided: !!password,
          adminEmailSet: !!adminEmail,
          adminPasswordSet: !!adminPassword
        });

        if (!adminPassword) {
          console.error("NEXT_PUBLIC_ADMIN_PASSWORD not configured");
          return null;
        }

        const emailMatch = !adminEmail || (email?.toLowerCase().trim() === adminEmail.toLowerCase().trim());
        const passwordMatch = password?.trim() === adminPassword.trim();

        if (emailMatch && passwordMatch) {
          console.log("Auth success");
          return {
            id: "1",
            name: "Admin",
            email: adminEmail || "admin@brnorealestate.com",
            role: "admin",
          };
        }

        console.log("Auth failed - credentials mismatch");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = (auth?.user as any)?.role === "admin";
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
      const isLoginPage = request.nextUrl.pathname === "/admin/login";

      if (isAdminRoute && !isLoginPage) {
        return isLoggedIn && isAdmin;
      }

      return true;
    },
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || "brno-fallback-secret-key-32characters",
};
