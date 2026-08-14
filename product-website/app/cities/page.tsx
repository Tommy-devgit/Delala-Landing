"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { City } from "@/lib/types";
import { useAsync } from "@/lib/use-async";
import { cityBlurb } from "@/lib/city-images";
import { CityCard } from "@/components/city-card";
import { EmptyState } from "@/components/empty-state";
import { ErrorNotice } from "@/components/error-notice";
import { Photo } from "@/components/photo";
import { Skeleton } from "@/components/ui";

/**
 * Location discovery.
 *
 * The cards here were photographic — each city fronted by a generated image of
 * itself — and each one carried "STARTING ETB 35,000/MO", a figure nobody
 * measured, above a listing count that fell back to a hardcoded number when the
 * real one was zero. All of that is gone. The cards are typographic, and the
 * only numbers on them are counted from the database.
 *
 * One photograph remains, at the top: an aerial of rooftops, which is doing an
 * editorial job for the page as a whole rather than pretending to be any
 * particular city.
 */
export default function CitiesPage() {
  const { data, loading, error, retry } = useAsync(() => apiClient.getCities(), []);
  const cities: City[] = data || [];

  const withListings = cities.filter((c) => c.propertiesCount > 0);
  const empty = cities.filter((c) => c.propertiesCount === 0);
  const totalListings = cities.reduce((sum, c) => sum + c.propertiesCount, 0);

  return (
    <div className="bg-canvas min-h-screen">
      {/* Editorial header */}
            {/* Pulled up under the sticky navbar, which renders transparent on
          this route (see `hasDarkHeader` in lib/navigation.ts). The extra top
          padding keeps this content clear of the bar. */}
      <header className="relative border-b border-line -mt-[var(--header-h)]">
        <div className="absolute inset-0 bg-ink">
          <Photo slot="editorial-neighbourhoods" sizes="100vw" className="opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/20" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 pt-[8.5rem] pb-16 sm:pt-[10rem] sm:pb-20">
          <div className="max-w-2xl text-white">
            <p className="text-micro text-accent mb-3">Locations</p>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-light leading-tight">
              Every place Delala covers
            </h1>
            <p className="text-sm text-white/80 mt-4 leading-relaxed">
              Choose a city to see what is available in it, then narrow down by sub-city and
              neighbourhood. The counts below are live.
            </p>
            {!loading && !error && (
              <p className="text-micro text-white/70 mt-4" aria-live="polite">
                {totalListings.toLocaleString()} {totalListings === 1 ? "listing" : "listings"} across{" "}
                {withListings.length} {withListings.length === 1 ? "city" : "cities"}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 space-y-10">
        {error ? (
          <ErrorNotice message={error} onRetry={retry} />
        ) : loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        ) : cities.length === 0 ? (
          <EmptyState
            icon={MapPin}
            title="No cities yet"
            description="Once listings are posted, the cities they are in will appear here."
            actionText="Browse all listings"
            actionHref="/search"
          />
        ) : (
          <>
            {withListings.length > 0 && (
              <section className="space-y-4">
                <div className="border-b border-line pb-3">
                  <h2 className="font-serif-display text-2xl font-light text-ink">
                    Cities with listings
                  </h2>
                  <p className="text-micro text-muted mt-1">Ordered by how much is available.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...withListings]
                    .sort((a, b) => b.propertiesCount - a.propertiesCount)
                    .map((city) => (
                      <CityCard key={city.id} city={city} />
                    ))}
                </div>
              </section>
            )}

            {/* Listed rather than hidden: a city with nothing in it today is
                still somewhere a visitor may be looking, and saying so is more
                useful than an invented count. */}
            {empty.length > 0 && (
              <section className="space-y-4">
                <div className="border-b border-line pb-3">
                  <h2 className="font-serif-display text-2xl font-light text-ink">
                    Nothing listed yet
                  </h2>
                  <p className="text-micro text-muted mt-1">
                    Delala covers these, but nobody has posted a property in them so far.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {empty.map((city) => (
                    <li key={city.id}>
                      <Link
                        href={`/cities/${city.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-control border border-line bg-surface text-micro text-body hover:border-primary/40 transition-colors"
                      >
                        <span className="text-ink">{city.name}</span>
                        {cityBlurb(city.slug || city.name) && (
                          <span className="text-muted hidden sm:inline">
                            · {cityBlurb(city.slug || city.name)}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="p-6 sm:p-8 rounded-card bg-surface border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif-display text-xl font-light text-ink">
                  Looking in a particular area?
                </h2>
                <p className="text-micro text-muted mt-1 max-w-md leading-relaxed">
                  Explore lets you filter by sub-city and neighbourhood, along with price, bedrooms
                  and what the property actually has.
                </p>
              </div>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-control bg-primary text-white text-micro font-medium hover:bg-primary-hover transition-colors shrink-0"
              >
                Open Explore
                <ArrowRight className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              </Link>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
