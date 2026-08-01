"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SEEKER_JOURNEY, OWNER_JOURNEY } from "@/lib/constants";
import { Users, Building2, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function HowItWorks() {
  const [activeAudience, setActiveAudience] = useState<"seekers" | "owners">("seekers");
  const steps = activeAudience === "seekers" ? SEEKER_JOURNEY : OWNER_JOURNEY;

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="font-mono-label text-[11px] text-[#4C061D] bg-white px-3.5 py-1.5 rounded-full border border-[#ECE7DA] inline-block mb-4">
            STRUCTURED PROCESS
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#4C061D] tracking-tight mb-6 leading-[0.95]">
            How <span className="italic font-normal text-[#1c1b12]">Delala</span> works.
          </h1>

          <p className="text-base sm:text-lg text-[#736F4E] font-normal leading-relaxed">
            Select your journey below to see how Delala creates a safe, transparent connection between house hunters and property managers.
          </p>
        </div>

        {/* Journey Audience Selector Tabs */}
        <div className="flex items-center gap-3 mb-12 bg-white p-1.5 rounded-lg border border-[#ECE7DA] shadow-xs max-w-md">
          <button
            onClick={() => setActiveAudience("seekers")}
            className={`flex-1 py-2.5 px-4 rounded-md font-mono-label text-[11px] transition-all flex items-center justify-center gap-2 ${
              activeAudience === "seekers"
                ? "bg-[#4C061D] text-white shadow-xs"
                : "text-[#736F4E] hover:text-[#4C061D]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>FOR HOUSE HUNTERS</span>
          </button>

          <button
            onClick={() => setActiveAudience("owners")}
            className={`flex-1 py-2.5 px-4 rounded-md font-mono-label text-[11px] transition-all flex items-center justify-center gap-2 ${
              activeAudience === "owners"
                ? "bg-[#3B3923] text-white shadow-xs"
                : "text-[#736F4E] hover:text-[#3B3923]"
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>FOR OWNERS & BROKERS</span>
          </button>
        </div>

        {/* Dynamic Journey Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAudience}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {steps.map((item) => (
              <div
                key={item.step}
                className="bg-white p-8 feature-card-radius border border-[#ECE7DA] shadow-xs flex flex-col justify-between hover:border-[#B4C292] hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif-display text-4xl font-light text-[#736F4E]/35">
                      {item.step}
                    </span>
                    <span className="p-2 rounded-lg bg-[#FAF8F4] text-[#4C061D]">
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                  </div>

                  <h3 className="font-serif-display text-2xl font-light text-[#1c1b12] mb-1">
                    {item.title}
                  </h3>

                  <div className="font-mono-label text-[10px] text-[#736F4E] mb-4">
                    {item.subtitle}
                  </div>

                  <p className="text-sm text-[#736F4E] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#ECE7DA] flex items-center justify-between font-mono-label text-[10px] text-[#4C061D]">
                  <span>STEP {item.step} OF 03</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Callout Banner */}
        <div className="mt-16 bg-[#4C061D] text-white p-8 sm:p-12 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif-display text-3xl font-light mb-2">
              Ready to start your journey?
            </h3>
            <p className="text-sm text-white/80 max-w-xl font-normal">
              Download the Delala mobile app to browse verified homes or list your property with zero upfront fees.
            </p>
          </div>

          <Link
            href="/download"
            className="px-6 py-3 rounded-lg bg-[#B4C292] text-[#4C061D] font-bold text-sm hover:bg-white transition-colors shrink-0"
          >
            Download Delala App →
          </Link>
        </div>

      </div>
    </section>
  );
}

