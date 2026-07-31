"use client";

import { motion } from "framer-motion";
import { STATS_DATA } from "@/lib/constants";
import { ShieldCheck, Award, MapPin, Smile } from "lucide-react";

export function SocialProof() {
  const getStatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <ShieldCheck className="w-5 h-5 text-[#4C061D]" />;
      case 1:
        return <Award className="w-5 h-5 text-[#4C061D]" />;
      case 2:
        return <MapPin className="w-5 h-5 text-[#4C061D]" />;
      case 3:
        return <Smile className="w-5 h-5 text-[#4C061D]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#4C061D]" />;
    }
  };

  return (
    <section className="py-12 lg:py-16 bg-[#FAF8F4] relative border-y border-[#ECE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {STATS_DATA.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white p-6 rounded-3xl border border-[#ECE7DA] shadow-xs text-center hover:border-[#B4C292] hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center mb-3">
                {getStatIcon(idx)}
              </div>

              <div>
                <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C061D] tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="font-heading text-sm sm:text-base font-bold text-[#2D2D2D] mb-1">
                  {stat.label}
                </div>
                <p className="text-xs text-[#736F4E] font-medium leading-normal">
                  {stat.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
