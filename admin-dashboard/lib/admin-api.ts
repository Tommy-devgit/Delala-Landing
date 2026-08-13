/**
 * The dashboard's only route to data.
 *
 * There was previously no API layer at all — every screen read from a mock
 * module, so nothing it displayed or did was real.
 */

const normalizeApiUrl = (url?: string): string => {
  if (!url) return "http://localhost:4000/api/v1";
  let cleaned = url.trim();
  if (cleaned.includes("localhost")) return cleaned.replace(/\/+$/, "");
  cleaned = cleaned.replace(/^(https?:?\/*)+/i, "").replace(/\/+/g, "/");
  if (!cleaned.includes("api/v1")) cleaned = `${cleaned}/api/v1`.replace(/\/+/g, "/");
  return `https://${cleaned}`.replace(/\/+$/, "");
};

export const API_BASE = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);

const TOKEN_KEY = "delala_admin_token";
const USER_KEY = "delala_admin_user";

export interface AdminSessionUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  avatarUrl: string | null;
}

export const adminSession = {
  get(): { user: AdminSessionUser; token: string } | null {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem(TOKEN_KEY);
    const raw = localStorage.getItem(USER_KEY);
    if (!token || !raw) return null;
    try {
      return { token, user: JSON.parse(raw) as AdminSessionUser };
    } catch {
      return null;
    }
  },
  set(token: string, user: AdminSessionUser) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("delala_admin_auth"));
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("delala_admin_auth"));
  },
};

/** Thrown so callers can tell "signed out" apart from "not allowed". */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = adminSession.get()?.token;

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
  });

  if (res.status === 401) {
    adminSession.clear();
    throw new ApiError("Your session has expired. Please sign in again.", 401);
  }
  if (res.status === 403) {
    throw new ApiError("This account does not have administrator access.", 403);
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    // NestJS returns `message` as a string, or an array when validation fails.
    const payload = data as { message?: string | string[] } | null;
    const raw = payload?.message;
    const message = Array.isArray(raw) ? raw.join(", ") : raw || `Request failed (${res.status}).`;
    throw new ApiError(message, res.status);
  }
  return data as T;
}

/* ----------------------------- response shapes ---------------------------- */

export interface Overview {
  metrics: {
    totalUsers: number;
    activeListings: number;
    pendingApprovals: number;
    rejectedListings: number;
    verifiedBrokers: number;
    pendingReports: number;
    totalVisitsThisMonth: number;
    averageRentETB: number;
  };
  trends: {
    usersThisWeek: number;
    usersChangePercent: number | null;
    listingsThisWeek: number;
    listingsChangePercent: number | null;
  };
  timestamp: string;
}

export interface Analytics {
  rangeDays: number;
  series: { date: string; listings: number; users: number; visits: number }[];
  byCity: { name: string; count: number; averageRentETB: number }[];
  byPropertyType: { name: string; count: number; averageRentETB: number }[];
  byStatus: { name: string; count: number }[];
}

export interface AdminProperty {
  id: string;
  slug: string;
  title: string;
  propertyType: string;
  rentETB: number;
  city: string;
  subCity: string;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  status: "APPROVED" | "PENDING_APPROVAL" | "REJECTED";
  heroImage: string | null;
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  submittedAt: string;
}

/** owner | broker | agency. What the account is on the marketplace. */
export type PosterType = "owner" | "broker" | "agency";

/**
 * Which checks this account has passed.
 *
 * All three default to false and this dashboard is the only thing that can
 * change them. Nothing grants a badge automatically, by design: a badge that
 * software awards itself is not evidence of anything.
 */
export interface AdminVerification {
  phone: boolean;
  identity: boolean;
  business: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  phone: string;
  avatarUrl: string | null;
  posterType: PosterType | null;
  verification: AdminVerification;
  listingCount: number;
  joinedAt: string;
}

export interface AdminUserChanges {
  role?: string;
  status?: string;
  posterType?: PosterType;
  phoneVerified?: boolean;
  identityVerified?: boolean;
  businessVerified?: boolean;
}

export interface AdminReport {
  id: string;
  reporterName: string;
  propertyId: string | null;
  targetTitle: string;
  reason: string;
  status: string;
  reportedAt: string;
}

export interface AdminVisit {
  id: string;
  seekerName: string;
  propertyTitle: string;
  propertyId: string | null;
  visitDate: string | null;
  status: string;
  requestedAt: string;
}

export interface AdminLocation {
  id: string;
  name: string;
  type: string;
  parentName: string | null;
  latitude: number | null;
  longitude: number | null;
  listingCount: number;
  averageRentETB: number;
}

export interface AuditEntry {
  id: string;
  action: string;
  tableName: string | null;
  recordId: string | null;
  actorName: string;
  createdAt: string;
}

/* --------------------------------- client -------------------------------- */

export const adminApi = {
  /** Signs in through the shared auth endpoint, then rejects non-staff. */
  async signIn(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new ApiError(data?.message || "Those credentials were not accepted.", res.status);
    }

    const role = String(data?.user?.role || "user").toUpperCase();
    if (role !== "ADMIN" && role !== "MODERATOR") {
      throw new ApiError("This account does not have administrator access.", 403);
    }

    adminSession.set(data.token, {
      id: data.user.id,
      email: data.user.email,
      fullName: data.user.fullName || data.user.email,
      role,
      avatarUrl: data.user.avatarUrl || null,
    });
    return data.user;
  },

  getOverview: () => request<Overview>("/admin/overview"),
  getAnalytics: (days = 30) => request<Analytics>(`/admin/analytics?days=${days}`),

  getProperties: (status?: string, search?: string) => {
    const q = new URLSearchParams();
    if (status && status !== "ALL") q.set("status", status === "PENDING_APPROVAL" ? "pending" : status);
    if (search) q.set("search", search);
    return request<AdminProperty[]>(`/admin/properties?${q}`);
  },

  moderateProperty: (id: string, status: "APPROVED" | "REJECTED", rejectionReason?: string) =>
    request(`/properties/${id}/moderate`, {
      method: "PATCH",
      body: JSON.stringify({ status, rejectionReason }),
    }),

  getUsers: (search?: string) =>
    request<AdminUser[]>(`/admin/users${search ? `?search=${encodeURIComponent(search)}` : ""}`),

  updateUser: (id: string, changes: AdminUserChanges) =>
    request<AdminUser>(`/admin/users/${id}`, { method: "PATCH", body: JSON.stringify(changes) }),

  /**
   * Sets a user's password directly.
   *
   * The only working recovery path: Delala has no mailer, and it does not use
   * Supabase Auth, so no recovery email is ever sent by anything. An admin sets
   * the password and passes it on out of band.
   */
  setUserPassword: (id: string, password: string) =>
    request(`/admin/users/${id}/password`, {
      method: "PATCH",
      body: JSON.stringify({ password }),
    }),

  getReports: () => request<AdminReport[]>("/admin/reports"),
  resolveReport: (id: string, status: "RESOLVED" | "DISMISSED") =>
    request(`/admin/reports/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),

  getVisits: () => request<AdminVisit[]>("/admin/visits"),
  getLocations: (type: "city" | "sub_city" | "neighborhood") =>
    request<AdminLocation[]>(`/admin/locations?type=${type}`),
  getAuditLogs: () => request<AuditEntry[]>("/admin/audit-logs"),
};

/* --------------------------------- helpers -------------------------------- */

export const formatETB = (value: number): string =>
  value > 0 ? `ETB ${value.toLocaleString()}` : "—";

export const formatDate = (iso: string | null | undefined): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};
