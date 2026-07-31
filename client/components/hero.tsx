"use client";

import { useState } from "react";
import { HeroComposition } from "@/components/hero-composition";
import { VideoModal } from "@/components/video-modal";
import {
  Smartphone,
  Play,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FAF8F4]">
      {/* Background Subtle Radial Gradient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] hero-glow-primary rounded-full blur-3xl opacity-60" />
        <div className="absolute top-20 right-1/4 w-[450px] h-[450px] hero-glow-accent rounded-full blur-3xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Reference-Inspired Frame Outer Container */}
        <div className="relative bg-white/70 backdrop-blur-xl rounded-[36px] sm:rounded-[48px] p-6 sm:p-10 lg:p-14 border border-[#ECE7DA] hero-frame-shadow overflow-hidden">
          {/* Subtle Top Accent Pill Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B4C292]/25 border border-[#B4C292]/40 text-[#4C061D] text-xs font-semibold mb-6 sm:mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>The Modern Standard for Ethiopian Real Estate</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4C061D]" />
            <span className="font-heading text-xs text-[#4C061D]">ደላላ</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 flex flex-col items-start text-left"
            >
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#4C061D] leading-[1.1] tracking-tight mb-6">
                Find your next home,{" "}
                <span className="block text-[#3B3923] relative">
                  without the hassle.
                  <svg
                    className="absolute -bottom-2 left-0 w-48 sm:w-64 h-3 text-[#B4C292]/70"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 10C50 3 150 3 198 10"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-[#2D2D2D]/80 leading-relaxed font-normal mb-8 max-w-xl">
                Browse verified homes, trusted brokers, and apartments across
                Ethiopia—all in one place. No chaotic Telegram chats or unverified brokers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
                <a
                  href="#download"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#4C061D] text-[#FAF8F4] font-semibold text-base shadow-md hover:bg-[#3B3923] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
                >
                  <Smartphone className="w-5 h-5 text-[#B4C292] group-hover:rotate-12 transition-transform duration-300" />
                  <span>Download App</span>
                  <ArrowRight className="w-5 h-5 text-[#B4C292] group-hover:translate-x-1 transition-transform duration-200" />
                </a>

                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-white text-[#4C061D] border border-[#ECE7DA] font-semibold text-base shadow-xs hover:border-[#B4C292] hover:bg-[#FAF8F4] hover:shadow-sm transition-all duration-200 group"
                >
                  <div className="w-7 h-7 rounded-full bg-[#B4C292]/30 flex items-center justify-center text-[#4C061D] group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-[#4C061D] translate-x-0.5" />
                  </div>
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Trust Micro Indicators */}
              <div className="pt-6 border-t border-[#ECE7DA] w-full flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm font-medium text-[#736F4E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B4C292]" />
                  <span>100% In-Person Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B4C292]" />
                  <span>Certified Local Brokers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#B4C292]" />
                  <span>Transparent ETB Pricing</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side Artistic GSAP Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <HeroComposition />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal Trigger */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </section>
  );
}
