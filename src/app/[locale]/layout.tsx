import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }, { locale: "zh" }, { locale: "ja" }, { locale: "es" }, { locale: "fr" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <Navbar locale={locale as Locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} />
    </>
  );
}
