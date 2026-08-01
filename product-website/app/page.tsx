"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchBarCapsule } from "@/components/search-bar-capsule";
import { CategoryBar } from "@/components/category-bar";
import { PropertyCard } from "@/components/property-card";
import { BrokerCard } from "@/components/broker-card";
import { FilterModal } from "@/components/filter-modal";
import { PROPERTIES, CITIES, NEIGHBORHOODS, BROKERS } from "@/lib/data";
import { FilterState } from "@/lib/types";
import { ShieldCheck, MapPin, Building2, ArrowRight, Sparkles, SlidersHorizontal, Flame } from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    city: "",
    subCity: "",
    propertyType: "",
    minPrice: 0,
    maxPrice: 150000,
    bedrooms: "",
    bathrooms: "",
    generator: false,
    waterTank: false,
    parking: false,
    furnished: false,
    verifiedOnly: false,
    sortBy: "newest",
  });

  // Filter listings based on category pill
  const filteredListings = PROPERTIES.filter((item) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "diplomatic") return item.subCity.includes("Bole") || item.neighborhood.includes("Airport");
    return item.propertyType === selectedCategory;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. HERO DISCOVERY SECTION (No Marketing — Pure Utility Search) */}
      <section className="bg-[#FAF8F4] pt-8 pb-12 px-4 sm:px-8 border-b border-[#ECE7DA] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="max-w-3xl mb-8">
            <span className="font-mono-label text-[10px] text-[#4C061D] bg-white border border-[#ECE7DA] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" />
              <span>ETHIOPIA PHYSICAL REAL ESTATE MARKETPLACE</span>
            </span>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light text-[#4C061D] tracking-tight mb-4 leading-[0.95]">
              Find your next <span className="italic font-normal text-[#1c1b12]">home</span> in Ethiopia.
            </h1>

            <p className="text-sm sm:text-base text-[#736F4E] font-medium max-w-xl">
              Search verified homes in Addis Ababa, Hawassa, Adama & Bahir Dar with standby generators, water tanks, and transparent Birr leasing.
            </p>
          </div>

          {/* Large Floating Hero Search Capsule */}
          <div className="max-w-4xl">
            <SearchBarCapsule onOpenFilters={() => setIsFilterModalOpen(true)} />
          </div>

          {/* Quick Sub-City Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#736F4E]">
            <span className="font-mono-label text-[10px] text-[#4C061D] font-bold">POPULAR SEARCHES:</span>
            {["Bole Medhanialem", "Kazanchis UN", "Old Airport Villa", "CMC Apartment", "Hawassa Lake View"].map((tag) => (
              <Link
                key={tag}
                href={`/search?subCity=${encodeURIComponent(tag.split(" ")[0])}`}
                className="px-3 py-1 rounded-full bg-white border border-[#ECE7DA] text-[11px] hover:border-[#4C061D] hover:text-[#4C061D] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 2. CATEGORY SELECTION PILL BAR */}
      <CategoryBar
        selected={selectedCategory}
        onSelect={(cat) => setSelectedCategory(cat)}
      />

      {/* 3. FEATURED VERIFIED HOMES GRID */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-[#ECE7DA] pb-4">
          <div>
            <span className="font-mono-label text-[10px] text-[#4C061D] block mb-1">
              FIELD VERIFIED MARKETPLACE
            </span>
            <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
              Featured Verified Homes
            </h2>
          </div>

          <Link
            href="/search"
            className="font-mono-label text-[11px] text-[#4C061D] font-bold hover:underline flex items-center gap-1"
          >
            <span>VIEW ALL LISTINGS ({PROPERTIES.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 4. POPULAR CITIES CAROUSEL */}
      <section className="bg-white py-12 border-y border-[#ECE7DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="font-mono-label text-[10px] text-[#4C061D] block mb-1">
                ETHIOPIA REGIONAL MARKETPLACES
              </span>
              <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
                Explore by City
              </h2>
            </div>

            <Link
              href="/cities"
              className="font-mono-label text-[11px] text-[#4C061D] font-bold hover:underline"
            >
              BROWSE ALL CITIES →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CITIES.map((city) => (
              <Link
                key={city.id}
                href={`/cities/${city.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#ECE7DA] shadow-xs flex flex-col justify-end p-5 bg-[#1c1b12]"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                <div className="relative z-10 text-white">
                  <span className="font-mono-label text-[9px] text-[#B4C292] bg-black/50 px-2.5 py-0.5 rounded-full border border-white/20 inline-block mb-1">
                    {city.propertiesCount} VERIFIED HOMES
                  </span>
                  <h3 className="font-serif-display text-2xl font-light mb-0.5">
                    {city.name}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1 font-sans">
                    From ETB {city.startingRentETB.toLocaleString()}/mo
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRENDING NEIGHBORHOODS BENTO GRID */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-[#ECE7DA] pb-4">
          <div>
            <span className="font-mono-label text-[10px] text-[#4C061D] block mb-1">
              ADDIS ABABA SUB-CITIES
            </span>
            <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
              Trending Neighborhoods
            </h2>
          </div>

          <Link
            href="/search"
            className="font-mono-label text-[11px] text-[#4C061D] font-bold hover:underline"
          >
            EXPLORE MAP →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {NEIGHBORHOODS.map((nh) => (
            <Link
              key={nh.id}
              href={`/neighborhoods/${nh.slug}`}
              className="bg-white p-6 rounded-2xl border border-[#ECE7DA] shadow-xs hover:border-[#4C061D] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#FAF8F4] px-2.5 py-1 rounded-full border border-[#ECE7DA]">
                    {nh.subCity.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-[#4C061D] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" /> {nh.securityScore} Security
                  </span>
                </div>

                <h3 className="font-serif-display text-xl font-light text-[#1c1b12] group-hover:text-[#4C061D] transition-colors mb-2">
                  {nh.name}
                </h3>

                <p className="text-xs text-[#736F4E] leading-relaxed line-clamp-2 mb-4">
                  {nh.description}
                </p>

                <div className="space-y-1 text-[11px] text-[#2D2D2D] font-medium mb-4 bg-[#FAF8F4] p-3 rounded-xl border border-[#ECE7DA]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#736F4E]">Generator:</span>
                    <span className="font-bold text-[#4C061D]">{nh.generatorPenetration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#736F4E]">Water Tank:</span>
                    <span className="font-bold text-[#4C061D]">{nh.waterReliability}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#ECE7DA] flex items-center justify-between font-mono-label text-[10px] text-[#4C061D]">
                <span>AVG ETB {nh.averageRentETB.toLocaleString()}/MO</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. VERIFIED BROKERS ROW */}
      <section className="bg-white py-12 border-t border-[#ECE7DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="font-mono-label text-[10px] text-[#4C061D] block mb-1">
                LICENSED & ID-CHECKED AGENTS
              </span>
              <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
                Verified Real Estate Brokers
              </h2>
            </div>

            <Link
              href="/brokers"
              className="font-mono-label text-[11px] text-[#4C061D] font-bold hover:underline"
            >
              DIRECTORY ({BROKERS.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BROKERS.map((broker) => (
              <BrokerCard key={broker.id} broker={broker} />
            ))}
          </div>
        </div>
      </section>

      {/* Filter Modal Component */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        initialFilters={filters}
        onApply={(newFilters) => setFilters(newFilters)}
      />

    </div>
  );
}
