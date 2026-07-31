"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS_DATA } from "@/lib/constants";
import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4">
            Loved by renters, owners & brokers.
          </h2>

          <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
            See how Delala is transforming real estate experiences across Ethiopia.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-base text-[#2D2D2D] leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#ECE7DA] flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#ECE7DA] shrink-0">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#4C061D]">
                    {item.name}
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
