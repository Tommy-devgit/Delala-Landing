"use client";

import Link from "next/link";
import { GitCompare, X } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useAsync } from "@/lib/use-async";
import { COMPARE_KEY, useLocalCollection } from "@/lib/use-local-collection";
import { PropertyPhoto } from "@/components/property-photo";
import { EmptyState } from "@/components/empty-state";
import { CompareIllustration } from "@/components/illustrations";
import { ErrorNotice } from "@/components/error-notice";
import { Button, Skeleton } from "@/components/ui";
import { Property } from "@/lib/types";

/** Rows are declared once so every column renders the same fields in order. */
const ROWS: { label: string; value: (p: Property) => string }[] = [
  {
    label: "Price",
    value: (p) =>
      `ETB ${p.rentETB.toLocaleString()}${p.listingType === "sale" ? "" : " / month"}`,
  },
  { label: "Listing", value: (p) => (p.listingType === "sale" ? "For sale" : "To rent") },
  { label: "Type", value: (p) => p.propertyType || "Not specified" },
  { label: "Bedrooms", value: (p) => String(p.bedrooms) },
  { label: "Bathrooms", value: (p) => String(p.bathrooms) },
  { label: "Area", value: (p) => (p.areaSqm ? `${p.areaSqm} m²` : "Not specified") },
  {
    label: "Location",
    value: (p) => [p.neighborhood, p.subCity, p.city].filter(Boolean).join(", ") || "Not specified",
  },
  { label: "Posted by", value: (p) => p.broker?.name || "Unknown" },
  { label: "Reviewed by Delala", value: (p) => (p.approved ? "Yes" : "Not yet") },
];

/**
 * Amenities are three-state, so they get their own row renderer: a tick, a
 * cross, or an explicit "not specified" for the listings whose poster was never
 * asked. Rendering null as a cross would assert the property lacks something
 * nobody ever checked.
 */
const AMENITIES: { label: string; get: (p: Property) => boolean | null }[] = [
  { label: "Generator", get: (p) => p.generator },
  { label: "Water tank", get: (p) => p.waterTank },
  { label: "Parking", get: (p) => p.parking },
  { label: "Furnished", get: (p) => p.furnished },
  { label: "Security guard", get: (p) => p.securityGuard },
  { label: "Balcony", get: (p) => p.balcony },
  { label: "Internet", get: (p) => p.internet },
];

export default function ComparePage() {
  const { items: ids, ready, remove, clear } = useLocalCollection<string>(COMPARE_KEY);

  // Each property is fetched by id. There is no bulk endpoint, and with a
  // ceiling of four this is cheaper than adding one.
  const { data, loading, error, retry } = useAsync(
    async () => {
      if (ids.length === 0) return [] as Property[];
      const results = await Promise.all(
        ids.map((id) => apiClient.getPropertyBySlug(id).catch(() => null))
      );
      return results.filter((p): p is Property => Boolean(p));
    },
    [ids.join(",")]
  );

  const properties = data || [];

  return (
    <div className="bg-canvas min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-3 pb-4 border-b border-line">
          <div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">Compare</h1>
            <p className="text-micro text-muted mt-1">
              Up to four properties, side by side. Kept on this device only.
            </p>
          </div>
          {properties.length > 0 && (
            <Button variant="secondary" size="sm" onClick={clear}>
              Clear all
            </Button>
          )}
        </header>

        {error ? (
          <ErrorNotice message={error} onRetry={retry} />
        ) : !ready || (loading && ids.length > 0) ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: Math.max(2, ids.length) }, (_, i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <EmptyState
            illustration={CompareIllustration}
            title="Nothing to compare yet"
            description="Add properties from any listing to line them up side by side — price, size, location and what each one actually has."
            actionText="Browse properties"
            actionHref="/search"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] border-separate border-spacing-0">
              <caption className="sr-only">Comparison of saved properties</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-36 text-left align-bottom p-3">
                    <span className="sr-only">Attribute</span>
                  </th>
                  {properties.map((p) => (
                    <th key={p.id} scope="col" className="p-3 align-bottom text-left min-w-52">
                      <div className="space-y-2">
                        <div className="relative aspect-4/3 rounded-card overflow-hidden bg-ink border border-line">
                          <PropertyPhoto src={p.heroImage} alt={p.title} />
                          <button
                            type="button"
                            onClick={() => remove((id) => id === p.id)}
                            aria-label={`Remove ${p.title} from comparison`}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/90 text-ink flex items-center justify-center hover:bg-surface transition-colors"
                          >
                            <X className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <Link
                          href={`/property/${p.slug}`}
                          className="block text-micro font-medium text-ink hover:text-primary transition-colors line-clamp-2"
                        >
                          {p.title}
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-t border-line">
                    <th scope="row" className="p-3 text-left text-label text-muted align-top font-normal">
                      {row.label}
                    </th>
                    {properties.map((p) => (
                      <td key={p.id} className="p-3 text-micro text-body align-top">
                        {row.value(p)}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr className="border-t border-line">
                  <th
                    scope="row"
                    colSpan={properties.length + 1}
                    className="p-3 text-left text-label text-muted font-normal bg-canvas"
                  >
                    What the property has
                  </th>
                </tr>

                {AMENITIES.map((amenity) => (
                  <tr key={amenity.label} className="border-t border-line">
                    <th scope="row" className="p-3 text-left text-label text-muted align-top font-normal">
                      {amenity.label}
                    </th>
                    {properties.map((p) => {
                      const value = amenity.get(p);
                      return (
                        <td key={p.id} className="p-3 text-micro align-top">
                          {value === true ? (
                            <span className="text-ink">Yes</span>
                          ) : value === false ? (
                            <span className="text-muted">No</span>
                          ) : (
                            <span className="text-muted/70">Not specified</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
