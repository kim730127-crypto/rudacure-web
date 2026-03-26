"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";

/* ── Flag icons as image files (works on all platforms) ── */
function Flag({ code, className = "w-5 h-3.5" }: { code: string; className?: string }) {
  const src: Record<string, string> = {
    kr: "/images/flag-kr.svg",
    us: "/images/flag-us.svg",
    cn: "/images/flag-cn.svg",
    jp: "/images/flag-jp.svg",
    es: "/images/flag-es.svg",
  };
  return <img src={src[code] || ""} alt={code.toUpperCase()} className={className} />;
}

const LANG_OPTIONS = [
  { locale: "ko", flag: "kr", label: "KR" },
  { locale: "en", flag: "us", label: "EN" },
  { locale: "zh", flag: "cn", label: "CN" },
  { locale: "ja", flag: "jp", label: "JP" },
  { locale: "es", flag: "es", label: "ES" },
] as const;

const NAV_KEYS = [
  { key: "science", tKey: "nav.science" as const },
  { key: "pipeline", tKey: "nav.pipeline" as const },
  { key: "ir", tKey: "nav.ir" as const },
  { key: "news", tKey: "nav.news" as const },
  { key: "publications", tKey: "nav.publications" as const },
  { key: "sab", tKey: "nav.sab" as const },
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

  const pathWithoutLocale = pathname.replace(/^\/(ko|en|zh|ja|es)/, "") || "";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "navbar-scrolled" : "glass"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[72px] flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center group">
          <Image
            src="/images/logo_full.png"
            alt="RudaCure"
            width={180}
            height={40}
            className="transition-opacity duration-300 group-hover:opacity-80"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-teal-700"
                  : "text-gray-600 hover:text-gray-900"
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
        <div className="hidden md:flex items-center text-xs font-medium gap-0.5">
          {LANG_OPTIONS.map((lang, i) => (
            <span key={lang.locale} className="flex items-center">
              {i > 0 && <span className="text-gray-200 mx-0.5">|</span>}
              <Link
                href={`/${lang.locale}${pathWithoutLocale}`}
                className={`flex items-center gap-1 px-1.5 py-1 rounded transition-colors ${locale === lang.locale ? "text-teal-700" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Flag code={lang.flag} className="w-4 h-3 rounded-[2px] overflow-hidden shadow-sm" />
                {lang.label}
              </Link>
            </span>
          ))}
        </div>

        <button
          className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
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
          <div className="flex flex-wrap gap-2 pt-3 mt-2 border-t border-gray-100">
            {LANG_OPTIONS.map((lang) => (
              <Link
                key={lang.locale}
                href={`/${lang.locale}${pathWithoutLocale}`}
                className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 ${locale === lang.locale ? "bg-teal-50 text-teal-700" : "text-gray-600"}`}
                onClick={() => setMobileOpen(false)}
              >
                <Flag code={lang.flag} className="w-4 h-3 rounded-[2px]" /> {lang.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
