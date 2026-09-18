"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TREATMENTS } from "@/constants/clinic-data";
import { Sparkles } from "lucide-react";
import { PricingRowSkeleton } from "@/components/shared/skeleton-loaders";
import { FadeIn } from "@/components/shared/animations";
import { Pagination } from "@/components/shared/pagination";

const ITEMS_PER_PAGE = 8;

export function PricingTable() {
  const [treatments, setTreatments] = useState(TREATMENTS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef(null);

  useEffect(() => {
    fetch("/api/treatments", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.treatments && d.treatments.length > 0) {
          setTreatments(d.treatments);
        }
      })
      .catch((err) => console.warn("Using fallback pricing:", err))
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

  const totalPages = Math.ceil(filteredTreatments.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTreatments = filteredTreatments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={tableRef} className="py-14 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Category Filters */}
        <FadeIn delay={0.05}>
          <div className="flex flex-wrap items-center gap-2 border-b border-[#E8DFD5] pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
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

        {/* Pricing List or Skeletons */}
        {loading ? (
          <div className="luxury-card rounded-3xl overflow-hidden divide-y divide-[#E8DFD5] bg-white border border-[#E8DFD5] shadow-sm">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PricingRowSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <motion.div
              key={`${selectedCategory}-${currentPage}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="luxury-card rounded-3xl overflow-hidden divide-y divide-[#E8DFD5] bg-white border border-[#E8DFD5] shadow-sm"
            >
              {paginatedTreatments.length === 0 ? (
                <div className="p-12 text-center text-sm text-[#78716C]">
                  No treatments available in this category.
                </div>
              ) : (
                paginatedTreatments.map((treatment) => (
                  <div
                    key={treatment._id || treatment.id || treatment.slug}
                    className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:bg-[#FAF8F5] transition-colors group"
                  >
                    <div className="space-y-1.5 sm:max-w-md">
                      <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-semibold text-[#EC9C9D] bg-[#EC9C9D]/10 px-2.5 py-0.5 rounded-full border border-[#EC9C9D]/20">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{treatment.category}</span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-[#1C1917]">
                        {treatment.title}
                      </h3>
                      <p className="text-xs text-[#78716C] line-clamp-2 leading-relaxed">
                        {treatment.shortDescription || treatment.tagline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8DFD5]/60">
                      <div className="text-left sm:text-right">
                        <span className="text-2xl font-serif font-bold text-[#1C1917]">
                          £{treatment.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredTreatments.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              theme="light"
            />
          </div>
        )}
      </div>
    </section>
  );
}
