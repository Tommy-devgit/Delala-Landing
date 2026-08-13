"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, Banknote } from "lucide-react";
import { City } from "@/lib/types";
import { getSubCities } from "@/lib/locations";
import { Button } from "@/components/ui";
import { Photo } from "@/components/photo";

/**
 * The five values `properties_property_type_check` permits.
 *
 * This offered Studio, G+1 Residence, Penthouse and Commercial Space as well.
 * The database rejects all four, so no listing can carry them and every one of
 * those searches returned an empty page.
 */
const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
];

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

  // `-mt-[4.5rem]` pulls the hero up under the sticky header, so the
  // transparent bar has this dark section behind it rather than the near-white
  // page background — white links on `--color-canvas` are invisible. The offset
  // matches the header's own `h-[4.5rem]`, and the extra top padding below
  // keeps this content clear of the bar.
  return (
    <section className="relative border-b border-line overflow-hidden -mt-[4.5rem]">
      {/* The photograph is chosen for its sky: the houses sit along the bottom
          edge, so the headline lands on plain colour rather than fighting
          detail. Marked `priority` because it is the one image above the fold —
          everything else on the site stays lazy. */}
      <div className="absolute inset-0 bg-ink">
        <Photo slot="hero-homes" sizes="100vw" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-ink/92 via-ink/78 to-ink/45" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 pt-[7rem] pb-10 sm:pt-[8rem] sm:pb-14">
        <div className="max-w-2xl">
          <h1 className="font-serif-display text-3xl sm:text-5xl font-light text-white leading-[1.05]">
            Find a place that feels like home.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/80 max-w-lg leading-relaxed">
            {listingCount > 0
              ? `${listingCount.toLocaleString()} ${listingCount === 1 ? "property" : "properties"} across Ethiopia — with the area, the price and who posted it, on every one.`
              : "Properties across Ethiopia — with the area, the price and who posted it, on every one."}
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
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
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
