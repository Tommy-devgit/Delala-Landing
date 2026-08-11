"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { City } from "@/lib/types";
import { cityBlurb, cityImage } from "@/lib/city-images";

/**
 * A market tile.
 *
 * Cities with a photo get an image with a bottom scrim; cities without one get a
 * typographic tile rather than borrowing another city's photograph, which is
 * what made all six look identical before.
 */
export function CityCard({ city }: { city: City }) {
  const image = cityImage(city.slug || city.name);
  const blurb = cityBlurb(city.slug || city.name);
  const count = city.propertiesCount;

  return (
    <Link
      href={`/cities/${city.slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-card border border-line bg-ink aspect-4/5 sm:aspect-3/4 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {image ? (
        <>
          <img
            src={image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Scrim only at the base, so the photograph stays legible. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-primary">
          <span
            aria-hidden="true"
            className="absolute -right-3 -top-4 font-serif-display text-[5.5rem] leading-none text-white/10 select-none"
          >
            {city.name.charAt(0)}
          </span>
        </div>
      )}

      <div className="relative p-3.5 text-white">
        <h3 className="font-serif-display text-lg leading-tight">{city.name}</h3>

        {blurb && <p className="text-label text-white/75 mt-0.5 line-clamp-2">{blurb}</p>}

        <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-white/20 pt-2">
          <span className="text-micro text-white/90">
            {count > 0 ? `${count.toLocaleString()} ${count === 1 ? "home" : "homes"}` : "No homes yet"}
          </span>
          <ArrowRight
            className="w-3.5 h-3.5 text-accent transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
