"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, Banknote } from "lucide-react";
import { City } from "@/lib/types";
import { getSubCities } from "@/lib/locations";
import { Button } from "@/components/ui";

const PROPERTY_TYPES = ["Apartment", "Villa", "Studio", "G+1 Residence", "Penthouse", "Commercial Space"];

const BUDGETS = [
  { value: "", label: "Any budget" },
  { value: "20000", label: "Up to ETB 20,000" },
  { value: "40000", label: "Up to ETB 40,000" },
  { value: "70000", label: "Up to ETB 70,000" },
  { value: "120000", label: "Up to ETB 120,000" },
];

/**
 * Marketplace hero.
 *
 * The job here is finding a home, so search is the hero rather than decoration.
 * It replaces a full-viewport image banner that pushed every listing below the
 * fold; the panel now sits at a fixed, workable height on every breakpoint.
 */
export function HomeHero({ cities, listingCount }: { cities: City[]; listingCount: number }) {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [subCity, setSubCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const subCities = useMemo(() => getSubCities(cities, city), [cities, city]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (subCity) params.set("subCity", subCity);
    if (propertyType) params.set("propertyType", propertyType);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/search?${params.toString()}`);
  };

  const fieldWrap = "flex items-center gap-2 px-3 h-12 bg-canvas border border-line rounded-control focus-within:border-primary transition-colors";
  const fieldInput = "w-full bg-transparent text-micro text-ink focus:outline-none cursor-pointer";

  return (
    <section className="relative border-b border-line overflow-hidden">
      <img
        src="/images/hero-img.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink/92 via-ink/80 to-ink/60" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div className="max-w-2xl">
          <h1 className="font-serif-display text-3xl sm:text-5xl font-light text-white leading-[1.05]">
            Find a home you can actually trust.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/80 max-w-lg leading-relaxed">
            {listingCount > 0
              ? `${listingCount.toLocaleString()} ${listingCount === 1 ? "home" : "homes"} across Ethiopia, each with a real location, real photos and the owner's direct number.`
              : "Homes across Ethiopia with a real location, real photos and the owner's direct number."}
          </p>
        </div>

        <form
          onSubmit={submit}
          className="mt-6 bg-surface border border-line rounded-panel p-3 shadow-lg max-w-4xl"
          aria-label="Search homes"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div>
              <label htmlFor="hero-city" className="sr-only">City</label>
              <div className={fieldWrap}>
                <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                <select
                  id="hero-city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setSubCity("");
                  }}
                  className={fieldInput}
                >
                  <option value="">Anywhere in Ethiopia</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="hero-subcity" className="sr-only">Sub-city</label>
              <div className={fieldWrap}>
                <MapPin className="w-4 h-4 text-muted shrink-0" aria-hidden="true" />
                <select
                  id="hero-subcity"
                  value={subCity}
                  disabled={!city || subCities.length === 0}
                  onChange={(e) => setSubCity(e.target.value)}
                  className={`${fieldInput} disabled:cursor-not-allowed disabled:text-muted`}
                >
                  <option value="">{city ? "Any sub-city" : "Pick a city first"}</option>
                  {subCities.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="hero-type" className="sr-only">Property type</label>
              <div className={fieldWrap}>
                <Home className="w-4 h-4 text-muted shrink-0" aria-hidden="true" />
                <select
                  id="hero-type"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className={fieldInput}
                >
                  <option value="">Any type</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="hero-budget" className="sr-only">Budget</label>
              <div className={fieldWrap}>
                <Banknote className="w-4 h-4 text-muted shrink-0" aria-hidden="true" />
                <select
                  id="hero-budget"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className={fieldInput}
                >
                  {BUDGETS.map((b) => (
                    <option key={b.value} value={b.value}>{b.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full mt-2.5">
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>Search homes</span>
          </Button>
        </form>
      </div>
    </section>
  );
}
