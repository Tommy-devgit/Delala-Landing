import { Property, City, Broker, LocationNode, PropertyType, ListingType, PosterType, PosterVerification } from "./types";
import { toCoordinates } from "./map";
import { clearStoredSession } from "./auth-client";

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
  posterType?: PosterType | null;
  verification?: { phone?: boolean; identity?: boolean; business?: boolean };
  user?: { profile?: { fullName?: string; avatarUrl?: string | null } };
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
  listingType?: string;
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
  generator?: boolean | null;
  waterTank?: boolean | null;
  parking?: boolean | null;
  furnished?: boolean | null;
  securityGuard?: boolean | null;
  balcony?: boolean | null;
  internet?: boolean | null;
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
    propertyType: p.propertyType ?? null,
    listingType: p.listingType === "sale" ? "sale" : "rent",
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
    // Null rather than a stock photograph. A placeholder here made every
    // listing without pictures look photographed, and put the same two rooms
    // across the whole marketplace.
    heroImage: p.images?.find((img) => img.isHero)?.url || p.images?.[0]?.url || null,
    galleryImages: p.images?.map((img) => img.url).filter((url): url is string => Boolean(url)) ?? [],
    approved: p.status === "APPROVED",
    // Passed through, including null. `Boolean(null)` would turn "not asked"
    // into a definite no.
    generator: p.generator ?? null,
    waterTank: p.waterTank ?? null,
    parking: p.parking ?? null,
    furnished: p.furnished ?? null,
    securityGuard: p.securityGuard ?? null,
    balcony: p.balcony ?? null,
    internet: p.internet ?? null,
    phone: propertyPhone,
    broker: {
      id: p.broker?.id || "",
      slug: p.broker?.slug || "",
      name: p.broker?.user?.profile?.fullName || p.broker?.agencyName || "Delala poster",
      avatar: p.broker?.user?.profile?.avatarUrl || "",
      agencyName: p.broker?.agencyName || "",
      phone: propertyPhone,
      posterType: p.broker?.posterType ?? null,
      // Absent verification is unverified. This block used to be
      // `verified: true` with a 4.9 rating and "Under 15 minutes" response
      // time, invented client-side on top of the API inventing them too.
      verification: {
        phone: Boolean(p.broker?.verification?.phone),
        identity: Boolean(p.broker?.verification?.identity),
        business: Boolean(p.broker?.verification?.business),
      },
    },
    latitude: coordinates?.latitude ?? null,
    longitude: coordinates?.longitude ?? null,
    description: p.description,
    createdAt: p.createdAt ?? null,
  };
};

/** Everything `GET /properties` understands. All of it is optional. */
export interface PropertySearchQuery {
  city?: string;
  subCity?: string;
  neighborhood?: string;
  locationId?: string;
  propertyType?: string;
  listingType?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  /** Free text across title, description, address and location names. */
  q?: string;
  sort?: PropertySort;
  page?: number;
  pageSize?: number;
  verifiedOnly?: boolean;
  status?: string;
  ownerId?: string;
  generator?: boolean;
  waterTank?: boolean;
  parking?: boolean;
  furnished?: boolean;
  securityGuard?: boolean;
  balcony?: boolean;
  internet?: boolean;
}

export type PropertySort = "newest" | "oldest" | "price-asc" | "price-desc";

