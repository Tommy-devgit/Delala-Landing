"use client";

import { motion } from "framer-motion";
import { FEATURES_DATA } from "@/lib/constants";
import {
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
  BellRing,
  Clock,
  MapPin,
  MessageSquare,
  FileText,
  Sparkles,
} from "lucide-react";

export function Features() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#4C061D]" />;
      case "SlidersHorizontal":
        return <SlidersHorizontal className="w-6 h-6 text-[#4C061D]" />;
      case "UserCheck":
        return <UserCheck className="w-6 h-6 text-[#4C061D]" />;
      case "BellRing":
        return <BellRing className="w-6 h-6 text-[#4C061D]" />;
      case "Clock":
        return <Clock className="w-6 h-6 text-[#4C061D]" />;
      case "MapPin":
        return <MapPin className="w-6 h-6 text-[#4C061D]" />;
      case "MessageSquare":
        return <MessageSquare className="w-6 h-6 text-[#4C061D]" />;
      case "FileText":
        return <FileText className="w-6 h-6 text-[#4C061D]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#4C061D]" />;
    }
  };

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#FAF8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>Built for Modern House Hunters</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4">
            Everything you need for a seamless home search.
          </h2>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
            Delala combines physical field verification with cutting-edge technology to give you 100% peace of mind.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES_DATA.map((feature, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`bg-white p-7 sm:p-8 rounded-3xl border border-[#ECE7DA] shadow-2xs hover:shadow-xl hover:border-[#B4C292] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group ${
                  isLarge ? "md:col-span-2 lg:col-span-1 bg-gradient-to-b from-white to-[#FAF8F4]" : ""
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#B4C292]/30 transition-all duration-300">
                      {getIcon(feature.icon)}
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#B4C292]/20 text-[#4C061D] border border-[#B4C292]/30">
                      {feature.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#4C061D] mb-3 group-hover:text-[#3B3923] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#2D2D2D]/75 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#ECE7DA]/60 flex items-center text-xs font-semibold text-[#736F4E] group-hover:text-[#4C061D] transition-colors">
                  <span>Explore capability</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
