"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/property-card";
import { FilterModal } from "@/components/filter-modal";
import { MapView } from "@/components/map-view";
import { apiClient } from "@/lib/api-client";
import { Property, FilterState } from "@/lib/types";
import { SlidersHorizontal, Map, Grid, ShieldCheck, ArrowUpDown, Building2 } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "split" | "map">("split");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    city: searchParams.get("city") || "",
    subCity: searchParams.get("subCity") || "",
    propertyType: searchParams.get("propertyType") || "",
    minPrice: 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 150000,
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
    generator: searchParams.get("generator") === "true",
    waterTank: searchParams.get("waterTank") === "true",
    parking: searchParams.get("parking") === "true",
    furnished: searchParams.get("furnished") === "true",
    verifiedOnly: searchParams.get("verifiedOnly") === "true",
    sortBy: "newest",
  });

  // Fetch live properties from NestJS REST API connected to Supabase PostgreSQL
  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const data = await apiClient.getProperties({
        city: filters.city,
        subCity: filters.subCity,
        propertyType: filters.propertyType,
      });
      setProperties(data);
      setLoading(false);
    }
    loadProperties();
  }, [filters.city, filters.subCity, filters.propertyType]);

  // Client-side filtering & sorting
  const filteredListings = useMemo(() => {
    return properties.filter((p) => {
      if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.subCity && !p.subCity.toLowerCase().includes(filters.subCity.toLowerCase())) return false;
      if (filters.propertyType && p.propertyType !== filters.propertyType) return false;
      if (p.rentETB > filters.maxPrice) return false;
      if (filters.bedrooms && p.bedrooms < Number(filters.bedrooms)) return false;
      if (filters.bathrooms && p.bathrooms < Number(filters.bathrooms)) return false;
      if (filters.generator && !p.generator) return false;
      if (filters.waterTank && !p.waterTank) return false;
      if (filters.parking && !p.parking) return false;
      if (filters.furnished && !p.furnished) return false;
      if (filters.verifiedOnly && !p.verified) return false;
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "price-asc") return a.rentETB - b.rentETB;
      if (filters.sortBy === "price-desc") return b.rentETB - a.rentETB;
      return 0;
    });
  }, [properties, filters]);

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col">
      
      {/* Top Search Controls Bar */}
      <div className="bg-white border-b border-[#ECE7DA] py-4 px-4 sm:px-8 sticky top-20 z-30 shadow-2xs">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Left Results Count */}
          <div className="flex items-center gap-3">
            <h1 className="font-serif-display text-2xl font-light text-[#1c1b12]">
              Marketplace Search
            </h1>
            <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#B4C292]/30 border border-[#B4C292]/50 px-2.5 py-1 rounded-full font-bold">
              {filteredListings.length} HOMES FOUND
            </span>
          </div>

          {/* Center Actions: Filter Modal Trigger & Sort Selector */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label text-[#4C061D] font-bold hover:bg-[#ECE7DA] transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>ALL FILTERS</span>
            </button>

            <div className="flex items-center gap-1.5 bg-[#FAF8F4] border border-[#ECE7DA] px-3 py-1.5 rounded-full text-xs font-mono-label">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#4C061D]" />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="bg-transparent text-xs text-[#2D2D2D] focus:outline-none cursor-pointer font-sans"
              >
                <option value="newest">Sort: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Right View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#FAF8F4] p-1 rounded-full border border-[#ECE7DA]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-colors ${
                viewMode === "grid" ? "bg-white text-[#4C061D] shadow-xs" : "text-[#736F4E] hover:text-[#1c1b12]"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode("split")}
              className={`hidden lg:flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono-label font-bold transition-colors ${
                viewMode === "split" ? "bg-white text-[#4C061D] shadow-xs" : "text-[#736F4E] hover:text-[#1c1b12]"
              }`}
            >
              <span>SPLIT MAP</span>
            </button>

            <button
              onClick={() => setViewMode("map")}
              className={`p-2 rounded-full transition-colors ${
                viewMode === "map" ? "bg-white text-[#4C061D] shadow-xs" : "text-[#736F4E] hover:text-[#1c1b12]"
              }`}
              title="Full Map View"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-8">
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 rounded-3xl bg-white border border-[#ECE7DA] animate-pulse" />
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#4C061D]/10 text-[#4C061D] flex items-center justify-center mx-auto">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="font-serif-display text-2xl text-[#1C1B12]">
              No Properties Found
            </h2>
            <p className="text-xs text-[#736F4E]">
              There are no property listings currently in the database matching your criteria.
            </p>
          </div>
        ) : (
          <div>
            {/* GRID VIEW */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredListings.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            {/* SPLIT VIEW (List + Map) */}
            {viewMode === "split" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)]">
                <div className="lg:col-span-7 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredListings.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                <div className="hidden lg:block lg:col-span-5 rounded-3xl overflow-hidden border border-[#ECE7DA] shadow-sm sticky top-0 h-full">
                  <MapView properties={filteredListings} />
                </div>
              </div>
            )}

            {/* FULL MAP VIEW */}
            {viewMode === "map" && (
              <div className="h-[calc(100vh-180px)] rounded-3xl overflow-hidden border border-[#ECE7DA] shadow-sm">
                <MapView properties={filteredListings} />
              </div>
            )}
          </div>
        )}

      </div>

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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-mono-label">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
