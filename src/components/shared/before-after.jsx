"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Photo({ src, label }) {
  return (
    <div className="relative overflow-hidden bg-[#F3ECE6]">
      {src.startsWith("data:") ? (
        <img src={src} alt={label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <Image src={src} alt={label} fill sizes="(max-width: 768px) 50vw, 15vw" className="object-cover" />
      )}
      <span className="absolute bottom-2 left-2 rounded-full bg-[#1C1917]/65 backdrop-blur-sm px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
        {label}
      </span>
    </div>
  );
}

// One before & after pair at a time, with arrows and dots — images only, no case details
export function BeforeAfterSlider({ pairs = [], className = "" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = pairs.length;

  useEffect(() => {
    if (count < 2 || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(timer);
  }, [count, paused]);

  if (!count) return null;
  const go = (step) => setIndex((i) => (i + step + count) % count);
  const pair = pairs[index];

  return (
    <div
      className={`space-y-3 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Before and after results"
    >
      <div className="relative">
        <div
          key={pair.id}
          className="grid grid-cols-2 gap-0.5 aspect-video overflow-hidden rounded-2xl border border-[#E8DFD5] bg-[#E8DFD5] shadow-lg animate-in fade-in duration-500"
          aria-live="polite"
        >
          <Photo src={pair.before} label="Before" />
          <Photo src={pair.after} label="After" />
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous result"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#1C1917] shadow-md flex items-center justify-center hover:text-[#D97E80] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next result"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-[#1C1917] shadow-md flex items-center justify-center hover:text-[#D97E80] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex justify-center gap-1.5">
          {pairs.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show result ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${i === index ? "w-5 bg-[#D97E80]" : "w-1.5 bg-[#E0D3CC] hover:bg-[#EC9C9D]"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
