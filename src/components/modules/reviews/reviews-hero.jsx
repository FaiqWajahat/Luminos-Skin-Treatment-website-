import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { Calendar, Star } from "lucide-react";

export function ReviewsHero() {
  return (
    <section className="pt-12 pb-14 border-b border-[#E8DFD5] bg-[#F7F3EE]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Verified Client Feedback"
            title="Trusted by clients across Leeds and Yorkshire."
            description="Read honest reviews and clinical feedback from clients who have experienced treatments at Luminous Skin Clinic."
          />

          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#EAA59E] to-[#EC9C9D] shadow-xs hover:brightness-105 transition-all self-start md:self-end"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Your Experience</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
