"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { authClient, UserSession } from "@/lib/auth-client";
import { AuthModal } from "@/components/auth-modal";
import { Property } from "@/lib/types";
import { PropertyCard } from "@/components/property-card";
import { Heart, Search, User } from "lucide-react";

export default function FavoritesPage() {
  const [session, setSession] = useState<{ user: UserSession; token: string } | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      const activeSession = authClient.getSession();
      setSession(activeSession);

      setLoading(true);
      const data = await apiClient.getProperties();
      setProperties(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const savedListings = properties.filter((p) => savedIds.includes(p.id));

  const handleToggle = (id: string) => {
    if (!session?.user || session.user.role === "GUEST") {
      setIsAuthModalOpen(true);
      return;
    }
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="font-mono-label text-[10px] text-[#4C061D] bg-white border border-[#ECE7DA] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>SAVED WISHLIST</span>
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl font-light text-[#4C061D] mb-3">
            Your Saved Properties
          </h1>

          <p className="text-base text-[#736F4E] font-medium">
            Keep track of physically verified Ethiopian residences, compare monthly Birr prices, and schedule walkthrough visits.
          </p>
        </div>

        {!session?.user ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#ECE7DA] p-8 max-w-xl mx-auto space-y-4 shadow-sm">
            <Heart className="w-12 h-12 text-[#4C061D] mx-auto opacity-70" />
            <h2 className="font-serif-display text-2xl font-light text-[#1c1b12]">
              Sign in to save properties
            </h2>
            <p className="text-xs text-[#736F4E]">
              Authenticate as a Home Seeker or Certified Broker to save listings across devices.
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold shadow-md hover:bg-[#3B0416] transition-colors"
            >
              Sign In / Choose Persona →
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-3xl bg-white border border-[#ECE7DA] animate-pulse" />
            ))}
          </div>
        ) : savedListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedListings.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={true}
                onToggleFavorite={handleToggle}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#ECE7DA] p-8 max-w-xl mx-auto">
            <Heart className="w-12 h-12 text-[#736F4E] mx-auto mb-4" />
            <h2 className="font-serif-display text-2xl font-light text-[#1c1b12] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-[#736F4E] mb-6">
              Browse homes in Addis Ababa, Hawassa, Adama, or Bahir Dar and click the heart icon to save listings.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4C061D] text-white font-mono-label text-xs font-bold shadow-md hover:bg-[#3B3923] transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Explore Marketplace →</span>
            </Link>
          </div>
        )}

      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(u) => setSession({ user: u, token: "active" })}
      />
    </div>
  );
}
