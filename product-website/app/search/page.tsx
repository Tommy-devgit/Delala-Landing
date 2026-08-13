"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/property-card";
import { FilterModal } from "@/components/filter-modal";
import { PropertyMap } from "@/components/map";
import { SearchFilters } from "@/components/search-filters";
import { apiClient } from "@/lib/api-client";
import { useAsync } from "@/lib/use-async";
import {
  SAVED_SEARCH_KEY,
  SavedSearch,
  useLocalCollection,
} from "@/lib/use-local-collection";
import { EmptyState } from "@/components/empty-state";
import { SearchIllustration } from "@/components/illustrations";
import { ErrorNotice } from "@/components/error-notice";
import { Badge, Button, Skeleton } from "@/components/ui";
import { City, Property, FilterState } from "@/lib/types";
import { SlidersHorizontal, Map, Grid, List, ArrowUpDown, Bookmark, Building2 } from "lucide-react";

const PAGE_SIZE = 24;

/** The unfiltered starting point, also what "clear filters" restores. */
const emptyFilters = (): FilterState => ({
  q: "",
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
  sortBy: "newest",
});

function SearchContent() {
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "split" | "map">("split");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const savedSearches = useLocalCollection<SavedSearch>(SAVED_SEARCH_KEY);
  const [savedNotice, setSavedNotice] = useState("");

  const [filters, setFilters] = useState<FilterState>(() => ({
    ...emptyFilters(),
    q: searchParams.get("q") || "",
    city: searchParams.get("city") || "",
    subCity: searchParams.get("subCity") || "",
    neighborhood: searchParams.get("neighborhood") || "",
    propertyType: searchParams.get("propertyType") || "",
    listingType: (searchParams.get("listingType") as FilterState["listingType"]) || "",
    maxPrice: Number(searchParams.get("maxPrice")) || 0,
    bedrooms: searchParams.get("bedrooms") || "",
    bathrooms: searchParams.get("bathrooms") || "",
    generator: searchParams.get("generator") === "true",
    waterTank: searchParams.get("waterTank") === "true",
    parking: searchParams.get("parking") === "true",
    furnished: searchParams.get("furnished") === "true",
    verifiedOnly: searchParams.get("verifiedOnly") === "true",
    sortBy: (searchParams.get("sort") as FilterState["sortBy"]) || "newest",
  }));

  /**
   * Every filter is now a query parameter.
   *
   * This page used to fetch the entire properties table and filter it in a
   * `useMemo`, which meant the price, bedroom and amenity controls only ever
   * applied to whatever had already been downloaded, and sorting could not
   * reach past it either. Postgres does all of it now, so results are correct
   * regardless of how many listings exist.
   */
  const query = useMemo(
    () => ({
      q: filters.q || undefined,
      city: filters.city || undefined,
      subCity: filters.subCity || undefined,
      neighborhood: filters.neighborhood || undefined,
      propertyType: filters.propertyType || undefined,
      listingType: filters.listingType || undefined,
      minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
      maxPrice: filters.maxPrice > 0 ? filters.maxPrice : undefined,
      minBedrooms: filters.bedrooms ? Number(filters.bedrooms) : undefined,
      minBathrooms: filters.bathrooms ? Number(filters.bathrooms) : undefined,
      generator: filters.generator || undefined,
      waterTank: filters.waterTank || undefined,
      parking: filters.parking || undefined,
      furnished: filters.furnished || undefined,
      verifiedOnly: filters.verifiedOnly || undefined,
      sort: filters.sortBy,
      page,
      pageSize: PAGE_SIZE,
    }),
    [filters, page]
  );

  const results = useAsync(() => apiClient.searchProperties(query), [JSON.stringify(query)]);
  const cityData = useAsync(() => apiClient.getCities(), []);

  const cities: City[] = cityData.data || [];
  const listings: Property[] = results.data?.data || [];
  const total = results.data?.total ?? 0;
  const totalPages = results.data?.totalPages ?? 1;
  const loading = results.loading;

  /** Applying a filter has to return to page one, or the results look empty. */
  const applyFilters = useCallback((next: FilterState) => {
    setFilters(next);
    setPage(1);
  }, []);

  const filtersActive = useMemo(() => {
    const base = emptyFilters();
    return (Object.keys(base) as (keyof FilterState)[]).some(
      (key) => key !== "sortBy" && filters[key] !== base[key]
    );
  }, [filters]);

  const filteredListings = listings;

  /**
   * Stores the active filters as a query string, which is all Explore needs to
   * restore them. Named from what is actually set, so a list of saved searches
   * reads as descriptions rather than "Search 1", "Search 2".
   */
  const saveCurrentSearch = useCallback(() => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      // Undefined and empty are both "unset"; the query object never carries false.
      if (value === undefined || value === "") continue;
      if (key === "page" || key === "pageSize") continue;
      params.set(key === "sort" ? "sort" : key, String(value));
    }

    const label =
      [
        filters.listingType === "sale" ? "For sale" : filters.listingType === "rent" ? "To rent" : "",
        filters.propertyType ? filters.propertyType : "",
        filters.bedrooms ? `${filters.bedrooms}+ bed` : "",
        filters.neighborhood || filters.subCity || filters.city
          ? `in ${filters.neighborhood || filters.subCity || filters.city}`
          : "",
      ]
        .filter(Boolean)
        .join(" ") || "All properties";

    savedSearches.add({
      id: `${Date.now()}`,
      name: label,
      query: params.toString(),
      createdAt: new Date().toISOString(),
    });
    setSavedNotice(label);
  }, [query, filters, savedSearches]);

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

  // Two different situations, two different messages: no listings at all is not
  // the same problem as filters that exclude everything, and only one of them
  // has "clear the filters" as an answer.
  const emptyResults = (
    <div className="col-span-full py-10">
      <EmptyState
        illustration={SearchIllustration}
        title={filtersActive ? "No homes match those filters" : "No listings yet"}
        description={
          filtersActive
            ? "Nothing on Delala matches every filter you have set. Clearing a couple of them usually helps."
            : "There are no properties on the marketplace at the moment. Check back soon, or post the first one."
        }
        actionText={filtersActive ? "Clear all filters" : "Post a property"}
        actionHref={filtersActive ? undefined : "/publish"}
        onAction={filtersActive ? () => applyFilters(emptyFilters()) : undefined}
      />
    </div>
  );

  const pagination = totalPages > 1 && (
    <nav
      className="col-span-full flex items-center justify-center gap-3 pt-8"
      aria-label="Result pages"
    >
      <Button
        variant="secondary"
        size="sm"
        disabled={page <= 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
      >
        Previous
      </Button>
      <span className="text-micro text-muted" aria-live="polite">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="secondary"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
      >
        Next
      </Button>
    </nav>
  );

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
            <h1 className="font-serif-display text-2xl font-light text-ink">Explore</h1>
            {/* The real total from the database, not the length of one page. */}
            <Badge tone="accent" aria-live="polite">
              {loading ? "Loading…" : `${total} ${total === 1 ? "home" : "homes"}`}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="search-query" className="sr-only">
              Search listings
            </label>
            <input
              id="search-query"
              type="search"
              defaultValue={filters.q}
              placeholder="Area, landmark or keyword"
              onKeyDown={(e) => {
                if (e.key === "Enter") applyFilters({ ...filters, q: e.currentTarget.value });
              }}
              onBlur={(e) => {
                if (e.currentTarget.value !== filters.q) applyFilters({ ...filters, q: e.currentTarget.value });
              }}
              className="h-8 px-3 rounded-full bg-canvas border border-line text-micro text-body w-44 sm:w-56 focus:outline-none focus:border-primary/40"
            />

            <Button variant="secondary" size="sm" onClick={() => setIsFilterModalOpen(true)}>
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Filters</span>
            </Button>

            <Button variant="secondary" size="sm" onClick={saveCurrentSearch}>
              <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Save search</span>
            </Button>

            <div className="flex items-center gap-1.5 h-8 pl-3 pr-1 rounded-full bg-canvas border border-line">
              <ArrowUpDown className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
              <select
                value={filters.sortBy}
                aria-label="Sort results"
                onChange={(e) => applyFilters({ ...filters, sortBy: e.target.value as FilterState["sortBy"] })}
                className="bg-transparent text-micro text-body cursor-pointer pr-1 focus:outline-none"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
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
      {savedNotice && (
        <div className="bg-accent/20 border-b border-accent/40" role="status">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between gap-3">
            <p className="text-micro text-primary">
              Saved &ldquo;{savedNotice}&rdquo; to this device.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Link href="/saved-searches" className="text-micro text-primary underline">
                View saved searches
              </Link>
              <button
                type="button"
                onClick={() => setSavedNotice("")}
                className="text-micro text-primary/70 hover:text-primary"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-6">
        {results.error ? (
          <ErrorNotice message={results.error} onRetry={results.retry} className="my-8" />
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: 10 }, (_, i) => (
              <Skeleton key={i} className="h-[22rem]" />
            ))}
          </div>
        ) : (
          <>
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {filteredListings.length === 0 ? emptyResults : renderCards(filteredListings)}
                {pagination}
              </div>
            )}

            {viewMode === "split" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[calc(100vh-172px)]">
                <div className="lg:col-span-7 lg:overflow-y-auto lg:pr-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 items-start content-start auto-rows-max">
                  {filteredListings.length === 0 ? emptyResults : renderCards(filteredListings)}
                  {pagination}
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
        onApply={applyFilters}
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
