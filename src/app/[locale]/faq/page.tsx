import type { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { ANSWER_CONTENT, ANSWER_LOCALES, ANSWERS_REVIEWED, answerSourceUrl, type AnswerLocale } from "@/lib/answers";
import { SITE_URL, localizedAlternates } from "@/lib/seo";
import { breadcrumbSchema, serializeJsonLd } from "@/lib/schema";

function resolveLocale(locale: string): AnswerLocale {
  return locale === "ko" ? "ko" : "en";
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const language = resolveLocale(locale);
  const content = ANSWER_CONTENT[language];
  const title = `${content.title} | RudaCure`;
  const url = `${SITE_URL}/${language}/faq`;
  return {
    title: { absolute: title },
    description: content.description,
    alternates: localizedAlternates(language, "/faq", ANSWER_LOCALES),
    openGraph: { title, description: content.description, url, type: "website", images: [`/og-image-${language}.jpg`] },
    twitter: { card: "summary_large_image", title, description: content.description, images: [`/og-image-${language}.jpg`] },
  };
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ko" && locale !== "en") permanentRedirect("/en/faq");
  const language = resolveLocale(locale);
  const content = ANSWER_CONTENT[language];
  const url = `${SITE_URL}/${language}/faq`;
  // Schema describes the same visible answers; it does not promise rich results.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "FAQPage", "@id": `${url}#webpage`, url, name: content.title,
        description: content.description, inLanguage: language, dateModified: ANSWERS_REVIEWED,
        isPartOf: { "@id": `${SITE_URL}/#website` }, publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntity: content.answers.map((item) => ({ "@type": "Question", "@id": `${url}#${item.id}`, name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer, citation: item.sources.map((source) => ({ "@type": "WebPage", name: source.label, url: new URL(answerSourceUrl(language, source.path), SITE_URL).href })) } })),
      },
      breadcrumbSchema(language, [{ name: language === "ko" ? "핵심 질문과 답변" : "Questions and answers", path: "/faq" }]),
    ],
  };
  return (
    <div className="pt-32 pb-20 px-6 bg-[var(--rc-surface-sunken)] text-[var(--rc-ink-900)] break-keep">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-semibold leading-tight tracking-tight">{content.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-[var(--rc-ink-600)]">{content.description}</p>
        <p className="mt-4 text-sm text-[var(--rc-ink-600)]">{content.reviewed}: <time dateTime={ANSWERS_REVIEWED}>{ANSWERS_REVIEWED}</time></p>
        <nav aria-label={language === "ko" ? "질문 바로가기" : "Jump to a question"} className="my-10 border-y border-[var(--rc-hairline-strong)] py-4">
          <ul>{content.answers.map((item) => <li key={item.id}><Link className="aeo-link min-h-11 flex items-center py-2" href={`#${item.id}`}>{item.question}</Link></li>)}</ul>
        </nav>
        {content.answers.map((item) => (
          <section key={item.id} id={item.id} aria-labelledby={`${item.id}-heading`} className="scroll-mt-28 border-b border-[var(--rc-hairline-strong)] py-8">
            <h2 id={`${item.id}-heading`} className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight">{item.question}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--rc-ink-700)]">{item.answer}</p>
            <h3 className="mt-5 text-sm font-medium text-[var(--rc-ink-600)]">{content.sourcesLabel}</h3>
            <ul className="mt-1">{item.sources.map((source) => <li key={source.path}><Link className="aeo-link min-h-11 inline-flex items-center py-2" href={answerSourceUrl(language, source.path)}>{source.label}</Link></li>)}</ul>
          </section>
        ))}
      </div>
    </div>
  );
}
