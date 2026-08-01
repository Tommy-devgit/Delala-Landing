"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/property-card";
import { FilterModal } from "@/components/filter-modal";
import { MapView } from "@/components/map-view";
import { PROPERTIES } from "@/lib/data";
import { FilterState } from "@/lib/types";
import { SlidersHorizontal, Map, Grid, ShieldCheck, ArrowUpDown } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "split" | "map">("split");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

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

  // Filter listings
  const filteredListings = useMemo(() => {
    return PROPERTIES.filter((p) => {
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
      return 0; // default newest
    });
  }, [filters]);

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

          {/* Right View Mode Toggle (Grid / Split / Map) */}
          <div className="flex items-center gap-1 bg-[#FAF8F4] p-1 rounded-full border border-[#ECE7DA]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full text-xs transition-all ${
                viewMode === "grid" ? "bg-[#4C061D] text-white shadow-xs" : "text-[#736F4E]"
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode("split")}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-label transition-all ${
                viewMode === "split" ? "bg-[#4C061D] text-white shadow-xs" : "text-[#736F4E]"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>SPLIT MAP</span>
            </button>

            <button
              onClick={() => setViewMode("map")}
              className={`p-2 rounded-full text-xs transition-all ${
                viewMode === "map" ? "bg-[#4C061D] text-white shadow-xs" : "text-[#736F4E]"
              }`}
              title="Full Map View"
            >
              <Map className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-8">
        
        {viewMode === "map" ? (
          <div className="h-[calc(100vh-180px)]">
            <MapView properties={filteredListings} />
          </div>
        ) : viewMode === "split" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Listing Cards Column (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredListings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}

              {filteredListings.length === 0 && (
                <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-[#ECE7DA] p-8">
                  <ShieldCheck className="w-10 h-10 text-[#4C061D] mx-auto mb-3" />
                  <h3 className="font-serif-display text-2xl font-light text-[#1c1b12] mb-2">
                    No matching listings found
                  </h3>
                  <p className="text-xs text-[#736F4E] max-w-sm mx-auto mb-6">
                    Try relaxing your budget, sub-city, or infrastructure filters to explore more verified Ethiopian homes.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
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
                      })
                    }
                    className="px-6 py-2.5 rounded-lg bg-[#4C061D] text-white font-medium text-xs shadow-xs"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Sticky Interactive Map Column (5 cols) */}
            <div className="hidden lg:block lg:col-span-5 sticky top-36 h-[calc(100vh-180px)]">
              <MapView properties={filteredListings} />
            </div>

          </div>
        ) : (
          /* Pure Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

      </div>

      {/* Filter Modal */}
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
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center p-8">
        <div className="font-mono-label text-xs text-[#4C061D] animate-pulse">
          LOADING MARKETPLACE SEARCH...
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

