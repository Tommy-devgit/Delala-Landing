"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { Property, City } from "@/lib/types";
import { PropertyCard } from "@/components/property-card";
import { MapPin, ShieldCheck, ArrowRight, Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui";

export default function CityDetailPage() {
  const params = useParams();
  const slug = params?.city as string;

  const [cityProperties, setCityProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const cityName = slug ? slug.replace(/-/g, " ") : "Addis Ababa";

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await apiClient.getProperties({ city: cityName });
      setCityProperties(data);
      setLoading(false);
    }
    loadData();
  }, [cityName]);

  return (
    <div className="bg-canvas min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* City Hero */}
        <div className="relative rounded-panel overflow-hidden bg-ink p-6 sm:p-8 mb-6 border border-line shadow-xl text-white">
          <img
            src="/images/hero_property.png"
            alt={cityName}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <span className="font-mono-label text-label text-accent bg-black/60 border border-white/20 px-3 py-1 rounded-full inline-block mb-4">
              {cityProperties.length} VERIFIED MARKET LISTINGS
            </span>

            <h1 className="font-serif-display text-4xl sm:text-6xl font-light mb-2 capitalize">
              {cityName} Real Estate
            </h1>

            <p className="text-base text-white/80 font-normal mb-6">
              Verified residential compounds, serviced apartments, and diplomatic residences in {cityName}.
            </p>
          </div>
        </div>

        {/* Verified City Listings */}
        <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
          <div>
            <span className="font-mono-label text-label text-primary block mb-1">
              FIELD VERIFIED MARKETPLACE
            </span>
            <h2 className="font-serif-display text-3xl font-light text-ink">
              Available Homes in {cityName}
            </h2>
          </div>
        </div>

        {loading ? (
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
