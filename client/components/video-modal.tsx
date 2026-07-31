"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ShieldCheck } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#3B3923]/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl bg-[#FAF8F4] rounded-3xl overflow-hidden shadow-2xl border border-[#ECE7DA] z-10"
          >
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#ECE7DA]">
              <span className="font-heading font-black text-lg text-[#4C061D]">
                Delala
              </span>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#FAF8F4] text-[#2D2D2D]/70 hover:text-[#4C061D] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-[#3B3923] overflow-hidden group flex items-center justify-center">
              <img
                src="/images/hero_property.png"
                alt="Delala Platform Preview"
                className="w-full h-full object-cover opacity-80"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-black/30">
                <div
                  onClick={onClose}
                  className="w-16 h-16 rounded-full bg-white text-[#4C061D] flex items-center justify-center shadow-xl cursor-pointer mb-4 hover:scale-105 transition-transform"
                >
                  <Play className="w-7 h-7 fill-[#4C061D] translate-x-0.5" />
                </div>
                <h3 className="text-white font-heading text-xl font-extrabold mb-2">
                  Delala Platform Tour
                </h3>
              </div>
            </div>

            <div className="p-5 bg-white border-t border-[#ECE7DA] flex items-center justify-between">
              <span className="text-xs text-[#2D2D2D]/80 font-medium">
                100% In-Person Verified Real Estate Platform
              </span>
              <a
                href="#download"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#4C061D] text-white text-xs font-semibold hover:bg-[#3B3923] transition-colors"
              >
                Download App
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
