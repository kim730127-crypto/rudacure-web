"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";

/* ── Flag icons as image files (works on all platforms) ── */
function Flag({
  code,
  className = "w-5 h-3.5",
}: {
  code: string;
  className?: string;
}) {
  const src: Record<string, string> = {
    kr: "/images/flag-kr.svg",
    us: "/images/flag-us.svg",
    cn: "/images/flag-cn.svg",
    jp: "/images/flag-jp.svg",
    es: "/images/flag-es.svg",
    fr: "/images/flag-fr.svg",
    sa: "/images/flag-sa.svg",
  };
  return (
    <img src={src[code] || ""} alt={code.toUpperCase()} className={className} />
  );
}

const LANG_OPTIONS = [
  { locale: "ko", flag: "kr", label: "KR" },
  { locale: "en", flag: "us", label: "EN" },
  { locale: "zh", flag: "cn", label: "CN" },
  { locale: "ja", flag: "jp", label: "JP" },
  { locale: "es", flag: "es", label: "ES" },
  { locale: "fr", flag: "fr", label: "FR" },
  { locale: "ar", flag: "sa", label: "AR" },
] as const;

const NAV_KEYS = [
  { key: "science", tKey: "nav.science" as const },
  { key: "pipeline", tKey: "nav.pipeline" as const },
  { key: "cro", tKey: "nav.cro" as const },
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
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = getTranslations(locale);

  useEffect(() => {
    // 8px, not 20px: the bar must acquire its background before any body text
    // can slide underneath it.
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = NAV_KEYS.map((n) => ({
    href: `/${locale}/${n.key}`,
    label: t(n.tKey),
  }));

  const pathWithoutLocale =
    pathname.replace(/^\/(ko|en|zh|ja|es|fr|ar)/, "") || "";

  /* Only the homepage opens on a dark hero. Everywhere else the bar sits on a
     white page and must carry its chrome material from the first pixel —
     previously it was fully transparent at rest on every route, so scrolled
     body text collided with the logo and the menu. */
  const isHome = pathWithoutLocale === "" || pathWithoutLocale === "/";
  const overHero = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        overHero ? "navbar-top" : "navbar-scrolled"
      }`}
    >
      <div className="container-rc flex h-[68px] items-center justify-between">
        <Link href={`/${locale}`} className="group flex items-center">
          <Image
            src="/images/logo_full.png"
            alt="RudaCure"
            width={180}
            height={40}
            className={`h-8 w-auto transition-all duration-300 group-hover:opacity-80 ${
              overHero ? "brightness-0 invert" : ""
            }`}
            priority
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[0.8125rem] font-medium tracking-[-0.01em] transition-colors ${
                  overHero
                    ? active
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    : active
                      ? "text-[var(--rc-accent-deep)]"
                      : "text-[var(--rc-ink-600)] hover:text-[var(--rc-ink-900)]"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    className={`absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full ${
                      overHero ? "bg-white/80" : "bg-[var(--rc-accent)]"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Language dropdown */}
        <div className="hidden md:block relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              overHero
                ? "text-white/75 hover:bg-white/10 hover:text-white"
                : "text-[var(--rc-ink-600)] hover:bg-[var(--rc-surface-sunken)] hover:text-[var(--rc-ink-900)]"
            }`}
          >
            <svg
              className="h-3.5 w-3.5 opacity-60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            <Flag
              code={LANG_OPTIONS.find((l) => l.locale === locale)?.flag || "us"}
              className="w-4 h-3 rounded-[2px] overflow-hidden shadow-sm"
            />
            {LANG_OPTIONS.find((l) => l.locale === locale)?.label || "EN"}
            <svg
              className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {langOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setLangOpen(false)}
              />
              <div className="absolute end-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 min-w-[120px]">
                {LANG_OPTIONS.map((lang) => (
                  <Link
                    key={lang.locale}
                    href={`/${lang.locale}${pathWithoutLocale}`}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors ${
                      locale === lang.locale
                        ? "text-teal-700 bg-teal-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setLangOpen(false)}
                  >
                    <Flag
                      code={lang.flag}
                      className="w-4 h-3 rounded-[2px] overflow-hidden shadow-sm"
                    />
                    {lang.label}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          aria-label="Menu"
          aria-expanded={mobileOpen}
          className={`transition-colors md:hidden ${
            overHero
              ? "text-white/80 hover:text-white"
              : "text-[var(--rc-ink-600)] hover:text-[var(--rc-ink-900)]"
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="material-chrome space-y-1 border-t border-[var(--rc-hairline)] px-6 py-5 shadow-lg md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block text-sm font-medium py-2.5 px-3 rounded-lg transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-teal-700 bg-teal-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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
                <Flag code={lang.flag} className="w-4 h-3 rounded-[2px]" />{" "}
                {lang.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
