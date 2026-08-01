"use client";

export const dynamic = "force-dynamic";

import { useParams } from "next/navigation";
import Link from "next/link";
import { CITIES, PROPERTIES } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { MapPin, ShieldCheck, ArrowRight } from "lucide-react";

export default function CityDetailPage() {
  const params = useParams();
  const slug = params?.city as string;

  const city = CITIES.find((c) => c.slug === slug) || CITIES[0];
  const cityProperties = PROPERTIES.filter((p) => p.city.toLowerCase() === city.name.toLowerCase());

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* City Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-[#1c1b12] p-8 sm:p-12 mb-12 border border-[#ECE7DA] shadow-xl text-white">
          <img
            src={city.image}
            alt={city.name}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <span className="font-mono-label text-[10px] text-[#B4C292] bg-black/60 border border-white/20 px-3 py-1 rounded-full inline-block mb-4">
              {city.propertiesCount} VERIFIED MARKET LISTINGS
            </span>

            <h1 className="font-serif-display text-4xl sm:text-6xl font-light mb-2">
              {city.name} Real Estate
            </h1>

            <p className="text-base text-white/80 font-normal mb-6">
              {city.description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono-label text-[10px] text-white/70">SUB-CITIES:</span>
              {city.subCities.map((sub) => (
                <Link
                  key={sub}
                  href={`/search?city=${encodeURIComponent(city.name)}&subCity=${encodeURIComponent(sub)}`}
                  className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono-label hover:bg-white hover:text-[#4C061D] transition-colors"
                >
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Verified City Listings */}
        <div className="mb-8 flex items-center justify-between border-b border-[#ECE7DA] pb-4">
          <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
            Verified Listings in {city.name}
          </h2>
          <span className="font-mono-label text-[10px] text-[#4C061D] font-bold">
            SHOWING {cityProperties.length} HOMES
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cityProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

      </div>
    </div>
  );
}
