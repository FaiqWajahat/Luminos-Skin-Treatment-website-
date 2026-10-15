import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";
import { FloralDivider } from "@/components/shared/floral-accent";
import { TreatmentImage } from "@/components/modules/services/treatment-image";

export function DiscoverTreatments({ categories = [] }) {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-2xl mx-auto text-center space-y-5 mb-12 lg:mb-14">
          <FloralDivider className="justify-center" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#1C1917] leading-tight">
            Discover Our Treatments
          </h2>
          <p className="text-base sm:text-lg text-[#44403C] leading-relaxed">
            From relaxing facial rituals to advanced skin treatments, every treatment is carefully designed
            to enhance your natural glow, support a stronger, healthier-looking skin barrier, and help you
            feel more confident in your beautiful skin.
          </p>
        </FadeIn>

        {/* Flex-wrap keeps an uneven last row centred (3 + 2 on tablets) */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 max-w-6xl mx-auto">
          {categories.map((category, i) => (
            <FadeIn
              key={category.slug}
              delay={i * 0.06}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.334rem)]"
            >
              <Link
                href={`/services#${category.slug}`}
                className="group flex flex-col h-full overflow-hidden rounded-3xl bg-white border border-[#E8DFD5] shadow-xs hover:shadow-xl hover:shadow-[#EC9C9D]/15 hover:border-[#EC9C9D]/50 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC9C9D]"
              >
                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-[#F3ECE6]">
                  <TreatmentImage
                    src={category.image}
                    alt={category.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/25 via-transparent to-transparent" />
                  <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#D97E80] shadow-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-full bg-[#1C1917]/55 backdrop-blur-md text-[11px] font-semibold text-white">
                    {category.treatments.length} treatments
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6 lg:p-7">
                  <h3 className="font-serif text-xl lg:text-2xl font-bold text-[#1C1917] leading-snug sm:min-h-[3.5rem] lg:min-h-[4.125rem]">
                    {category.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] text-[#44403C] leading-relaxed">{category.summary}</p>

                  <span className="mt-auto pt-6 flex items-center justify-between text-sm font-semibold text-[#1C1917] group-hover:text-[#D97E80] transition-colors">
                    Explore treatments
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FBEDEC] text-[#D97E80] group-hover:bg-[#EC9C9D] group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] shadow-md hover:shadow-lg hover:brightness-105 transition-all"
          >
            Explore Our Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
