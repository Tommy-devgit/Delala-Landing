"use client";

import Link from "next/link";
import { ArrowRight, MapPin, PlusCircle, ShieldCheck } from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { CityCard } from "@/components/city-card";
import { PropertyRail } from "@/components/property-rail";
import { BrowseByType } from "@/components/home/browse-by-type";
import { GuidesStrip } from "@/components/home/guides-strip";
import { HowItWorks } from "@/components/home/how-it-works";
import { TrustedPosters } from "@/components/home/trusted-posters";
import { ErrorNotice } from "@/components/error-notice";
import { apiClient } from "@/lib/api-client";
import { useAsync } from "@/lib/use-async";
import { Skeleton } from "@/components/ui";

const RAIL_SIZE = 5;

/**
 * The marketplace front door.
 *
 * This was two sections — a grid of every property the API returned, and a
 * strip of cities — which is why it read as empty. It is now a sequence of
 * discovery rails, each answering one question a person arriving with no
 * particular listing in mind would ask.
 *
 * Everything below comes from one `Promise.all`, so the page has a single
 * loading state, a single error state and a single retry rather than six
 * independent spinners. Each rail hides itself when it legitimately has no
 * properties: an empty "Homes for sale" heading is worse than no heading.
 */
export default function HomePage() {
  const { data, loading, error, retry } = useAsync(
    async () => {
      const [recent, forRent, forSale, facets, cities, posters] = await Promise.all([
        apiClient.searchProperties({ sort: "newest", pageSize: RAIL_SIZE }),
        apiClient.searchProperties({ listingType: "rent", sort: "newest", pageSize: RAIL_SIZE }),
        apiClient.searchProperties({ listingType: "sale", sort: "newest", pageSize: RAIL_SIZE }),
        apiClient.getFacets(),
        apiClient.getCities(),
        // A failure here must not take the page down with it; the section
        // simply does not render.
        apiClient.getVerifiedPosters().catch(() => []),
      ]);
      return { recent, forRent, forSale, facets, cities, posters };
    },
    []
  );

  // Cities carry their own property counts from /cities; ordering by the facet
  // counts keeps "most listings first" honest even when the two disagree.
  const cityCounts = new Map((data?.facets.cities || []).map((c) => [c.name.toLowerCase(), c.count]));
  const cities = [...(data?.cities || [])].sort(
    (a, b) => (cityCounts.get(b.name.toLowerCase()) ?? 0) - (cityCounts.get(a.name.toLowerCase()) ?? 0)
  );

  return (
    <div className="space-y-12 pb-16">
      <HomeHero cities={data?.cities || []} listingCount={data?.facets.total ?? 0} />

      {/* A single failure notice for the whole page rather than one per rail. */}
      {error && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <ErrorNotice message={error} onRetry={retry} />
        </div>
      )}

      {!error && (
        <>
          <PropertyRail
            title="Recently added"
            description="The newest listings on Delala."
            href="/search?sort=newest"
            hrefLabel="See all listings"
            properties={data?.recent.data || []}
            loading={loading}
            error={null}
            limit={RAIL_SIZE}
          />

          <PropertyRail
            title="Homes to rent"
            description="Monthly rentals across Ethiopia."
            href="/search?listingType=rent"
            hrefLabel="Browse rentals"
            properties={data?.forRent.data || []}
            loading={loading}
            error={null}
            limit={RAIL_SIZE}
          />

          <PropertyRail
            title="Homes for sale"
            description="Properties on the market to buy."
            href="/search?listingType=sale"
            hrefLabel="Browse sales"
            properties={data?.forSale.data || []}
            loading={loading}
            error={null}
            limit={RAIL_SIZE}
          />

          <BrowseByType
            types={data?.facets.propertyTypes || []}
            loading={loading}
            error={null}
          />

          {/* CITIES */}
          <section className="bg-canvas py-10 px-4 sm:px-8 border-y border-line">
            <div className="max-w-[1440px] mx-auto">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
                    Where people are looking
                  </h2>
                  <p className="text-micro text-muted mt-1">
                    Ordered by how many listings each city has right now.
                  </p>
                </div>
                <Link
                  href="/cities"
                  className="text-micro text-primary font-medium hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>All cities</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                  {Array.from({ length: 6 }, (_, i) => (
                    <Skeleton key={i} className="h-40" />
                  ))}
                </div>
              ) : cities.length === 0 ? (
                <p className="text-micro text-muted flex items-center gap-2">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  No cities have listings yet.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                  {cities.map((city) => (
                    <CityCard key={city.id} city={city} />
                  ))}
                </div>
              )}
            </div>
          </section>

          <TrustedPosters posters={data?.posters || []} />

          <GuidesStrip />

          <HowItWorks />

          {/* TRUST + POST CTA */}
          <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-8 rounded-card bg-surface border border-line flex flex-col gap-3">
                <ShieldCheck className="w-6 h-6 text-primary" aria-hidden="true" />
                <h2 className="font-serif-display text-2xl font-light text-ink">
                  Know what you are looking at
                </h2>
                <p className="text-micro text-muted leading-relaxed">
                  How Delala verifies posters, what a review badge does and does not mean, how to
                  spot a listing that is not what it claims, and what to do about one.
                </p>
                <Link
                  href="/safety"
                  className="mt-2 inline-flex items-center justify-center h-11 px-5 rounded-control border border-line bg-canvas text-body text-micro font-medium hover:border-primary/40 transition-colors w-fit"
                >
                  Safety &amp; trust
                </Link>
              </div>

              <div className="p-8 rounded-card bg-primary text-white flex flex-col gap-3">
                <PlusCircle className="w-6 h-6 text-accent" aria-hidden="true" />
                <h2 className="font-serif-display text-2xl font-light">Have a property to list?</h2>
                <p className="text-micro text-white/80 leading-relaxed">
                  Post it with photographs, the area, the price and what the place actually has.
                  Listings go through review before they appear on the marketplace.
                </p>
                <Link
                  href="/publish"
                  className="mt-2 inline-flex items-center justify-center h-11 px-5 rounded-control bg-white text-primary text-micro font-medium hover:bg-accent transition-colors w-fit"
                >
                  Post a property
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
