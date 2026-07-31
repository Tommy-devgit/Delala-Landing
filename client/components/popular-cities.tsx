"use client";

import { motion } from "framer-motion";
import { POPULAR_CITIES } from "@/lib/constants";
import { ArrowRight, Building } from "lucide-react";

export function PopularCities() {
  return (
    <section id="cities" className="py-20 lg:py-28 bg-[#FAF8F4] relative border-t border-[#ECE7DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C061D] tracking-tight mb-4">
              Explore homes across Ethiopia.
            </h2>

            <p className="text-base sm:text-lg text-[#2D2D2D]/80 font-normal leading-relaxed">
              From the vibrant neighborhoods of Addis Ababa to lakeside homes in Hawassa, Delala has verified listings across major hubs.
            </p>
          </div>

          <a
            href="#download"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4C061D] text-white font-semibold text-sm hover:bg-[#3B3923] transition-colors shrink-0 group"
          >
            <span>Browse All Cities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POPULAR_CITIES.map((city, idx) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative bg-white rounded-3xl overflow-hidden border border-[#ECE7DA] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B3923]/80 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <h3 className="font-heading text-2xl font-extrabold tracking-tight mb-1">
                    {city.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#B4C292] font-medium">
                    <Building className="w-3.5 h-3.5" />
                    <span>{city.propertiesCount}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <div className="text-xs font-semibold text-[#736F4E] mb-2 uppercase tracking-wider">
                    Popular Areas
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {city.popularAreas.map((area) => (
                      <span
                        key={area}
                        className="px-2.5 py-1 rounded-lg bg-[#FAF8F4] text-[#2D2D2D] text-xs font-medium border border-[#ECE7DA]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#ECE7DA] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#736F4E] block">Starting rent</span>
                    <span className="text-sm font-extrabold text-[#4C061D]">
                      {city.startingPrice}
                    </span>
                  </div>
                  <a
                    href="#download"
                    className="p-2.5 rounded-full bg-[#FAF8F4] text-[#4C061D] group-hover:bg-[#4C061D] group-hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
