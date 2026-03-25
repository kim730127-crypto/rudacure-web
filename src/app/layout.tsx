import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RudaCure | Healing the Source of Pain",
  description:
    "AI-driven ion channel drug discovery platform. Developing non-opioid therapeutics for pain and sensory diseases.",
  keywords: ["RudaCure", "TRPV1", "ion channel", "non-opioid", "pain", "drug discovery", "AI", "RuCIA"],
  openGraph: {
    title: "RudaCure | Healing the Source of Pain",
    description: "AI-driven ion channel drug discovery for non-opioid pain therapeutics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
