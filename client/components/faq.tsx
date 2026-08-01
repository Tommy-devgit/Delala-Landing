"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIZED_FAQ } from "@/lib/constants";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQ() {
  const [openState, setOpenState] = useState<{ [key: string]: boolean }>({
    "0-0": true, // Default open first question
  });

  const toggleAccordion = (catIdx: number, qIdx: number) => {
    const key = `${catIdx}-${qIdx}`;
    setOpenState((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F4] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono-label text-[11px] text-[#4C061D] bg-white px-3.5 py-1.5 rounded-full border border-[#ECE7DA] inline-block mb-4">
            CATEGORIZED FAQ
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#4C061D] tracking-tight mb-4 leading-[0.95]">
            Frequently Asked <span className="italic font-normal text-[#1c1b12]">Questions</span>.
          </h1>

          <p className="text-base sm:text-lg text-[#736F4E] font-normal leading-relaxed">
            Everything you need to know about searching, physical verification, owner direct contact, and lease security.
          </p>
        </div>

        {/* Categorized FAQ List */}
        <div className="space-y-12">
          {CATEGORIZED_FAQ.map((categoryGroup, catIdx) => (
            <div key={categoryGroup.category} className="space-y-4">
              <h2 className="font-serif-display text-2xl font-light text-[#4C061D] border-b border-[#ECE7DA] pb-3">
                {categoryGroup.category}
              </h2>

              <div className="space-y-3">
                {categoryGroup.questions.map((item, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = !!openState[key];

                  return (
                    <div
                      key={item.q}
                      className="bg-white rounded-xl border border-[#ECE7DA] overflow-hidden shadow-xs hover:border-[#B4C292] transition-colors"
                    >
                      <button
                        onClick={() => toggleAccordion(catIdx, qIdx)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C061D]"
                        aria-expanded={isOpen}
                      >
                        <span className="font-serif-display text-lg font-light text-[#1c1b12]">
                          {item.q}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center text-[#4C061D] shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 bg-[#4C061D] text-white border-[#4C061D]" : ""
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="px-6 pb-6 pt-0 text-sm text-[#736F4E] leading-relaxed border-t border-[#ECE7DA] mt-1 font-normal">
                              <div className="pt-4">{item.a}</div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

