import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getTranslations } from "@/lib/i18n";

export function Footer({ locale = "ko" }: { locale?: Locale }) {
  const t = getTranslations(locale);
  const isKo = locale === "ko";

  const companyLinks = [
    { href: `/${locale}/about`, label: isKo ? "회사 소개" : "About Us" },
    { href: `/${locale}/science`, label: isKo ? "기술 플랫폼" : "Science" },
    { href: `/${locale}/pipeline`, label: isKo ? "파이프라인" : "Pipeline" },
    { href: `/${locale}/ir`, label: "IR" },
    { href: `/${locale}/news`, label: isKo ? "뉴스센터" : "News Center" },
  ];

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="text-xl font-semibold mb-3 text-gradient-emerald inline-block">
              RudaCure
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md mb-6">
              {t("footer.description")}
            </p>
            <div className="space-y-1">
              <p className="text-xs text-gray-300">
                {isKo ? "인천광역시 연수구 컨벤션대로 204, 인천스타트업파크 I" : "204 Convention-daero, Yeonsu-gu, Incheon, Korea"}
              </p>
              <p className="text-xs text-gray-300">Tel: 032-459-2281~5 | Fax: 032-459-2280</p>
              <p className="text-xs text-gray-300">bd@rudacure.com</p>
            </div>
          </div>

          {/* Company */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.15em] mb-5">
              {isKo ? "회사" : "Company"}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-teal-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.15em] mb-5">
              {isKo ? "문의" : "Resources"}
            </h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/contact`} className="text-sm text-gray-400 hover:text-teal-600 transition-colors">{isKo ? "문의하기" : "Contact"}</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-[0.15em] mb-5">
              {isKo ? "소셜" : "Social"}
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/rudacure"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-300">
            &copy; {new Date().getFullYear()} RudaCure Co., Ltd. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-300 font-['Roboto_Mono']">
            Redefining Pain, Restoring Sensation
          </p>
        </div>
      </div>
    </footer>
  );
}
