"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { CATALOG_TREATMENTS, TREATMENT_CATEGORIES } from "@/constants/treatment-catalog";

const PAGES = [
  { title: "Home", href: "/", keywords: "home luminous skin clinic leeds" },
  { title: "Services", href: "/services", keywords: "services treatments prices facials" },
  { title: "About", href: "/about", keywords: "about madi founder therapist clinic" },
  { title: "Contact & Booking", href: "/contact", keywords: "contact phone whatsapp email location map address opening hours find us" },
  { title: "Book Appointment", href: "/booking", keywords: "book booking appointment reserve deposit" },
  { title: "Client Reviews", href: "/#reviews", keywords: "reviews trustpilot testimonials clients" },
  { title: "Results Videos", href: "/#results", keywords: "results videos before after" },
];

const normalise = (s = "") => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function buildIndex(treatments) {
  return [
    ...PAGES.map((p) => ({ ...p, type: "Page" })),
    ...TREATMENT_CATEGORIES.map((c) => ({
      title: c.title,
      href: `/services#${c.slug}`,
      keywords: c.summary,
      type: "Category",
    })),
    ...treatments.map((t) => ({
      title: t.title,
      href: `/services/${t.slug}`,
      keywords: `${t.category || ""} ${t.shortDescription || ""} ${(t.benefits || []).join(" ")}`,
      type: "Treatment",
    })),
  ];
}

// Every query word must appear; title matches rank first
function searchIndex(index, query) {
  const words = normalise(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return index
    .map((item) => {
      const title = normalise(item.title);
      const haystack = `${title} ${normalise(item.keywords)}`;
      if (!words.every((w) => haystack.includes(w))) return null;
      const score = (title.startsWith(words[0]) ? 3 : 0) + words.filter((w) => title.includes(w)).length;
      return { ...item, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

export function SiteSearch({ className = "", onNavigate }) {
  const router = useRouter();
  const listId = useId();
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [treatments, setTreatments] = useState(CATALOG_TREATMENTS);
  const [loaded, setLoaded] = useState(false);

  const index = useMemo(() => buildIndex(treatments), [treatments]);
  const results = useMemo(() => searchIndex(index, query), [index, query]);

  // Live treatment list, fetched the first time the search is used
  const loadTreatments = () => {
    if (loaded) return;
    setLoaded(true);
    fetch("/api/treatments?scope=public")
      .then((r) => r.json())
      .then((d) => d.treatments?.length && setTreatments(d.treatments))
      .catch(() => {});
  };

  useEffect(() => {
    const onPointerDown = (e) => !wrapperRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const go = (item) => {
    setQuery("");
    setOpen(false);
    onNavigate?.();
    router.push(item.href);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      go(results[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showList = open && query.trim().length > 0;

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
      <input
        type="search"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-label="Search the website"
        placeholder="Search treatments, info…"
        value={query}
        onFocus={() => {
          loadTreatments();
          setOpen(true);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
        className="w-full rounded-xl border border-[#E8DFD5] bg-white py-2.5 pl-10 pr-9 text-sm text-[#1C1917] placeholder:text-[#A8A29E] outline-none focus:border-[#EC9C9D] focus:ring-2 focus:ring-[#EC9C9D]/20 [&::-webkit-search-cancel-button]:hidden"
      />
      {query && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setQuery("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#A8A29E] hover:text-[#1C1917] cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute right-0 left-0 sm:left-auto sm:w-96 top-full mt-2 z-50 max-h-96 overflow-y-auto rounded-2xl border border-[#E8DFD5] bg-white p-1.5 shadow-xl shadow-[#1C1917]/10"
        >
          {results.length === 0 ? (
            <li className="px-3 py-4 text-sm text-center text-[#78716C]">No results for “{query}”</li>
          ) : (
            results.map((item, i) => (
              <li
                key={`${item.type}-${item.href}`}
                role="option"
                aria-selected={i === activeIndex}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => go(item)}
                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl cursor-pointer ${
                  i === activeIndex ? "bg-[#FBEDEC]" : ""
                }`}
              >
                <span className="text-sm font-medium text-[#1C1917] truncate">{item.title}</span>
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-[#D97E80]">{item.type}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
