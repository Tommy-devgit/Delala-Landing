/**
 * Whatever the poster chose. Left open rather than a closed union: the API
 * echoes back the stored string, and an unclassified listing now returns null
 * instead of being labelled "Villa" by default.
 */
export type PropertyType = string;

/** Rent and sale listings price completely differently in the UI. */
export type ListingType = "rent" | "sale";

/**
 * Amenity answers are three-state. `null` means the poster was never asked —
 * true for every listing created before the columns existed — and must not be
 * rendered as either a yes or a no.
 */
export type AmenityFlag = boolean | null;

/** A geographic point in WGS84 degrees. */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * One node of the Country > City > Sub-city > Neighborhood hierarchy served by
 * GET /api/v1/cities. Coordinates are optional map metadata and are never a
 * substitute for the structured location itself.
 */
export interface LocationNode {
  id: string;
  name: string;
  slug: string;
  latitude: number | null;
  longitude: number | null;
  children?: LocationNode[];
}

/** What a poster is on the marketplace. Not their authorization role. */
export type PosterType = "owner" | "broker" | "agency";

/**
 * Which checks a poster has actually passed. Each was hardcoded `true` for
 * every poster before the backing columns existed, so a badge meant nothing.
 * All three false is the normal state for a new account.
 */
export interface PosterVerification {
  phone: boolean;
  identity: boolean;
  business: boolean;
}

/**
 * The poster as carried on a property payload — only what "posted by" needs.
 *
 * Rating, review count, active-listing count, languages, response time and
 * email used to live here as the constants 4.9 / 14 / 8 / ["Amharic",
 * "English"] / "Under 15 minutes" / owner@delala.et, identical on every
 * property. Aggregates come from `apiClient.getPublicProfile()` instead, where
 * they are computed from real reviews.
 */
export interface Broker {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  agencyName: string;
  phone: string;
  posterType: PosterType | null;
  verification: PosterVerification;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  propertyType: PropertyType | null;
  listingType: ListingType;
  rentETB: number;
  city: string;
  subCity: string;
  neighborhood: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  /** Null when the listing has no photographs — not a stock placeholder. */
  heroImage: string | null;
  galleryImages: string[];
  /**
   * The listing passed Delala's moderation queue. This is a real signal — it is
   * derived from `status === "approved"` — but it says nothing about the
   * poster, so it is surfaced as "Reviewed", never as "Verified".
   */
  approved: boolean;
  generator: AmenityFlag;
  waterTank: AmenityFlag;
  parking: AmenityFlag;
  furnished: AmenityFlag;
  securityGuard: AmenityFlag;
  balcony: AmenityFlag;
  internet: AmenityFlag;
  featured?: boolean;
  trending?: boolean;
  recentlyAdded?: boolean;
  broker: Broker;
  phone?: string;
  /** Approximate map position. Null when the publisher never placed a pin. */
  latitude: number | null;
  longitude: number | null;
  description: string;
  /** ISO timestamp of when the listing was published. */
  createdAt: string | null;
}

export interface City {
  id: string;
  slug: string;
  name: string;
  image: string;
  tagline: string;
  startingRentETB: number;
  propertiesCount: number;
  /** Sub-cities of this city, each carrying its neighborhoods in `children`. */
  subCities: LocationNode[];
  latitude: number | null;
  longitude: number | null;
  description: string;
}

export interface Neighborhood {
  id: string;
  slug: string;
  name: string;
  subCity: string;
  city: string;
  heroImage: string;
  averageRentETB: number;
  propertiesCount: number;
  securityScore: number;
  generatorPenetration: string;
  waterReliability: string;
  lifestyleTags: string[];
  description: string;
}

/**
 * The Explore controls. Every field here maps onto a query parameter the API
 * understands — nothing is filtered in the browser any more, so a filter that
 * cannot be expressed as a query does not belong in this type.
 */
export interface FilterState {
  /** Free text across title, description, address and location names. */
  q: string;
  city: string;
  subCity: string;
  /** Most specific location level; the modal previously stopped at sub-city. */
  neighborhood: string;
  propertyType: string;
  listingType: ListingType | "";
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  bathrooms: string;
  generator: boolean;
  waterTank: boolean;
  parking: boolean;
  furnished: boolean;
  /** Listings that have passed Delala's moderation review. */
  verifiedOnly: boolean;
  // "popular" was an option with nothing behind it — there is no view or
  // favourite count to order by — so it is not offered.
  sortBy: "newest" | "oldest" | "price-asc" | "price-desc";
}
