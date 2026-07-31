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
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4C061D]/10 text-[#4C061D] text-xs font-extrabold mb-4 border border-[#4C061D]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Structured Process</span>
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#1c1b12] tracking-tight mb-6 leading-tight">
            How Delala works.
          </h1>

          <p className="text-base sm:text-xl text-[#2D2D2D]/80 font-normal leading-relaxed">
            Select your journey below to see how Delala creates a safe, transparent connection between house hunters and property managers.
          </p>
        </div>

        {/* Journey Audience Selector Tabs */}
        <div className="flex items-center gap-3 mb-12 bg-white p-1.5 rounded-full border border-[#ECE7DA] shadow-xs max-w-md">
          <button
            onClick={() => setActiveAudience("seekers")}
            className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeAudience === "seekers"
                ? "bg-[#4C061D] text-white shadow-md"
                : "text-[#2D2D2D]/70 hover:text-[#4C061D]"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>For Home Seekers</span>
          </button>

          <button
            onClick={() => setActiveAudience("owners")}
            className={`flex-1 py-3 px-5 rounded-full text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
              activeAudience === "owners"
                ? "bg-[#3B3923] text-white shadow-md"
                : "text-[#2D2D2D]/70 hover:text-[#3B3923]"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>For Owners & Brokers</span>
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
                className="bg-white p-8 rounded-lg border border-[#ECE7DA] shadow-xs flex flex-col justify-between hover:border-[#B4C292] hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-black text-4xl text-[#736F4E]/40">
                      {item.step}
                    </span>
                    <span className="p-2 rounded-lg bg-[#FAF8F4] text-[#4C061D]">
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl font-bold text-[#1c1b12] mb-1">
                    {item.title}
                  </h3>

                  <div className="text-xs font-bold text-[#736F4E] mb-4 uppercase tracking-wider">
                    {item.subtitle}
                  </div>

                  <p className="text-sm sm:text-base text-[#2D2D2D]/85 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#ECE7DA] flex items-center justify-between text-xs font-bold text-[#4C061D]">
                  <span>Step {item.step} of 03</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Callout Banner */}
        <div className="mt-16 bg-[#4C061D] text-white p-8 sm:p-12 rounded-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-2">
              Ready to start your journey?
            </h3>
            <p className="text-sm text-white/80 max-w-xl font-normal">
              Download the Delala mobile app to browse verified homes or list your property with zero upfront fees.
            </p>
          </div>

          <Link
            href="/download"
            className="px-8 py-3.5 rounded-full bg-[#B4C292] text-[#4C061D] font-extrabold text-sm hover:bg-white transition-colors shrink-0"
          >
            Download Delala App
          </Link>
        </div>

      </div>
    </section>
  );
}
