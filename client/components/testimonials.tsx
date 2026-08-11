"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS_DATA } from "@/lib/constants";
import { Star, ShieldCheck, Heart } from "lucide-react";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-canvas relative border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/30 text-primary text-xs font-extrabold mb-4 border border-accent/50">
            <Heart className="w-3.5 h-3.5 fill-primary text-primary" />
            <span>Community Stories</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-4 leading-tight">
            Loved by renters, owners & certified brokers.
          </h2>

          <p className="text-base sm:text-lg text-body/80 font-normal leading-relaxed">
            See how Delala is building trust and digitizing housing experiences across Ethiopia.
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
              className="bg-surface p-8 rounded-lg border border-line shadow-xs hover:shadow-lg hover:border-accent transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-label font-extrabold text-primary bg-canvas px-2.5 py-1 rounded-full border border-line">
                    <ShieldCheck className="w-3 h-3 text-primary" /> Verified User
                  </span>
                </div>

                <p className="text-sm sm:text-base text-body/90 leading-relaxed font-medium italic mb-8">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-6 border-t border-line flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-line shrink-0">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-base text-primary">
                    {item.name}
                  </h4>
                  <div className="text-xs text-muted font-semibold">
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