export interface PropertyPage {
  data: Property[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const VISIT_STATUSES = ["requested", "accepted", "declined", "completed", "cancelled"] as const;
export type VisitStatus = (typeof VISIT_STATUSES)[number];

export interface Visit {
  id: string;
  status: VisitStatus;
  visitDate: string | null;
  createdAt: string | null;
  property: { id: string; title: string; ownerId: string } | null;
  /** Which side of the request the signed-in user is on. */
  role: "owner" | "requester";
  requester: { id: string | null; name: string; phone: string | null };
}

export interface FacetCount {
  value: string;
  label?: string;
  count: number;
}

/** Aggregates over what is genuinely in the marketplace right now. */
export interface PropertyFacets {
  total: number;
  propertyTypes: FacetCount[];
  listingTypes: FacetCount[];
  cities: { id: string; name: string; count: number }[];
}

export interface VerifiedPoster {
  id: string;
  fullName: string;
  posterType: PosterType | null;
  avatarUrl: string | null;
  bio: string;
  verification: PosterVerification;
  activeListingCount: number;
}

/** One review, as rendered on a property or a poster profile. */
export interface Review {
  id: string;
  rating: number | null;
  comment: string;
  createdAt: string | null;
  property?: { id: string; title: string };
  author: { id: string | null; name: string; avatarUrl: string | null };
}

export interface ReviewSummary {
  /** null when nobody has reviewed yet — never 0. */
  average: number | null;
  count: number;
  data: Review[];
}

export const REPORT_REASONS = [
  { value: "scam", label: "It looks like a scam" },
  { value: "incorrect_information", label: "The information is wrong" },
  { value: "duplicate_listing", label: "It is a duplicate listing" },
  { value: "inappropriate_content", label: "The content is inappropriate" },
  { value: "fake_property", label: "The property does not exist" },
  { value: "suspicious_behaviour", label: "The poster is behaving suspiciously" },
  { value: "other", label: "Something else" },
] as const;

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
  furnished: boolean;
  securityGuard: boolean;
  balcony: boolean;
  internet: boolean;
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

/** Thrown when the server rejects the stored session. */
export const SESSION_ENDED_MESSAGE = "Your session has ended. Please sign in again.";

/**
 * `fetch` for calls that carry the session, with one behaviour every call site
 * needs and none of them had: a 401 means the stored token is dead, so it is
 * discarded and the app is told it is signed out.
 *
 * Every authenticated request previously treated 401 as an ordinary failure.
 * The token stayed in localStorage, `useSession` kept reporting a signed-in
 * user, and the navbar, favourites and notifications all kept firing requests
 * that could never succeed — an unrecoverable state visible only as a wall of
 * 401s in the console. Two things produce it routinely: a session older than
 * thirty days, and any token issued before session tokens were signed.
 */
const authedFetch = async (input: string, init: RequestInit = {}): Promise<Response> => {
  const res = await fetch(input, {
    ...init,
    headers: { ...(init.headers || {}), ...authHeaders() },
  });

  if (res.status === 401) {
    clearStoredSession();
    throw new Error(SESSION_ENDED_MESSAGE);
  }

  return res;
};

/** Public profile of a property poster. Never includes the email address. */
export interface PublicProfile {
  id: string;
  fullName: string;
  role: string;
  posterType: PosterType | null;
  avatarUrl: string | null;
  bio: string;
  phone: string | null;
  verification: PosterVerification;
  listingCount: number;
  activeListingCount: number;
  /** null when nobody has reviewed this poster's properties yet. */
  rating: number | null;
  reviewCount: number;
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
  /**
   * The marketplace query. Filtering, sorting and paging happen server-side.
   *
   * Throws when the request fails. It used to catch everything and return an
   * empty array, which rendered a network outage as "no properties match your
   * search" — indistinguishable from a genuinely empty result, and impossible
   * to offer a retry for.
   */
  async searchProperties(query: PropertySearchQuery = {}): Promise<PropertyPage> {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === "" || value === false) continue;
      if (key === "propertyType" && value === "all") continue;
      params.set(key, String(value));
    }

    const res = await fetch(`${API_BASE}/properties?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Could not load properties (${res.status}).`);
    }

    const payload = await res.json();

    // The API used to return a bare array and now returns a page object. Both
    // are accepted so a stale deployment of either side keeps working.
    if (Array.isArray(payload)) {
      const data = payload.map(mapProperty);
      return { data, total: data.length, page: 1, pageSize: data.length, totalPages: 1 };
    }

