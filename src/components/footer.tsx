import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";

export function Footer({ locale = "ko" }: { locale?: Locale }) {
  const t = getTranslations(locale);
  const companyLinks = [
    { href: `/${locale}/science`, label: t("nav.science") },
    { href: `/${locale}/pipeline`, label: t("nav.pipeline") },
    { href: `/${locale}/cro`, label: t("nav.cro") },
    { href: `/${locale}/ir`, label: t("nav.ir") },
    { href: `/${locale}/news`, label: t("nav.news") },
    { href: `/${locale}/publications`, label: t("nav.publications") },
    { href: `/${locale}/sab`, label: t("nav.sab") },
    { href: `/${locale}/about`, label: t("nav.about") },
    { href: `/${locale}/contact`, label: t("nav.contact") },
  ];

  return (
    /* Same surface as the CTA band above it, so the two dark sections read as
       one field instead of showing a seam between #0a0f14 and #080c11. The
       container matches `.container-rc`, which the navbar and every section
       also use — the footer was previously 160px wider than the page body. */
    <footer className="border-t border-[var(--rc-hairline-dark)] bg-[#080c11]">
      <div className="container-rc py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="mb-3 inline-block text-lg font-semibold tracking-[-0.02em] text-white">
              RudaCure
            </div>
            <p className="mb-7 max-w-md text-sm leading-relaxed text-slate-400">
              {t("footer.description")}
            </p>
            <div className="space-y-2.5">
              <div>
                <p className="mb-1 text-xs font-semibold text-slate-200">
                  {locale === "ko" ? "본사" : "Headquarters"}
                </p>
                <p className="text-xs text-slate-400">
                  {locale === "ko"
                    ? "인천광역시 연수구 송도미래로 9, 1동 302호"
                    : "9 Songdo Mirae-ro, Yeonsu-gu, Incheon, Korea"}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold text-slate-200">
                  {locale === "ko" ? "서울사무소" : "Seoul Office"}
                </p>
                <p className="text-xs text-slate-400">
                  {locale === "ko"
                    ? "서울시 금천구 가산디지털1로 145, 1001호"
                    : "1001, 145 Gasandigital 1-ro, Geumcheon-gu, Seoul, Korea"}
                </p>
              </div>
              <p className="num text-xs text-slate-400">
                Tel: 032-724-9070 | Fax: 032-724-9071
              </p>
              <a
                href="mailto:sh.kim@rudacure.com"
                className="text-xs text-slate-400 transition-colors hover:text-teal-300"
              >
                sh.kim@rudacure.com
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="md:col-span-3">
            <h4 className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-slate-500">
              {locale === "ko" ? "회사" : "Company"}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-teal-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <h4 className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.15em] text-slate-500">
              {locale === "ko" ? "소셜" : "Social"}
            </h4>
            <div className="flex gap-3">
              <a
                href="https://kr.linkedin.com/company/rudacure"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RudaCure on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--rc-hairline-dark)] bg-white/5 text-slate-400 transition-all hover:border-teal-400/40 hover:bg-white/10 hover:text-teal-300"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 mb-6 h-px bg-[var(--rc-hairline-dark)]" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} RudaCure Co., Ltd. All rights
            reserved.
          </p>
          {/* Mirrors the hero line. The previous tagline ("Redefining Pain,
              Restoring Sensation") scoped the company to a single therapeutic
              area, which the pipeline outgrew. */}
          <p className="brand-line text-xs tracking-[0.02em] text-slate-500">
            Membrane Targets. Quality of Life.
          </p>
        </div>
      </div>
    </footer>
  );
}
