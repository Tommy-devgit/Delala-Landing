"use client";

import Link from "next/link";
import { ArrowRight, BedDouble, Bath, MapPin, Ruler, ShieldCheck } from "lucide-react";
import { Property } from "@/lib/types";
import { PropertyCard } from "@/components/property-card";
import { PropertyPhoto } from "@/components/property-photo";
import { ErrorNotice } from "@/components/error-notice";
import { formatPostedAt } from "@/lib/format";
import { Skeleton } from "@/components/ui";

/**
 * The lead property, at a size the others are not.
 *
 * §12 asks for hierarchy rather than one card repeated. The first listing gets
 * a half-width frame, its own metadata row and room for the price to be read
 * across the page; the rest sit beside it at ordinary card size. Nothing about
 * the lead is a claim — it is simply the newest, which the heading says.
 */
function LeadProperty({ property }: { property: Property }) {
  const isForSale = property.listingType === "sale";
  const postedAt = formatPostedAt(property.createdAt);
  const location = [property.subCity, property.city].filter(Boolean).join(", ");

  return (
    <Link
      href={`/property/${property.slug}`}
      className="group flex flex-col rounded-card overflow-hidden border border-line bg-surface hover:border-primary/40 transition-colors h-full"
    >
      <div className="relative aspect-16/10 bg-ink overflow-hidden">
        <PropertyPhoto src={property.heroImage} alt={property.title} sizeHint="hero" />

        {property.approved && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface/95 text-primary text-label border border-line">
            <ShieldCheck className="w-3 h-3" aria-hidden="true" />
            Reviewed
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="space-y-1.5">
          {location && (
            <p className="text-label text-muted flex items-center gap-1">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              {location}
            </p>
          )}
          <h3 className="font-serif-display text-xl sm:text-2xl font-light text-ink group-hover:text-primary transition-colors line-clamp-2">
            {property.title}
          </h3>
          {property.description && (
            <p className="text-micro text-muted line-clamp-2 leading-relaxed">{property.description}</p>
          )}
        </div>

        <dl className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-micro text-body">
          <div className="flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
            <dt className="sr-only">Bedrooms</dt>
            <dd>{property.bedrooms}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
            <dt className="sr-only">Bathrooms</dt>
            <dd>{property.bathrooms}</dd>
          </div>
          {property.areaSqm > 0 && (
            <div className="flex items-center gap-1.5">
              <Ruler className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
              <dt className="sr-only">Area</dt>
              <dd>{property.areaSqm} m²</dd>
            </div>
          )}
          {property.propertyType && <dd className="text-muted">{property.propertyType}</dd>}
        </dl>

        <div className="mt-auto pt-3 border-t border-line flex items-end justify-between gap-3">
          <div>
            <span className="text-label text-muted block">
              {isForSale ? "Asking price" : "Monthly rent"}
            </span>
            <span className="font-serif-display text-2xl font-light text-primary">
              ETB {property.rentETB.toLocaleString()}
              {!isForSale && <span className="text-micro text-muted"> /mo</span>}
            </span>
          </div>
          {postedAt && <span className="text-label text-muted">Posted {postedAt}</span>}
        </div>
      </div>
    </Link>
  );
}

/**
 * The featured row: one lead property beside a grid of supporting ones.
 *
 * Hides itself entirely when there is nothing to show, like every other rail —
 * an empty heading is worse than no heading.
 */
export function FeaturedProperties({
  properties,
  loading,
  error,
  onRetry,
}: {
  properties: Property[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}) {
  if (!loading && !error && properties.length === 0) return null;

  const [lead, ...rest] = properties;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
      <div className="flex items-end justify-between gap-4 mb-4 border-b border-line pb-3">
        <div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
            Newest on Delala
          </h2>
          <p className="text-micro text-muted mt-1">
            The most recently posted property, and what came in beside it.
          </p>
        </div>
        <Link
          href="/search?sort=newest"
          className="text-micro text-primary font-medium hover:underline flex items-center gap-1 shrink-0"
        >
          <span>See all listings</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      {error ? (
        <ErrorNotice message={error} onRetry={onRetry} />
      ) : loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-96" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-44" />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {lead && <LeadProperty property={lead} />}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-min">
              {rest.slice(0, 4).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
