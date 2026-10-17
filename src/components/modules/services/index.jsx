"use client";

import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/shared/animations";
import { PageHero, heroText } from "@/components/shared/page-hero";
import { CategoryTiles } from "./category-tiles";
import { TreatmentCard } from "./treatment-card";

export function ServicesView({ categories }) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug);
  const listRef = useRef(null);
  const active = categories.find((c) => c.slug === activeSlug) || categories[0];

  const showCategory = (slug) => {
    setActiveSlug(slug);
    requestAnimationFrame(() => listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  // /services#ritual-facials (e.g. from the home page) opens that category's list
  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (!categories.some((c) => c.slug === slug)) return;
    const frame = requestAnimationFrame(() => {
      setActiveSlug(slug);
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [categories]);

  return (
    <div className="flex flex-col">
      <PageHero
        title="Our Services"
        tagline="Expert treatments. Real results."
        image="/service_hero.jpg"
        alt="Treatments at Luminous Skin Clinic"
      >
        <p className={heroText}>
          Five treatment categories, each tailored to your skin. Choose a category below, then select a treatment
          to see its full details.
        </p>
      </PageHero>

      <section className="py-16 lg:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917]">
              Our Treatment Categories
            </h2>
          </FadeIn>

          <CategoryTiles categories={categories} activeSlug={active?.slug} getHref={(category) => `#${category.slug}`}
            onSelect={showCategory}
          />

          {active && (
            <div ref={listRef} id="treatments" className="scroll-mt-28 mt-14 lg:mt-16">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-5 mb-8 border-b border-[#E8DFD5]">
                <div className="space-y-1.5">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">{active.title}</h2>
                  <p className="text-sm text-[#44403C]">{active.summary}</p>
                </div>
                <span className="text-xs font-medium text-[#57534E] shrink-0">
                  {active.treatments.length} {active.treatments.length === 1 ? "treatment" : "treatments"}
                </span>
              </div>

              {active.treatments.length > 0 ? (
                <div key={active.slug} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {active.treatments.map((treatment, i) => (
                    <FadeIn key={treatment.slug} delay={Math.min(i, 5) * 0.05} className="h-full">
                      <TreatmentCard treatment={treatment} />
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#57534E] text-center py-10">Treatments for this category are coming soon.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
