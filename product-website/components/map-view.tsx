"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ShieldCheck, Star } from "lucide-react";
import { Property } from "@/lib/types";

export function MapView({ properties }: { properties: Property[] }) {
  const [activeProperty, setActiveProperty] = useState<Property | null>(
    properties.length > 0 ? properties[0] : null
  );

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#e5e3df] rounded-2xl overflow-hidden border border-[#ECE7DA] shadow-xs flex flex-col justify-between">
      {/* Mock Map Canvas Background with Sub-city Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ECE7DA_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

      {/* Map Control Bar Overlay */}
      <div className="relative z-10 p-4 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-[#ECE7DA]">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#4C061D]" />
          <span className="font-mono-label text-[11px] text-[#4C061D] font-bold">
            INTERACTIVE MAP VIEW • {properties.length} HOMES
          </span>
        </div>
        <span className="text-xs text-[#736F4E] font-medium">Addis Ababa Sub-Cities</span>
      </div>

      {/* Simulated Interactive Map Markers Container */}
      <div className="relative flex-1 p-8 overflow-hidden">
        {properties.map((prop, idx) => {
          // Spread pins across map canvas
          const topPct = 20 + ((idx * 17) % 65);
          const leftPct = 15 + ((idx * 23) % 70);
          const isSelected = activeProperty?.id === prop.id;

          return (
            <button
              key={prop.id}
              onClick={() => setActiveProperty(prop)}
              style={{ top: `${topPct}%`, left: `${leftPct}%` }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 group ${
                isSelected ? "scale-110 z-30" : "hover:scale-105"
              }`}
            >
              <div
                className={`px-3 py-1.5 rounded-full font-mono-label text-[11px] font-bold shadow-md border flex items-center gap-1 transition-colors ${
                  isSelected
                    ? "bg-[#4C061D] text-white border-[#4C061D]"
                    : "bg-white text-[#2D2D2D] border-[#ECE7DA] hover:border-[#4C061D]"
                }`}
              >
                {prop.verified && <ShieldCheck className="w-3 h-3 text-[#B4C292]" />}
                <span>ETB {(prop.rentETB / 1000).toFixed(0)}k</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Property Quick Card Popover */}
      {activeProperty && (
        <div className="relative z-30 p-4 bg-white/95 backdrop-blur-md border-t border-[#ECE7DA] shadow-lg">
          <Link
            href={`/property/${activeProperty.slug}`}
            className="flex items-center gap-4 group"
          >
            <img
              src={activeProperty.heroImage}
              alt={activeProperty.title}
              className="w-20 h-20 rounded-xl object-cover"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono-label text-[9px] text-[#4C061D] bg-[#B4C292]/30 px-2 py-0.5 rounded-full border border-[#B4C292]/50 font-bold">
                  {activeProperty.subCity.toUpperCase()}
                </span>
                {activeProperty.verified && (
                  <span className="text-[10px] text-[#4C061D] font-bold flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED
                  </span>
                )}
              </div>

              <h4 className="font-serif-display text-base font-light text-[#1c1b12] truncate group-hover:text-[#4C061D] transition-colors">
                {activeProperty.title}
              </h4>

              <div className="text-xs text-[#736F4E] mt-0.5">
                {activeProperty.bedrooms} Beds • {activeProperty.bathrooms} Baths • {activeProperty.areaSqm} sqm
              </div>

              <div className="text-sm font-bold text-[#4C061D] mt-1">
                ETB {activeProperty.rentETB.toLocaleString()} / mo
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-lg bg-[#4C061D] text-white text-xs font-medium shrink-0 group-hover:bg-[#3B3923] transition-colors">
              Inspect →
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
