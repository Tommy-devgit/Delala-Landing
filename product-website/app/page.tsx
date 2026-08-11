"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { CategoryBar } from "@/components/category-bar";
import { PropertyCard } from "@/components/property-card";
import { CityCard } from "@/components/city-card";
import { FilterModal } from "@/components/filter-modal";
import { apiClient } from "@/lib/api-client";
import { Property, City, FilterState } from "@/lib/types";
import { ShieldCheck, MapPin, Building2, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    city: "",
    subCity: "",
    propertyType: "",
    minPrice: 0,
    maxPrice: 150000,
    bedrooms: "",
    bathrooms: "",
    generator: false,
    waterTank: false,
    parking: false,
    furnished: false,
    verifiedOnly: false,
    sortBy: "newest",
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [fetchedProperties, fetchedCities] = await Promise.all([
        apiClient.getProperties(),
        apiClient.getCities(),
      ]);
      setProperties(fetchedProperties);
      setCities(fetchedCities);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredListings = properties.filter(
    (item) => selectedCategory === "all" || item.propertyType === selectedCategory
  );

  return (
    <div className="space-y-6 pb-12">

      <HomeHero cities={cities} listingCount={properties.length} />

      {/* 2. CATEGORY STRIP */}
      <CategoryBar
        selected={selectedCategory}
        onSelect={(cat) => setSelectedCategory(cat)}
      />

      {/* 3. FEATURED HOMES */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-5 border-b border-line pb-3">
          <div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
              Featured homes
            </h2>
          </div>

          <Link
            href="/search"
            className="text-micro text-primary font-bold hover:underline flex items-center gap-1"
          >
            <span>View all listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <Skeleton key={n} className="h-72" />
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-10 bg-canvas rounded-panel border border-line p-6">
            <Building2 className="w-12 h-12 text-muted mx-auto mb-3 opacity-50" />
            <h3 className="font-serif-display text-xl text-ink mb-1">No Properties Found</h3>
            <p className="text-xs text-muted">Try selecting a different category or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredListings.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* 4. CITIES */}
      <section className="bg-canvas py-8 px-4 sm:px-8 border-y border-line">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-5">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
              Explore cities
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      </section>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        initialFilters={filters}
        onApply={(newFilters) => setFilters(newFilters)}
        cities={cities}
      />
    </div>
  );
}
