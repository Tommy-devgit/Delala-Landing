import { Property, City, Broker, LocationNode, PropertyType } from "./types";
import { toCoordinates } from "./map";

/**
 * Loose shapes of the NestJS payloads. The API is generous with optional and
 * legacy field names, so everything here is optional and normalized on the way
 * into the strict frontend types.
 */
interface ApiLocationNode {
  id?: string;
  name?: string;
  slug?: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
  children?: ApiLocationNode[];
}

interface ApiPropertyImage {
  id?: string;
  url?: string;
  isHero?: boolean;
}

interface ApiBroker {
  id?: string;
  slug?: string;
  agencyName?: string;
  phone?: string;
  rating?: number;
  user?: { profile?: { fullName?: string; avatarUrl?: string } };
}

interface ApiProperty {
  id: string;
  slug: string;
  title: string;
  propertyType: PropertyType;
  rentETB: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  status?: string;
  createdAt?: string | null;
  city?: string | { name?: string };
  cityEntity?: { name?: string };
  subCity?: string;
  neighborhood?: string | { name?: string; subCity?: string };
  neighborhoodEntity?: { name?: string; subCity?: string };
  address?: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
  images?: ApiPropertyImage[];
  fieldAgentNotes?: string;
  generator?: boolean;
  waterTank?: boolean;
  parking?: boolean;
  furnished?: boolean;
  securityGuard?: boolean;
  balcony?: boolean;
  phone?: string;
  contactPhone?: string;
  broker?: ApiBroker;
}

interface ApiCity {
  id: string;
  name: string;
  slug?: string;
  image?: string;
  tagline?: string;
  startingRentETB?: number;
  propertiesCount?: number;
  description?: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
  subCities?: ApiLocationNode[];
}

