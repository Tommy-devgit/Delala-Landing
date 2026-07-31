"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Smartphone, ShieldCheck, CheckCircle2 } from "lucide-react";
import { HERO_EDITORIAL_CONTENT } from "@/lib/constants";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-28 overflow-hidden select-none bg-[#FAF8F4]"
    >
      {/* Background Soft Glows & Editorial Grid Accent */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-radial from-[#B4C292]/20 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ECE7DA] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* EDITORIAL HERO COMPOSITION: 2-COLUMN ASYMMETRIC GRID WITH OVERLAPPING LAYERS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Typography, Copy & Action Pills */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-6 flex flex-col items-start text-left z-20"
          >
            {/* Editorial Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#ECE7DA] shadow-xs text-xs font-extrabold text-[#4C061D] mb-6"
            >
              <ShieldCheck className="w-4 h-4 text-[#4C061D]" />
              <span>Physical Verification Standard</span>
            </motion.div>

            {/* High-Impact Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#1c1b12] tracking-tight leading-[1.08] mb-6"
            >
              {HERO_EDITORIAL_CONTENT.headline}
            </motion.h1>

            {/* Subheadline & Purpose Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#2D2D2D]/85 font-medium leading-relaxed mb-4 max-w-xl"
            >
              {HERO_EDITORIAL_CONTENT.subheadline}
            </motion.p>

            {/* Editorial Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-xs sm:text-sm text-[#736F4E] leading-relaxed mb-8 max-w-lg font-normal"
            >
              {HERO_EDITORIAL_CONTENT.description}
            </motion.p>

            {/* Action Pill Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/download"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#4C061D] text-white font-extrabold text-sm shadow-md hover:bg-[#3B3923] transition-all duration-200 group active:scale-98"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                <span>Download App</span>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-[#2D2D2D] border border-[#ECE7DA] font-bold text-sm shadow-xs hover:border-[#4C061D] hover:text-[#4C061D] transition-all duration-200 group active:scale-98"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Trust Highlights Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 mt-8 border-t border-[#ECE7DA] w-full"
            >
              {HERO_EDITORIAL_CONTENT.trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-xs font-bold text-[#3B3923]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4C061D] shrink-0" />
                  <span className="truncate">{badge}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Layered Editorial Image Composition using Home Away From Home (1).jfif */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/4.5] sm:aspect-[4/3.8] lg:aspect-[4/4.8]">
              
              {/* Back Layer Accent Box */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-xl bg-[#4C061D]/10 border border-[#4C061D]/15 pointer-events-none" />

              {/* Main Image Frame with Parallax */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full h-full rounded-xl overflow-hidden border border-[#ECE7DA] shadow-2xl bg-[#1c1b12] group"
              >
                <motion.img
                  style={{ y: imageY }}
                  src="/images/hero_home_away.jpg"
                  alt="Delala Home Away From Home Ethiopian Residence"
                  className="w-full h-[115%] object-cover object-center transition-transform duration-700"
                />
                
                {/* Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                {/* Bottom Image Caption Badge */}
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#B4C292] mb-1">
                    Featured Residence • Addis Ababa
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                    Home Away From Home
                  </h3>
                  <p className="text-xs text-white/80 font-normal line-clamp-1">
                    Physically verified G+1 Residence with standby generator & private security.
                  </p>
                </div>
              </motion.div>

              {/* Floating Overlapping Card 1 (Top Left Glass Card) */}
              <motion.div
                style={{ y: badgeY }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-6 -left-6 sm:-left-8 z-30 bg-white/95 backdrop-blur-md p-4 rounded-lg border border-[#ECE7DA] shadow-xl max-w-[220px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-md bg-[#4C061D] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ETB
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#4C061D]">
                      Transparent Rent
                    </div>
                    <div className="text-[10px] text-[#736F4E] font-medium">
                      Zero hidden middleman fees
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Overlapping Card 2 (Bottom Right Inspection Badge) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -right-4 sm:-right-6 z-30 bg-[#3B3923] text-white p-4 rounded-lg border border-[#B4C292]/40 shadow-2xl max-w-[210px]"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-6 h-6 text-[#B4C292] shrink-0" />
                  <div>
                    <div className="text-xs font-extrabold text-white">
                      Field Verified
                    </div>
                    <div className="text-[10px] text-[#B4C292] font-medium">
                      In-person agent checked
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
