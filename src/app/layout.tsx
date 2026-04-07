import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://www.rudacure.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RudaCure | Healing the Source of Pain",
    template: "%s | RudaCure",
  },
  description:
    "AI-driven ion channel drug discovery platform. Developing non-opioid therapeutics for pain and sensory diseases. RuCIA platform, TRPV1 modulators, and clinical-stage pipeline.",
  keywords: [
    "RudaCure",
    "루다큐어",
    "TRPV1",
    "ion channel drug discovery",
    "non-opioid pain",
    "non-opioid analgesic",
    "RuCIA",
    "AI drug discovery",
    "dry eye disease",
    "RCI001",
    "RCI002",
    "ion channel therapeutics",
    "biotech IPO",
    "Korean biotech",
    "이온채널 신약",
    "비마약성 진통제",
  ],
  authors: [{ name: "RudaCure Co., Ltd." }],
  creator: "RudaCure Co., Ltd.",
  publisher: "RudaCure Co., Ltd.",
  applicationName: "RudaCure",
  category: "Biotechnology",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      ko: "/ko",
      en: "/en",
      zh: "/zh",
      ja: "/ja",
      es: "/es",
      fr: "/fr",
      "x-default": "/en",
    },
  },
  openGraph: {
    type: "website",
    siteName: "RudaCure",
    title: "RudaCure | Healing the Source of Pain",
    description:
      "AI-driven ion channel drug discovery for non-opioid pain therapeutics. RuCIA platform delivers 70% faster development.",
    url: SITE_URL,
    locale: "en_US",
    alternateLocale: ["ko_KR", "zh_CN", "ja_JP", "es_ES", "fr_FR"],
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RudaCure - AI-driven ion channel drug discovery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RudaCure | Healing the Source of Pain",
    description:
      "AI-driven ion channel drug discovery for non-opioid pain therapeutics.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "naver-site-verification":
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ?? "",
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
      "baidu-site-verification":
        process.env.NEXT_PUBLIC_BAIDU_SITE_VERIFICATION ?? "",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "RudaCure Co., Ltd.",
  alternateName: ["루다큐어", "RudaCure"],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "AI-driven ion channel drug discovery platform developing non-opioid therapeutics for pain and sensory diseases.",
  foundingDate: "2018",
  founders: [
    {
      "@type": "Person",
      name: "Yong-ho Kim",
      jobTitle: "CEO & Founder",
    },
  ],
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "9 Songdo Mirae-ro, 1-302",
      addressLocality: "Yeonsu-gu",
      addressRegion: "Incheon",
      postalCode: "21990",
      addressCountry: "KR",
      name: "Headquarters",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "145 Gasandigital 1-ro, 1001",
      addressLocality: "Geumcheon-gu",
      addressRegion: "Seoul",
      addressCountry: "KR",
      name: "Seoul Office",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+82-32-724-9070",
      contactType: "customer service",
      email: "sh.kim@rudacure.com",
      availableLanguage: ["Korean", "English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "investor relations",
      email: "js.shin@rudacure.com",
      availableLanguage: ["Korean", "English"],
    },
  ],
  sameAs: ["https://kr.linkedin.com/company/rudacure"],
  knowsAbout: [
    "Ion channel drug discovery",
    "TRPV1",
    "Non-opioid analgesics",
    "Dry eye disease",
    "AI drug discovery",
    "RuCIA platform",
  ],
  medicalSpecialty: ["Pain", "Ophthalmology", "Sensory diseases"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "RudaCure",
  description:
    "AI-driven ion channel drug discovery for non-opioid pain therapeutics",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["ko-KR", "en-US", "zh-CN", "ja-JP", "es-ES", "fr-FR"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FRSQESNS6H"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FRSQESNS6H');
          `}
        </Script>
      </body>
    </html>
  );
}