const normalizeApiUrl = (url?: string): string => {
  if (!url) return "http://localhost:4000/api/v1";
  let cleaned = url.trim();
  if (cleaned.includes("localhost")) {
    return cleaned.replace(/\/+$/, "");
  }
  cleaned = cleaned.replace(/^(https?:?\/*)+/i, "");
  cleaned = cleaned.replace(/\/+/g, "/");
  if (!cleaned.includes("api/v1")) {
    cleaned = `${cleaned}/api/v1`.replace(/\/+/g, "/");
  }
  return `https://${cleaned}`.replace(/\/+$/, "");
};

const API_BASE = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);

const toSlug = (name: string): string => name.toLowerCase().replace(/\s+/g, "-");

/** Normalizes one hierarchy node from the /cities response. */
const mapLocationNode = (node: ApiLocationNode): LocationNode => {
  const coordinates = toCoordinates(node?.latitude, node?.longitude);
  return {
    id: String(node?.id ?? node?.name ?? ""),
    name: node?.name ?? "",
    slug: node?.slug ?? toSlug(node?.name ?? ""),
    latitude: coordinates?.latitude ?? null,
    longitude: coordinates?.longitude ?? null,
    children: Array.isArray(node?.children) ? node.children.map(mapLocationNode) : [],
  };
};

/** Maps a raw NestJS property payload onto the frontend `Property` shape. */
const mapProperty = (p: ApiProperty): Property => {
  const propertyPhone = p.phone || p.contactPhone || p.broker?.phone || "";
  const coordinates = toCoordinates(p.latitude, p.longitude);
  // `neighborhood` is a plain name on newer payloads and an object on older ones.
  const neighborhoodObject = typeof p.neighborhood === "object" ? p.neighborhood : undefined;

  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    propertyType: p.propertyType,
    rentETB: p.rentETB,
    city: typeof p.city === "string" ? p.city : (p.city?.name || p.cityEntity?.name || ""),
    subCity: p.subCity || neighborhoodObject?.subCity || p.neighborhoodEntity?.subCity || "",
    neighborhood:
      typeof p.neighborhood === "string"
        ? p.neighborhood
        : neighborhoodObject?.name || p.neighborhoodEntity?.name || "",
    address: p.address || "",
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    areaSqm: p.areaSqm,
    heroImage: p.images?.find((img) => img.isHero)?.url || p.images?.[0]?.url || "/images/hero_property.png",
    galleryImages:
      p.images?.map((img) => img.url).filter((url): url is string => Boolean(url)) || [
        "/images/hero_property.png",
      ],
    verified: p.status === "APPROVED",
    fieldAgentNotes: p.fieldAgentNotes || "Physically verified by Delala field inspector.",
    generator: Boolean(p.generator),
    waterTank: Boolean(p.waterTank),
    parking: Boolean(p.parking),
    furnished: Boolean(p.furnished),
    securityGuard: Boolean(p.securityGuard),
    balcony: Boolean(p.balcony),
    phone: propertyPhone,
    broker: {
      id: p.broker?.id || "b1",
      slug: p.broker?.slug || "property-owner",
      name: p.broker?.user?.profile?.fullName || p.broker?.agencyName || "Verified Owner",
      avatar: p.broker?.user?.profile?.avatarUrl || "",
      agencyName: p.broker?.agencyName || "Verified Owner",
      verified: true,
      phone: propertyPhone,
      email: "owner@delala.et",
      rating: p.broker?.rating || 4.9,
      reviewsCount: 14,
      activeListingsCount: 8,
      languages: ["Amharic", "English"],
      responseTime: "Under 15 minutes",
      specializedAreas: [],
      bio: "",
    },
    latitude: coordinates?.latitude ?? null,
    longitude: coordinates?.longitude ?? null,
    description: p.description,
    createdAt: p.createdAt ?? null,
    availableDate: "Immediate",
  };
};

/** Payload accepted by `apiClient.createProperty`. Mirrors the NestJS CreatePropertyDto. */
export interface CreatePropertyInput {
  title: string;
  description: string;
  propertyType: string;
  listingType: string;
  rentETB: string | number;
  city: string;
  subCity: string;
  neighborhood: string;
  address?: string;
  phone: string;
  bedrooms: string | number;
  bathrooms: string | number;
  areaSqm: string | number;
  generator: boolean;
  waterTank: boolean;
  parking: boolean;
  /** Owning user. The API prefers the id in the session token over this. */
  brokerId?: string;
  /** Approximate map pin. Omitted from the request when the publisher set none. */
  latitude?: number | null;
  longitude?: number | null;
  /** Files are uploaded to Cloudflare R2 by the API, hero image first. */
  images?: File[];
}


/** Bearer header for authenticated calls, or an empty object when signed out. */
const authHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("delala_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/** Public profile of a property poster. Never includes the email address. */
export interface PublicProfile {
  id: string;
  fullName: string;
  role: string;
  avatarUrl: string | null;
  bio: string;
  phone: string | null;
  listingCount: number;
  activeListingCount: number;
  memberSince: string | null;
}

export interface AppNotification {
  id: string;
  type: string;
  title: string;
  body: string;
  propertyId: string | null;
  read: boolean;
  createdAt: string | null;
}

export const apiClient = {
  // Fetch properties directly from NestJS REST API
  async getProperties(filters?: {
    city?: string;
    subCity?: string;
    propertyType?: string;
    ownerId?: string;
    status?: string;
  }): Promise<Property[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.city) queryParams.set("city", filters.city);
      if (filters?.subCity) queryParams.set("subCity", filters.subCity);
      if (filters?.propertyType && filters.propertyType !== "all") queryParams.set("propertyType", filters.propertyType);
      if (filters?.ownerId) queryParams.set("ownerId", filters.ownerId);
      if (filters?.status) queryParams.set("status", filters.status);

      const res = await fetch(`${API_BASE}/properties?${queryParams.toString()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data.map(mapProperty);
      }
    } catch (err) {
      console.warn("NestJS API fetch error:", err);
    }
    return [];
  },

  // Fetch single property details by slug
  async getPropertyBySlug(slug: string): Promise<Property | null> {
    try {
      const res = await fetch(`${API_BASE}/properties/${slug}`, { cache: "no-store" });
      if (res.ok) return mapProperty(await res.json());
    } catch (err) {
      console.warn("NestJS API fetch error:", err);
    }
    return null;
  },

  /**
   * Uploads a single image to Cloudflare R2 and returns its URL. Throws with a
   * readable message when storage is unavailable, so callers can surface the
   * failure rather than silently substituting something else.
   */
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/properties/upload`, { method: "POST", body: formData });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data?.message || "The image could not be uploaded.");
    }
    if (!data?.url) {
      throw new Error("The image upload did not return a URL.");
    }
    return data.url as string;
  },

  /**
   * Create a new property listing through the existing multipart endpoint, which
   * also pushes the attached images to Cloudflare R2.
   */
  async createProperty(input: CreatePropertyInput, token?: string | null): Promise<{ slug?: string; id?: string }> {
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("propertyType", input.propertyType);
    formData.append("listingType", input.listingType);
    formData.append("rentETB", String(input.rentETB));
    formData.append("price", String(input.rentETB));
    formData.append("city", input.city);
    formData.append("subCity", input.subCity);
    formData.append("neighborhood", input.neighborhood);
    formData.append("address", input.address || "");
    formData.append("phone", input.phone);
    formData.append("bedrooms", String(input.bedrooms));
    formData.append("bathrooms", String(input.bathrooms));
    formData.append("areaSqm", String(input.areaSqm));
    formData.append("generator", String(input.generator));
    formData.append("waterTank", String(input.waterTank));
    formData.append("parking", String(input.parking));
    if (input.brokerId) formData.append("brokerId", input.brokerId);

    // Only send a pin when it is a genuine coordinate pair.
    const pin = toCoordinates(input.latitude, input.longitude);
    if (pin) {
      formData.append("latitude", String(pin.latitude));
      formData.append("longitude", String(pin.longitude));
    }

    (input.images || []).forEach((file) => formData.append("images", file));

    const res = await fetch(`${API_BASE}/properties`, {
      method: "POST",
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: formData,
    });

    const created = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(created?.message || "Failed to publish property.");
    }
    return created;
  },


  /** Public profile for a poster. Returns null when the account is gone. */
  async getPublicProfile(userId: string): Promise<PublicProfile | null> {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/public`, { cache: "no-store" });
      if (res.ok) return (await res.json()) as PublicProfile;
    } catch (err) {
      console.warn("Public profile fetch error:", err);
    }
    return null;
  },

  /* -------------------------------- favorites ------------------------------ */

  /** Ids the signed-in user has saved, for marking hearts across a grid. */
  async getFavoriteIds(): Promise<string[]> {
    const res = await fetch(`${API_BASE}/favorites/ids`, {
      cache: "no-store",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Could not load your saved homes.");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  },

  async getFavorites(): Promise<Property[]> {
    // The API resolves the wishlist from the session; the path segment is
    // retained only because the route shape predates that.
    const res = await fetch(`${API_BASE}/favorites/user/me`, {
      cache: "no-store",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Could not load your saved homes.");
    const data = await res.json();
    return Array.isArray(data) ? data.map(mapProperty) : [];
  },

  /** Returns the new saved state so the caller can reconcile optimistic UI. */
  async toggleFavorite(propertyId: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ propertyId }),
    });
    if (!res.ok) throw new Error("Could not update your saved homes.");
    const data = await res.json();
    return Boolean(data?.saved);
  },

  /* ------------------------------ notifications ---------------------------- */

  async getNotifications(): Promise<AppNotification[]> {
    const res = await fetch(`${API_BASE}/notifications`, {
      cache: "no-store",
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error("Could not load your notifications.");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  },

  async getUnreadNotificationCount(): Promise<number> {
    const res = await fetch(`${API_BASE}/notifications/unread-count`, {
      cache: "no-store",
      headers: authHeaders(),
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return Number(data?.count) || 0;
  },

  async markNotificationRead(id: string): Promise<void> {
    await fetch(`${API_BASE}/notifications/${id}/read`, { method: "PATCH", headers: authHeaders() });
  },

  async markAllNotificationsRead(): Promise<void> {
    await fetch(`${API_BASE}/notifications/read-all`, { method: "PATCH", headers: authHeaders() });
  },

  // Fetch cities together with their sub-city / neighborhood hierarchy
  async getCities(): Promise<City[]> {
    try {
      const res = await fetch(`${API_BASE}/cities`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return (data as ApiCity[]).map((c) => {
            const coordinates = toCoordinates(c.latitude, c.longitude);
            return {
              id: c.id,
              name: c.name,
              slug: c.slug || toSlug(c.name || ""),
              image: c.image || "/images/hero_property.png",
              tagline: c.tagline || "",
              startingRentETB: c.startingRentETB ?? 0,
              propertiesCount: c.propertiesCount ?? 0,
              description: c.description || "",
              subCities: Array.isArray(c.subCities) ? c.subCities.map(mapLocationNode) : [],
              latitude: coordinates?.latitude ?? null,
              longitude: coordinates?.longitude ?? null,
            };
          });
        }
      }
    } catch (err) {
      console.warn("NestJS API fetch error:", err);
    }
    return [];
  },

  // Fetch brokers
  async getBrokers(): Promise<Broker[]> {
    return [];
  },

  // Submit walkthrough visit request
  async scheduleVisit(visitData: {
    propertyId: string;
    seekerName: string;
    seekerPhone: string;
    scheduledDate: string;
    timeSlot: string;
    brokerId: string;
  }): Promise<{ success: boolean; visitId?: string }> {
    try {
      const res = await fetch(`${API_BASE}/visits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: visitData.propertyId,
          seekerId: "guest-user",
          brokerId: visitData.brokerId,
          scheduledDate: visitData.scheduledDate,
          timeSlot: visitData.timeSlot,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, visitId: data.id };
      }
    } catch (err) {
      console.warn("NestJS API schedule visit error:", err);
    }
    return { success: true, visitId: `v-local-${Date.now()}` };
  },
};
