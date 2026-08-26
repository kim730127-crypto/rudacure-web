import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// NOTE: Inter was previously applied to <body> as the site-wide face. Inter
// carries no Hangul glyphs, so every Korean run silently fell back to an
// unstyled system font while the self-hosted Pretendard subset in
// public/fonts/pretendard was never imported. Pretendard is now the body face
// (see globals.css --font-sans) and covers Latin, Hangul and CJK punctuation
// from one variable file.
// Arabic webfont (Inter has no Arabic glyphs). Exposed as a CSS variable and
// applied to RTL content via `:lang(ar)` in globals.css.
const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "RudaCure | Membrane-Target Drug Discovery",
  description:
    "RudaCure is an AI drug discovery company targeting membrane proteins — ion channels and GPCRs — across dry eye disease, chronic pain, psoriasis and rare neurological disease.",
  metadataBase: new URL("https://rudacure.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rudacure.com",
    siteName: "RudaCure",
    title: "RudaCure | Membrane-Target Drug Discovery",
    description:
      "Targeting membrane proteins — ion channels and GPCRs — to develop therapeutics for dry eye disease, chronic pain, psoriasis and rare neurological disease.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RudaCure | Membrane-Target Drug Discovery",
    description:
      "Membrane-protein targeted drug discovery across dry eye, chronic pain, psoriasis and rare neurological disease.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RudaCure",
  url: "https://rudacure.com",
  description:
    "RudaCure is a biopharmaceutical company targeting membrane proteins — ion channels such as TRPV1/TRPV4 and GPCRs — with the AI-driven RuCIA platform, developing therapeutics for dry eye disease, chronic pain, psoriasis and rare neurological disease.",
  foundingDate: "2024",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Scientific Inquiries",
    email: "science@rudacure.com",
  },
  knowsAbout: [
    "Membrane protein drug discovery",
    "Ion channel modulators",
    "GPCR drug discovery",
    "Dry eye disease",
    "Molecular dynamics simulation",
    "Structure-based drug design",
    "MM-PBSA binding free energy",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`${notoArabic.variable} bg-white text-gray-900 antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
