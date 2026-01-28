import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const locales = ['en', 'cs'];
const defaultLocale = 'en';

// Czech Republic country codes
const czechCountries = ['CZ', 'SK']; // Including Slovakia as they also speak Czech

// Get locale from pathname
function getLocale(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0])) {
    return segments[0];
  }
  return null;
}

// Get country from request headers (Vercel/Cloudflare provide this)
function getCountryFromHeaders(request: NextRequest): string | null {
  // Vercel provides country in headers
  const country = request.headers.get('x-vercel-ip-country') || 
                  request.headers.get('cf-ipcountry') || // Cloudflare
                  request.headers.get('x-country-code');
  return country;
}

// Get browser language preference
function getBrowserLanguage(request: NextRequest): string | null {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return null;
  
  // Check if Czech is preferred
  if (acceptLanguage.toLowerCase().includes('cs')) {
    return 'cs';
  }
  return null;
}

// Detect preferred locale based on:
// 1. Stored cookie preference
// 2. Country (if Czech Republic)
// 3. Browser language
// 4. Default to English
function detectLocale(request: NextRequest): string {
  // Check cookie first (user preference)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Check country
  const country = getCountryFromHeaders(request);
  if (country && czechCountries.includes(country)) {
    return 'cs';
  }

  // Check browser language
  const browserLang = getBrowserLanguage(request);
  if (browserLang) {
    return browserLang;
  }

  // Default to English
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // Protect admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Must match the secret in src/lib/auth/config.ts
    const secret = process.env.NEXTAUTH_SECRET || "brno-real-estate-fallback-secret-key-32chars";

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

  // Skip locale routing for:
  // - API routes
  // - Static files (_next, images, etc.)
  // - Admin routes (already handled above)
  // - Sitemap and robots
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Redirect non-www to www (only in production)
  const isProduction = process.env.NODE_ENV === 'production';
  const productionDomain = 'brnorealestate.com';
  
  if (isProduction && hostname === productionDomain) {
    const url = request.nextUrl.clone();
    url.hostname = `www.${productionDomain}`;
    return NextResponse.redirect(url, 301); // Permanent redirect
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = getLocale(pathname);

  // If locale is already in pathname, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect preferred locale
  const locale = detectLocale(request);

  // Redirect to locale-prefixed path (using absolute URL)
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  // Set locale cookie
  const response = NextResponse.redirect(url);
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });

  return response;
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
