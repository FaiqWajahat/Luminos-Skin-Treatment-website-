"use client";

import { useState } from "react";
import { CONTACT_FAQS } from "@/constants/contact-data";
import { Plus, Minus, HelpCircle, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/shared/animations";

export function ContactFAQ({ faqs }) {
  const displayFaqs = faqs?.length > 0 ? faqs : CONTACT_FAQS;
  const [openId, setOpenId] = useState(displayFaqs[0]?.id || null);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 border-t border-[#E8DFD5] bg-[#F7F3EE]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <FadeIn delay={0.05}>
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-[#EC9C9D]/10 text-[#EC9C9D] border border-[#EC9C9D]/20">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Inquiries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tracking-tight">
              Frequently Asked Questions About Contact & Visits
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] max-w-xl mx-auto">
              Everything you need to know about consultation response times, confidentiality, photo assessments, and our central Leeds clinic policies.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-3">
          {displayFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <FadeIn key={faq.id} delay={0.05 * (idx + 1)}>
                <div
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white border-[#EAA59E] shadow-xs"
                      : "bg-[#FAF8F5] border-[#E8DFD5] hover:border-[#D6C4B2]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 text-left gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#1C1917]">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#EC9C9D] text-white"
                          : "bg-stone-200/70 text-[#57534E]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#57534E] leading-relaxed border-t border-stone-100 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3}>
          <div className="p-6 rounded-2xl bg-white border border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-[#1C1917]">
                Still have an unanswered question?
              </h4>
              <p className="text-xs text-[#78716C]">
                Our dedicated clinic coordinator is ready to assist you right away.
              </p>
            </div>
            <a
              href="https://wa.me/447950774790"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#1C1917] hover:bg-[#292524] transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-[#F0A5A2]" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
