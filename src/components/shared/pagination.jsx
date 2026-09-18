"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  theme = "light",
  className = "",
}) {
  if (totalPages <= 1 && totalItems <= itemsPerPage) {
    return null;
  }

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers with smart ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("ellipsis-1");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-2");
      }
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 ${
        isDark ? "border-t border-neutral-800/80" : "border-t border-[#E8DFD5]"
      } ${className}`}
    >
      {/* Range Info */}
      <div className={`text-xs ${isDark ? "text-neutral-400" : "text-[#78716C]"}`}>
        Showing{" "}
        <span className={`font-semibold ${isDark ? "text-neutral-200" : "text-[#1C1917]"}`}>
          {startItem}–{endItem}
        </span>{" "}
        of{" "}
        <span className={`font-semibold ${isDark ? "text-neutral-200" : "text-[#1C1917]"}`}>
          {totalItems}
        </span>{" "}
        results
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous Page"
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer disabled:cursor-not-allowed ${
            isDark
              ? "bg-[#161412] border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:hover:bg-[#161412] disabled:hover:text-neutral-300"
              : "bg-white border border-[#E8DFD5] text-[#57534E] hover:bg-[#F3ECE6] hover:text-[#1C1917] disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#57534E]"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Numbered Page Buttons */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((item, idx) => {
            if (typeof item === "string") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className={`w-7 sm:w-8 h-8 flex items-center justify-center text-xs ${
                    isDark ? "text-neutral-600" : "text-[#A8A29E]"
                  }`}
                >
                  •••
                </span>
              );
            }

            const isActive = item === currentPage;

            return (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                aria-current={isActive ? "page" : undefined}
                className={`w-8 h-8 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? isDark
                      ? "bg-gradient-to-r from-[#EC9C9D] to-[#D97E80] text-white shadow-xs"
                      : "bg-[#1C1917] text-white shadow-xs"
                    : isDark
                    ? "bg-[#161412] border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800"
                    : "bg-white border border-[#E8DFD5] text-[#57534E] hover:bg-[#F3ECE6] hover:text-[#1C1917]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next Page"
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer disabled:cursor-not-allowed ${
            isDark
              ? "bg-[#161412] border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white disabled:opacity-30 disabled:hover:bg-[#161412] disabled:hover:text-neutral-300"
              : "bg-white border border-[#E8DFD5] text-[#57534E] hover:bg-[#F3ECE6] hover:text-[#1C1917] disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#57534E]"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
