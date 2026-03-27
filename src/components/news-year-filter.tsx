"use client";

import { useState } from "react";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  date: string;
  category: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  Clinical: "bg-teal-50 text-teal-700 border border-teal-200",
  Science: "bg-blue-50 text-blue-700 border border-blue-200",
  Partnership: "bg-purple-50 text-purple-700 border border-purple-200",
  IR: "bg-amber-50 text-amber-700 border border-amber-200",
  Award: "bg-pink-50 text-pink-700 border border-pink-200",
  Patent: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  CSR: "bg-orange-50 text-orange-700 border border-orange-200",
  Company: "bg-slate-100 text-slate-600 border border-slate-200",
  Industry: "bg-indigo-50 text-indigo-700 border border-indigo-200",
};

export function NewsYearFilter({
  articles,
  locale,
  allLabel,
}: {
  articles: Article[];
  locale: string;
  allLabel: string;
}) {
  // Extract unique years, sorted descending
  const years = Array.from(
    new Set(articles.map((a) => a.date.slice(0, 4)))
  ).sort((a, b) => b.localeCompare(a));

  const [selectedYear, setSelectedYear] = useState<string>("all");

  const filtered =
    selectedYear === "all"
      ? articles
      : articles.filter((a) => a.date.startsWith(selectedYear));

  return (
    <>
      {/* Year tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedYear("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedYear === "all"
              ? "bg-teal-600 text-white shadow-md"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          {allLabel} ({articles.length})
        </button>
        {years.map((year) => {
          const count = articles.filter((a) => a.date.startsWith(year)).length;
          return (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedYear === year
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {year} ({count})
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
            className="liquid-glass p-5 flex items-center gap-4 group transition-all block"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5">
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    CATEGORY_COLORS[article.category] ||
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {article.category}
                </span>
                <span className="text-xs text-gray-600">{article.date}</span>
              </div>
              <h3 className="text-[15px] font-medium text-gray-700 group-hover:text-teal-600 transition-colors truncate">
                {article.title}
              </h3>
            </div>
            <svg
              className="w-4 h-4 text-gray-200 group-hover:text-teal-500 transition-colors shrink-0"
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
          <p className="text-center text-gray-400 py-12">No articles found.</p>
        )}
      </div>
    </>
  );
}
