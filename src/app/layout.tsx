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
  title: "RudaCure | TRPV1 Drug Discovery",
  description:
    "RudaCure is a biopharmaceutical company developing selective TRPV1 antagonists for pain and dry eye disease — without drug-induced hyperthermia.",
  metadataBase: new URL("https://rudacure.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rudacure.com",
    siteName: "RudaCure",
    title: "RudaCure | TRPV1 Drug Discovery",
    description:
      "Developing selective TRPV1 antagonists for pain and dry eye disease without the hyperthermia side effect that failed earlier drug candidates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RudaCure | TRPV1 Drug Discovery",
    description:
      "Developing selective TRPV1 antagonists for pain and dry eye disease without hyperthermia.",
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
    "RudaCure is a biopharmaceutical company developing selective TRPV1 antagonists for chronic pain and dry eye disease (DED), addressing a validated target that previously failed due to drug-induced hyperthermia.",
  foundingDate: "2024",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Scientific Inquiries",
    email: "science@rudacure.com",
  },
  knowsAbout: [
    "TRPV1 antagonists",
    "Pain drug discovery",
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
