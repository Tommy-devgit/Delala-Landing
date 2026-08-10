export type PropertyType = "Apartment" | "Villa" | "Studio" | "G+1 Residence" | "Penthouse" | "Commercial Space";

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

export interface Broker {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  agencyName: string;
  verified: boolean;
  phone: string;
  email: string;
  rating: number;
  reviewsCount: number;
  activeListingsCount: number;
  languages: string[];
  responseTime: string;
  specializedAreas: string[];
  bio: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  propertyType: PropertyType;
  rentETB: number;
  city: string;
  subCity: string;
  neighborhood: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  heroImage: string;
  galleryImages: string[];
  verified: boolean;
  fieldAgentNotes?: string;
  generator: boolean;
  waterTank: boolean;
  parking: boolean;
  furnished: boolean;
  securityGuard: boolean;
  balcony: boolean;
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
  availableDate: string;
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

export interface FilterState {
  city: string;
  subCity: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  bathrooms: string;
  generator: boolean;
  waterTank: boolean;
  parking: boolean;
  furnished: boolean;
  verifiedOnly: boolean;
  sortBy: "newest" | "price-asc" | "price-desc" | "popular";
}
