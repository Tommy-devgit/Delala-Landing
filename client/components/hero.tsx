"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, ShieldCheck, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-24 overflow-hidden select-none bg-[#FAF8F4]">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-radial from-[#B4C292]/25 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Minimal Hero Header & Copy */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-12 sm:mb-16">
          
          {/* Subtle Ethiopian Tech Brand Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#ECE7DA] shadow-xs text-xs font-bold text-[#4C061D] mb-6"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>Verified Housing Platform for Ethiopia</span>
          </motion.div>

          {/* Short Memorable Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-[#1c1b12] tracking-tight leading-[1.08] mb-6"
          >
            Find a place you can call home.
          </motion.h1>

          {/* Single Short Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-[#2D2D2D]/80 font-normal leading-relaxed max-w-2xl mb-8"
          >
            Delala connects people searching for homes with trusted owners and brokers across Ethiopia.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {/* Primary CTA */}
            <Link
              href="/download"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#4C061D] text-white font-extrabold text-sm sm:text-base shadow-md hover:bg-[#3B3923] transition-all duration-200 group"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              <span>Download App</span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/features"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#2D2D2D] border border-[#ECE7DA] font-bold text-sm sm:text-base shadow-xs hover:border-[#4C061D] hover:text-[#4C061D] transition-all duration-200 group"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Minimal Hero Visual Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto rounded-[32px] sm:rounded-[44px] overflow-hidden border border-[#ECE7DA] shadow-2xl bg-[#1c1b12] aspect-[16/9] sm:aspect-[21/10] group"
        >
          {/* Main Hero Property Image */}
          <img
            src="/images/hero_property.png"
            alt="Delala Modern Ethiopian Home"
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
          />

          {/* Gentle Gradient Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

          {/* Floating Glass Badge */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
            <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xl max-w-md">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#4C061D] mb-1">
                <CheckCircle2 className="w-4 h-4 text-[#4C061D]" />
                <span>100% Physically Inspected Homes</span>
              </div>
              <p className="text-xs text-[#2D2D2D]/80 font-medium">
                Verified photos, transparent Birr pricing, and direct owner walkthroughs.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Active in Addis Ababa, Hawassa & Regional Hubs</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
