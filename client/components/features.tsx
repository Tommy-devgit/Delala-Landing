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
        return <ShieldCheck className="w-6 h-6 text-[#4C061D]" />;
    }
  };

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#FAF8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4">
            Everything you need for a seamless home search.
          </h2>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
            Delala combines physical field verification with modern technology to give you complete trust and transparency.
          </p>
        </div>

        {/* Clean Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES_DATA.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs hover:border-[#B4C292] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center mb-6">
                  {getIcon(feature.icon)}
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#4C061D] mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base text-[#2D2D2D]/80 leading-relaxed">
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
