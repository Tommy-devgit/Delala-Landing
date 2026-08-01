"use client";

import { motion } from "framer-motion";
import { Smartphone, ArrowRight, QrCode, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#4C061D] text-white rounded-2xl p-8 sm:p-14 lg:p-16 text-center flex flex-col items-center justify-center overflow-hidden shadow-2xl border border-[#B4C292]/40"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial from-[#B4C292]/20 via-transparent to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col items-center">
            <span className="font-mono-label text-[11px] text-[#B4C292] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 inline-block mb-6">
              ETHIOPIA'S TRUSTED HOUSING PLATFORM
            </span>

            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mb-6 leading-tight">
              Ready to find your next home? <br className="hidden sm:inline" />
              Download <span className="italic font-normal text-[#B4C292]">Delala</span> today.
            </h2>

            <p className="text-base sm:text-lg text-white/85 font-normal leading-relaxed max-w-2xl mb-10">
              Say goodbye to fake photos, hidden broker markups, and unverified listings. Your next home is one click away.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-lg">
              <Link
                href="/download"
                className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-lg bg-[#B4C292] text-[#4C061D] font-bold text-sm shadow-lg hover:bg-white transition-all duration-200 w-full sm:w-auto shrink-0 group"
              >
                <Smartphone className="w-4 h-4 text-[#4C061D]" />
                <span>Download App Now</span>
                <ArrowRight className="w-4 h-4 text-[#4C061D] group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center gap-3 bg-white/10 p-2.5 px-4 rounded-lg border border-white/20">
                <div className="w-9 h-9 bg-white rounded-lg p-1 shrink-0 flex items-center justify-center">
                  <QrCode className="w-7 h-7 text-[#4C061D]" />
                </div>
                <div className="text-left text-xs">
                  <div className="font-mono-label text-[10px] text-white font-bold">SCAN QR CODE</div>
                  <div className="text-white/70 text-[10px]">Instant App Install</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

