"use client";

import { useState, useEffect, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/property-card";
import { FilterModal } from "@/components/filter-modal";
import { PropertyMap } from "@/components/map";
import { SearchFilters } from "@/components/search-filters";
import { apiClient } from "@/lib/api-client";
import { Badge, Button, Skeleton } from "@/components/ui";
import { City, Property, FilterState } from "@/lib/types";
import { SlidersHorizontal, Map, Grid, List, ArrowUpDown, Building2 } from "lucide-react";

/** Shown in the results column when no listing matches the active filters. */
function EmptyResults() {
  return (
    <div className="col-span-full py-14 text-center space-y-3 max-w-sm mx-auto">
      <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
        <Building2 className="w-7 h-7" aria-hidden="true" />
      </div>
      <h2 className="font-serif-display text-2xl text-ink">No homes match those filters</h2>
      <p className="text-micro text-muted leading-relaxed">
        Try widening your budget, or clearing the city and sub-city filters.
      </p>
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "split" | "map">("split");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    city: searchParams.get("city") || "",
    subCity: searchParams.get("subCity") || "",
    neighborhood: searchParams.get("neighborhood") || "",
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

  // Location filter options come from the API, not a hardcoded list.
  useEffect(() => {
    apiClient.getCities().then(setCities);
  }, []);

  // Client-side filtering & sorting
  const filteredListings = useMemo(() => {
    return properties.filter((p) => {
      if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      if (filters.subCity && !p.subCity.toLowerCase().includes(filters.subCity.toLowerCase())) return false;
      if (filters.neighborhood && !p.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) return false;
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

  // A selection only counts while its property survives the active filters, so
  // it is derived rather than cleared from an effect.
  const activeSelectionId =
    selectedPropertyId && filteredListings.some((p) => p.id === selectedPropertyId)
      ? selectedPropertyId
      : null;

  const handleSelectProperty = useCallback((propertyId: string | null) => {
    setSelectedPropertyId(propertyId);
  }, []);

  // One filtered collection feeds both the grid and the map markers.
  const renderCards = (listings: Property[]) =>
    listings.map((property) => (
      <PropertyCard
        key={property.id}
        property={property}
        isSelected={property.id === activeSelectionId}
        onActivate={handleSelectProperty}
      />
    ));

  const segmentClasses = (active: boolean) =>
    `inline-flex items-center gap-1.5 h-8 px-3 rounded-full font-mono-label text-label font-bold transition-colors ${
      active ? "bg-surface text-primary shadow-sm" : "text-muted hover:text-ink"
    }`;

  const mapPane = (
    <PropertyMap
      properties={filteredListings}
      selectedPropertyId={activeSelectionId}
      onSelectProperty={handleSelectProperty}
    />
  );

  return (
    <div className="min-h-screen bg-canvas flex flex-col">

      {/* Controls bar */}
      <div className="bg-surface border-b border-line py-3 px-4 sm:px-8 sticky top-20 z-30">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">

          <div className="flex items-center gap-3 min-w-0">
            <h1 className="font-serif-display text-2xl font-light text-ink">Marketplace</h1>
            <Badge tone="accent" aria-live="polite">
              {loading ? "Loading…" : `${filteredListings.length} homes`}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setIsFilterModalOpen(true)}>
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Filters</span>
            </Button>

            <div className="flex items-center gap-1.5 h-8 pl-3 pr-1 rounded-full bg-canvas border border-line">
              <ArrowUpDown className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
              <select
                value={filters.sortBy}
                aria-label="Sort results"
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })}
                className="bg-transparent text-micro text-body cursor-pointer pr-1 focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>

          {/* Desktop: grid / split / map */}
          <div
            className="hidden lg:flex items-center gap-1 bg-canvas p-1 rounded-full border border-line"
            role="group"
            aria-label="Result view"
          >
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              aria-label="Grid view"
              className={segmentClasses(viewMode === "grid")}
            >
              <Grid className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("split")}
              aria-pressed={viewMode === "split"}
              className={segmentClasses(viewMode === "split")}
            >
              <span>Split map</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("map")}
              aria-pressed={viewMode === "map"}
              aria-label="Full map view"
              className={segmentClasses(viewMode === "map")}
            >
              <Map className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile / tablet: never a forced split — plain List / Map */}
          <div
            className="flex lg:hidden items-center gap-1 bg-canvas p-1 rounded-full border border-line"
            role="group"
            aria-label="Result view"
          >
            <button
              type="button"
              onClick={() => setViewMode("split")}
              aria-pressed={viewMode !== "map"}
              className={segmentClasses(viewMode !== "map")}
            >
              <List className="w-3.5 h-3.5" aria-hidden="true" />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("map")}
              aria-pressed={viewMode === "map"}
              className={segmentClasses(viewMode === "map")}
            >
              <Map className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Map</span>
            </button>
          </div>

        </div>
      </div>

      {/* Results */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: 10 }, (_, i) => (
              <Skeleton key={i} className="h-[22rem]" />
            ))}
          </div>
        ) : (
          <>
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {filteredListings.length === 0 ? <EmptyResults /> : renderCards(filteredListings)}
              </div>
            )}

            {viewMode === "split" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[calc(100vh-172px)]">
                <div className="lg:col-span-7 lg:overflow-y-auto lg:pr-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 items-start content-start auto-rows-max">
                  {filteredListings.length === 0 ? <EmptyResults /> : renderCards(filteredListings)}
                </div>
                <div className="hidden lg:block lg:col-span-5 rounded-panel overflow-hidden border border-line shadow-sm sticky top-0 h-full">
                  {mapPane}
                </div>
              </div>
            )}

            {viewMode === "map" && (
              <div className="h-[calc(100vh-210px)] min-h-[26rem] rounded-panel overflow-hidden border border-line shadow-sm">
                {mapPane}
              </div>
            )}
          </>
        )}
      </div>

      {/* Filter Modal Component */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        initialFilters={filters}
        onApply={(newFilters) => setFilters(newFilters)}
        cities={cities}
      />

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono-label text-label text-muted">Loading search…</div>}>
      <SearchContent />
    </Suspense>
  );
}
