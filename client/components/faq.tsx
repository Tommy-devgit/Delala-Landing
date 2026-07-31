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
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4C061D]/10 text-[#4C061D] text-xs font-extrabold mb-4 border border-[#4C061D]/20">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Categorized FAQ</span>
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#1c1b12] tracking-tight mb-4 leading-tight">
            Frequently Asked Questions.
          </h1>

          <p className="text-base sm:text-xl text-[#2D2D2D]/80 font-normal leading-relaxed">
            Everything you need to know about searching, physical verification, owner direct contact, and lease security.
          </p>
        </div>

        {/* Categorized FAQ List */}
        <div className="space-y-12">
          {CATEGORIZED_FAQ.map((categoryGroup, catIdx) => (
            <div key={categoryGroup.category} className="space-y-4">
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#4C061D] border-b border-[#ECE7DA] pb-3">
                {categoryGroup.category}
              </h2>

              <div className="space-y-3">
                {categoryGroup.questions.map((item, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = !!openState[key];

                  return (
                    <div
                      key={item.q}
                      className="bg-white rounded-lg border border-[#ECE7DA] overflow-hidden shadow-xs hover:border-[#B4C292] transition-colors"
                    >
                      <button
                        onClick={() => toggleAccordion(catIdx, qIdx)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C061D]"
                        aria-expanded={isOpen}
                      >
                        <span className="font-heading font-bold text-base sm:text-lg text-[#1c1b12]">
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
                            <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-[#2D2D2D]/85 leading-relaxed border-t border-[#ECE7DA] mt-1 font-normal">
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
