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

        // Get admin credentials from Vercel environment variables
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD?.trim();

        // Debug log (remove in production)
        console.log("Login attempt:", { email, hasPassword: !!password, hasAdminEmail: !!adminEmail, hasAdminPassword: !!adminPassword });

        // Ensure password is set in Vercel
        if (!adminPassword) {
          console.error("ADMIN_PASSWORD environment variable is not set");
          return null;
        }

        // If ADMIN_EMAIL is set, require both email and password match
        if (adminEmail) {
          if (email === adminEmail && password === adminPassword) {
            console.log("Login success with email");
            return {
              id: "admin",
              email: adminEmail,
              name: "Admin",
              role: "admin",
            };
          }
        } else {
          // If no ADMIN_EMAIL, allow password-only login
          if (password === adminPassword) {
            console.log("Login success with password only");
            return {
              id: "admin",
              email: "admin@brnorealestate.com",
              name: "Admin",
              role: "admin",
            };
          }
        }

        console.log("Login failed - credentials mismatch");
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
    maxAge: 24 * 60 * 60, // 24 hours
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
  secret: process.env.NEXTAUTH_SECRET || "brno-real-estate-fallback-secret-key-32chars",
};
