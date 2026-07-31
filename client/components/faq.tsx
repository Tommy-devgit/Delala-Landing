"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA } from "@/lib/constants";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] text-xs font-bold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>Got Questions?</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4">
            Frequently Asked Questions.
          </h2>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
            Everything you need to know about searching, listing, and verifying homes on Delala.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[#4C061D] shadow-md ring-2 ring-[#4C061D]/10"
                    : "border-[#ECE7DA] hover:border-[#B4C292]"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-bold text-lg text-[#4C061D]">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FAF8F4] flex items-center justify-center text-[#4C061D] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#4C061D] text-[#B4C292]" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
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
                      <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-[#2D2D2D]/80 leading-relaxed border-t border-[#ECE7DA]/60 mt-1">
                        <div className="pt-4">{item.answer}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
