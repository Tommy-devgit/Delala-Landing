"use client";

import { useState } from "react";
import { X, SlidersHorizontal, ShieldCheck, Zap, Droplets, Car, Home } from "lucide-react";
import { City, FilterState } from "@/lib/types";
import { getSubCities } from "@/lib/locations";

export function FilterModal({
  isOpen,
  onClose,
  initialFilters,
  onApply,
  cities = [],
}: {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: FilterState;
  onApply: (filters: FilterState) => void;
  /** Location options from GET /api/v1/cities. */
  cities?: City[];
}) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  if (!isOpen) return null;

  const subCities = getSubCities(cities, filters.city);

  const handleReset = () => {
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
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-[#FAF8F4] w-full max-w-2xl rounded-2xl border border-[#ECE7DA] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-white border-b border-[#ECE7DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#4C061D]" />
            <h2 className="font-serif-display text-xl font-light text-[#1c1b12]">
              Filter Market Listings
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[#736F4E] hover:text-[#4C061D]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 font-sans">
          
          {/* Verified Only Toggle */}
          <div className="bg-white p-4 rounded-xl border border-[#ECE7DA] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#4C061D]/10 flex items-center justify-center text-[#4C061D]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono-label text-[11px] text-[#4C061D] font-bold">
                  FIELD VERIFIED ONLY
                </div>
                <div className="text-xs text-[#736F4E]">
                  Show only listings physically checked by Delala field agents
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => setFilters({ ...filters, verifiedOnly: e.target.checked })}
              className="w-5 h-5 accent-[#4C061D] cursor-pointer"
            />
          </div>

          {/* Location City / Sub-City */}
          <div>
            <label className="font-mono-label text-[10px] text-[#4C061D] block mb-2 font-bold">
              LOCATION
            </label>
            <div className="grid grid-cols-2 gap-3">
              <select
                value={filters.city}
                aria-label="City"
                // Changing the city clears the sub-city, which belongs to it.
                onChange={(e) => setFilters({ ...filters, city: e.target.value, subCity: "" })}
                className="w-full p-3 rounded-lg bg-white border border-[#ECE7DA] text-xs font-medium text-[#2D2D2D]"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>

              <select
                value={filters.subCity}
                aria-label="Sub-city"
                disabled={!filters.city || subCities.length === 0}
                onChange={(e) => setFilters({ ...filters, subCity: e.target.value })}
                className="w-full p-3 rounded-lg bg-white border border-[#ECE7DA] text-xs font-medium text-[#2D2D2D] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">
                  {!filters.city
                    ? "All Sub-cities"
                    : subCities.length === 0
                      ? "No sub-cities listed"
                      : "All Sub-cities"}
                </option>
                {subCities.map((subCity) => (
                  <option key={subCity.id} value={subCity.name}>
                    {subCity.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Budget Range (ETB / month) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono-label text-[10px] text-[#4C061D] font-bold">
                MONTHLY BUDGET (ETB)
              </label>
              <span className="text-xs font-bold text-[#4C061D]">
                Up to ETB {filters.maxPrice.toLocaleString()} / mo
              </span>
            </div>
            <input
              type="range"
              min="15000"
              max="150000"
              step="5000"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full accent-[#4C061D] cursor-pointer"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="font-mono-label text-[10px] text-[#4C061D] block mb-2 font-bold">
              PROPERTY TYPE
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["", "Apartment", "Villa", "Studio", "G+1 Residence", "Penthouse"].map((type) => (
                <button
                  key={type || "all"}
                  type="button"
                  onClick={() => setFilters({ ...filters, propertyType: type })}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors ${
                    filters.propertyType === type
                      ? "bg-[#4C061D] text-white border-[#4C061D] font-bold"
                      : "bg-white text-[#2D2D2D] border-[#ECE7DA] hover:border-[#4C061D]"
                  }`}
                >
                  {type || "Any Type"}
                </button>
              ))}
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono-label text-[10px] text-[#4C061D] block mb-2 font-bold">
                BEDROOMS
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                className="w-full p-3 rounded-lg bg-white border border-[#ECE7DA] text-xs font-medium text-[#2D2D2D]"
              >
                <option value="">Any Bedrooms</option>
                <option value="1">1+ Beds</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </select>
            </div>

            <div>
              <label className="font-mono-label text-[10px] text-[#4C061D] block mb-2 font-bold">
                BATHROOMS
              </label>
              <select
                value={filters.bathrooms}
                onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                className="w-full p-3 rounded-lg bg-white border border-[#ECE7DA] text-xs font-medium text-[#2D2D2D]"
              >
                <option value="">Any Bathrooms</option>
                <option value="1">1+ Baths</option>
                <option value="2">2+ Baths</option>
                <option value="3">3+ Baths</option>
              </select>
            </div>
          </div>

          {/* Essential Infrastructure Checklist (Generator, Water Tank, Parking, Furnished) */}
          <div>
            <label className="font-mono-label text-[10px] text-[#4C061D] block mb-2 font-bold">
              ESSENTIAL INFRASTRUCTURE
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 p-3 bg-white rounded-lg border border-[#ECE7DA] text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.generator}
                  onChange={(e) => setFilters({ ...filters, generator: e.target.checked })}
                  className="accent-[#4C061D]"
                />
                <Zap className="w-3.5 h-3.5 text-[#B4C292]" />
                <span>Standby Generator</span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-white rounded-lg border border-[#ECE7DA] text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.waterTank}
                  onChange={(e) => setFilters({ ...filters, waterTank: e.target.checked })}
                  className="accent-[#4C061D]"
                />
                <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                <span>Reserve Water Tank</span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-white rounded-lg border border-[#ECE7DA] text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.parking}
                  onChange={(e) => setFilters({ ...filters, parking: e.target.checked })}
                  className="accent-[#4C061D]"
                />
                <Car className="w-3.5 h-3.5 text-amber-600" />
                <span>Dedicated Parking</span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-white rounded-lg border border-[#ECE7DA] text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.furnished}
                  onChange={(e) => setFilters({ ...filters, furnished: e.target.checked })}
                  className="accent-[#4C061D]"
                />
                <Home className="w-3.5 h-3.5 text-[#4C061D]" />
                <span>Fully Furnished</span>
              </label>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[#ECE7DA] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-mono-label text-[#736F4E] underline hover:text-[#4C061D]"
          >
            CLEAR ALL
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-2.5 rounded-lg bg-[#4C061D] text-white font-medium text-xs shadow-sm hover:bg-[#3B3923] transition-colors"
          >
            Apply Filters →
          </button>
        </div>

      </div>
    </div>
  );
}
