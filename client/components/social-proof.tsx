"use client";

import { motion } from "framer-motion";
import { STATS_DATA } from "@/lib/constants";
import { Building, UserCheck, MapPin, Award } from "lucide-react";

export function SocialProof() {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Building className="w-6 h-6 text-[#4C061D]" />;
      case 1:
        return <UserCheck className="w-6 h-6 text-[#4C061D]" />;
      case 2:
        return <MapPin className="w-6 h-6 text-[#4C061D]" />;
      default:
        return <Award className="w-6 h-6 text-[#4C061D]" />;
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-[#FAF8F4] relative border-y border-[#ECE7DA]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/80 backdrop-blur-xs p-6 rounded-3xl border border-[#ECE7DA] shadow-2xs hover:shadow-md hover:border-[#B4C292] transition-all duration-300 group text-center flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#B4C292]/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {getIcon(idx)}
              </div>

              <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C061D] tracking-tight mb-1">
                {stat.value}
              </div>

              <div className="font-heading text-sm sm:text-base font-bold text-[#2D2D2D] mb-1">
                {stat.label}
              </div>

              <p className="text-xs text-[#736F4E] font-medium max-w-[180px]">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
