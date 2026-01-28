import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Get admin credentials from Vercel environment variables
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        
        // Ensure both are set in Vercel
        if (!adminPassword) {
          console.error("ADMIN_PASSWORD environment variable is not set in Vercel");
          return null;
        }
        
        if (!adminEmail) {
          console.error("ADMIN_EMAIL environment variable is not set in Vercel");
          // If email is not set, allow password-only login
          if (credentials?.password && credentials.password === adminPassword) {
            return {
              id: "admin",
              email: "admin@brnorealestate.com",
              name: "Admin",
              role: "admin",
            };
          }
          return null;
        }
        
        // Verify both email and password against Vercel environment variables
        if (
          credentials?.email &&
          credentials?.password &&
          credentials.email.toLowerCase() === adminEmail.toLowerCase() &&
          credentials.password === adminPassword
        ) {
          return {
            id: "admin",
            email: adminEmail,
            name: "Admin",
            role: "admin",
          };
        }
        
        // Fallback: If email not provided but password matches, allow login
        if (!credentials?.email && credentials?.password === adminPassword) {
          return {
            id: "admin",
            email: adminEmail,
            name: "Admin",
            role: "admin",
          };
        }

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
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || (() => {
    // Generate a fallback secret if not set (not recommended for production)
    const fallbackSecret = "fallback-secret-change-in-production-" + Date.now();
    if (process.env.NODE_ENV === "production") {
      console.warn("⚠️ NEXTAUTH_SECRET not set in Vercel - using fallback (not secure!)");
    }
    return fallbackSecret;
  })(),
};
