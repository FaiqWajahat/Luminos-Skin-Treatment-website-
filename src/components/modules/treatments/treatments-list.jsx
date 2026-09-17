"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TREATMENTS } from "@/constants/clinic-data";
import { TreatmentCard } from "./treatment-card";
import { TreatmentCardSkeleton } from "@/components/shared/skeleton-loaders";
import { FadeIn } from "@/components/shared/animations";

export function TreatmentsList() {
  const [treatments, setTreatments] = useState(TREATMENTS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/api/treatments", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.treatments && d.treatments.length > 0) {
          setTreatments(d.treatments);
        }
      })
      .catch((err) => console.warn("Using default treatments:", err))
      .finally(() => setLoading(false));
  }, []);

  const standardOrder = [
    "All",
    "All Clinic Facials",
    "Facial Skin Treatments",
    "Massage Therapy",
  ];

  const existingCategories = [
    ...new Set(treatments.map((t) => (t.category || "").trim()).filter(Boolean)),
  ];

  const categories = [
    "All",
    ...standardOrder.filter((c) => c !== "All" && existingCategories.includes(c)),
    ...existingCategories.filter((c) => !standardOrder.includes(c)),
  ];

  const filteredTreatments =
    selectedCategory === "All"
      ? treatments
      : treatments.filter(
          (t) =>
            (t.category || "").trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );

  return (
    <section className="py-14 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Filter Pills */}
        <FadeIn delay={0.05}>
          <div className="flex flex-wrap items-center gap-2 border-b border-[#E8DFD5] pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory.trim().toLowerCase() === cat.trim().toLowerCase()
                    ? "bg-[#1C1917] text-white shadow-xs"
                    : "bg-white text-[#57534E] border border-[#E8DFD5] hover:bg-[#F3ECE6]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Treatment Cards Grid or Luxury Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TreatmentCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
          >
            {filteredTreatments.length === 0 ? (
              <div className="col-span-full py-16 text-center text-sm text-[#78716C] bg-white rounded-2xl border border-[#E8DFD5]">
                No treatments found in this category.
              </div>
            ) : (
              filteredTreatments.map((treatment) => (
                <div
                  key={treatment._id || treatment.id || treatment.slug}
                  className="h-full flex flex-col"
                >
                  <TreatmentCard treatment={treatment} />
                </div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
