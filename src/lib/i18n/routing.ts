import type { Locale } from './translations';

export const locales: Locale[] = ['en', 'cs'];
export const defaultLocale: Locale = 'en';

// Get locale from pathname
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    return segments[0] as Locale;
  }
  return defaultLocale;
}

// Remove locale from pathname
export function removeLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
}

// Add locale to pathname
export function addLocaleToPath(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPath(pathname);
  if (cleanPath === '/') {
    return `/${locale}`;
  }
  return `/${locale}${cleanPath}`;
}

// Get pathname without locale
export function getPathnameWithoutLocale(pathname: string): string {
  return removeLocaleFromPath(pathname);
}

