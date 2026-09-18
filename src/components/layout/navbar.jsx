"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, Sparkles, ChevronRight } from "lucide-react";
import { NAV_LINKS, CLINIC_INFO } from "@/constants/clinic-data";
import { TikTokIcon, FacebookIcon } from "@/components/shared/social-icons";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8DFD5] shadow-xs py-3"
          : "bg-[#FAF8F5] border-b border-[#E8DFD5]/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Clinic Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-xs group-hover:scale-105 transition-transform duration-300 border border-[#E8DFD5] bg-white flex items-center justify-center">
              <img src="/logo.jpeg" alt="Luminous Skin Clinic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base tracking-tight text-[#1C1917] group-hover:text-[#EC9C9D] transition-colors">
                {CLINIC_INFO.shortName}
              </span>
              <span className="text-[11px] text-[#78716C] tracking-wider uppercase font-medium">
                Skin Clinic · Leeds
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                    isActive
                      ? "text-[#EC9C9D] bg-[#F3ECE6] font-semibold"
                      : "text-[#443E38] hover:text-[#EC9C9D] hover:bg-[#F3ECE6]/60"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action (Book Now CTA) */}
          <div className="hidden sm:flex items-center">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#EAA59E] via-[#EC9C9D] to-[#D97E80] hover:brightness-105 shadow-xs hover:shadow-md transition-all active:scale-98"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-[#292524] hover:bg-[#F3ECE6] border border-[#E8DFD5] transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#FAF8F5] border-b border-[#E8DFD5] shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#F3ECE6] text-[#EC9C9D] font-semibold"
                        : "text-[#292524] hover:bg-[#F3ECE6]/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#A8A29E]" />
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-[#E8DFD5] space-y-3">
              <Link
                href="/booking"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#EAA59E] to-[#EC9C9D] shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={CLINIC_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-1 rounded-xl bg-white border border-[#E8DFD5] text-neutral-800 flex flex-col items-center gap-1 text-[10px] font-medium"
                >
                  <TikTokIcon className="w-4 h-4" />
                  <span>TikTok</span>
                </a>
                <a
                  href={CLINIC_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-1 rounded-xl bg-white border border-[#E8DFD5] text-[#1877F2] flex flex-col items-center gap-1 text-[10px] font-medium"
                >
                  <FacebookIcon className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
