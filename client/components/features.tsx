"use client";

import { motion } from "framer-motion";
import { FEATURES_DATA } from "@/lib/constants";
import {
  ShieldCheck,
  SlidersHorizontal,
  Clock,
  MapPin,
  MessageSquare,
  FileText,
} from "lucide-react";

export function Features() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#4C061D]" />;
      case "MapPin":
        return <MapPin className="w-6 h-6 text-[#4C061D]" />;
      case "SlidersHorizontal":
        return <SlidersHorizontal className="w-6 h-6 text-[#4C061D]" />;
      case "Clock":
        return <Clock className="w-6 h-6 text-[#4C061D]" />;
      case "MessageSquare":
        return <MessageSquare className="w-6 h-6 text-[#4C061D]" />;
      case "FileText":
        return <FileText className="w-6 h-6 text-[#4C061D]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#4C061D]" />;
    }
  };

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#FAF8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] text-xs font-extrabold mb-4 border border-[#B4C292]/50">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Built for Modern House Hunters & Owners</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4 leading-tight">
            Designed for real human outcomes, not technical fluff.
          </h2>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
            Delala replaces Telegram uncertainty with verified physical field checks, transparent Birr pricing, and direct connections.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES_DATA.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs hover:border-[#B4C292] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center group-hover:bg-[#4C061D]/5 transition-colors">
                    {getIcon(feature.icon)}
                  </div>
                  <span className="text-[11px] font-extrabold text-[#4C061D] bg-[#B4C292]/30 px-3 py-1 rounded-full border border-[#B4C292]/40">
                    {feature.outcomeTag}
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#4C061D] mb-3 group-hover:text-[#3B3923] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base text-[#2D2D2D]/80 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
