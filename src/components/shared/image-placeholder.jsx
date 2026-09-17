"use client";

import { Sparkles, Camera, Image as ImageIcon } from "lucide-react";

/**
 * Luxury Image Placeholder Slot
 * Preserves exact layout structure and aspect ratios without stock photos.
 */
export function ImagePlaceholder({
  label = "Clinic Photography Slot",
  category = "Luminous Leeds",
  aspect = "video", // "video" (16:9), "square" (1:1), "portrait" (4:5), "wide" (21:9), "tall" (3:4)
  className = "",
  icon = "sparkles",
  overlayCaption = null,
}) {
  const aspectClasses = {
    video: "aspect-[16/10]",
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    wide: "aspect-[16/9] sm:aspect-[21/9] min-h-[220px]",
    tall: "aspect-[3/4]",
    auto: "h-full min-h-[260px]",
  }[aspect] || "aspect-[16/10]";

  const IconComponent = {
    sparkles: Sparkles,
    camera: Camera,
    image: ImageIcon,
  }[icon] || Sparkles;

  return (
    <div
      className={`relative w-full ${aspectClasses} rounded-2xl overflow-hidden border border-[#E8DFD5] bg-gradient-to-br from-[#FAF8F5] via-[#F3ECE6] to-[#EAE1D7] flex flex-col items-center justify-center p-6 text-center group transition-all duration-300 hover:border-[#EAA59E]/60 ${className}`}
    >
      {/* Delicate Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#EAA59E_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

      {/* Subtle corner luxury marks */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#EC9C9D]/40" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#EC9C9D]/40" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#EC9C9D]/40" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#EC9C9D]/40" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center gap-2 max-w-[85%]">
        <div className="w-10 h-10 rounded-full bg-white/80 border border-[#E8DFD5] shadow-xs flex items-center justify-center text-[#EC9C9D] group-hover:scale-105 transition-transform duration-300">
          <IconComponent className="w-4 h-4" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#EC9C9D]">
          {category}
        </span>

        <p className="text-xs font-medium text-[#443E38] tracking-tight line-clamp-2">
          {label}
        </p>

        <span className="inline-block text-[9px] font-mono uppercase tracking-widest text-[#8C827A] px-2 py-0.5 rounded-sm bg-white/60 border border-[#E8DFD5]/60 mt-1">
          Photo Placeholder
        </span>
      </div>

      {overlayCaption && (
        <div className="absolute bottom-2 left-3 right-3 text-left">
          <span className="text-[10px] text-[#78716C] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#E8DFD5]">
            {overlayCaption}
          </span>
        </div>
      )}
    </div>
  );
}
