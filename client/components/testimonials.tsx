"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS_DATA } from "@/lib/constants";
import { Star, Quote, ShieldCheck } from "lucide-react";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#FAF8F4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] text-xs font-bold mb-4">
            <Quote className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>Trusted Stories</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4">
            Loved by renters, owners & verified brokers.
          </h2>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
            See how Delala is transforming real estate experiences across Ethiopian communities.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs hover:shadow-xl hover:border-[#B4C292] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="relative z-10">
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-base text-[#2D2D2D] leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* User Avatar & Info */}
              <div className="pt-6 border-t border-[#ECE7DA]/80 flex items-center gap-4 relative z-10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#B4C292] shrink-0 shadow-xs">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#4C061D] flex items-center gap-1.5">
                    {item.name}
                    <ShieldCheck className="w-4 h-4 text-[#B4C292]" />
                  </h4>
                  <div className="text-xs text-[#736F4E] font-medium">
                    {item.role} • {item.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
