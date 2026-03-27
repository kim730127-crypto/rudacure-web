import { NextRequest, NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path already has a locale prefix
  const hasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) return NextResponse.next();

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Detect preferred language from Accept-Language header
  const acceptLang = request.headers.get("accept-language") || "";
  const preferredLocale = acceptLang.includes("ko") ? "ko"
    : acceptLang.includes("zh") ? "zh"
    : acceptLang.includes("ja") ? "ja"
    : acceptLang.includes("es") ? "es"
    : acceptLang.includes("fr") ? "fr"
    : "en";

  // Redirect to locale-prefixed path
  const locale = preferredLocale || DEFAULT_LOCALE;
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
};
