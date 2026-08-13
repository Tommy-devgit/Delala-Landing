/**
 * The photography library.
 *
 * Components ask for a slot by name — `hero-homes`, `type-apartments` — and get
 * back everything needed to render it responsibly: the srcset, a default src,
 * real alternative text, and the photographer credit.
 *
 * Two rules this file exists to enforce:
 *
 * 1. **Every photograph has a reason.** A slot is a job on a page, not a hole
 *    to fill. If a section has no slot here, it is meant to carry typography or
 *    an illustration instead — the location cards in particular are deliberately
 *    photograph-free, because inventing city photography for Bole or Yeka would
 *    be showing people a place that is not the place.
 *
 * 2. **Nothing is served at source resolution.** The files behind these names
 *    are built by `scripts/build-images.mjs` from originals in `/new-images`,
 *    which are up to 6400px and several megabytes each. Adding a new photograph
 *    means adding it to that script, not dropping it into `public/`.
 *
 * Alt text describes what is in the frame. These are library photographs, not
 * pictures of the properties on the marketplace, so no alt text here implies
 * otherwise.
 */

export type ImageSlot =
  | "hero-homes"
  | "type-apartments"
  | "type-villas"
  | "type-houses"
  | "editorial-neighbourhoods"
  | "editorial-living"
  | "editorial-interior"
  | "editorial-doorway"
  | "editorial-gables"
  | "guide-bedroom"
  | "guide-keys-in-door"
  | "guide-handover";

interface ImageAsset {
  widths: number[];
  alt: string;
  /** Unsplash photographer. Not legally required, but it is their work. */
  credit: string;
  /** Roughly where the subject sits, for cropping at extreme aspect ratios. */
  position?: string;
}

const ASSETS: Record<ImageSlot, ImageAsset> = {
  "hero-homes": {
    widths: [640, 1024, 1600, 2400],
    alt: "A row of pitched-roof houses in different colours beneath an open sky",
    credit: "Braden Jarvis",
    // The houses sit along the bottom; the headline goes in the sky above them.
    position: "50% 85%",
  },
  "type-apartments": {
    widths: [480, 800, 1200],
    alt: "The corner of a modern brick apartment building against a deep blue sky",
    credit: "Étienne Beauregard-Riverin",
  },
  "type-villas": {
    widths: [480, 800, 1200],
    alt: "A contemporary detached house with wide eaves and full-height glazing",
    credit: "Naomi Ellsworth",
  },
  "type-houses": {
    widths: [480, 800, 1200],
    alt: "A older house with climbing greenery, seen from its garden driveway",
    credit: "Matt Jones",
  },
  "editorial-neighbourhoods": {
    widths: [640, 1024, 1600, 2400],
    alt: "Rows of houses and tiled roofs seen from above",
    credit: "Breno Assis",
  },
  "editorial-living": {
    widths: [480, 800, 1200],
    alt: "A timber house lit from inside at dusk, with lights strung along the porch",
    credit: "Clay Banks",
  },
  "editorial-interior": {
    widths: [640, 1024, 1600],
    alt: "An open-plan living and dining room with pale floors and large windows",
    credit: "Lotus Design N Print",
  },
  "editorial-doorway": {
    widths: [480, 800, 1200],
    alt: "An arched doorway looking through into a sunlit sitting room",
    credit: "Austin Wehrwein",
  },
  "editorial-gables": {
    widths: [480, 800, 1200],
    alt: "Three white gabled rooflines against a flat blue sky",
    credit: "Alexander Andrews",
  },
  "guide-bedroom": {
    widths: [640, 1024, 1600],
    alt: "A made-up bedroom with bedside lamps and a window onto trees",
    credit: "Steven Ungermann",
  },
  "guide-keys-in-door": {
    widths: [640, 1024, 1600],
    alt: "A key left in the lock of a front door",
    credit: "Jaye Haych",
  },
  "guide-handover": {
    widths: [640, 1024, 1600],
    alt: "A hand holding out a set of keys",
    credit: "Jakub Żerdzicki",
  },
};

export interface ResolvedImage {
  src: string;
  srcSet: string;
  alt: string;
  credit: string;
  position?: string;
}

/**
 * Resolves a slot to a `src`, a `srcSet` and its alt text.
 *
 * `sizes` has to be passed by the caller because only the caller knows how wide
 * the image renders in its layout — a card in a six-up grid and a full-bleed
 * hero need very different files at the same viewport width.
 */
export function image(slot: ImageSlot): ResolvedImage {
  const asset = ASSETS[slot];
  const widths = asset.widths;

  return {
    // The middle width, so a browser that ignores srcSet still gets something
    // sensible rather than the largest file.
    src: `/images/${slot}-${widths[Math.floor(widths.length / 2)]}.webp`,
    srcSet: widths.map((w) => `/images/${slot}-${w}.webp ${w}w`).join(", "),
    alt: asset.alt,
    credit: asset.credit,
    position: asset.position,
  };
}

/** Every photographer whose work is used, for an attributions list. */
export const PHOTO_CREDITS = Array.from(
  new Set(Object.values(ASSETS).map((asset) => asset.credit))
).sort();
