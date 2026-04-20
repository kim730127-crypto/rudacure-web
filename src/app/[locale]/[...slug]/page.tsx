import { redirect } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";

export default async function CatchAll({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale } = await params;
  redirect(isValidLocale(locale) ? `/${locale}` : "/ko");
}
