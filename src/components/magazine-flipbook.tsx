"use client";

import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";

// Worker is copied into /public at build-prep (same-origin, no CDN/CSP issues).
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const RELEASE_BASE =
  "https://github.com/kim730127-crypto/rudacure-web/releases/download/magazines-v1";

interface Magazine {
  vol: number;
  quarter: string;
  pdf: string;
}

interface MagazineFlipbookProps {
  magazine: Magazine;
  downloadLabel: string;
  onClose: () => void;
}

interface RenderedPage {
  src: string;
  ratio: number; // height / width
}

// Render every page of the local (same-origin) PDF to an image once, up front.
async function renderPdf(
  vol: number,
  onProgress: (done: number, total: number) => void,
): Promise<RenderedPage[]> {
  const pdf = await pdfjsLib.getDocument({
    url: `/api/magazine-pdf?vol=${vol}`,
  }).promise;
  const pages: RenderedPage[] = [];
  const TARGET_WIDTH = 900; // crisp on retina spreads, still light enough

  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: TARGET_WIDTH / base.width });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context unavailable");
    await page.render({ canvas, canvasContext: ctx, viewport }).promise;
    pages.push({
      src: canvas.toDataURL("image/jpeg", 0.85),
      ratio: viewport.height / viewport.width,
    });
    onProgress(n, pdf.numPages);
  }
  return pages;
}

export default function MagazineFlipbook({
  magazine,
  downloadLabel,
  onClose,
}: MagazineFlipbookProps) {
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setPages([]);
    setError(null);
    setProgress({ done: 0, total: 0 });
    renderPdf(magazine.vol, (done, total) => {
      if (!cancelled) setProgress({ done, total });
    })
      .then((rendered) => {
        if (!cancelled) setPages(rendered);
      })
      .catch((e: unknown) => {
        if (!cancelled)
          setError(
            e instanceof Error ? e.message : "PDF를 불러오지 못했습니다.",
          );
      });
    return () => {
      cancelled = true;
    };
  }, [magazine.vol]);

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  // Page dimensions: fill the viewport, keeping the PDF aspect ratio.
  // A portrait page on a landscape screen is height-bound; past the cover
  // showCover renders a 2-page spread, so 2*pageW must also fit the width.
  // Computed once at render (won't track a resize while the modal is open).
  const ratio = pages[0]?.ratio ?? 1.414;
  const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const availH = vh - 150; // leave room for the top bar + hint
  const availW = vw * 0.94;
  let pageW = Math.min(availW / 2, availH / ratio);
  pageW = Math.max(220, pageW);
  const pageH = Math.round(pageW * ratio);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`RudaCure 매거진 Vol.${magazine.vol} 뷰어`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Top bar */}
      <div className="w-full max-w-5xl flex items-center justify-between text-white mb-3 px-1">
        <p className="text-sm font-medium">
          RudaCure Magazine{" "}
          <span className="font-bold">Vol.{magazine.vol}</span>
          <span className="text-white/60 ml-2 text-xs">{magazine.quarter}</span>
        </p>
        <div className="flex items-center gap-2">
          <a
            href={`${RELEASE_BASE}/${magazine.pdf}`}
            download
            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 transition-colors text-xs font-semibold px-3 py-1.5 rounded-full"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            {downloadLabel}
          </a>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div
        ref={containerRef}
        className="flex items-center justify-center"
        style={{ minHeight: pageH }}
      >
        {error ? (
          <div className="text-center text-white/90 max-w-sm">
            <p className="mb-3">매거진을 여는 중 문제가 발생했습니다.</p>
            <a
              href={`${RELEASE_BASE}/${magazine.pdf}`}
              download
              className="underline text-teal-300"
            >
              PDF로 다운로드하기
            </a>
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center text-white/80">
            <div className="w-10 h-10 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm">
              매거진을 펼치는 중…
              {progress.total > 0 && ` (${progress.done}/${progress.total})`}
            </p>
          </div>
        ) : (
          // @ts-expect-error react-pageflip's types lag React 19 children typing
          <HTMLFlipBook
            width={pageW}
            height={pageH}
            size="fixed"
            minWidth={220}
            maxWidth={1600}
            minHeight={310}
            maxHeight={2200}
            showCover={true}
            mobileScrollSupport={true}
            maxShadowOpacity={0.5}
            className="shadow-2xl"
          >
            {pages.map((p, i) => (
              <div key={i} className="bg-white">
                <img
                  src={p.src}
                  alt={`Vol.${magazine.vol} p.${i + 1}`}
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </div>

      {pages.length > 0 && (
        <p className="text-white/50 text-xs mt-3">
          좌우 모서리를 클릭하거나 드래그해 넘기세요
        </p>
      )}
    </div>
  );
}
