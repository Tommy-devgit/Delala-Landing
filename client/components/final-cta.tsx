"use client";

import { motion } from "framer-motion";
import { Smartphone, ArrowRight, QrCode } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#4C061D] text-white rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 lg:p-16 text-center flex flex-col items-center justify-center overflow-hidden shadow-2xl border border-[#B4C292]/30"
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 max-w-3xl leading-tight">
            Ready to find your next home? <br className="hidden sm:inline" />
            Download Delala today.
          </h2>

          <p className="text-base sm:text-xl text-white/80 font-normal leading-relaxed max-w-2xl mb-10">
            Say goodbye to fake photos, hidden broker markups, and unverified listings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg">
            <a
              href="#download"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#B4C292] text-[#4C061D] font-extrabold text-base shadow-lg hover:bg-white transition-all duration-200 w-full sm:w-auto"
            >
              <Smartphone className="w-5 h-5 text-[#4C061D]" />
              <span>Download App Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <div className="flex items-center gap-3 bg-white/10 p-3 px-4 rounded-2xl border border-white/20">
              <div className="w-10 h-10 bg-white rounded-lg p-1 shrink-0 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-[#4C061D]" />
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-white">Scan QR Code</div>
                <div className="text-white/70">Instant App Download</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
