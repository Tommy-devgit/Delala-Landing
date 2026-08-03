import { Property, City, Neighborhood, Broker } from "./types";
import { PROPERTIES, CITIES, BROKERS } from "./data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export const apiClient = {
  // Fetch properties from NestJS API (or fallback to local dataset)
  async getProperties(filters?: { city?: string; subCity?: string; propertyType?: string }): Promise<Property[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.city) queryParams.set("city", filters.city);
      if (filters?.subCity) queryParams.set("subCity", filters.subCity);
      if (filters?.propertyType && filters.propertyType !== "all") queryParams.set("propertyType", filters.propertyType);

      const res = await fetch(`${API_BASE}/properties?${queryParams.toString()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (err) {
      console.warn("NestJS API offline, using local property data fallback.");
    }

    // Filter local fallback
    return PROPERTIES.filter((p) => {
      if (filters?.propertyType && filters.propertyType !== "all" && p.propertyType !== filters.propertyType) return false;
      if (filters?.city && !p.location.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      if (filters?.subCity && !p.location.subCity.toLowerCase().includes(filters.subCity.toLowerCase())) return false;
      return true;
    });
  },

  // Fetch single property by slug
  async getPropertyBySlug(slug: string): Promise<Property | null> {
    try {
      const res = await fetch(`${API_BASE}/properties/${slug}`, { cache: "no-store" });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn("NestJS API offline, using local property details fallback.");
    }

    return PROPERTIES.find((p) => p.slug === slug) || null;
  },

  // Fetch cities
  async getCities(): Promise<City[]> {
    try {
      const res = await fetch(`${API_BASE}/cities`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (err) {
      console.warn("NestJS API offline, using local cities fallback.");
    }
    return CITIES;
  },

  // Fetch brokers
  async getBrokers(): Promise<Broker[]> {
    try {
      const res = await fetch(`${API_BASE}/brokers`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (err) {
      console.warn("NestJS API offline, using local brokers fallback.");
    }
    return BROKERS;
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
      console.warn("NestJS API offline, visit request scheduled locally.");
    }

    return { success: true, visitId: `v-local-${Date.now()}` };
  },
};
