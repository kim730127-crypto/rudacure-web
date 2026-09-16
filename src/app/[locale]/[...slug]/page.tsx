import { notFound } from "next/navigation";

/**
 * Every request that reaches this segment is a 404. The HTTP status already
 * says so, but the locale layout sets `index, follow` for real pages and that
 * value was being inherited here, so it is overridden explicitly.
 */
export const metadata = {
  robots: { index: false, follow: false },
};


export default async function CatchAll({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  await params;
  notFound();
}
