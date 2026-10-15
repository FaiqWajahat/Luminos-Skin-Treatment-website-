"use client";

import { useEffect, useRef, useState } from "react";

export function CategoryNavigation({ categories }) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug);
  const navigationRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    let frame;
    const updateActiveCategory = () => {
      const threshold = (navigationRef.current?.getBoundingClientRect().bottom ?? 160) + 40;
      let currentSlug = categories[0]?.slug;

      for (const category of categories) {
        const section = document.getElementById(category.slug);
        if (section && section.getBoundingClientRect().top <= threshold) {
          currentSlug = category.slug;
        }
      }
      setActiveSlug(currentSlug);
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveCategory);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [categories]);

  useEffect(() => {
    const list = listRef.current;
    const activeLink = list?.querySelector('[aria-current="location"]');
    if (!list || !activeLink) return;

    const listBounds = list.getBoundingClientRect();
    const linkBounds = activeLink.getBoundingClientRect();
    if (linkBounds.left < listBounds.left || linkBounds.right > listBounds.right) {
      list.scrollBy({
        left: linkBounds.left - listBounds.left - (listBounds.width - linkBounds.width) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  }, [activeSlug]);

  if (!categories.length) return null;

  return (
    <nav
      ref={navigationRef}
      id="categories-nav"
      aria-label="Treatment categories"
      className="sticky top-[65px] z-30 scroll-mt-20 border-b border-[#E8DFD5] bg-[#FAF8F5]/95 shadow-[0_4px_18px_-12px_rgba(28,25,23,0.18)] backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 pt-4 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#78716C]">
            Browse by category
          </p>
          <span className="text-[10px] text-[#78716C] lg:hidden">Swipe to explore &rarr;</span>
        </div>
        <ul
          ref={listRef}
          className="flex gap-1 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2"
        >
          {categories.map((category) => {
            const isActive = category.slug === activeSlug;
            return (
              <li key={category.slug} className="shrink-0 lg:flex-1">
                <a
                  href={`#${category.slug}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative flex min-h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-t-lg px-3 text-xs font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#9A5356] motion-reduce:transition-none xl:px-4 xl:text-sm ${
                    isActive
                      ? "bg-[#F5E9E6] text-[#87474B]"
                      : "text-[#57534E] hover:bg-[#F3ECE6] hover:text-[#292524]"
                  }`}
                >
                  <span>{category.title}</span>
                  <span
                    aria-label={`${category.treatments.length} treatments`}
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 text-[10px] font-semibold tabular-nums ${
                      isActive ? "bg-[#87474B] text-white" : "bg-[#EDE7E1] text-[#78716C]"
                    }`}
                  >
                    {category.treatments.length}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full transition-colors motion-reduce:transition-none ${
                      isActive ? "bg-[#B76E73]" : "bg-transparent"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
