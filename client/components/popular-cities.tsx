"use client";

import { motion } from "framer-motion";
import { POPULAR_CITIES } from "@/lib/constants";
import { ArrowRight, Building, MapPin } from "lucide-react";

export function PopularCities() {
  return (
    <section id="cities" className="py-20 lg:py-28 bg-canvas relative border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/30 text-primary text-xs font-extrabold mb-4 border border-accent/50">
              <MapPin className="w-3.5 h-3.5" />
              <span>Regional Hubs & Sub-Cities</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-4 leading-tight">
              Explore verified homes across Ethiopia.
            </h2>

            <p className="text-base sm:text-lg text-body/80 font-normal leading-relaxed">
              From the bustling diplomatic sub-cities of Addis Ababa to lakeside homes in Hawassa and tech centers in Adama.
            </p>
          </div>

          <a
            href="#download"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors shrink-0 group"
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
              className="group relative bg-surface rounded-panel overflow-hidden border border-line shadow-xs hover:shadow-xl hover:border-accent transition-all duration-500 flex flex-col justify-between"
            >
              {/* City Photo Banner */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={city.image}
                  alt={`Delala verified homes in ${city.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

                <div className="absolute bottom-4 left-5 right-5 z-10 text-white">
                  <h3 className="font-heading text-2xl font-extrabold tracking-tight mb-1">
                    {city.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-accent font-semibold">
                    <Building className="w-3.5 h-3.5" />
                    <span>{city.propertiesCount}</span>
                  </div>
                </div>
              </div>

              {/* City Neighborhood Details */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-surface">
                <div>
                  <div className="text-label font-extrabold text-muted mb-2.5 uppercase tracking-wider">
                    Popular Neighborhoods
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {city.popularAreas.map((area) => (
                      <span
                        key={area}
                        className="px-2.5 py-1 rounded-lg bg-canvas text-body text-xs font-semibold border border-line"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <div>
                    <span className="text-label uppercase font-bold text-muted block">Starting Rent</span>
                    <span className="text-sm font-black text-primary">
                      {city.startingPrice}
                    </span>
                  </div>
                  <a
                    href="#download"
                    className="p-3 rounded-full bg-canvas text-primary border border-line group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors"
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
