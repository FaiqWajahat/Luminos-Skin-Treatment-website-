"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { formatTreatmentPrice } from "@/constants/treatment-catalog";

// Searchable treatment picker that always opens below the field
export function TreatmentSelect({ groups, value, onChange, error }) {
  const listId = useId();
  const wrapperRef = useRef(null);
  const searchRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState(value);

  const selected = useMemo(() => groups.flatMap((g) => g.items).find((t) => t.slug === value), [groups, value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({ ...g, items: g.items.filter((t) => `${t.title} ${g.category}`.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length);
  }, [groups, query]);
  const flat = useMemo(() => filtered.flatMap((g) => g.items), [filtered]);

  const openList = () => {
    setQuery("");
    setActiveSlug(value);
    setOpen(true);
    requestAnimationFrame(() => {
      searchRef.current?.focus();
      listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
    });
  };

  const choose = (slug) => {
    onChange(slug);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => !wrapperRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onKeyDown = (e) => {
    const i = flat.findIndex((t) => t.slug === activeSlug);
    const move = (next) => {
      e.preventDefault();
      const slug = flat[Math.max(0, Math.min(flat.length - 1, next))]?.slug;
      setActiveSlug(slug);
      listRef.current?.querySelector(`[data-slug="${slug}"]`)?.scrollIntoView({ block: "nearest" });
    };
    if (e.key === "ArrowDown") move(i + 1);
    else if (e.key === "ArrowUp") move(i - 1);
    else if (e.key === "Enter" && activeSlug) {
      e.preventDefault();
      choose(activeSlug);
    } else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => (open ? setOpen(false) : openList())}
        className={`w-full flex items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3.5 text-left transition-colors cursor-pointer ${
          error ? "border-red-400" : open ? "border-[#EC9C9D] ring-2 ring-[#EC9C9D]/20" : "border-[#E8DFD5] hover:border-[#EC9C9D]/60"
        }`}
      >
        {selected ? (
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-[#1C1917] truncate">{selected.title}</span>
            <span className="block text-xs text-[#78716C] truncate">{selected.category}</span>
          </span>
        ) : (
          <span className="text-sm text-[#A8A29E]">Select a treatment…</span>
        )}
        <span className="flex items-center gap-3 shrink-0">
          {selected && <span className="text-sm font-semibold text-[#D97E80]">{formatTreatmentPrice(selected)}</span>}
          <ChevronDown className={`w-4 h-4 text-[#78716C] transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full mt-2 z-30 overflow-hidden rounded-2xl border border-[#E8DFD5] bg-white shadow-2xl shadow-[#1C1917]/10">
          <div className="relative border-b border-[#F0E6E1] p-2.5">
            <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveSlug(undefined);
              }}
              onKeyDown={onKeyDown}
              placeholder="Search treatments…"
              aria-label="Search treatments"
              aria-controls={listId}
              className="w-full rounded-xl bg-[#FAF8F5] py-2.5 pl-9 pr-3 text-sm text-[#1C1917] placeholder:text-[#A8A29E] outline-none focus:ring-2 focus:ring-[#EC9C9D]/25"
            />
          </div>

          <div ref={listRef} id={listId} role="listbox" aria-label="Treatments" className="max-h-72 overflow-y-auto overscroll-contain py-1.5">
            {filtered.length === 0 && <p className="px-4 py-6 text-center text-sm text-[#78716C]">No treatments match “{query}”</p>}
            {filtered.map((group) => (
              <div key={group.category} role="group" aria-label={group.category}>
                <p className="sticky top-0 z-10 bg-white/95 backdrop-blur px-4 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D97E80]">
                  {group.category}
                </p>
                {group.items.map((t) => {
                  const isSelected = t.slug === value;
                  const isActive = t.slug === activeSlug;
                  return (
                    <div
                      key={t.slug}
                      data-slug={t.slug}
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setActiveSlug(t.slug)}
                      onClick={() => choose(t.slug)}
                      className={`mx-1.5 flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 cursor-pointer ${
                        isActive ? "bg-[#FBEDEC]" : ""
                      }`}
                    >
                      <span className="min-w-0">
                        <span className={`block text-sm truncate ${isSelected ? "font-semibold text-[#D97E80]" : "text-[#1C1917]"}`}>
                          {t.title}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-semibold text-[#57534E]">{formatTreatmentPrice(t)}</span>
                        <Check className={`w-4 h-4 text-[#D97E80] ${isSelected ? "" : "invisible"}`} />
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
