"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { useAsync } from "@/lib/use-async";
import { Photo } from "@/components/photo";
import { ErrorNotice } from "@/components/error-notice";
import { Property, City } from "@/lib/types";
import { PropertyCard } from "@/components/property-card";
import { MapPin, ShieldCheck, ArrowRight, Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui";

export default function CityDetailPage() {
  const params = useParams();
  const slug = params?.city as string;

  const cityName = slug ? slug.replace(/-/g, " ") : "Addis Ababa";

  const { data, loading, error, retry } = useAsync(
    () => apiClient.getProperties({ city: cityName }),
    [cityName]
  );
  const cityProperties: Property[] = data || [];

  return (
    <div className="bg-canvas min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* City Hero */}
        <div className="relative rounded-panel overflow-hidden bg-ink p-6 sm:p-8 mb-6 border border-line shadow-xl text-white">
          {/* An editorial photograph of rooftops, not a photograph of this
              city. It is doing a mood job for the header; claiming it shows
              the place would be the same fiction as the generated city images
              that used to sit here. */}
          <Photo slot="editorial-gables" sizes="100vw" className="absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <span className="font-mono-label text-label text-accent bg-black/60 border border-white/20 px-3 py-1 rounded-full inline-block mb-4">
              {cityProperties.length}{" "}
              {cityProperties.length === 1 ? "listing" : "listings"}
            </span>

            <h1 className="font-serif-display text-4xl sm:text-6xl font-light mb-2 capitalize">
              Property in {cityName}
            </h1>

            <p className="text-base text-white/80 font-normal mb-6">
              Everything posted on Delala in {cityName}, newest first.
            </p>
          </div>
        </div>

        {/* Verified City Listings */}
        <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
          <div>
            <span className="font-mono-label text-label text-primary block mb-1">
              Available now
            </span>
            <h2 className="font-serif-display text-3xl font-light text-ink">
              Available Homes in {cityName}
            </h2>
          </div>
        </div>

        {error ? (
          <ErrorNotice message={error} onRetry={retry} />
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-80 rounded-panel" />
            ))}
          </div>
        ) : cityProperties.length === 0 ? (
          <div className="py-10 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="font-serif-display text-2xl text-ink">
              No Homes Listed in {cityName}
            </h2>
            <p className="text-xs text-muted">
              There are currently no active properties listed in {cityName} in your database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {cityProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
