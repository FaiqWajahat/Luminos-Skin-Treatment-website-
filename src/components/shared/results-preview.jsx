"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";
import { PetalMark } from "@/components/shared/floral-accent";
import { BeforeAfterSlider } from "@/components/shared/before-after";

export const DEFAULT_VIDEOS = [
  { id: "vid-1", title: "LED Light Treatment", url: "https://res.cloudinary.com/x4j3r8wq/video/upload/v1790335442/video-01.mp4" },
  { id: "vid-2", title: "Deep Cleansing", url: "https://res.cloudinary.com/x4j3r8wq/video/upload/v1790335686/vedio-2.mp4" },
  { id: "vid-3", title: "Microneedling", url: "https://res.cloudinary.com/x4j3r8wq/video/upload/v1790335714/vedio-3.mp4" },
  { id: "vid-4", title: "Spa Facial", url: "https://res.cloudinary.com/x4j3r8wq/video/upload/v1790335726/vedio-4.mp4" },
  { id: "vid-5", title: "Lymphatic Facial Massage", url: "https://res.cloudinary.com/x4j3r8wq/video/upload/v1790335738/vedio-5.mp4" },
];

// Small results strip: one preview + a button that opens the videos in a player.
// On every main page it also carries a before & after slider beside the video.
export function ResultsPreview({ videos, beforeAfter = [] }) {
  const withPhotos = beforeAfter.length > 0;
  const list = videos?.length ? videos : DEFAULT_VIDEOS;
  const [activeIndex, setActiveIndex] = useState(null);
  const active = activeIndex === null ? null : list[activeIndex];

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e) => e.key === "Escape" && setActiveIndex(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  return (
    <section id="results" className="scroll-mt-20 py-12 lg:py-16 bg-[#F7F1EC] border-y border-[#E8DFD5]">
      <div className={`${withPhotos ? "max-w-7xl" : "max-w-5xl"} mx-auto px-4 sm:px-6 lg:px-8`}>
        <FadeIn className={`grid grid-cols-1 gap-8 items-center ${withPhotos ? "md:grid-cols-2 lg:grid-cols-12 lg:gap-8" : "md:grid-cols-12 md:gap-10"}`}>
          {/* Before & after photos, left of the video */}
          {withPhotos && <BeforeAfterSlider pairs={beforeAfter} className="lg:col-span-4" />}

          {/* Preview */}
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            aria-label="Play results video"
            className={`group ${withPhotos ? "lg:col-span-4" : "md:col-span-5"} relative aspect-video rounded-2xl overflow-hidden bg-[#1C1917] border border-[#E8DFD5] shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC9C9D]`}
          >
            <video
              src={`${list[0].url}#t=0.5`}
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-white/85 backdrop-blur-md text-[#D97E80] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-0.5 fill-current" />
              </span>
            </span>
          </button>

          {/* Copy */}
          <div
            className={`space-y-4 text-center ${
              withPhotos ? "order-first md:col-span-2 lg:order-none lg:col-span-4" : "md:col-span-7 md:text-left"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#D97E80]">
              <PetalMark className="w-4 h-4" />
              Real People, Real Results
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
              See the Results
            </h2>
            <button
              type="button"
              onClick={() => setActiveIndex(0)}
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#D97E80] bg-white border border-[#EC9C9D]/50 hover:bg-[#EC9C9D] hover:text-white hover:border-[#EC9C9D] shadow-xs transition-all cursor-pointer"
            >
              Watch Our Results Videos
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </FadeIn>
      </div>

      {/* Video player */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Results videos"
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#1C1917] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
          >
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <p className="text-sm font-serif font-bold text-white">{active.title}</p>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-black flex items-center justify-center min-h-0">
              <video key={active.url} src={active.url} controls autoPlay playsInline className="w-full max-h-[62vh] object-contain" />
            </div>

            {list.length > 1 && (
              <div className="flex gap-2 overflow-x-auto p-3 [scrollbar-width:none]">
                {list.map((video, i) => (
                  <button
                    key={video.id || i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                      i === activeIndex
                        ? "bg-[#EC9C9D] border-[#EC9C9D] text-white"
                        : "border-white/20 text-neutral-300 hover:border-[#EC9C9D]"
                    }`}
                  >
                    {video.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
