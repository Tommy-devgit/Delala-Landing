"use client";

import { motion } from "framer-motion";
import { COMPARISON_DATA } from "@/lib/constants";
import { XCircle, CheckCircle2, ShieldCheck, Zap, Sparkles } from "lucide-react";

export function WhyDelala() {
  return (
    <section id="why-delala" className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] text-xs font-bold mb-4">
            <Zap className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>The Clear Difference</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4">
            Why Ethiopians are switching to Delala.
          </h2>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
            Stop relying on chaotic Telegram groups and unverified street brokers. Experience transparency and safety.
          </p>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Traditional Way (Red tint / muted) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 sm:p-10 rounded-3xl border border-red-100 shadow-sm relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  The Old Way
                </span>
                <span className="text-2xl">❌</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2D2D2D] mb-2">
                {COMPARISON_DATA.traditional.title}
              </h3>
              <p className="text-sm text-[#736F4E] mb-8 font-medium">
                {COMPARISON_DATA.traditional.subtitle}
              </p>

              <div className="space-y-4">
                {COMPARISON_DATA.traditional.points.map((point) => (
                  <div
                    key={point.text}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100"
                  >
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-[#2D2D2D]/80">
                      {point.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-100 text-xs font-semibold text-rose-600">
              Average search time: 3 to 6 painful weeks
            </div>
          </motion.div>

          {/* Delala Way (Burgundy & Sage highlight) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-b from-[#4C061D] to-[#3B3923] text-white p-8 sm:p-10 rounded-3xl border border-[#B4C292]/40 shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#4C061D] bg-[#B4C292] px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" /> The Delala Standard
                </span>
                <span className="text-2xl">✨</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {COMPARISON_DATA.delala.title}
              </h3>
              <p className="text-sm text-[#B4C292] mb-8 font-medium">
                {COMPARISON_DATA.delala.subtitle}
              </p>

              <div className="space-y-4">
                {COMPARISON_DATA.delala.points.map((point) => (
                  <div
                    key={point.text}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#B4C292] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-white/95">
                      {point.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/15 text-xs font-bold text-[#B4C292] flex items-center justify-between">
              <span>Average search time: Under 48 hours</span>
              <Sparkles className="w-4 h-4 text-[#B4C292]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
