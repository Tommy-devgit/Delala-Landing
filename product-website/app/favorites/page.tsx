"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { authClient, UserSession } from "@/lib/auth-client";
import { Property } from "@/lib/types";
import { PropertyCard } from "@/components/property-card";
import { Heart, Search, Lock } from "lucide-react";
import { Skeleton, buttonClasses } from "@/components/ui";

export default function FavoritesPage() {
  const router = useRouter();
  const [session, setSession] = useState<{ user: UserSession; token: string } | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (!session?.user) {
      router.push("/auth/signin?callbackUrl=/favorites");
      return;
    }
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((item) => item !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  return (
    <div className="bg-canvas min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        <div className="max-w-3xl mb-6">
          <span className="font-mono-label text-label text-primary bg-surface border border-line px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>SAVED WISHLIST</span>
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl font-light text-primary mb-3">
            Your Saved Properties
          </h1>

          <p className="text-base text-muted font-medium">
            Keep track of physically verified Ethiopian residences, compare monthly Birr prices, and schedule walkthrough visits.
          </p>
        </div>

        {!session?.user ? (
          <div className="py-14 text-center bg-surface rounded-panel border border-line p-6 max-w-xl mx-auto space-y-4 shadow-sm">
            <Lock className="w-12 h-12 text-primary mx-auto opacity-70" />
            <h2 className="font-serif-display text-2xl font-light text-ink">
              Sign in to save properties
            </h2>
            <p className="text-xs text-muted">
              Sign in with your account to save listings across devices.
            </p>
            <Link
              href="/auth/signin?callbackUrl=/favorites"
              className={buttonClasses({ size: "lg" })}
            >
              Sign In →
            </Link>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-80 rounded-panel" />
            ))}
          </div>
        ) : savedListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
          <div className="py-14 text-center bg-surface rounded-panel border border-line p-6 max-w-xl mx-auto">
            <Heart className="w-12 h-12 text-muted mx-auto mb-4" />
            <h2 className="font-serif-display text-2xl font-light text-ink mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs text-muted mb-6">
              Browse homes in Addis Ababa, Hawassa, Adama, or Bahir Dar and click the heart icon to save listings.
            </p>
            <Link
              href="/search"
              className={buttonClasses({ size: "md" })}
            >
              <Search className="w-4 h-4" />
              <span>Explore Marketplace →</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
