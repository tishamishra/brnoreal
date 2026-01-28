import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Import the proxy function for locale handling
import { proxy } from "./proxy";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Get NEXTAUTH_SECRET from Vercel environment variables
    // If not set, use a fallback (not recommended for production)
    const secret = process.env.NEXTAUTH_SECRET || "fallback-secret-not-secure";
    
    if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === "production") {
      console.warn("⚠️ NEXTAUTH_SECRET not set in Vercel - using fallback (not secure!)");
    }

    const token = await getToken({
      req: request,
      secret: secret,
    });

    // If no token or user is not admin, redirect to login
    if (!token || token.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Handle locale routing for non-admin routes
  return proxy(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
