"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Lock, Search } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { Property } from "@/lib/types";
import { useSession } from "@/lib/use-session";
import { useFavorites } from "@/lib/use-favorites";
import { PropertyCard } from "@/components/property-card";
import { Skeleton, buttonClasses } from "@/components/ui";

export default function FavoritesPage() {
  const session = useSession();
  const { isSaved } = useFavorites();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nonce, setNonce] = useState(0);
  const reload = useCallback(() => setNonce((n) => n + 1), []);
  const userId = session?.user?.id ?? null;

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!userId) {
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        const data = await apiClient.getFavorites();
        if (!cancelled) {
          setProperties(data);
          setRemoved(new Set());
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "We couldn't load your saved homes.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId, nonce]);

  /**
   * The server's list is the source of truth for this page.
   *
   * It used to render `properties.filter((p) => isSaved(p.id))`, where
   * `isSaved` reads the separate id set that `useFavorites` loads. That set is
   * empty until its own request lands and stays empty if that request fails, so
   * a page that had successfully loaded the saved homes would still show "No
   * saved homes yet" — the data was fetched and then filtered away by an
   * unrelated request's failure.
   *
   * Unsaving from a card still needs the tile to disappear immediately, so that
   * one case is tracked here rather than inferred from the id set.
   */
  const [removed, setRemoved] = useState<Set<string>>(new Set());
  const visible = properties.filter((p) => !removed.has(p.id));

  const handleToggleFavorite = useCallback(
    (propertyId: string) => {
      // The card has already toggled by the time this fires; re-saving a home
      // that is still on screen should put it back.
      setRemoved((prev) => {
        const next = new Set(prev);
        if (isSaved(propertyId)) next.delete(propertyId);
        else next.add(propertyId);
        return next;
      });
    },
    [isSaved]
  );

  if (!session?.user) {
    return (
      <div className="bg-canvas min-h-screen">
        <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" aria-hidden="true" />
          </div>
          <h1 className="font-serif-display text-2xl text-ink">Sign in to see your saved homes</h1>
          <p className="text-micro text-muted leading-relaxed">
            Saving a home keeps it on your account, so it is there on any device you sign in from.
          </p>
          <Link href="/auth/signin?callbackUrl=/favorites" className={buttonClasses({ size: "lg" })}>
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-canvas min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-5 border-b border-line">
          <div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">Saved homes</h1>
            <p className="text-micro text-muted mt-1">
              {loading
                ? "Loading your list…"
                : `${visible.length} ${visible.length === 1 ? "home" : "homes"} saved to your account`}
            </p>
          </div>
          <Link href="/search" className={buttonClasses({ variant: "secondary", size: "md" })}>
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>Browse homes</span>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-72" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-panel border border-rose-200 bg-rose-50 p-6 text-center space-y-3">
            <p className="text-sm font-semibold text-rose-700">We couldn&rsquo;t load your saved homes.</p>
            <p className="text-micro text-rose-700/80">{error}</p>
            <button type="button" onClick={reload} className={buttonClasses({ size: "md" })}>
              Try again
            </button>
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-panel border border-line bg-surface py-16 px-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Heart className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 className="font-serif-display text-xl text-ink">No saved homes yet</h2>
            <p className="text-micro text-muted max-w-sm mx-auto leading-relaxed">
              Tap the heart on any listing and it will be kept here for you.
            </p>
            <Link href="/search" className={buttonClasses({ size: "md" })}>
              Start exploring
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {visible.map((property) => (
              <PropertyCard key={property.id} property={property} onToggleFavorite={handleToggleFavorite} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
