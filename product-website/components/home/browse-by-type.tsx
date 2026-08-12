"use client";

import Link from "next/link";
import { Building, Building2, Home, Hotel, LandPlot, Store, Warehouse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FacetCount } from "@/lib/api-client";
import { Skeleton } from "@/components/ui";

/**
 * Icons for the types Delala actually carries. Anything unrecognised still
 * renders — with a neutral icon — rather than being dropped, because the list
 * comes from the database and posters can classify a property however the
 * publish form allows.
 */
const TYPE_ICONS: Record<string, LucideIcon> = {
  apartment: Building2,
  house: Home,
  villa: Hotel,
  studio: Building,
  land: LandPlot,
  commercial: Store,
  office: Warehouse,
};

/**
 * "Browse by property type", built from real counts.
 *
 * The brief lists seven categories to offer. Hardcoding that list would
 * advertise categories with nothing behind them — a visitor clicking "Land"
 * would land on an empty Explore page. This renders only the types that exist,
 * ordered by how many there are, with the count shown.
 */
export function BrowseByType({
  types,
  loading,
  error,
}: {
  types: FacetCount[];
  loading: boolean;
  error: string | null;
}) {
  // Silent when there is nothing to browse. An error here is not worth a
  // retry prompt on a secondary navigation aid — the rails above it will
  // already have reported the outage.
  if (error || (!loading && types.length === 0)) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
      <div className="mb-4 border-b border-line pb-3">
        <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
          Browse by property type
        </h2>
        <p className="text-micro text-muted mt-1">Every category below has listings in it today.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {types.map((type) => {
            const Icon = TYPE_ICONS[type.value.toLowerCase()] || Building2;
            return (
              <Link
                key={type.value}
                href={`/search?propertyType=${encodeURIComponent(type.value)}`}
                className="group flex flex-col gap-2 p-4 rounded-card bg-surface border border-line hover:border-primary/40 transition-colors"
              >
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-micro font-medium text-ink group-hover:text-primary transition-colors">
                  {type.label || type.value}
                </span>
                <span className="text-label text-muted">
                  {type.count} {type.count === 1 ? "listing" : "listings"}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
