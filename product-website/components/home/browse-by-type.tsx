"use client";

import Link from "next/link";
import { Building, Building2, Home, Hotel, LandPlot, Store, Warehouse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FacetCount } from "@/lib/api-client";
import type { ImageSlot } from "@/lib/imagery";
import { Photo } from "@/components/photo";
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
 * Photographs for the types the library actually covers.
 *
 * Three of the five have a picture that genuinely represents them. Land and
 * Commercial do not, and rather than press an unrelated photograph into service
 * — §28: every image needs a reason — those cards stay typographic. A mixed
 * grid is the honest outcome of a library that covers some things and not
 * others, and it reads as deliberate because the two card shapes are designed
 * to sit together.
 */
const TYPE_PHOTOS: Record<string, ImageSlot> = {
  apartment: "type-apartments",
  villa: "type-villas",
  house: "type-houses",
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} className="aspect-4/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {types.map((type) => {
            const key = type.value.toLowerCase();
            const Icon = TYPE_ICONS[key] || Building2;
            const photo = TYPE_PHOTOS[key];
            const label = type.label || type.value;
            const count = `${type.count} ${type.count === 1 ? "listing" : "listings"}`;

            if (photo) {
              return (
                <Link
                  key={type.value}
                  href={`/search?propertyType=${encodeURIComponent(type.value)}`}
                  className="group relative flex flex-col justify-end overflow-hidden rounded-card border border-line bg-ink aspect-4/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Photo
                    slot={photo}
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                  <div className="relative p-4 text-white">
                    <h3 className="text-sm font-medium">{label}</h3>
                    <p className="text-label text-white/75 mt-0.5">{count}</p>
                  </div>
                </Link>
              );
            }

            /**
             * The typographic card, for types the photo library does not cover
             * — Land and Commercial.
             *
             * It has to read as a deliberate treatment rather than a card whose
             * image failed to load, which is what the first version looked
             * like: the icon was `text-canvas` on a white surface, so it was
             * invisible, leaving an all-but-empty box beside four photographs.
             * A burgundy ground and a large visible mark give it the same
             * weight as the photographic cards without inventing a picture of
             * a field or a shopfront.
             */
            return (
              <Link
                key={type.value}
                href={`/search?propertyType=${encodeURIComponent(type.value)}`}
                className="group relative flex flex-col justify-end overflow-hidden rounded-card bg-primary text-white p-4 aspect-4/5 transition-colors hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Icon
                  className="absolute -right-3 -top-3 w-24 h-24 text-white/10 transition-colors group-hover:text-accent/25"
                  aria-hidden="true"
                  strokeWidth={1}
                />
                <div className="relative">
                  <Icon className="w-5 h-5 text-accent mb-2" aria-hidden="true" />
                  <h3 className="text-sm font-medium">{label}</h3>
                  <p className="text-label text-white/70 mt-0.5">{count}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
