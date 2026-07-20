import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getDir, isValidLocale, LOCALES, type Locale } from "@/lib/i18n";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const SITE_URL = "https://www.rudacure.com";

const LOCALE_META: Record<
  Locale,
  { title: string; description: string; ogLocale: string }
> = {
  ko: {
    title: "루다큐어 | 비마약성 통증·안구건조증 AI 신약개발",
    description:
      "막단백질(이온채널·GPCR)을 표적하는 AI 신약개발 기업 루다큐어. RuCIA 플랫폼으로 비마약성 진통제, 안구건조증 치료제(FDA 2상), 만성통증 신약을 개발합니다.",
    ogLocale: "ko_KR",
  },
  en: {
    title: "RudaCure | AI Drug Discovery for Non-Opioid Pain & Dry Eye",
    description:
      "RudaCure: AI-driven drug discovery targeting ion channels (TRPV1) and GPCRs for non-opioid pain and dry eye therapeutics. RuCIA platform; FDA Phase 2.",
    ogLocale: "en_US",
  },
  zh: {
    title: "RudaCure | 非阿片类镇痛·干眼症 AI 新药研发",
    description:
      "靶向膜蛋白（离子通道·GPCR）的AI新药研发企业RudaCure。通过RuCIA平台开发非阿片类镇痛药、干眼症治疗药（FDA 2期临床）和慢性疼痛新药。",
    ogLocale: "zh_CN",
  },
  ja: {
    title: "RudaCure | 非オピオイド鎮痛・ドライアイ AI創薬",
    description:
      "膜タンパク質（イオンチャネル・GPCR）を標的とするAI創薬企業RudaCure。RuCIAプラットフォームで非オピオイド鎮痛薬、ドライアイ治療薬（FDA Phase 2）、慢性疼痛の新薬を開発します。",
    ogLocale: "ja_JP",
  },
  es: {
    title: "RudaCure | IA para Fármacos del Dolor No Opioide y Ojo Seco",
    description:
      "RudaCure es una empresa de descubrimiento de fármacos con IA que se dirige a proteínas de membrana — canales iónicos (TRPV1/TRPA1) y GPCR — para desarrollar terapias no opioides para el dolor, el ojo seco y el dolor crónico. Plataforma RuCIA; Fase 2 FDA.",
    ogLocale: "es_ES",
  },
  fr: {
    title: "RudaCure | IA pour Médicaments Douleur Non Opioïde et Œil Sec",
    description:
      "RudaCure est une société de découverte de médicaments par IA ciblant les protéines membranaires — canaux ioniques (TRPV1/TRPA1) et RCPG — pour développer des thérapies non opioïdes contre la douleur, l'œil sec et la douleur chronique. Plateforme RuCIA ; Phase 2 FDA.",
    ogLocale: "fr_FR",
  },
  ar: {
    title:
      "RudaCure | اكتشاف أدوية بالذكاء الاصطناعي لألم غير أفيوني وجفاف العين",
    description:
      "RudaCure شركة لاكتشاف الأدوية بالذكاء الاصطناعي تستهدف البروتينات الغشائية — القنوات الأيونية (TRPV1/TRPA1) ومستقبلات GPCR — لتطوير علاجات غير أفيونية للألم وجفاف العين والألم المزمن. منصة RuCIA؛ المرحلة الثانية لدى FDA.",
    ogLocale: "ar_SA",
  },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const meta = LOCALE_META[locale];
  const url = `${SITE_URL}/${locale}`;

  const languages: Record<string, string> = {};
  LOCALES.forEach((l) => {
    languages[l] = `${SITE_URL}/${l}`;
  });
  languages["x-default"] = `${SITE_URL}/en`;

  return {
    // `absolute` prevents the root "%s | RudaCure" template from doubling the
    // brand (titles already contain "RudaCure").
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: "RudaCure",
      locale: meta.ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(
        (l) => LOCALE_META[l].ogLocale,
      ),
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) redirect("/ko");

  return (
    // `display: contents` keeps this wrapper out of the layout box tree (body
    // stays the flex container) while giving screen readers the correct
    // per-locale language via nearest-ancestor `lang`. The root <html> carries
    // a default `lang` so root-level routes (e.g. not-found) remain valid.
    // `dir` inherits through the DOM (not the box tree), so RTL propagates to
    // descendants even though this element generates no box.
    <div lang={locale} dir={getDir(locale)} className="contents">
      <Navbar locale={locale as Locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} />
    </div>
  );
}
