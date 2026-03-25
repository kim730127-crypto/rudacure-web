"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";

const NAV_KEYS = [
  { key: "science", tKey: "nav.science" as const },
  { key: "pipeline", tKey: "nav.pipeline" as const },
  { key: "ir", tKey: "nav.ir" as const },
  { key: "news", tKey: "nav.news" as const },
  { key: "about", tKey: "nav.about" as const },
  { key: "contact", tKey: "nav.contact" as const },
];

export function Navbar({ locale = "ko" }: { locale?: Locale }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = getTranslations(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = NAV_KEYS.map((n) => ({
    href: `/${locale}/${n.key}`,
    label: t(n.tKey),
  }));

  const pathWithoutLocale = pathname.replace(/^\/(ko|en)/, "") || "";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "navbar-scrolled" : "glass"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <Image
            src="/images/logo_transparent.png"
            alt="RudaCure"
            width={32}
            height={32}
            className="rounded transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-lg font-semibold tracking-tight text-gray-900 group-hover:text-teal-700 transition-colors">
            RudaCure
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-teal-700"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {link.label}
              {pathname.startsWith(link.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Language toggle */}
        <div className="hidden md:flex items-center gap-0.5 text-xs bg-gray-100 rounded-full p-0.5">
          <Link
            href={`/ko${pathWithoutLocale}`}
            className={`px-3 py-1 rounded-full transition-all ${locale === "ko" ? "bg-white text-teal-700 font-medium shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            KR
          </Link>
          <Link
            href={`/en${pathWithoutLocale}`}
            className={`px-3 py-1 rounded-full transition-all ${locale === "en" ? "bg-white text-teal-700 font-medium shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
          >
            EN
          </Link>
        </div>

        <button
          className="md:hidden text-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 space-y-1 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                pathname.startsWith(link.href) ? "text-teal-700 bg-teal-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-3 mt-2 border-t border-gray-100">
            <Link href={`/ko${pathWithoutLocale}`} className={`text-xs px-3 py-1.5 rounded-full ${locale === "ko" ? "bg-teal-50 text-teal-700" : "text-gray-400"}`}>KR</Link>
            <Link href={`/en${pathWithoutLocale}`} className={`text-xs px-3 py-1.5 rounded-full ${locale === "en" ? "bg-teal-50 text-teal-700" : "text-gray-400"}`}>EN</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
