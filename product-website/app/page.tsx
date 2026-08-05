"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchBarCapsule } from "@/components/search-bar-capsule";
import { CategoryBar } from "@/components/category-bar";
import { PropertyCard } from "@/components/property-card";
import { FilterModal } from "@/components/filter-modal";
import { apiClient } from "@/lib/api-client";
import { authClient, UserSession } from "@/lib/auth-client";
import { Property, City, FilterState } from "@/lib/types";
import { ShieldCheck, MapPin, Building2, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [session, setSession] = useState<{ user: UserSession; token: string } | null>(null);
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
      setSession(authClient.getSession());
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

    window.addEventListener("delala_auth_change", () => setSession(authClient.getSession()));
  }, []);

  const filteredListings = properties.filter((item) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "diplomatic") return item.subCity.includes("Bole") || item.neighborhood.includes("Airport");
    return item.propertyType === selectedCategory;
  });

  return (
    <div className="space-y-12 pb-16">

      {/* 1. HERO DISCOVERY SECTION (Full 100vh Height Covering Down to Screen Bottom) */}
      <section className="relative w-full h-[calc(100vh-80px)] min-h-[580px] flex flex-col justify-center overflow-hidden border-b border-[#ECE7DA]">
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/images/hero-img.jpg"
            alt="Delala Ethiopia Real Estate"
            className="w-full h-full object-cover object-center"
          />
          {/* Dual Overlay Gradient for High Contrast & Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B12] via-transparent to-black/30" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 py-8">
          <div className="max-w-3xl mb-8 space-y-4">
            <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[0.95] drop-shadow-md">
              Find your next <span className="italic font-normal text-[#B4C292]">home</span> in Ethiopia.
            </h1>

            <p className="text-base sm:text-lg text-[#ECE7DA]/90 font-medium max-w-xl leading-relaxed drop-shadow-xs">
              Search verified homes in Addis Ababa, Hawassa, Adama & Bahir Dar with standby generators, water tanks, and transparent Birr leasing.
            </p>
          </div>

          {/* Large Floating Hero Search Capsule */}
          <div className="max-w-4xl shadow-2xl rounded-3xl overflow-hidden backdrop-blur-md">
            <SearchBarCapsule onOpenFilters={() => setIsFilterModalOpen(true)} />
          </div>

          {/* Quick Sub-City Tags
          <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs text-[#ECE7DA]">
            <span className="font-mono-label text-[10px] text-[#B4C292] font-bold tracking-wider">POPULAR SEARCHES:</span>
            {["Bole Medhanialem", "Kazanchis UN", "Old Airport Villa", "CMC Apartment", "Hawassa Lake View"].map((tag) => (
              <Link
                key={tag}
                href={`/search?subCity=${encodeURIComponent(tag.split(" ")[0])}`}
                className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium hover:bg-[#4C061D] hover:border-[#4C061D] hover:text-white transition-all shadow-xs"
              >
                {tag}
              </Link>
            ))}
          </div> */}

        </div>
      </section>

      {/* 2. CATEGORY SELECTION PILL BAR */}
      <CategoryBar
        selected={selectedCategory}
        onSelect={(cat) => setSelectedCategory(cat)}
      />

      {/* 3. FEATURED VERIFIED HOMES GRID */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-[#ECE7DA] pb-4">
          <div>
            <span className="font-mono-label text-[10px] text-[#4C061D] block mb-1">
              FIELD VERIFIED MARKETPLACE
            </span>
            <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
              Featured Verified Homes
            </h2>
          </div>

          <Link
            href="/search"
            className="font-mono-label text-[11px] text-[#4C061D] font-bold hover:underline flex items-center gap-1"
          >
            <span>VIEW ALL LISTINGS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <div key={n} className="h-72 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF8F4] rounded-3xl border border-[#ECE7DA] p-8">
            <Building2 className="w-12 h-12 text-[#736F4E] mx-auto mb-3 opacity-50" />
            <h3 className="font-serif-display text-xl text-[#1c1b12] mb-1">No Properties Found</h3>
            <p className="text-xs text-[#736F4E]">Try selecting a different category or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredListings.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* 4. ETHIOPIAN CITIES EXPLORER */}
      <section className="bg-[#FAF8F4] py-10 px-4 sm:px-8 border-y border-[#ECE7DA]">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-6">
            <span className="font-mono-label text-[10px] text-[#4C061D] block mb-1">
              REGIONAL HUB DISCOVERY
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-[#1c1b12]">
              Explore Ethiopian Real Estate Markets
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/cities/${city.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-900 border border-[#ECE7DA] shadow-sm hover:shadow-md transition-all"
              >
                <img
                  src={city.image || "/images/hero_property.png"}
                  alt={city.name}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3.5 flex flex-col justify-end text-white">
                  <div className="font-mono-label text-[9px] text-[#B4C292] font-bold uppercase mb-0.5">
                    {city.propertiesCount} LISTINGS
                  </div>
                  <h3 className="font-serif-display text-lg font-light mb-0.5 leading-tight">
                    {city.name}
                  </h3>
                  <p className="text-[10px] text-white/80 line-clamp-1 mb-2">
                    {city.tagline}
                  </p>
                  <div className="text-[9.5px] font-mono-label text-[#B4C292] flex items-center justify-between border-t border-white/20 pt-1.5 font-bold">
                    <span>FROM ETB {city.startingRentETB.toLocaleString()}/MO</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
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
      />
    </div>
  );
}
