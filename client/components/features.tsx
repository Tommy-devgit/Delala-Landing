"use client";

import { motion } from "framer-motion";
import { DETAILED_FEATURES } from "@/lib/constants";
import {
  ShieldCheck,
  MapPin,
  SlidersHorizontal,
  MessageSquare,
  FileText,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function Features() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#4C061D]" />;
      case "MapPin":
        return <MapPin className="w-6 h-6 text-[#4C061D]" />;
      case "SlidersHorizontal":
        return <SlidersHorizontal className="w-6 h-6 text-[#4C061D]" />;
      case "MessageSquare":
        return <MessageSquare className="w-6 h-6 text-[#4C061D]" />;
      case "FileText":
        return <FileText className="w-6 h-6 text-[#4C061D]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#4C061D]" />;
    }
  };

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] text-xs font-extrabold mb-4 border border-[#B4C292]/50">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Product Capabilities</span>
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[#1c1b12] tracking-tight mb-6 leading-tight">
            Built for physical trust and digital clarity.
          </h1>

          <p className="text-base sm:text-xl text-[#2D2D2D]/80 font-normal leading-relaxed">
            Delala isn't just an online directory. We operate on-the-ground field verification teams to ensure every home, broker, and contract is 100% verified before you take a step outside.
          </p>
        </div>

        {/* EDITORIAL VISUAL STORYTELLING SECTIONS (ALTERNATIVE SPLIT SECTIONS) */}
        <div className="space-y-16 lg:space-y-24">
          {DETAILED_FEATURES.map((feature, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Text Story Column */}
                <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-2"}`}>
                  <span className="text-xs font-extrabold text-[#736F4E] uppercase tracking-wider block mb-2">
                    {feature.tag}
                  </span>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#ECE7DA] flex items-center justify-center shrink-0">
                      {getIcon(feature.icon)}
                    </div>
                    <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1c1b12] tracking-tight">
                      {feature.title}
                    </h2>
                  </div>

                  <p className="text-base sm:text-lg text-[#2D2D2D]/80 leading-relaxed font-normal mb-6">
                    {feature.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="space-y-2.5 mb-8">
                    {feature.highlights.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#3B3923]">
                        <CheckCircle2 className="w-4 h-4 text-[#4C061D] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/download"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4C061D] text-white font-bold text-xs sm:text-sm hover:bg-[#3B3923] transition-colors"
                  >
                    <span>Experience on App</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Visual Image Column */}
                <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                  <div className="relative rounded-xl overflow-hidden border border-[#ECE7DA] shadow-xl bg-[#1c1b12] group aspect-[4/3]">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#B4C292] bg-black/40 px-2.5 py-1 rounded-full border border-white/20">
                        {feature.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
