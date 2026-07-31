"use client";

import { motion } from "framer-motion";
import { COMPARISON_DATA } from "@/lib/constants";
import { CheckCircle2, XCircle, ShieldCheck, AlertTriangle } from "lucide-react";

export function WhyDelala() {
  return (
    <section id="why-delala" className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4C061D]/10 text-[#4C061D] text-xs font-extrabold mb-4 border border-[#4C061D]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Housing Transformation</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4 leading-tight">
            Why Ethiopians are switching to Delala.
          </h2>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
            Stop relying on unverified Telegram channels and middleman fraud. Experience verified transparency.
          </p>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Traditional Way */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 sm:p-10 rounded-xl border border-[#ECE7DA] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-2xl font-extrabold text-[#2D2D2D]">
                  {COMPARISON_DATA.traditional.title}
                </h3>
                <span className="p-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-600">
                  <AlertTriangle className="w-5 h-5" />
                </span>
              </div>

              <p className="text-xs text-[#736F4E] mb-8 font-bold uppercase tracking-wider">
                {COMPARISON_DATA.traditional.subtitle}
              </p>

              <div className="space-y-4">
                {COMPARISON_DATA.traditional.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FAF8F4] border border-[#ECE7DA]"
                  >
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-[#2D2D2D]/80 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#ECE7DA] text-xs font-bold text-[#736F4E] flex items-center justify-between">
              <span>Average Search Time</span>
              <span className="text-rose-600 font-extrabold">3 to 6 weeks</span>
            </div>
          </motion.div>

          {/* Delala Way */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#4C061D] text-white p-8 sm:p-10 rounded-xl border border-[#B4C292]/40 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-2xl font-extrabold text-white">
                  {COMPARISON_DATA.delala.title}
                </h3>
                <span className="p-2 rounded-lg bg-white/10 border border-white/20 text-[#B4C292]">
                  <ShieldCheck className="w-5 h-5" />
                </span>
              </div>

              <p className="text-xs text-[#B4C292] mb-8 font-extrabold uppercase tracking-wider">
                {COMPARISON_DATA.delala.subtitle}
              </p>

              <div className="space-y-4">
                {COMPARISON_DATA.delala.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#B4C292] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-white/95 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-white/15 text-xs font-bold text-[#B4C292] flex items-center justify-between">
              <span>Average Search Time</span>
              <span className="bg-[#B4C292] text-[#4C061D] px-3 py-1 rounded-full font-black text-xs">
                Under 48 Hours
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
