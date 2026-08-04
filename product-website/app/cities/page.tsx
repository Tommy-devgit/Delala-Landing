"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { City } from "@/lib/types";
import { MapPin, ArrowRight, Building2 } from "lucide-react";

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCities() {
      setLoading(true);
      const data = await apiClient.getCities();
      setCities(data);
      setLoading(false);
    }
    loadCities();
  }, []);

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="font-mono-label text-[10px] text-[#4C061D] bg-white border border-[#ECE7DA] px-3.5 py-1.5 rounded-full inline-block mb-4 shadow-xs">
            REGIONAL REAL ESTATE MARKETPLACES
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-light text-[#4C061D] mb-4">
            Browse Homes by City
          </h1>
          <p className="text-base text-[#736F4E] font-medium">
            Explore verified residential listings, diplomatic compounds, and commercial hubs across major Ethiopian urban centers.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-white border border-[#ECE7DA] animate-pulse" />
            ))}
          </div>
        ) : cities.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#4C061D]/10 text-[#4C061D] flex items-center justify-center mx-auto">
              <MapPin className="w-8 h-8" />
            </div>
            <h2 className="font-serif-display text-2xl text-[#1C1B12]">
              No Cities Found
            </h2>
            <p className="text-xs text-[#736F4E]">
              There are no cities currently registered in your database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/cities/${city.slug}`}
                className="bg-white rounded-2xl overflow-hidden border border-[#ECE7DA] shadow-xs hover:shadow-lg hover:border-[#4C061D] transition-all group flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#1c1b12]">
                  <img
                    src={city.image || "/images/hero_property.png"}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-mono-label text-[9px] text-[#B4C292] bg-black/60 px-2.5 py-1 rounded-full border border-white/20">
                      {city.propertiesCount} ACTIVE LISTINGS
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="font-serif-display text-2xl font-light text-[#1c1b12] group-hover:text-[#4C061D] transition-colors mb-1">
                    {city.name}
                  </h2>
                  <p className="font-mono-label text-[10px] text-[#4C061D] mb-3">
                    {city.tagline}
                  </p>

                  <div className="pt-4 border-t border-[#ECE7DA] flex items-center justify-between font-mono-label text-[11px] text-[#4C061D]">
                    <span>STARTING ETB {city.startingRentETB.toLocaleString()}/MO</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
