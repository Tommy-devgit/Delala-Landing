"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#3B3923]/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-[#FAF8F4] rounded-3xl overflow-hidden shadow-2xl border border-[#ECE7DA] z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#ECE7DA]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#4C061D] flex items-center justify-center text-[#B4C292] font-bold text-sm">
                  D
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-[#4C061D] flex items-center gap-2">
                    Delala Platform Demo
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#B4C292]/30 text-[#4C061D]">
                      0:45 Watch
                    </span>
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#FAF8F4] text-[#2D2D2D]/70 hover:text-[#4C061D] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Body / Interactive Showcase */}
            <div className="relative aspect-video bg-[#3B3923] overflow-hidden group flex items-center justify-center">
              {/* Simulated Interactive Video Screen */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B3923] via-transparent to-black/30" />
              <img
                src="/images/hero_property.png"
                alt="Delala Demo Preview"
                className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Play / Interactive Screen Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-[#4C061D]/90 backdrop-blur-md text-[#B4C292] border-2 border-[#B4C292] flex items-center justify-center shadow-xl cursor-pointer mb-4"
                >
                  <Play className="w-9 h-9 fill-[#B4C292] translate-x-0.5" />
                </motion.div>
                <span className="text-white font-heading text-xl font-bold tracking-tight mb-2 drop-shadow-md">
                  Experience How Ethiopians Find Homes in 2026
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/90 font-medium">
                  <span className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B4C292]" /> 100% Physical Verification
                  </span>
                  <span className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    <Sparkles className="w-3.5 h-3.5 text-[#B4C292]" /> Zero Spam & No Fake Telegram Listings
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer info */}
            <div className="p-5 bg-white border-t border-[#ECE7DA] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B4C292]" />
                <span className="text-xs sm:text-sm text-[#2D2D2D]/80">
                  Ready to test the app live? Available on iOS & Android in Ethiopia.
                </span>
              </div>
              <a
                href="#download"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#4C061D] text-[#FAF8F4] text-xs font-semibold hover:bg-[#3B3923] transition-colors"
              >
                Download Now
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
