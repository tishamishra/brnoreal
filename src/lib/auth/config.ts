import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string" ? credentials.email.trim().toLowerCase() : undefined;
        const password =
          typeof credentials?.password === "string" ? credentials.password.trim() : undefined;

        // Get admin credentials from Vercel environment variables (NEXT_PUBLIC_ prefix)
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase();
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim();

        console.log("Login attempt:", { 
          email, 
          hasPassword: !!password, 
          hasAdminEmail: !!adminEmail, 
          hasAdminPassword: !!adminPassword 
        });

        if (!adminPassword) {
          console.error("NEXT_PUBLIC_ADMIN_PASSWORD not set");
          return null;
        }

        // Check credentials
        if (adminEmail) {
          if (email === adminEmail && password === adminPassword) {
            console.log("Login success");
            return {
              id: "admin",
              email: adminEmail,
              name: "Admin",
              role: "admin",
            };
          }
        } else {
          if (password === adminPassword) {
            console.log("Login success (password only)");
            return {
              id: "admin",
              email: "admin@brnorealestate.com",
              name: "Admin",
              role: "admin",
            };
          }
        }

        console.log("Login failed");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || "brno-fallback-secret-key-32characters",
};
