import { notFound } from "next/navigation";

export default async function CatchAll({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  await params;
  notFound();
}
