import Link from "next/link";
import { ANSWER_CONTENT } from "@/lib/answers";
import { type Locale } from "@/lib/i18n";

const INTRO: Record<Locale, { title: string; description: string; button: string; languageNote?: string }> = {
  ko: { title: "루다큐어, 무엇이 궁금하신가요?", description: "개발 단계와 핵심 기술, 연구 근거를 질문과 답변으로 확인하세요.", button: "질문과 답변 모두 보기" },
  en: { title: "Questions about RudaCure?", description: "Find source-linked answers about our development stages, technology and research.", button: "Explore all questions and answers" },
  zh: { title: "想了解 RudaCure？", description: "通过问答及来源链接了解研发阶段、核心技术与研究依据。", button: "查看所有问答", languageNote: "问答以英语提供。" },
  ja: { title: "RudaCureについて知りたいことは？", description: "開発段階、技術、研究の根拠を出典付きの回答でご確認ください。", button: "すべての質問と回答を見る", languageNote: "回答は英語で掲載しています。" },
  es: { title: "¿Preguntas sobre RudaCure?", description: "Consulte respuestas con fuentes sobre las fases de desarrollo, la tecnología y la investigación.", button: "Ver todas las preguntas y respuestas", languageNote: "Las respuestas están disponibles en inglés." },
  fr: { title: "Des questions sur RudaCure ?", description: "Consultez les réponses et leurs sources sur le développement, la technologie et la recherche.", button: "Voir toutes les questions et réponses", languageNote: "Les réponses sont disponibles en anglais." },
  ar: { title: "هل لديك أسئلة حول RudaCure؟", description: "تعرّف على مراحل التطوير والتقنية والبحث من خلال إجابات مرتبطة بمصادرها.", button: "عرض جميع الأسئلة والإجابات", languageNote: "الإجابات متاحة باللغة الإنجليزية." },
};

/** Persuade surface. Prominent links, no extra facts or client-side animation. */
export function AnswersIntro({ locale }: { locale: Locale }) {
  const language = locale === "ko" ? "ko" : "en";
  const content = INTRO[locale] ?? INTRO.en;
  const ids = ["rci001-stage", "platform", "company"];
  const questions = ids.map((id) => ANSWER_CONTENT[language].answers.find((item) => item.id === id)!);
  return (
    <section id="questions" aria-labelledby="questions-heading" className="answers-intro scroll-mt-28 break-keep">
      <div className="lab-container grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <h2 id="questions-heading" className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight">{content.title}</h2>
          <p className="mt-4 text-base leading-7 text-[var(--rc-ink-600)] max-w-md">{content.description}</p>
          {content.languageNote && <p className="mt-2 text-sm leading-relaxed text-[var(--rc-ink-600)]">{content.languageNote}</p>}
          <Link href={`/${language}/faq`} hrefLang={language} className="answers-intro-button mt-6 inline-flex min-h-12 items-center justify-center px-5 py-3 text-base font-semibold leading-relaxed">{content.button}</Link>
        </div>
        <ul lang={language} dir={language === "en" ? "ltr" : undefined} className="border-t border-[var(--lab-line)]">
          {questions.map((item) => (
            <li key={item.id} className="border-b border-[var(--lab-line)]">
              <Link href={`/${language}/faq#${item.id}`} hrefLang={language} className="answers-intro-question flex min-h-16 items-center py-5 text-lg sm:text-xl font-medium leading-relaxed">{item.question}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
