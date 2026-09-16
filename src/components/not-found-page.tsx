"use client";

/**
 * Localised 404.
 *
 * Until now a dead link fell through to Next's bare default page and the only
 * trace it left was a page view on the catch-all route. Two things change here:
 * the visitor gets a route back into the site in their own language, and the
 * request is recorded as a `not_found` event carrying a normalised path, so the
 * next broken-link sweep reads a list instead of inferring one.
 *
 * This is a client component on purpose. A `not-found.tsx` segment file is
 * rendered without route params, so the locale has to come from the pathname.
 *
 * Kept deliberately narrow: legacy paths whose destination is known are 301s in
 * next.config.ts. This page catches the rest, including the numeric IDs from
 * the 2018-2020 site whose original content is no longer recoverable.
 */

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { t, type Locale, isValidLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import { trackNotFound } from "@/lib/analytics-events";

const TEXT_TITLE: Record<Locale, string> = {
  ko: "요청하신 페이지를 찾을 수 없습니다",
  en: "We couldn't find that page",
  zh: "未能找到该页面",
  ja: "お探しのページが見つかりません",
  es: "No hemos encontrado esa página",
  fr: "Cette page est introuvable",
  ar: "تعذّر العثور على الصفحة المطلوبة",
};

const TEXT_BODY: Record<Locale, string> = {
  ko: "주소가 바뀌었거나 삭제된 페이지입니다. 아래에서 찾으시는 내용을 이어서 보실 수 있습니다.",
  en: "The address has changed or the page was removed. You can pick up where you were heading below.",
  zh: "该地址已变更或页面已删除。您可以从下方继续浏览。",
  ja: "アドレスが変更されたか、ページが削除されています。以下からお探しの内容へ進めます。",
  es: "La dirección ha cambiado o la página se ha eliminado. Puede continuar desde los enlaces siguientes.",
  fr: "L'adresse a changé ou la page a été supprimée. Vous pouvez poursuivre à partir des liens ci-dessous.",
  ar: "تغيّر العنوان أو حُذفت الصفحة. يمكنك المتابعة من الروابط أدناه.",
};

const TEXT_HOME: Record<Locale, string> = {
  ko: "홈으로",
  en: "Back to home",
  zh: "返回首页",
  ja: "ホームへ",
  es: "Volver al inicio",
  fr: "Retour à l'accueil",
  ar: "العودة إلى الصفحة الرئيسية",
};

const TEXT_ASK: Record<Locale, string> = {
  ko: "찾으시는 자료가 없다면 문의해 주십시오.",
  en: "If what you need is not here, please get in touch.",
  zh: "如未找到所需资料，请与我们联系。",
  ja: "お探しの資料が見つからない場合はお問い合わせください。",
  es: "Si no encuentra lo que busca, escríbanos.",
  fr: "Si vous ne trouvez pas ce que vous cherchez, contactez-nous.",
  ar: "إذا لم تجد ما تبحث عنه، يرجى التواصل معنا.",
};

/** The destinations worth offering, ordered by how often they are the target. */
const ROUTES = [
  { path: "/pipeline", key: "nav.pipeline" },
  { path: "/ir", key: "nav.ir" },
  { path: "/news", key: "nav.news" },
  { path: "/about", key: "nav.about" },
  { path: "/publications", key: "nav.publications" },
  { path: "/science", key: "nav.science" },
  { path: "/sab", key: "nav.sab" },
  { path: "/contact", key: "nav.contact" },
] as const;

function localeFromPath(pathname: string | null): Locale {
  const first = (pathname ?? "").split("/").filter(Boolean)[0];
  return first && isValidLocale(first) ? (first as Locale) : DEFAULT_LOCALE;
}

export default function NotFoundPage() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const sent = useRef(false);

  // The ref guard matters because React runs effects twice in development; a
  // doubled count would make the broken-link list look worse than it is.
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackNotFound(pathname ?? "/", locale);
  }, [pathname, locale]);

  return (
    <div className="pt-24">
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-4">404</p>
          <h1 className="text-4xl sm:text-5xl font-light leading-tight mb-6 text-gray-900">
            {TEXT_TITLE[locale]}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-12">
            {TEXT_BODY[locale]}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
            {ROUTES.map((r) => (
              <Link
                key={r.path}
                href={`/${locale}${r.path}`}
                className="liquid-glass p-4 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t(locale, r.key)}
              </Link>
            ))}
          </div>

          <p className="text-gray-600 mb-6">{TEXT_ASK[locale]}</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href={`/${locale}`}
              className="btn-primary px-8 py-3 rounded-full font-semibold text-sm"
            >
              {TEXT_HOME[locale]}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="btn-outline px-8 py-3 rounded-full border text-sm font-medium"
            >
              {t(locale, "nav.contact")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
