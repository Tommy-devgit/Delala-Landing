"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ShieldCheck, Search, CheckCircle2 } from "lucide-react";
import { HERO_EDITORIAL_CONTENT } from "@/lib/constants";

export function Hero() {
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/features?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-28 overflow-hidden select-none bg-canvas"
    >
      {/* Background Soft Glows & Ambient Atmospheric Accent */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-radial from-accent/25 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ASYMMETRIC GRID LAYOUT (DESIGN.MD PLACEMENT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Eyebrow Badge, Serif Display Headline, AI Search Bar & Actions */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-6 flex flex-col items-start text-left z-20"
          >

            {/* High-Impact Whisper-Weight Serif Display Headline (weight 300, 0.9 leading) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              // Starts at 4xl like every other heading on the site. At 5xl the
              // first line ran to the edge of a 320px screen, where `leading-[0.92]`
              // then stacked the wrapped lines almost on top of each other.
              className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-primary tracking-tight leading-[0.95] sm:leading-[0.92] mb-6"
            >
              The <span className="italic font-normal text-ink">Best Way</span> to Find Your Next Home.
            </motion.h1>

            {/* Subheadline & Purpose Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted font-normal leading-relaxed mb-8 max-w-xl"
            >
              {HERO_EDITORIAL_CONTENT.subheadline}
            </motion.p>

            {/* AI Natural Language Property Search Input Module (from design.md) */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="w-full max-w-lg mb-8 relative"
            >
              <div className="relative flex items-center bg-surface rounded-lg border border-line shadow-xs pl-[22px] pr-2 py-2 hover:border-primary/40 transition-colors">
                <input
                  type="text"
                  aria-label="Describe the home you are looking for"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything... e.g. 2-bedroom in Bole under 45k Birr"
                  className="w-full bg-transparent text-sm text-body placeholder-muted/70 focus:outline-none font-sans"
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors shrink-0 active:scale-95 ml-2"
                  aria-label="Search properties"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2 pl-2">
                <span className="font-mono-label text-label text-muted">POPULAR:</span>
                <button
                  type="button"
                  onClick={() => setQuery("Furnished studio in Kazanchis")}
                  className="text-label text-primary hover:underline font-medium"
                >
                  Studio in Kazanchis
                </button>
                <span className="text-line">•</span>
                <button
                  type="button"
                  onClick={() => setQuery("G+1 House in Hawassa")}
                  className="text-label text-primary hover:underline font-medium"
                >
                  Villa in Hawassa
                </button>
              </div>
            </motion.form>

            {/* Action Buttons (8px radius, 12px/18px padding, primary white on burgundy) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
            >
              <Link
                href="/download"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium text-sm shadow-sm hover:bg-primary-hover transition-all duration-200 group active:scale-98"
              >
                <span>Download App</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-surface text-body border border-line font-medium text-sm shadow-xs hover:border-primary hover:text-primary transition-all duration-200 group active:scale-98"
              >
                <span>Learn More</span>
              </Link>
            </motion.div>

            {/* Trust Highlights Monospace Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-line w-full"
            >
              {HERO_EDITORIAL_CONTENT.trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="font-mono-label text-label text-primary-hover font-medium truncate">
                    {badge}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Padded Layered Image Frame */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-[4/4.5] sm:aspect-[4/3.8] lg:aspect-[4/4.6]">

              {/* Subtle Back Accent Box */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-card bg-primary/10 border border-primary/15 pointer-events-none" />

              {/* Main Image Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full h-full rounded-card overflow-hidden border border-line shadow-xl bg-ink group"
              >
                <motion.img
                  style={{ y: imageY }}
                  src="/images/hero_home_away.jpg"
                  alt="Delala Home Away From Home Ethiopian Residence"
                  className="w-full h-[112%] object-cover object-center transition-transform duration-700"
                />

                {/* Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                {/* Bottom Image Caption Badge */}
                <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
                  <div className="font-mono-label text-label text-accent mb-1">
                    FEATURED RESIDENCE • ADDIS ABABA
                  </div>
                  <h3 className="font-serif-display text-2xl font-light text-white tracking-tight mb-1">
                    Home Away From Home
                  </h3>
                  <p className="text-xs text-white/80 font-normal line-clamp-1">
                    Physically verified G+1 Residence with standby generator & private security.
                  </p>
                </div>
              </motion.div>

              {/* Floating Overlapping Card 1 (Top Left Transparent Rent Badge) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-5 -left-5 sm:-left-7 z-30 bg-surface/95 backdrop-blur-md p-4 rounded-control border border-line shadow-lg max-w-[210px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                    ETB
                  </div>
                  <div>
                    <div className="font-mono-label text-label text-primary font-bold">
                      TRANSPARENT RENT
                    </div>
                    <div className="text-label text-muted">
                      Zero hidden middleman fees
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Overlapping Card 2 (Bottom Right Field Verified Badge) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-5 -right-3 sm:-right-5 z-30 bg-primary-hover text-white p-4 rounded-control border border-accent/40 shadow-xl max-w-[200px]"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                  <div>
                    <div className="font-mono-label text-label text-white font-bold">
                      FIELD VERIFIED
                    </div>
                    <div className="text-label text-accent">
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
