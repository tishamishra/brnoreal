import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/config";

const handler = NextAuth(authOptions);

// Export handlers for Next.js 16 App Router
export const GET = handler;
export const POST = handler;
