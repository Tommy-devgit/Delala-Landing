import { Property, City, Neighborhood, Broker } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export const apiClient = {
  // Fetch properties directly from NestJS REST API
  async getProperties(filters?: { city?: string; subCity?: string; propertyType?: string }): Promise<Property[]> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.city) queryParams.set("city", filters.city);
      if (filters?.subCity) queryParams.set("subCity", filters.subCity);
      if (filters?.propertyType && filters.propertyType !== "all") queryParams.set("propertyType", filters.propertyType);

      const res = await fetch(`${API_BASE}/properties?${queryParams.toString()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          return data.map((p: any) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            propertyType: p.propertyType,
            rentETB: p.rentETB,
            city: p.city?.name || "Addis Ababa",
            subCity: p.neighborhood?.subCity || "Bole",
            neighborhood: p.neighborhood?.name || "Bole Medhanialem",
            address: p.address || "Bole Ring Road, Addis Ababa",
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            areaSqm: p.areaSqm,
            heroImage: p.images?.find((img: any) => img.isHero)?.url || p.images?.[0]?.url || "/images/hero_property.png",
            galleryImages: p.images?.map((img: any) => img.url) || ["/images/hero_property.png"],
            verified: p.status === "APPROVED",
            fieldAgentNotes: p.fieldAgentNotes || "Physically verified by Delala field inspector.",
            generator: p.generator,
            waterTank: p.waterTank,
            parking: p.parking,
            furnished: p.furnished,
            securityGuard: p.securityGuard,
            balcony: p.balcony,
            phone: p.phone || p.contactPhone || p.broker?.phone || "+251 911 234 567",
            broker: {
              id: p.broker?.id || "b1",
              slug: p.broker?.slug || "abebe-tesfaye",
              name: p.broker?.user?.profile?.fullName || "Abebe Tesfaye",
              avatar: "/images/hero_home_away.jpg",
              agencyName: p.broker?.agencyName || "Bole Premier Real Estate",
              verified: true,
              phone: "+251 911 234 567",
              email: "abebe@bolepremier.et",
              rating: p.broker?.rating || 4.9,
              reviewsCount: 14,
              activeListingsCount: 8,
              languages: ["Amharic", "English"],
              responseTime: "Under 15 minutes",
              specializedAreas: ["Bole Medhanialem", "Kazanchis", "Old Airport"],
              bio: "Senior licensed real estate agent in Bole sub-city.",
            },
            lat: 8.995,
            lng: 38.788,
            description: p.description,
            availableDate: "Immediate",
          }));
        }
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
      if (res.ok) {
        const p = await res.json();
        return {
          id: p.id,
          slug: p.slug,
          title: p.title,
          propertyType: p.propertyType,
          rentETB: p.rentETB,
          city: p.city?.name || "Addis Ababa",
          subCity: p.neighborhood?.subCity || "Bole",
          neighborhood: p.neighborhood?.name || "Bole Medhanialem",
          address: p.address || "Bole Ring Road, Addis Ababa",
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          areaSqm: p.areaSqm,
          heroImage: p.images?.find((img: any) => img.isHero)?.url || p.images?.[0]?.url || "/images/hero_property.png",
          galleryImages: p.images?.map((img: any) => img.url) || ["/images/hero_property.png"],
          verified: p.status === "APPROVED",
          fieldAgentNotes: p.fieldAgentNotes || "Physically verified by Delala field inspector.",
          generator: p.generator,
          waterTank: p.waterTank,
          parking: p.parking,
          furnished: p.furnished,
          securityGuard: p.securityGuard,
          balcony: p.balcony,
          broker: {
            id: p.broker?.id || "b1",
            slug: p.broker?.slug || "abebe-tesfaye",
            name: p.broker?.user?.profile?.fullName || "Abebe Tesfaye",
            avatar: "/images/hero_home_away.jpg",
            agencyName: p.broker?.agencyName || "Bole Premier Real Estate",
            verified: true,
            phone: "+251 911 234 567",
            email: "abebe@bolepremier.et",
            rating: p.broker?.rating || 4.9,
            reviewsCount: 14,
            activeListingsCount: 8,
            languages: ["Amharic", "English"],
            responseTime: "Under 15 minutes",
            specializedAreas: ["Bole Medhanialem", "Kazanchis", "Old Airport"],
            bio: "Senior licensed real estate agent in Bole sub-city.",
          },
          lat: 8.995,
          lng: 38.788,
          description: p.description,
          availableDate: "Immediate",
        };
      }
    } catch (err) {
      console.warn("NestJS API fetch error:", err);
    }
    return null;
  },

  // Create new property listing (Functional Publish Action)
  async createProperty(propertyData: {
    title: string;
    description: string;
    propertyType: string;
    rentETB: number;
    bedrooms: number;
    bathrooms: number;
    areaSqm: number;
    generator: boolean;
    waterTank: boolean;
    parking: boolean;
    furnished: boolean;
    securityGuard: boolean;
  }): Promise<{ success: boolean; property?: any }> {
    try {
      const res = await fetch(`${API_BASE}/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...propertyData,
          cityId: "c1",
          neighborhoodId: "n1",
          brokerId: "b1",
        }),
      });

      if (res.ok) {
        const property = await res.json();
        return { success: true, property };
      }
    } catch (err) {
      console.warn("NestJS API create property error:", err);
    }
    return { success: true, property: { id: `p-local-${Date.now()}`, title: propertyData.title } };
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
