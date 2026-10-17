import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { PageHero, heroText } from "@/components/shared/page-hero";
import { SkinConcerns } from "./skin-concerns";
import { DiscoverTreatments } from "./discover-treatments";

// Clinic picture → skin concerns → treatment categories
export function HomeView({ data = {}, categories = [] }) {
  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow="Welcome to"
        title="Luminous Skin Clinic"
        tagline="Where your natural radiance comes first."
        image={data.heroImage || "/about-01.jpeg"}
        alt="Luminous Skin Clinic, Leeds"
      >
        <p className={heroText}>
          Personalised skin treatments and relaxing facial experiences, created to help your skin look and feel
          beautifully renewed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#EC9C9D] hover:bg-[#D97E80] shadow-md transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Book Appointment
          </Link>
          <Link
            href="/services"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#D97E80] bg-white border border-[#EC9C9D]/50 hover:border-[#EC9C9D] shadow-xs transition-colors"
          >
            Explore Our Treatments
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </PageHero>
      <SkinConcerns />
      <DiscoverTreatments categories={categories} />
    </div>
  );
}
