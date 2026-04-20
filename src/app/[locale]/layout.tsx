import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isValidLocale, LOCALES, type Locale } from "@/lib/i18n";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const SITE_URL = "https://www.rudacure.com";

const LOCALE_META: Record<
  Locale,
  { title: string; description: string; ogLocale: string }
> = {
  ko: {
    title: "루다큐어 | 통증의 근원을 치료합니다",
    description:
      "AI 기반 이온채널 신약개발 플랫폼 RuCIA로 비마약성 통증·감각질환 치료제를 개발하는 한국 바이오텍 기업.",
    ogLocale: "ko_KR",
  },
  en: {
    title: "RudaCure | Healing the Source of Pain",
    description:
      "AI-driven ion channel drug discovery platform developing non-opioid therapeutics for pain and sensory diseases.",
    ogLocale: "en_US",
  },
  zh: {
    title: "RudaCure | 治愈疼痛之源",
    description:
      "基于AI离子通道新药研发平台RuCIA，专注于开发非阿片类疼痛与感觉疾病治疗药物的韩国生物科技公司。",
    ogLocale: "zh_CN",
  },
  ja: {
    title: "RudaCure | 痛みの根源を治療する",
    description:
      "AI駆動のイオンチャネル創薬プラットフォームRuCIAにより、非オピオイド系の疼痛・感覚疾患治療薬を開発する韓国バイオテック企業。",
    ogLocale: "ja_JP",
  },
  es: {
    title: "RudaCure | Sanando el Origen del Dolor",
    description:
      "Plataforma de descubrimiento de fármacos de canales iónicos impulsada por IA para terapias no opioides del dolor y enfermedades sensoriales.",
    ogLocale: "es_ES",
  },
  fr: {
    title: "RudaCure | Guérir la Source de la Douleur",
    description:
      "Plateforme de découverte de médicaments à canaux ioniques pilotée par l'IA pour des thérapies non opioïdes contre la douleur et les maladies sensorielles.",
    ogLocale: "fr_FR",
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
    title: meta.title,
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
    <>
      <Navbar locale={locale as Locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} />
    </>
  );
}
