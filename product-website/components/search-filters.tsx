"use client";

import { X } from "lucide-react";
import { City, FilterState } from "@/lib/types";
import { getNeighborhoods, getSubCities } from "@/lib/locations";

const PROPERTY_TYPES = ["Apartment", "Villa", "Studio", "G+1 Residence", "Penthouse", "Commercial Space"];
const BEDROOMS = ["1", "2", "3", "4"];
const BUDGETS = [20000, 40000, 70000, 120000, 150000];

const SELECT =
  "h-9 pl-2.5 pr-7 rounded-control bg-surface border border-line text-micro text-ink focus:outline-none focus:border-primary transition-colors disabled:opacity-55 disabled:cursor-not-allowed";

/**
 * Inline discovery filters for the marketplace.
 *
 * These sit on the page rather than behind the modal, because location is the
 * first thing a renter narrows by. The full location hierarchy is exposed here —
 * the modal previously stopped at sub-city, so neighborhoods were unreachable.
 */
export function SearchFilters({
  cities,
  filters,
  onChange,
}: {
  cities: City[];
  filters: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const subCities = getSubCities(cities, filters.city);
  const neighborhoods = getNeighborhoods(cities, filters.city, filters.subCity);

  const set = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });

  const active =
    Boolean(filters.city) ||
    Boolean(filters.subCity) ||
    Boolean(filters.neighborhood) ||
    Boolean(filters.propertyType) ||
    Boolean(filters.bedrooms) ||
    filters.maxPrice < 150000;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <label className="sr-only" htmlFor="filter-city">City</label>
      <select
        id="filter-city"
        value={filters.city}
        onChange={(e) => set({ city: e.target.value, subCity: "", neighborhood: "" })}
        className={SELECT}
      >
        <option value="">All cities</option>
        {cities.map((c) => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>

      <label className="sr-only" htmlFor="filter-subcity">Sub-city</label>
      <select
        id="filter-subcity"
        value={filters.subCity}
        disabled={!filters.city || subCities.length === 0}
        onChange={(e) => set({ subCity: e.target.value, neighborhood: "" })}
        className={SELECT}
      >
        <option value="">{filters.city ? "All sub-cities" : "Any sub-city"}</option>
        {subCities.map((s) => (
          <option key={s.id} value={s.name}>{s.name}</option>
        ))}
      </select>

      <label className="sr-only" htmlFor="filter-neighborhood">Neighborhood</label>
      <select
        id="filter-neighborhood"
        value={filters.neighborhood}
        disabled={!filters.subCity || neighborhoods.length === 0}
        onChange={(e) => set({ neighborhood: e.target.value })}
        className={SELECT}
      >
        <option value="">{filters.subCity ? "All neighborhoods" : "Any neighborhood"}</option>
        {neighborhoods.map((n) => (
          <option key={n.id} value={n.name}>{n.name}</option>
        ))}
      </select>

      <label className="sr-only" htmlFor="filter-type">Property type</label>
      <select
        id="filter-type"
        value={filters.propertyType}
        onChange={(e) => set({ propertyType: e.target.value })}
        className={SELECT}
      >
        <option value="">Any type</option>
        {PROPERTY_TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label className="sr-only" htmlFor="filter-beds">Bedrooms</label>
      <select
        id="filter-beds"
        value={filters.bedrooms}
        onChange={(e) => set({ bedrooms: e.target.value })}
        className={SELECT}
      >
        <option value="">Any beds</option>
        {BEDROOMS.map((b) => (
          <option key={b} value={b}>{b}+ beds</option>
        ))}
      </select>

      <label className="sr-only" htmlFor="filter-budget">Maximum rent</label>
      <select
        id="filter-budget"
        value={String(filters.maxPrice)}
        onChange={(e) => set({ maxPrice: Number(e.target.value) })}
        className={SELECT}
      >
        <option value="150000">Any budget</option>
        {BUDGETS.slice(0, -1).map((b) => (
          <option key={b} value={b}>Up to {b.toLocaleString()}</option>
        ))}
      </select>

      {active && (
        <button
          type="button"
          onClick={() =>
            set({
              city: "",
              subCity: "",
              neighborhood: "",
              propertyType: "",
              bedrooms: "",
              maxPrice: 150000,
            })
          }
          className="inline-flex items-center gap-1 h-9 px-2.5 rounded-control text-micro text-muted hover:text-primary transition-colors"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Clear</span>
        </button>
      )}
    </div>
  );
}
