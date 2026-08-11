/**
 * City imagery, keyed by the slug the API returns.
 *
 * Every city previously rendered the same two placeholder photos, so the six
 * markets were visually indistinguishable. Keeping the mapping here means new
 * cities are added in one place rather than hardcoded into components.
 *
 * A city with no photo yet is deliberately left out: the card falls back to a
 * typographic tile, which reads as intentional, unlike repeating another city's
 * photograph.
 */
const CITY_IMAGES: Record<string, string> = {
  "addis-ababa": "/images/city_addis_ababa.png",
  hawassa: "/images/city_hawassa.png",
  adama: "/images/city_adama.png",
  "bahir-dar": "/images/city_bahir_dar.png",
};

/** Short, factual context per market. Shown under the city name. */
const CITY_BLURBS: Record<string, string> = {
  "addis-ababa": "Capital, diplomatic quarter and the deepest rental market",
  hawassa: "Rift Valley lakeside city",
  adama: "Expressway corridor, an hour from the capital",
  "bahir-dar": "Lake Tana waterfront",
  "dire-dawa": "Eastern trade and industrial hub",
  gondar: "Historic royal city in the north",
};

const slugify = (value: string): string => value.toLowerCase().trim().replace(/\s+/g, "-");

/** Photo for a city, or null when none has been added yet. */
export const cityImage = (slugOrName: string): string | null =>
  CITY_IMAGES[slugify(slugOrName)] ?? null;

/** One-line description of the market, or an empty string. */
export const cityBlurb = (slugOrName: string): string =>
  CITY_BLURBS[slugify(slugOrName)] ?? "";
