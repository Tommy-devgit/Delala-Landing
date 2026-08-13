/**
 * Short factual context for each market, shown under the city name.
 *
 * This module also held `CITY_IMAGES`, mapping four cities to generated
 * photographs of themselves. Those are gone and are not coming back: a
 * photograph on a location card asserts what that place looks like, and an
 * invented one asserts something false about a real city. Location cards are
 * typographic now — see `components/city-card.tsx`.
 *
 * The blurbs below are ordinary geographic fact, not statistics. Nothing here
 * should ever grow into a price, a count or a ranking; those come from the API.
 */
const CITY_BLURBS: Record<string, string> = {
  "addis-ababa": "Capital, diplomatic quarter and the deepest rental market",
  hawassa: "Rift Valley lakeside city",
  adama: "Expressway corridor, an hour from the capital",
  "bahir-dar": "Lake Tana waterfront",
  "dire-dawa": "Eastern trade and industrial hub",
  gondar: "Historic royal city in the north",
  mekelle: "Northern highland regional centre",
  jimma: "Coffee-growing south-west",
};

const slugify = (value: string): string => value.toLowerCase().trim().replace(/\s+/g, "-");

/** One-line description of the market, or an empty string. */
export const cityBlurb = (slugOrName: string): string =>
  CITY_BLURBS[slugify(slugOrName)] ?? "";
