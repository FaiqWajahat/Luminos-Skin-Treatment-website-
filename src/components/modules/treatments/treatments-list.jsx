"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TREATMENTS } from "@/constants/clinic-data";
import { TreatmentCard } from "./treatment-card";
import { TreatmentCardSkeleton } from "@/components/shared/skeleton-loaders";
import { FadeIn } from "@/components/shared/animations";
import { Pagination } from "@/components/shared/pagination";
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export function TreatmentsList() {
  const [treatments, setTreatments] = useState(TREATMENTS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef(null);

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

  const filteredTreatments = treatments.filter((t) => {
    const matchesCategory =
      selectedCategory === "All"
        ? true
        : (t.category || "").trim().toLowerCase() === selectedCategory.trim().toLowerCase();

    const matchesSearch =
      searchQuery.trim() === ""
        ? true
        : (t.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.description || "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTreatments.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTreatments = filteredTreatments.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={listRef} className="py-14 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Filters and Search */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8DFD5] pb-6">
            <div className="flex flex-wrap items-center gap-2">
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
            
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#78716C]" />
              <input
                type="text"
                placeholder="Search treatments..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DFD5] bg-white text-sm text-[#1C1917] focus:outline-none focus:border-[#EC9C9D] focus:ring-1 focus:ring-[#EC9C9D] transition-shadow placeholder:text-stone-400"
              />
            </div>
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
          <div className="space-y-10">
            <motion.div
              key={`${selectedCategory}-${currentPage}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            >
              {paginatedTreatments.length === 0 ? (
                <div className="col-span-full py-16 text-center text-sm text-[#78716C] bg-white rounded-2xl border border-[#E8DFD5]">
                  No treatments found in this category.
                </div>
              ) : (
                paginatedTreatments.map((treatment) => (
                  <div
                    key={treatment._id || treatment.id || treatment.slug}
                    className="h-full flex flex-col"
                  >
                    <TreatmentCard treatment={treatment} />
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
