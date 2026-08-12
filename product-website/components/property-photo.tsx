import { ImageOff } from "lucide-react";

/**
 * A property photograph, or an honest placeholder when there isn't one.
 *
 * Listings without photos used to be served two stock interiors — one from the
 * API's `create()`, one more from the client's `heroImage` fallback — so an
 * unphotographed property looked photographed, and the same two rooms appeared
 * across the marketplace. `heroImage` is null now, and this renders the absence
 * instead of covering it up.
 *
 * Plain `<img>` is deliberate: both frontends set `images: { unoptimized: true }`,
 * so `next/image` would add no optimisation and would need `remotePatterns`
 * configured for the R2 host.
 */
export function PropertyPhoto({
  src,
  alt,
  className = "",
  sizeHint = "card",
}: {
  src: string | null;
  alt: string;
  className?: string;
  /** Scales the placeholder's icon and copy to the surface it sits on. */
  sizeHint?: "card" | "thumb" | "hero";
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  const iconSize = sizeHint === "hero" ? "w-8 h-8" : sizeHint === "thumb" ? "w-4 h-4" : "w-6 h-6";

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2 bg-canvas text-muted"
      role="img"
      aria-label={`No photograph available for ${alt}`}
    >
      <ImageOff className={iconSize} aria-hidden="true" />
      {sizeHint !== "thumb" && <span className="text-label">No photo yet</span>}
    </div>
  );
}
