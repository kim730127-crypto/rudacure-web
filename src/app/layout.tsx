import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
