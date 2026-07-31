"use client";

import { motion } from "framer-motion";
import { COMPARISON_DATA } from "@/lib/constants";
import { CheckCircle2, XCircle } from "lucide-react";

export function WhyDelala() {
  return (
    <section id="why-delala" className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4">
            Why house hunters choose Delala.
          </h2>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
            Stop relying on unverified Telegram groups and middleman fraud. Experience safety and clarity.
          </p>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Traditional Way */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 sm:p-10 rounded-3xl border border-[#ECE7DA] shadow-xs flex flex-col justify-between"
          >
            <div>
              <h3 className="font-heading text-2xl font-extrabold text-[#2D2D2D] mb-1">
                {COMPARISON_DATA.traditional.title}
              </h3>
              <p className="text-xs text-[#736F4E] mb-8 font-semibold uppercase tracking-wider">
                {COMPARISON_DATA.traditional.subtitle}
              </p>

              <div className="space-y-4">
                {COMPARISON_DATA.traditional.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA]"
                  >
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-[#2D2D2D]/80">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#ECE7DA] text-xs font-semibold text-[#736F4E]">
              Average search time: 3 to 6 weeks
            </div>
          </motion.div>

          {/* Delala Way */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#4C061D] text-white p-8 sm:p-10 rounded-3xl border border-[#B4C292]/30 shadow-xl flex flex-col justify-between"
          >
            <div>
              <h3 className="font-heading text-2xl font-extrabold text-white mb-1">
                {COMPARISON_DATA.delala.title}
              </h3>
              <p className="text-xs text-[#B4C292] mb-8 font-semibold uppercase tracking-wider">
                {COMPARISON_DATA.delala.subtitle}
              </p>

              <div className="space-y-4">
                {COMPARISON_DATA.delala.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#B4C292] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-white/95">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/15 text-xs font-bold text-[#B4C292]">
              Average search time: Under 48 hours
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
