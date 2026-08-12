"use client";

import { useState } from "react";
import { X, SlidersHorizontal, ShieldCheck, Zap, Droplets, Car, Home } from "lucide-react";
import { Button, Select } from "@/components/ui";
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

  /**
   * Resetting clears the filters but keeps the free-text query and the sort
   * order, which are set outside this modal — wiping them from in here would
   * discard a search the person did not ask to clear.
   *
   * `maxPrice: 0` means "no ceiling". It was 150,000, which silently hid every
   * listing above that price the moment anyone opened and applied the filters.
   */
  const handleReset = () => {
    setFilters({
      ...filters,
      city: "",
      subCity: "",
      neighborhood: "",
      propertyType: "",
      listingType: "",
      minPrice: 0,
      maxPrice: 0,
      bedrooms: "",
      bathrooms: "",
      generator: false,
      waterTank: false,
      parking: false,
      furnished: false,
      verifiedOnly: false,
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-canvas w-full max-w-2xl rounded-panel border border-line shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-surface border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-primary" aria-hidden="true" />
            <h2 className="font-serif-display text-xl font-light text-ink">
              Filter Market Listings
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="w-9 h-9 rounded-full bg-canvas border border-line text-muted hover:text-primary hover:bg-line transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Filter Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 font-sans">
          
          {/* Verified Only Toggle */}
          <div className="bg-surface p-4 rounded-card border border-line flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-mono-label text-micro text-primary font-bold">
                  FIELD VERIFIED ONLY
                </div>
                <div className="text-xs text-muted">
                  Show only listings physically checked by Delala field agents
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => setFilters({ ...filters, verifiedOnly: e.target.checked })}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
          </div>

          {/* Location City / Sub-City */}
          <div>
            <label className="font-mono-label text-label text-primary block mb-2 font-bold">
              Location
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Select
                value={filters.city}
                aria-label="City"
                // Changing the city clears the sub-city, which belongs to it.
                onChange={(e) => setFilters({ ...filters, city: e.target.value, subCity: "" })}
                className="bg-surface"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </Select>

              <Select
                value={filters.subCity}
                aria-label="Sub-city"
                disabled={!filters.city || subCities.length === 0}
                onChange={(e) => setFilters({ ...filters, subCity: e.target.value })}
                className="bg-surface"
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
              </Select>
            </div>
          </div>

          {/* Budget Range (ETB / month) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono-label text-label text-primary font-bold">
                Monthly budget (ETB)
              </label>
              <span className="text-xs font-bold text-primary">
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
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="font-mono-label text-label text-primary block mb-2 font-bold">
              Property type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["", "Apartment", "Villa", "Studio", "G+1 Residence", "Penthouse"].map((type) => (
                <button
                  key={type || "all"}
                  type="button"
                  onClick={() => setFilters({ ...filters, propertyType: type })}
                  className={`py-2 px-3 rounded-control text-xs font-medium border transition-colors ${
                    filters.propertyType === type
                      ? "bg-primary text-white border-primary font-bold"
                      : "bg-surface text-body border-line hover:border-primary"
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
              <label className="font-mono-label text-label text-primary block mb-2 font-bold">
                Bedrooms
              </label>
              <Select
                value={filters.bedrooms}
                onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                className="bg-surface"
              >
                <option value="">Any Bedrooms</option>
                <option value="1">1+ Beds</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
              </Select>
            </div>

            <div>
              <label className="font-mono-label text-label text-primary block mb-2 font-bold">
                Bathrooms
              </label>
              <Select
                value={filters.bathrooms}
                onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                className="bg-surface"
              >
                <option value="">Any Bathrooms</option>
                <option value="1">1+ Baths</option>
                <option value="2">2+ Baths</option>
                <option value="3">3+ Baths</option>
              </Select>
            </div>
          </div>

          {/* Essential Infrastructure Checklist (Generator, Water Tank, Parking, Furnished) */}
          <div>
            <label className="font-mono-label text-label text-primary block mb-2 font-bold">
              Essential infrastructure
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 p-3 bg-surface rounded-lg border border-line text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.generator}
                  onChange={(e) => setFilters({ ...filters, generator: e.target.checked })}
                  className="accent-primary"
                />
                <Zap className="w-3.5 h-3.5 text-accent" />
                <span>Standby Generator</span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-surface rounded-lg border border-line text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.waterTank}
                  onChange={(e) => setFilters({ ...filters, waterTank: e.target.checked })}
                  className="accent-primary"
                />
                <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                <span>Reserve Water Tank</span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-surface rounded-lg border border-line text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.parking}
                  onChange={(e) => setFilters({ ...filters, parking: e.target.checked })}
                  className="accent-primary"
                />
                <Car className="w-3.5 h-3.5 text-amber-600" />
                <span>Dedicated Parking</span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-surface rounded-lg border border-line text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.furnished}
                  onChange={(e) => setFilters({ ...filters, furnished: e.target.checked })}
                  className="accent-primary"
                />
                <Home className="w-3.5 h-3.5 text-primary" />
                <span>Fully Furnished</span>
              </label>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-surface border-t border-line flex items-center justify-between gap-4">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Clear all
          </Button>

          <Button size="md" onClick={handleApply}>
            Apply filters
          </Button>
        </div>

      </div>
    </div>
  );
}
