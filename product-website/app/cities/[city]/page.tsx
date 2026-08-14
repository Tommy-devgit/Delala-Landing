"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { Property } from "@/lib/types";
import { useAsync } from "@/lib/use-async";
import { cityBlurb } from "@/lib/city-images";
import { GUIDES } from "@/lib/guides";
import { PropertyCard } from "@/components/property-card";
import { PropertyMap } from "@/components/map";
import { Photo } from "@/components/photo";
import { EmptyState } from "@/components/empty-state";
import { ErrorNotice } from "@/components/error-notice";
import { Skeleton } from "@/components/ui";

const titleCase = (value: string) =>
  value.replace(/(^|\s|-)([a-z])/g, (_, prefix, letter) => prefix + letter.toUpperCase());

/**
 * One city (§20).
 *
 * Everything numeric is counted from the listings the API returns for this city
 * — the property-type breakdown, the sub-city counts, the price range. Nothing
 * is a market statistic: "from ETB X" is the cheapest listing on the page, not
 * a claim about the city.
 */
export default function CityPage() {
  const params = useParams();
  const slug = params?.city as string;
  const cityName = slug ? titleCase(slug.replace(/-/g, " ")) : "Addis Ababa";

  const properties = useAsync(
    () => apiClient.getProperties({ city: cityName, pageSize: 60 }),
    [cityName]
  );
  const cityData = useAsync(() => apiClient.getCities(), []);

  const listings: Property[] = properties.data || [];
  const city = (cityData.data || []).find(
    (c) => c.slug === slug || c.name.toLowerCase() === cityName.toLowerCase()
  );

  // Counted from what is on this page, so the breakdown and the grid can never
  // disagree with each other.
  const byType = useMemo(() => {
    const counts = new Map<string, number>();
    listings.forEach((p) => {
      if (!p.propertyType) return;
      counts.set(p.propertyType, (counts.get(p.propertyType) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [listings]);

  const bySubCity = useMemo(() => {
    const counts = new Map<string, number>();
    listings.forEach((p) => {
      if (!p.subCity) return;
      counts.set(p.subCity, (counts.get(p.subCity) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [listings]);

  const prices = listings.map((p) => p.rentETB).filter((n) => n > 0);
  const cheapest = prices.length > 0 ? Math.min(...prices) : null;
  const mapped = listings.filter((p) => p.latitude !== null && p.longitude !== null);

  const relatedGuides = GUIDES.filter((g) => g.category === "Renting" || g.category === "Money").slice(0, 2);
  const blurb = cityBlurb(slug || cityName);

  return (
    <div className="bg-canvas min-h-screen">
            {/* Pulled up under the sticky navbar, which renders transparent on
          this route (see `hasDarkHeader` in lib/navigation.ts). The extra top
          padding keeps this content clear of the bar. */}
      <header className="relative border-b border-line -mt-[var(--header-h)]">
        <div className="absolute inset-0 bg-ink">
          {/* Editorial, not a photograph of this city — see lib/imagery.ts. */}
          <Photo slot="editorial-gables" sizes="100vw" className="opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/45" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 pt-[8.5rem] pb-16 sm:pt-[10rem] sm:pb-20">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-label text-white/70">
              <li>
                <Link href="/cities" className="hover:text-white transition-colors">
                  Locations
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white">{cityName}</li>
            </ol>
          </nav>

          <div className="max-w-2xl text-white">
            <h1 className="font-serif-display text-4xl sm:text-5xl font-light leading-tight">
              Property in {cityName}
            </h1>
            {blurb && <p className="text-sm text-white/80 mt-3">{blurb}</p>}

            {!properties.loading && !properties.error && (
              <p className="text-micro text-white/75 mt-5" aria-live="polite">
                {listings.length === 0
                  ? "Nothing listed here yet"
                  : `${listings.length} ${listings.length === 1 ? "listing" : "listings"}${
                      cheapest ? ` · from ETB ${cheapest.toLocaleString()}` : ""
                    }`}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 space-y-12">
        {properties.error ? (
          <ErrorNotice message={properties.error} onRetry={properties.retry} />
        ) : properties.loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <Skeleton key={i} className="h-72" />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <EmptyState
            icon={Building2}
            title={`Nothing listed in ${cityName} yet`}
            description="No properties have been posted here so far. Try another city, or post the first one."
            actionText="Browse all listings"
            actionHref="/search"
          />
        ) : (
          <>
            {/* Areas within the city */}
            {bySubCity.length > 0 && (
              <section className="space-y-4">
                <div className="border-b border-line pb-3">
                  <h2 className="font-serif-display text-2xl font-light text-ink">Areas</h2>
                  <p className="text-micro text-muted mt-1">
                    Where the listings in {cityName} actually are.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {bySubCity.map((area) => (
                    <Link
                      key={area.name}
                      href={`/search?city=${encodeURIComponent(cityName)}&subCity=${encodeURIComponent(area.name)}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-control border border-line bg-surface text-micro hover:border-primary/40 transition-colors"
                    >
                      <span className="text-ink">{area.name}</span>
                      <span className="text-muted">{area.count}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Types available here */}
            {byType.length > 0 && (
              <section className="space-y-4">
                <div className="border-b border-line pb-3">
                  <h2 className="font-serif-display text-2xl font-light text-ink">
                    What kind of property
                  </h2>
                  <p className="text-micro text-muted mt-1">Counted from the listings below.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {byType.map((type) => (
                    <Link
                      key={type.name}
                      href={`/search?city=${encodeURIComponent(cityName)}&propertyType=${encodeURIComponent(type.name.toLowerCase())}`}
                      className="group p-4 rounded-card bg-surface border border-line hover:border-primary/40 transition-colors"
                    >
                      <h3 className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
                        {type.name}
                      </h3>
                      <p className="text-label text-muted mt-0.5">
                        {type.count} {type.count === 1 ? "listing" : "listings"}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Map, only when something can actually be plotted */}
            {mapped.length > 0 && (
              <section className="space-y-4">
                <div className="border-b border-line pb-3">
                  <h2 className="font-serif-display text-2xl font-light text-ink">On the map</h2>
                  <p className="text-micro text-muted mt-1">
                    {mapped.length} of {listings.length} listings have a position. Pins are
                    approximate — owners place a rough point, not an exact address.
                  </p>
                </div>
                <div className="h-96 rounded-card overflow-hidden border border-line">
                  <PropertyMap properties={mapped} selectedPropertyId={null} onSelectProperty={() => {}} />
                </div>
              </section>
            )}

            {/* The listings */}
            <section className="space-y-4">
              <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
                <div>
                  <h2 className="font-serif-display text-2xl font-light text-ink">
                    Available in {cityName}
                  </h2>
                  <p className="text-micro text-muted mt-1">Newest first.</p>
                </div>
                <Link
                  href={`/search?city=${encodeURIComponent(cityName)}`}
                  className="text-micro text-primary font-medium hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Filter these</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {listings.slice(0, 20).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {listings.length > 20 && (
                <div className="text-center pt-2">
                  <Link
                    href={`/search?city=${encodeURIComponent(cityName)}`}
                    className="inline-flex items-center justify-center h-11 px-5 rounded-control border border-line bg-surface text-body text-micro font-medium hover:border-primary/40 transition-colors"
                  >
                    See all {listings.length} listings
                  </Link>
                </div>
              )}
            </section>
          </>
        )}

        {/* Reading for someone deciding on an area */}
        <section className="space-y-4">
          <div className="border-b border-line pb-3">
            <h2 className="font-serif-display text-2xl font-light text-ink">Before you decide</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group p-5 rounded-card bg-surface border border-line hover:border-primary/40 transition-colors"
              >
                <span className="text-label text-primary">{guide.category}</span>
                <h3 className="text-sm font-medium text-ink mt-1 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-micro text-muted mt-1 line-clamp-2">{guide.summary}</p>
              </Link>
            ))}

            {city?.subCities && city.subCities.length > 0 && (
              <Link
                href="/living-in-addis"
                className="group p-5 rounded-card bg-primary text-white hover:bg-primary-hover transition-colors flex flex-col"
              >
                <MapPin className="w-5 h-5 text-accent mb-2" aria-hidden="true" />
                <h3 className="text-sm font-medium">Living in Addis</h3>
                <p className="text-micro text-white/80 mt-1">
                  How the sub-cities differ, and what shapes daily life.
                </p>
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
