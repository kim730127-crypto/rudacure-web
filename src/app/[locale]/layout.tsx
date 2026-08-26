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
    title: "루다큐어 | 막단백질 표적 AI 신약개발",
    description:
      "막단백질(이온채널·GPCR)을 표적하는 AI 신약개발 기업 루다큐어. RuCIA 플랫폼으로 안구건조증(FDA 2상), 만성통증, 건선, 희귀 신경질환 치료제를 개발합니다.",
    ogLocale: "ko_KR",
  },
  en: {
    title: "RudaCure | Membrane-Target AI Drug Discovery",
    description:
      "RudaCure is an AI drug discovery company targeting membrane proteins — ion channels and GPCRs. The RuCIA platform advances therapeutics for dry eye disease (FDA Phase 2), chronic pain, psoriasis and rare neurological disease.",
    ogLocale: "en_US",
  },
  zh: {
    title: "RudaCure | 膜蛋白靶向 AI 新药研发",
    description:
      "靶向膜蛋白（离子通道·GPCR）的AI新药研发企业RudaCure。通过RuCIA平台开发干眼症（FDA 2期临床）、慢性疼痛、银屑病及罕见神经疾病治疗药物。",
    ogLocale: "zh_CN",
  },
  ja: {
    title: "RudaCure | 膜タンパク質標的 AI創薬",
    description:
      "膜タンパク質（イオンチャネル・GPCR）を標的とするAI創薬企業RudaCure。RuCIAプラットフォームでドライアイ（FDA Phase 2）、慢性疼痛、乾癬、希少神経疾患の治療薬を開発します。",
    ogLocale: "ja_JP",
  },
  es: {
    title: "RudaCure | IA para Fármacos Dirigidos a Proteínas de Membrana",
    description:
      "RudaCure es una empresa de descubrimiento de fármacos con IA dirigida a proteínas de membrana — canales iónicos y GPCR. La plataforma RuCIA desarrolla tratamientos para el ojo seco (Fase 2 FDA), el dolor crónico, la psoriasis y enfermedades neurológicas raras.",
    ogLocale: "es_ES",
  },
  fr: {
    title: "RudaCure | IA pour Médicaments Ciblant les Protéines Membranaires",
    description:
      "RudaCure est une société de découverte de médicaments par IA ciblant les protéines membranaires — canaux ioniques et RCPG. La plateforme RuCIA développe des traitements de l'œil sec (Phase 2 FDA), de la douleur chronique, du psoriasis et de maladies neurologiques rares.",
    ogLocale: "fr_FR",
  },
  ar: {
    title:
      "RudaCure | اكتشاف أدوية بالذكاء الاصطناعي يستهدف البروتينات الغشائية",
    description:
      "RudaCure شركة لاكتشاف الأدوية بالذكاء الاصطناعي تستهدف البروتينات الغشائية — القنوات الأيونية ومستقبلات GPCR. تطوّر منصة RuCIA علاجات لجفاف العين (المرحلة الثانية لدى FDA)، والألم المزمن، والصدفية، والأمراض العصبية النادرة.",
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
