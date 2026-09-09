import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Noto_Sans_Arabic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getDir, isValidLocale, LOCALES, type Locale } from "@/lib/i18n";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "../globals.css";

// This is the application's root layout. It deliberately lives under the
// `[locale]` segment rather than at `src/app/layout.tsx`, because a root layout
// at `src/app` cannot read route params and therefore had to hardcode
// `<html lang="en">` — which every Korean, Japanese, Chinese, Spanish, French
// and Arabic page was then served with. Every reachable route is locale-
// prefixed by middleware, so this segment is the true root.

// Arabic webfont (the Latin/Hangul face, Pretendard, is self-hosted and loaded
// from globals.css). Exposed as a CSS variable and applied to RTL content via
// `:lang(ar)`.
const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

const SITE_URL = "https://www.rudacure.com";

// Search Console ownership token for https://www.rudacure.com/.
//
// The property is verified by DNS TXT on rudacure.com. This meta tag is a
// second, independent method, because single-method verification is exactly how
// the property silently lapsed once already: it had been verified through
// Google Analytics (G-FRSQESNS6H), and removing GA in the layout refactor
// (d391d1d) took the verification with it. Nobody noticed until the property
// stopped reporting.
//
// Do not delete this even though DNS also works. Two methods means neither one
// being removed takes the property down.
const GOOGLE_SITE_VERIFICATION = "1b4XIWnmwkjWaNO9LyTxrIA2UScNwJD3st5zpFBMtwQ";

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
    // The production domain is www.rudacure.com; the apex 307-redirects to it.
    // metadataBase resolves every relative og:image, so it must be the www host
    // or every social scraper is handed a redirecting URL.
    metadataBase: new URL(SITE_URL),
    // `absolute` prevents the root "%s | RudaCure" template from doubling the
    // brand (titles already contain "RudaCure").
    title: { absolute: meta.title },
    description: meta.description,
    applicationName: "RudaCure",
    authors: [{ name: "RudaCure Inc.", url: SITE_URL }],
    creator: "RudaCure Inc.",
    publisher: "RudaCure Inc.",
    verification: {
      google: GOOGLE_SITE_VERIFICATION,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
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
    <html lang={locale} dir={getDir(locale)}>
      <head>
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="llms.txt"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
      </head>
      <body
        className={`${notoArabic.variable} bg-white text-gray-900 antialiased`}
      >
        <Navbar locale={locale as Locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale as Locale} />
        <Analytics />
      </body>
    </html>
  );
}
