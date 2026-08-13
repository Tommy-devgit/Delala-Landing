import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { City } from "@/lib/types";
import { cityBlurb } from "@/lib/city-images";

/**
 * A location tile — typographic, by design.
 *
 * These carried generated photographs of Addis Ababa, Adama, Hawassa and Bahir
 * Dar. The absence of photography here is deliberate and is the point: a
 * picture on a location card is a claim about what that place looks like, and
 * a picture that was never taken there is a false one. Bole and Yeka are not
 * interchangeable, and a stock skyline standing in for either is worse than no
 * picture at all.
 *
 * What replaces it is the information somebody choosing an area actually wants:
 * the name at a size you can read across a grid, where it sits in the
 * hierarchy, and how many homes are in it right now. The oversized initial is
 * the only decoration, and it is set in the surface colour rather than added as
 * an image.
 */
export function CityCard({
  city,
  /** Set when the card sits inside a city, e.g. a sub-city under Addis Ababa. */
  parentName,
}: {
  city: City;
  parentName?: string;
}) {
  const blurb = cityBlurb(city.slug || city.name);
  const count = city.propertiesCount;

  return (
    <Link
      href={`/cities/${city.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-card border border-line bg-surface p-4 aspect-4/5 sm:aspect-square transition-colors hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {/* The single decorative element: the initial, cropped by the card edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-6 select-none font-serif-display text-[6.5rem] leading-none text-canvas transition-colors duration-300 group-hover:text-accent/30"
      >
        {city.name.charAt(0)}
      </span>

      <div className="relative">
        {parentName && <p className="text-label text-muted mb-1">{parentName}</p>}
        <h3 className="font-serif-display text-xl leading-tight text-ink">{city.name}</h3>
        {blurb && <p className="text-label text-muted mt-1.5 line-clamp-2">{blurb}</p>}
      </div>

      <div className="relative mt-3 flex items-end justify-between gap-2 border-t border-line pt-2.5">
        <span className="text-micro text-body">
          {count > 0 ? (
            <>
              <span className="text-ink font-medium">{count.toLocaleString()}</span>{" "}
              {count === 1 ? "home" : "homes"}
            </>
          ) : (
            <span className="text-muted">No homes yet</span>
          )}
        </span>
        <ArrowRight
          className="w-3.5 h-3.5 text-primary transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
