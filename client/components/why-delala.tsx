"use client";

import { motion } from "framer-motion";
import { COMPARISON_DATA } from "@/lib/constants";
import { CheckCircle2, XCircle, ShieldCheck, AlertTriangle } from "lucide-react";

export function WhyDelala() {
  return (
    <section id="why-delala" className="py-20 lg:py-28 bg-canvas relative border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-extrabold mb-4 border border-primary/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Housing Transformation</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-4 leading-tight">
            Why Ethiopians are switching to Delala.
          </h2>

          <p className="text-base sm:text-lg text-body/80 font-normal leading-relaxed">
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
            className="bg-surface p-8 sm:p-10 rounded-control border border-line shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-2xl font-extrabold text-body">
                  {COMPARISON_DATA.traditional.title}
                </h3>
                <span className="p-2 rounded-lg bg-rose-50 border border-rose-100 text-rose-600">
                  <AlertTriangle className="w-5 h-5" />
                </span>
              </div>

              <p className="text-xs text-muted mb-8 font-bold uppercase tracking-wider">
                {COMPARISON_DATA.traditional.subtitle}
              </p>

              <div className="space-y-4">
                {COMPARISON_DATA.traditional.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-canvas border border-line"
                  >
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-body/80 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-line text-xs font-bold text-muted flex items-center justify-between">
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
            className="bg-primary text-white p-8 sm:p-10 rounded-control border border-accent/40 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-2xl font-extrabold text-white">
                  {COMPARISON_DATA.delala.title}
                </h3>
                <span className="p-2 rounded-lg bg-surface/10 border border-white/20 text-accent">
                  <ShieldCheck className="w-5 h-5" />
                </span>
              </div>

              <p className="text-xs text-accent mb-8 font-extrabold uppercase tracking-wider">
                {COMPARISON_DATA.delala.subtitle}
              </p>

              <div className="space-y-4">
                {COMPARISON_DATA.delala.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-surface/10 border border-white/15 backdrop-blur-xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-white/95 leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-white/15 text-xs font-bold text-accent flex items-center justify-between">
              <span>Average Search Time</span>
              <span className="bg-accent text-primary px-3 py-1 rounded-full font-black text-xs">
                Under 48 Hours
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
