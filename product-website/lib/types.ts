export type PropertyType = "Apartment" | "Villa" | "Studio" | "G+1 Residence" | "Penthouse" | "Commercial Space";

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
  lat: number;
  lng: number;
  description: string;
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
  subCities: string[];
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
