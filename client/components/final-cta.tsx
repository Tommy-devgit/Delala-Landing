"use client";

import { motion } from "framer-motion";
import { Smartphone, ArrowRight, ShieldCheck, QrCode, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-[#4C061D] via-[#3B3923] to-[#4C061D] text-white rounded-[40px] sm:rounded-[56px] p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl border border-[#B4C292]/30 text-center flex flex-col items-center justify-center"
        >
          {/* Subtle Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#B4C292]/25 via-transparent to-transparent blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B4C292]/20 text-[#B4C292] text-xs font-bold mb-6 border border-[#B4C292]/40">
            <Sparkles className="w-4 h-4 text-[#B4C292]" />
            <span>Join 50,000+ Happy Ethiopians</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 max-w-3xl leading-[1.1]">
            Ready to find your next home? <br className="hidden sm:inline" />
            <span className="text-[#B4C292]">Download Delala today.</span>
          </h2>

          <p className="text-base sm:text-xl text-[#FAF8F4]/80 font-normal leading-relaxed max-w-2xl mb-10">
            Say goodbye to fake photos, hidden broker markups, and unverified listings. Your next dream home is waiting on Delala.
          </p>

          {/* App Store Buttons & QR Code */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg mb-12">
            <a
              href="#download"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#B4C292] text-[#4C061D] font-extrabold text-base shadow-lg hover:bg-white hover:scale-102 transition-all duration-200 w-full sm:w-auto"
            >
              <Smartphone className="w-5 h-5 text-[#4C061D]" />
              <span>Download App Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 px-4 rounded-2xl border border-white/20">
              <div className="w-10 h-10 bg-white rounded-lg p-1 shrink-0 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-[#4C061D]" />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-white">Scan QR Code</div>
                <div className="text-white/70">Instant App Download</div>
              </div>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#B4C292] font-semibold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B4C292]" /> Free for Renters
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B4C292]/50" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B4C292]" /> 100% Verified Listings
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B4C292]/50" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B4C292]" /> Direct Owner Contact
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
