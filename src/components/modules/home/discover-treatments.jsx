import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";
import { CategoryTiles } from "@/components/modules/services/category-tiles";

export function DiscoverTreatments({ categories = [] }) {
  return (
    <section className="py-16 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-2xl mx-auto text-center space-y-4 mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1917]">
            Discover Our Treatments
          </h2>
          <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
            From relaxing facial rituals to advanced skin treatments, every treatment is carefully designed
            to enhance your natural glow, support a stronger, healthier-looking skin barrier, and help you
            feel more confident in your beautiful skin.
          </p>
        </FadeIn>

        <CategoryTiles categories={categories} getHref={(category) => `/services#${category.slug}`} />

        <FadeIn className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] shadow-md hover:shadow-lg hover:brightness-105 transition-all"
          >
            Explore Our Treatments
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
