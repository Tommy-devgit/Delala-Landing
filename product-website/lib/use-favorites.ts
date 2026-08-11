"use client";

import { useCallback, useEffect, useState } from "react";
import { apiClient } from "./api-client";
import { useSession } from "./use-session";

/**
 * Saved-property state, shared across the app.
 *
 * The favourites page used to initialise its list to `[]` and never call the
 * API, so it could not show anything, and the card heart was local `useState`
 * that was forgotten on navigation. This keeps one set of ids in a module-level
 * store so every heart on the page agrees, and persists through the API.
 */
let savedIds = new Set<string>();
let loadedFor: string | null = null;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export function useFavorites() {
  const session = useSession();
  const userId = session?.user?.id ?? null;

  const [, forceRender] = useState(0);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const listener = () => forceRender((n) => n + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Load once per signed-in user; clear entirely on sign-out.
  useEffect(() => {
    if (!userId) {
      savedIds = new Set();
      loadedFor = null;
      emit();
      return;
    }
    if (loadedFor === userId) return;

    let cancelled = false;
    loadedFor = userId;
    apiClient
      .getFavoriteIds()
      .then((ids) => {
        if (cancelled) return;
        savedIds = new Set(ids);
        emit();
      })
      .catch(() => {
        // A failed load must not make saved homes look unsaved forever, so allow
        // a later attempt.
        if (!cancelled) loadedFor = null;
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const isSaved = useCallback((propertyId: string) => savedIds.has(propertyId), []);

  /** Returns false when the visitor needs to sign in first. */
  const toggle = useCallback(
    async (propertyId: string): Promise<boolean> => {
      if (!userId) return false;

      setError("");
      setPendingId(propertyId);

      // Optimistic, then reconciled with whatever the server reports.
      const wasSaved = savedIds.has(propertyId);
      if (wasSaved) savedIds.delete(propertyId);
      else savedIds.add(propertyId);
      emit();

      try {
        const nowSaved = await apiClient.toggleFavorite(propertyId);
        if (nowSaved) savedIds.add(propertyId);
        else savedIds.delete(propertyId);
      } catch (err) {
        if (wasSaved) savedIds.add(propertyId);
        else savedIds.delete(propertyId);
        setError(err instanceof Error ? err.message : "Could not update your saved homes.");
      } finally {
        emit();
        setPendingId(null);
      }
      return true;
    },
    [userId]
  );

  return {
    isSaved,
    toggle,
    pendingId,
    error,
    signedIn: Boolean(userId),
    count: savedIds.size,
  };
}
