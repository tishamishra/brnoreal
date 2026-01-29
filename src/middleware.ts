import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const locales = ['en', 'cs'];
const defaultLocale = 'en';
const czechCountries = ['CZ', 'SK'];

function getLocale(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0])) {
    return segments[0];
  }
  return null;
}

function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const country = request.headers.get('x-vercel-ip-country') || 
                  request.headers.get('cf-ipcountry') || 
                  request.headers.get('x-country-code');
  if (country && czechCountries.includes(country)) {
    return 'cs';
  }

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage?.toLowerCase().includes('cs')) {
    return 'cs';
  }

  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname, hostname } = request.nextUrl;

  // Admin route protection (except login page)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const secret = process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || "brno-fallback-secret-key-32characters";
    
    const token = await getToken({ 
      req: request, 
      secret,
      cookieName: process.env.NODE_ENV === "production" 
        ? "__Secure-authjs.session-token" 
        : "authjs.session-token"
    });

    console.log("Middleware check:", { pathname, hasToken: !!token, role: token?.role });

    if (!token || token.role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  // Skip locale routing for special paths
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

  // Redirect non-www to www in production
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction && hostname === 'brnorealestate.com') {
    const url = request.nextUrl.clone();
    url.hostname = 'www.brnorealestate.com';
    return NextResponse.redirect(url, 301);
  }

  // Locale routing
  const pathnameHasLocale = getLocale(pathname);
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
