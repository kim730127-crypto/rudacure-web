"use client";

import { useState } from "react";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  date: string;
  category: string;
};

// DESIGN.md: one accent. Categories are told apart by their label, not by
// nine hues; the selected tab is the only filled state.
const CATEGORY_BADGE =
  "bg-surface-sunken text-ink-600 border border-hairline-strong";
const CATEGORY_BADGE_CLINICAL =
  "bg-accent-tint text-accent-deep border border-accent-line";
const badgeClass = (category: string) =>
  category === "Clinical" ? CATEGORY_BADGE_CLINICAL : CATEGORY_BADGE;

export function NewsYearFilter({
  articles,
  locale,
}: {
  articles: Article[];
  locale: string;
  allLabel?: string;
}) {
  // Extract unique categories, sorted by article count descending
  const categories = Array.from(
    new Set(articles.map((a) => a.category))
  ).sort((a, b) => {
    const countA = articles.filter((ar) => ar.category === a).length;
    const countB = articles.filter((ar) => ar.category === b).length;
    return countB - countA;
  });

  const [selected, setSelected] = useState<string>(categories[0] || "");

  const filtered = articles.filter((a) => a.category === selected);

  return (
    <>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const count = articles.filter((a) => a.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selected === cat
                  ? "bg-accent text-white border border-transparent shadow-sm"
                  : "bg-surface text-ink-600 hover:bg-surface-sunken border border-hairline-strong"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Article list */}
      <div className="space-y-3">
        {filtered.map((article) => (
          <Link
            key={article.id}
            href={`/${locale}/news/${article.id}`}
            className="liquid-glass p-5 flex items-center gap-4 group block"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5">
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass(article.category)}`}
                >
                  {article.category}
                </span>
                <span className="text-xs text-ink-600">{article.date}</span>
              </div>
              <h3 className="text-[15px] font-medium text-ink-700 group-hover:text-accent-deep transition-colors truncate">
                {article.title}
              </h3>
            </div>
            <svg
              className="w-4 h-4 text-ink-400 group-hover:text-accent transition-colors shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-ink-400 py-12">No articles found.</p>
        )}
      </div>
    </>
  );
}
