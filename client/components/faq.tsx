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
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-canvas relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="font-mono-label text-label text-primary bg-surface px-3.5 py-1.5 rounded-full border border-line inline-block mb-4">
            CATEGORIZED FAQ
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-primary tracking-tight mb-4 leading-[0.95]">
            Frequently Asked <span className="italic font-normal text-ink">Questions</span>.
          </h1>

          <p className="text-base sm:text-lg text-muted font-normal leading-relaxed">
            Everything you need to know about searching, physical verification, owner direct contact, and lease security.
          </p>
        </div>

        {/* Categorized FAQ List */}
        <div className="space-y-12">
          {CATEGORIZED_FAQ.map((categoryGroup, catIdx) => (
            <div key={categoryGroup.category} className="space-y-4">
              <h2 className="font-serif-display text-2xl font-light text-primary border-b border-line pb-3">
                {categoryGroup.category}
              </h2>

              <div className="space-y-3">
                {categoryGroup.questions.map((item, qIdx) => {
                  const key = `${catIdx}-${qIdx}`;
                  const isOpen = !!openState[key];

                  return (
                    <div
                      key={item.q}
                      className="bg-surface rounded-control border border-line overflow-hidden shadow-xs hover:border-accent transition-colors"
                    >
                      <button
                        onClick={() => toggleAccordion(catIdx, qIdx)}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-expanded={isOpen}
                      >
                        <span className="font-serif-display text-lg font-light text-ink">
                          {item.q}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full bg-canvas border border-line flex items-center justify-center text-primary shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 bg-primary text-white border-primary" : ""
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
                            <div className="px-6 pb-6 pt-0 text-sm text-muted leading-relaxed border-t border-line mt-1 font-normal">
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

