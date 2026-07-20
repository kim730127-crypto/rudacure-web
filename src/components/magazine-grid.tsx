"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Heavy (pdf.js + react-pageflip): load only when a magazine is opened.
const MagazineFlipbook = dynamic(() => import("./magazine-flipbook"), {
  ssr: false,
});

interface Magazine {
  vol: number;
  quarter: string;
  pdf: string;
}

interface MagazineGridProps {
  magazines: Magazine[];
  latestLabel: string;
  readLabel: string;
  downloadLabel: string;
}

export function MagazineGrid({
  magazines,
  latestLabel,
  readLabel,
  downloadLabel,
}: MagazineGridProps) {
  const [active, setActive] = useState<Magazine | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {magazines.map((mag, i) => (
          <button
            key={mag.vol}
            type="button"
            onClick={() => setActive(mag)}
            className="group relative text-start"
          >
            <div className="relative aspect-[3/4.24] rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow bg-gray-100">
              <Image
                src={`/magazines/covers/vol${mag.vol}.jpg`}
                alt={`RudaCure Magazine Vol.${mag.vol}`}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              />
              {i === 0 && (
                <span className="absolute top-2 start-2 text-[10px] font-bold uppercase tracking-wider bg-teal-600 text-white px-2 py-0.5 rounded-full shadow">
                  {latestLabel}
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 bg-white/90 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow">
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
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                  {readLabel}
                </div>
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs font-semibold text-gray-800">
                Vol.{mag.vol}
              </p>
              <p className="text-[11px] text-gray-400">{mag.quarter}</p>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <MagazineFlipbook
          magazine={active}
          downloadLabel={downloadLabel}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