    const data = Array.isArray(payload?.data) ? payload.data.map(mapProperty) : [];
    return {
      data,
      total: Number(payload?.total ?? data.length),
      page: Number(payload?.page ?? 1),
      pageSize: Number(payload?.pageSize ?? data.length),
      totalPages: Number(payload?.totalPages ?? 1),
    };
  },

  /** Convenience wrapper for callers that only want the rows. Also throws. */
  async getProperties(filters?: PropertySearchQuery): Promise<Property[]> {
    const page = await apiClient.searchProperties(filters);
    return page.data;
  },

  /**
   * One property. Returns null only for a genuine 404; anything else throws so
   * the page can tell "this listing does not exist" apart from "the API is
   * down" and offer a retry for the second.
   */
  async getPropertyBySlug(slug: string): Promise<Property | null> {
    const res = await fetch(`${API_BASE}/properties/${slug}`, { cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Could not load this property (${res.status}).`);
    return mapProperty(await res.json());
  },

  /** Real counts behind the discovery sections. Never guessed client-side. */
  async getFacets(): Promise<PropertyFacets> {
    const res = await fetch(`${API_BASE}/properties/facets`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Could not load the marketplace summary (${res.status}).`);

    const payload = await res.json();
    return {
      total: Number(payload?.total ?? 0),
      propertyTypes: Array.isArray(payload?.propertyTypes) ? payload.propertyTypes : [],
      listingTypes: Array.isArray(payload?.listingTypes) ? payload.listingTypes : [],
      cities: Array.isArray(payload?.cities) ? payload.cities : [],
    };
  },

  /**
   * Posters with at least one verification check passed. Empty until somebody
   * genuinely is — the section that renders this hides itself rather than
   * padding the page with unverified accounts.
   */
  async getVerifiedPosters(): Promise<VerifiedPoster[]> {
    const res = await fetch(`${API_BASE}/users/verified-posters`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Could not load posters (${res.status}).`);
    const payload = await res.json();
    return Array.isArray(payload) ? payload : [];
  },

  /** Reviews for one property, or across everything a poster has listed. */
  async getReviews(target: { propertyId?: string; posterId?: string }): Promise<ReviewSummary> {
    const params = new URLSearchParams();
    if (target.propertyId) params.set("propertyId", target.propertyId);
    if (target.posterId) params.set("posterId", target.posterId);

    const res = await fetch(`${API_BASE}/reviews?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Could not load reviews (${res.status}).`);

    const payload = await res.json();
    return {
      average: payload?.average ?? null,
      count: Number(payload?.count ?? 0),
      data: Array.isArray(payload?.data) ? payload.data : [],
    };
  },

  async createReview(input: { propertyId: string; rating: number; comment?: string }): Promise<Review> {
    const res = await authedFetch(`${API_BASE}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(
        Array.isArray(payload?.message) ? payload.message.join(", ") : payload?.message || "Could not post that review."
      );
    }
    return payload;
  },

  async reportProperty(input: { propertyId: string; reason: string; details?: string }): Promise<void> {
    const res = await authedFetch(`${API_BASE}/reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      throw new Error(
        Array.isArray(payload?.message) ? payload.message.join(", ") : payload?.message || "Could not send that report."
      );
    }
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
    // All seven, so an answer the poster actually gave is not dropped between
    // the form and the request. Only the first three were serialized before.
    for (const key of ["generator", "waterTank", "parking", "furnished", "securityGuard", "balcony", "internet"] as const) {
      formData.append(key, String(input[key]));
    }
    if (input.brokerId) formData.append("brokerId", input.brokerId);

    // Only send a pin when it is a genuine coordinate pair.
    const pin = toCoordinates(input.latitude, input.longitude);
    if (pin) {
      formData.append("latitude", String(pin.latitude));
      formData.append("longitude", String(pin.longitude));
    }

    (input.images || []).forEach((file) => formData.append("images", file));

    // Through the same handler as everything else, so publishing with a dead
    // session signs the user out and says so, rather than failing with a raw
    // 401 after they have filled in the whole form and uploaded photographs.
    const res = await authedFetch(`${API_BASE}/properties`, {
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
    const res = await authedFetch(`${API_BASE}/favorites/ids`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Could not load your saved homes.");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  },

  async getFavorites(): Promise<Property[]> {
    // The API resolves the wishlist from the session; the path segment is
    // retained only because the route shape predates that.
    const res = await authedFetch(`${API_BASE}/favorites/user/me`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Could not load your saved homes.");
    const data = await res.json();
    return Array.isArray(data) ? data.map(mapProperty) : [];
  },

  /** Returns the new saved state so the caller can reconcile optimistic UI. */
  async toggleFavorite(propertyId: string): Promise<boolean> {
    const res = await authedFetch(`${API_BASE}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId }),
    });
    if (!res.ok) throw new Error("Could not update your saved homes.");
    const data = await res.json();
    return Boolean(data?.saved);
  },

  /* ------------------------------ notifications ---------------------------- */

  async getNotifications(): Promise<AppNotification[]> {
    const res = await authedFetch(`${API_BASE}/notifications`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Could not load your notifications.");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  },

  async getUnreadNotificationCount(): Promise<number> {
    const res = await authedFetch(`${API_BASE}/notifications/unread-count`, {
      cache: "no-store",
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return Number(data?.count) || 0;
  },

  // Both of these ignored the response entirely, so a failed write left the row
  // unread on the server while the page showed it as read — and the navbar
  // badge reappeared on the next load with no explanation.
  async markNotificationRead(id: string): Promise<void> {
    const res = await authedFetch(`${API_BASE}/notifications/${id}/read`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Could not mark that as read.");
  },

  async markAllNotificationsRead(): Promise<void> {
    const res = await authedFetch(`${API_BASE}/notifications/read-all`, {
      method: "PATCH",
    });
    if (!res.ok) throw new Error("Could not mark your notifications as read.");
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
  /**
   * Requests a viewing.
   *
   * This used to swallow every failure and return `{ success: true, visitId:
   * "v-local-<timestamp>" }`, so the modal showed a confirmation for a request
   * that had never reached the server — and when it did reach the server it
   * carried `seekerId: "guest-user"`, a string that is not a user, alongside a
   * date the API discarded. The requester now comes from the bearer token and
   * the failure is reported.
   */
  async scheduleVisit(input: { propertyId: string; visitDate: string }): Promise<{ visitId: string }> {
    const res = await authedFetch(`${API_BASE}/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(
        Array.isArray(payload?.message)
          ? payload.message.join(", ")
          : payload?.message || "Could not request that viewing."
      );
    }
    return { visitId: payload.id };
  },

  /** Viewings the caller requested, plus those booked on their own properties. */
  async getVisits(): Promise<Visit[]> {
    const res = await authedFetch(`${API_BASE}/visits`, { cache: "no-store" });
    if (!res.ok) throw new Error("Could not load your viewings.");
    const payload = await res.json();
    return Array.isArray(payload) ? payload : [];
  },

  async updateVisitStatus(visitId: string, status: VisitStatus): Promise<void> {
    const res = await authedFetch(`${API_BASE}/visits/${visitId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      throw new Error(payload?.message || "Could not update that viewing.");
    }
  },
};
