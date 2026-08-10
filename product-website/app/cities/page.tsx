"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { City } from "@/lib/types";
import { MapPin, ArrowRight, Building2 } from "lucide-react";
import { Skeleton } from "@/components/ui";

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCities() {
      setLoading(true);
      const data = await apiClient.getCities();
      setCities(data);
      setLoading(false);
    }
    loadCities();
  }, []);

  return (
    <div className="bg-canvas min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        <div className="max-w-3xl mb-6">
          <span className="font-mono-label text-label text-primary bg-surface border border-line px-3.5 py-1.5 rounded-full inline-block mb-4 shadow-xs">
            REGIONAL REAL ESTATE MARKETPLACES
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-light text-primary mb-4">
            Browse Homes by City
          </h1>
          <p className="text-base text-muted font-medium">
            Explore verified residential listings, diplomatic compounds, and commercial hubs across major Ethiopian urban centers.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : cities.length === 0 ? (
          <div className="py-14 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <MapPin className="w-8 h-8" />
            </div>
            <h2 className="font-serif-display text-2xl text-ink">
              No Cities Found
            </h2>
            <p className="text-xs text-muted">
              There are no cities currently registered in your database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/cities/${city.slug}`}
                className="bg-surface rounded-card overflow-hidden border border-line shadow-xs hover:shadow-lg hover:border-primary transition-all group flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink">
                  <img
                    src={city.image || "/images/hero_property.png"}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-mono-label text-label text-accent bg-black/60 px-2.5 py-1 rounded-full border border-white/20">
                      {city.propertiesCount} ACTIVE LISTINGS
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="font-serif-display text-2xl font-light text-ink group-hover:text-primary transition-colors mb-1">
                    {city.name}
                  </h2>
                  <p className="font-mono-label text-label text-primary mb-3">
                    {city.tagline}
                  </p>

                  <div className="pt-4 border-t border-line flex items-center justify-between font-mono-label text-micro text-primary">
                    <span>STARTING ETB {city.startingRentETB.toLocaleString()}/MO</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
