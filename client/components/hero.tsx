"use client";

import { useState } from "react";
import { VideoModal } from "@/components/video-modal";
import { NAV_ITEMS } from "@/lib/constants";
import { Play, Info, ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative pt-6 sm:pt-10 pb-12 bg-[#FAF8F4] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Container Frame matching reference layout structure */}
        <div className="relative w-full rounded-[32px] sm:rounded-[44px] md:rounded-[56px] overflow-hidden bg-[#3B3923] shadow-2xl border border-[#ECE7DA]">
          
          {/* TOP SECTION: Massive High-Res Photo Canvas with Integrated Top Pill Bar */}
          <div className="relative min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] w-full flex flex-col justify-between p-6 sm:p-10">
            {/* Background Visual Asset */}
            <img
              src="/images/hero_property.png"
              alt="Delala Luxury Ethiopian Property"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
            />
            {/* Dark vignette gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

            {/* INTEGRATED NAVBAR MATCHING REFERENCE NOTCH STYLE */}
            <div className="relative z-20 flex items-center justify-between w-full">
              {/* Brand Logo */}
              <Link href="/" className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-white drop-shadow-md">
                Delala
              </Link>

              {/* Integrated Center Pill Notch */}
              <nav className="hidden md:flex items-center gap-8 bg-white/95 backdrop-blur-md px-8 py-3 rounded-full border border-white/60 shadow-lg text-sm font-semibold text-[#2D2D2D]">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="hover:text-[#4C061D] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href="#download"
                  className="px-5 py-2.5 rounded-full bg-white text-[#4C061D] font-bold text-xs sm:text-sm shadow-md hover:bg-[#FAF8F4] transition-all"
                >
                  Download App
                </a>
              </div>
            </div>

            {/* FLOATING MEDIA CARD ON BOTTOM RIGHT MATCHING REFERENCE PHOTO */}
            <div className="relative z-20 self-end mt-auto pt-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-72 sm:w-80 md:w-96 bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/80 shadow-2xl text-[#2D2D2D]"
              >
                <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden mb-4 group cursor-pointer" onClick={() => setVideoModalOpen(true)}>
                  <img
                    src="/images/city_addis_ababa.png"
                    alt="Addis Ababa Bole Property"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                  {/* Play Button Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-[#4C061D] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-[#4C061D] translate-x-0.5" />
                    </div>
                  </div>

                  {/* Verified Tag */}
                  <span className="absolute top-3 left-3 bg-[#4C061D] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3 h-3 text-[#B4C292]" /> Verified Villa
                  </span>
                </div>

                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-heading font-extrabold text-lg text-[#4C061D] leading-tight">
                      Bole Luxury Villa
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-[#736F4E] font-medium mt-0.5">
                      <MapPin className="w-3 h-3 text-[#4C061D]" /> Addis Ababa • 45,000 ETB/mo
                    </div>
                  </div>
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="p-1.5 rounded-full hover:bg-[#FAF8F4] text-[#2D2D2D]/60 hover:text-[#4C061D] transition-colors"
                  >
                    <Info className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-[#2D2D2D]/70 font-normal leading-relaxed line-clamp-2">
                  Physically verified 4-bedroom villa with full generator backup, garden, and direct owner contract.
                </p>
              </motion.div>
            </div>
          </div>

          {/* BOTTOM LEFT SECTION: INSET WHITE CONTENT CONTAINER MATCHING REFERENCE LAYOUT */}
          <div className="bg-white p-8 sm:p-12 lg:p-16 border-t border-[#ECE7DA] relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              {/* Left Headline Area */}
              <div className="lg:col-span-7">
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#4C061D] tracking-tight leading-[1.05]">
                  Find your next home, <br />
                  without the hassle.
                </h1>
              </div>

              {/* Right Subtitle & Action Area matching reference layout */}
              <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Vertical Divider Line */}
                <div className="hidden sm:block w-px h-16 bg-[#ECE7DA]" />

                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-[#2D2D2D]/80 leading-relaxed font-normal">
                    Browse verified homes, trusted brokers, and apartments across Ethiopia—all in one place.
                  </p>

                  <a
                    href="#download"
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#4C061D] text-white font-bold text-sm shadow-md hover:bg-[#3B3923] transition-all group"
                  >
                    <span>Download App</span>
                    <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Video Modal */}
      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
    </section>
  );
}
