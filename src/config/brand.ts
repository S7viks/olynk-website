export const COMPANY_NAME = "Olynk";
export const PLATFORM_NAME = "Trita";

// Preferred lockup for formal surfaces (titles, footers, metadata).
export const BRAND_LOCKUP = `${PLATFORM_NAME} by ${COMPANY_NAME}`;

// Canonical host used for SEO canonical URLs and structured data.
// Keep this as a single source of truth to avoid mixed-domain metadata.
export const CANONICAL_BASE_URL = "https://olynk.ai";

export function absoluteUrl(pathname: string): string {
  if (!pathname) return CANONICAL_BASE_URL;
  if (pathname.startsWith("http://") || pathname.startsWith("https://")) return pathname;
  if (pathname.startsWith("/")) return `${CANONICAL_BASE_URL}${pathname}`;
  return `${CANONICAL_BASE_URL}/${pathname}`;
}

