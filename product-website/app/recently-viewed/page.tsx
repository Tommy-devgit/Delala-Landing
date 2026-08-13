"use client";

import { History } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useAsync } from "@/lib/use-async";
import { RECENT_KEY, useLocalCollection } from "@/lib/use-local-collection";
import { PropertyCard } from "@/components/property-card";
import { EmptyState } from "@/components/empty-state";
import { ErrorNotice } from "@/components/error-notice";
import { Button, Skeleton } from "@/components/ui";
import { Property } from "@/lib/types";

/**
 * Recently viewed (§13).
 *
 * The history lives in `localStorage` and nowhere else. The brief asks for this
 * without introducing invasive tracking, and the honest way to honour that is
 * for the record never to reach the server: Delala cannot build a profile from
 * data it does not receive, and clearing the list here genuinely destroys it
 * rather than hiding a copy.
 */
export default function RecentlyViewedPage() {
  const { items: ids, ready, clear } = useLocalCollection<string>(RECENT_KEY);

  const { data, loading, error, retry } = useAsync(
    async () => {
      if (ids.length === 0) return [] as Property[];
      const results = await Promise.all(
        ids.map((id) => apiClient.getPropertyBySlug(id).catch(() => null))
      );
      // A listing that has since been removed simply drops out.
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
            <h1 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
              Recently viewed
            </h1>
            <p className="text-micro text-muted mt-1">
              The last properties you opened. Kept on this device — never sent to Delala.
            </p>
          </div>
          {properties.length > 0 && (
            <Button variant="secondary" size="sm" onClick={clear}>
              Clear history
            </Button>
          )}
        </header>

        {error ? (
          <ErrorNotice message={error} onRetry={retry} />
        ) : !ready || (loading && ids.length > 0) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-72" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <EmptyState
            icon={History}
            title="Nothing here yet"
            description="Properties you open will be listed here so you can find your way back to them."
            actionText="Browse properties"
            actionHref="/search"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
