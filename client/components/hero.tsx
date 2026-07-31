"use client";

import { useState } from "react";
import { ArrowUpRight, ShieldCheck, CheckCircle2, Building2, Users } from "lucide-react";
import { HERO_AUDIENCE_DATA } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const [activeTab, setActiveTab] = useState<"seekers" | "sharers">("seekers");
  const content = HERO_AUDIENCE_DATA[activeTab];

  return (
    <section className="relative bg-[#FAF8F4] select-none overflow-hidden pb-4 sm:pb-6">
      {/* Outer Container tucked upward (-mt) with clean horizontal margins */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 -mt-4 sm:-mt-6 lg:-mt-8">
        
        {/* MAIN HERO CARD CONTAINER — STRICT MAX 100VH HEIGHT & FRAMED CARD */}
        <div className="relative w-full max-h-[calc(100vh-120px)] min-h-[500px] sm:min-h-[560px] rounded-[36px] sm:rounded-[44px] lg:rounded-[52px] overflow-hidden shadow-2xl bg-[#1c1b12] border border-[#ECE7DA] flex flex-col justify-between">
          
          {/* 1. TOP VISUAL PHOTO BACKDROP WITH FLOATING BADGES */}
          <div className="relative flex-1 min-h-[260px] sm:min-h-[320px] w-full overflow-hidden">
            {/* Background Visual Photo */}
            <img
              src="/images/hero_property.png"
              alt="Delala Verified Luxury Ethiopian Property"
              className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            
            {/* Gradient Overlay for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/60 pointer-events-none" />

            {/* Top Bar inside Hero Frame: Audience Toggle & Verification Badge */}
            <div className="absolute top-5 left-5 right-5 z-20 flex flex-wrap items-center justify-between gap-3">
              {/* Audience Selector Tabs (Two-Sided Marketplace) */}
              <div className="bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20 flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("seekers")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    activeTab === "seekers"
                      ? "bg-white text-[#4C061D] shadow-sm"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Home Seekers</span>
                </button>

                <button
                  onClick={() => setActiveTab("sharers")}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    activeTab === "sharers"
                      ? "bg-[#B4C292] text-[#4C061D] shadow-sm"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Owners & Brokers</span>
                </button>
              </div>

              {/* Verified Trust Badge */}
              <div className="hidden sm:flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-[#4C061D] shadow-md border border-white">
                <ShieldCheck className="w-4 h-4 text-[#4C061D]" />
                <span>100% Inspected Properties</span>
              </div>
            </div>

            {/* Floating Live Trust Indicator Pills (Bottom Right of Image) */}
            <div className="absolute bottom-4 right-5 z-20 hidden md:flex items-center gap-2">
              {content.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-semibold text-white flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#B4C292]" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. BOTTOM CONTENT SECTION */}
          <div className="relative z-20 bg-white p-6 sm:p-10 lg:p-12 border-t border-[#ECE7DA]/60">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="max-w-4xl"
              >
                {/* Headline */}
                <div className="mb-4 sm:mb-6">
                  <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1c1b12] tracking-tight leading-[1.08]">
                    {content.headline}
                  </h1>
                </div>

                {/* Subtitle Row with Vertical Line Divider & Pill CTA Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-5 border-t border-[#ECE7DA]">
                  {/* Left Audience Label */}
                  <div className="text-[11px] font-extrabold text-[#736F4E] uppercase tracking-wider shrink-0 leading-tight">
                    {content.badge.split(" ")[0]} <br />
                    {content.badge.split(" ").slice(1).join(" ")}
                  </div>

                  {/* Vertical Divider Line */}
                  <div className="hidden sm:block w-px h-10 bg-[#ECE7DA]" />

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-[#2D2D2D]/85 leading-relaxed font-medium flex-1 max-w-xl">
                    {content.subtitle}
                  </p>

                  {/* Action Pill CTA Button */}
                  <a
                    href="#download"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1c1b12] text-white font-extrabold text-xs sm:text-sm shadow-md hover:bg-[#4C061D] transition-all duration-200 shrink-0 group"
                  >
                    <span>{content.cta}</span>
                    <ArrowUpRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
