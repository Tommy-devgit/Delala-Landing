"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Property } from "@/lib/types";
import { PropertyCard } from "@/components/property-card";
import { ErrorNotice } from "@/components/error-notice";
import { Skeleton } from "@/components/ui";

/**
 * One titled row of properties, with all four states handled in one place.
 *
 * The homepage previously had a single section with its skeleton, empty and
 * (absent) error handling written inline. Every new discovery row the brief
 * asks for would have duplicated that, so the states live here once.
 *
 * A row renders nothing at all when it loads successfully and finds no
 * properties: an empty "Homes for sale" heading above a blank strip is worse
 * than the section not being there. Genuine errors still show, because a
 * failure the user could retry is worth telling them about.
 */
export function PropertyRail({
  title,
  description,
  href,
  hrefLabel = "View all",
  properties,
  loading,
  error,
  onRetry,
  limit = 5,
}: {
  title: string;
  description?: string;
  href: string;
  hrefLabel?: string;
  properties: Property[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  limit?: number;
}) {
  if (!loading && !error && properties.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
      <div className="flex items-end justify-between gap-4 mb-4 border-b border-line pb-3">
        <div className="min-w-0">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">{title}</h2>
          {description && <p className="text-micro text-muted mt-1">{description}</p>}
        </div>

        <Link
          href={href}
          className="text-micro text-primary font-medium hover:underline flex items-center gap-1 shrink-0"
        >
          <span>{hrefLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      {error ? (
        <ErrorNotice message={error} onRetry={onRetry} />
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: limit }, (_, i) => (
            <Skeleton key={i} className="h-72" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {properties.slice(0, limit).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}
