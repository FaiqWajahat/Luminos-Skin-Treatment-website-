import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TreatmentImage } from "./treatment-image";

// The five treatment categories, always in catalogue order
export function CategoryTiles({ categories = [], getHref, activeSlug, onSelect }) {
  return (
    <ul className="flex flex-wrap justify-center gap-4 lg:gap-5 max-w-6xl mx-auto">
      {categories.map((category) => {
        const isActive = category.slug === activeSlug;
        return (
          <li key={category.slug} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(20%-1rem)]">
            <Link
              href={getHref(category)}
              scroll={false}
              onClick={onSelect ? () => onSelect(category.slug) : undefined}
              aria-current={isActive ? "true" : undefined}
              className={`group flex flex-col h-full overflow-hidden rounded-2xl bg-white border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#EC9C9D]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC9C9D] ${
                isActive ? "border-[#EC9C9D] shadow-lg shadow-[#EC9C9D]/20" : "border-[#E8DFD5] shadow-xs hover:border-[#EC9C9D]/50"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F3ECE6]">
                <TreatmentImage
                  src={category.image}
                  alt={category.title}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col items-center flex-1 gap-3 p-4 text-center">
                <h3 className="font-serif text-base lg:text-lg font-bold text-[#1C1917] leading-snug">
                  {category.title}
                </h3>
                <span
                  className={`mt-auto flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                    isActive ? "bg-[#EC9C9D] text-white" : "bg-[#FBEDEC] text-[#D97E80] group-hover:bg-[#EC9C9D] group-hover:text-white"
                  }`}
                >
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
