"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * A small list persisted in `localStorage`, shared across every component that
 * reads it.
 *
 * Compare, recently viewed and saved searches are all per-device preferences
 * with no backend behind them, and §13 of the brief explicitly asks that
 * recently-viewed not introduce tracking. Keeping them in the browser means
 * Delala never learns what anybody looked at — the data never leaves the device
 * and there is nothing to correlate server-side.
 *
 * A module-level registry keeps every mounted hook for the same key in sync, so
 * removing a property on the compare page updates the header count immediately
 * rather than on the next navigation.
 */
type Listener = () => void;

const caches = new Map<string, unknown[]>();
const listeners = new Map<string, Set<Listener>>();

const read = <T,>(key: string): T[] => {
  if (typeof window === "undefined") return [];
  if (caches.has(key)) return caches.get(key) as T[];

  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    const value = Array.isArray(parsed) ? parsed : [];
    caches.set(key, value);
    return value as T[];
  } catch {
    // Corrupt storage is not worth crashing a page over.
    caches.set(key, []);
    return [];
  }
};

const write = <T,>(key: string, value: T[]) => {
  caches.set(key, value);
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota or private mode. The in-memory copy still works for this session.
  }
  listeners.get(key)?.forEach((l) => l());
};

export interface LocalCollection<T> {
  items: T[];
  /** False until the first client render, so SSR and hydration agree. */
  ready: boolean;
  add: (item: T) => void;
  remove: (predicate: (item: T) => boolean) => void;
  clear: () => void;
  has: (predicate: (item: T) => boolean) => boolean;
}

export function useLocalCollection<T>(
  key: string,
  options: { limit?: number; dedupeBy?: (item: T) => string } = {}
): LocalCollection<T> {
  const { limit, dedupeBy } = options;

  // Always starts empty. Reading localStorage during the first render would
  // produce markup the server never generated, which React rejects as a
  // hydration mismatch.
  const [items, setItems] = useState<T[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const sync = () => {
      if (!cancelled) setItems(read<T>(key));
    };

    // Deferred so the first write is not synchronous within the effect body —
    // `react-hooks/set-state-in-effect`. See §6 of HANDOUT.md.
    void Promise.resolve().then(() => {
      if (cancelled) return;
      sync();
      setReady(true);
    });

    const set = listeners.get(key) ?? new Set<Listener>();
    set.add(sync);
    listeners.set(key, set);

    // Another tab writing the same key.
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        caches.delete(key);
        sync();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      cancelled = true;
      set.delete(sync);
      window.removeEventListener("storage", onStorage);
    };
  }, [key]);

  const add = useCallback(
    (item: T) => {
      const current = read<T>(key);
      // Newest first, and re-adding something moves it back to the front rather
      // than duplicating it — which is what "recently viewed" means.
      const withoutDuplicate = dedupeBy
        ? current.filter((existing) => dedupeBy(existing) !== dedupeBy(item))
        : current;
      const next = [item, ...withoutDuplicate];
      write(key, limit ? next.slice(0, limit) : next);
    },
    [key, limit, dedupeBy]
  );

  const remove = useCallback(
    (predicate: (item: T) => boolean) => {
      write(
        key,
        read<T>(key).filter((item) => !predicate(item))
      );
    },
    [key]
  );

  const clear = useCallback(() => write(key, []), [key]);

  const has = useCallback((predicate: (item: T) => boolean) => items.some(predicate), [items]);

  return { items, ready, add, remove, clear, has };
}

/* ----------------------------- the collections ---------------------------- */

export const COMPARE_KEY = "delala_compare";
export const RECENT_KEY = "delala_recently_viewed";
export const SAVED_SEARCH_KEY = "delala_saved_searches";

/** Comparing more than four properties side by side stops being readable. */
export const COMPARE_LIMIT = 4;

export interface SavedSearch {
  id: string;
  name: string;
  /** The query string, exactly as Explore would build it. */
  query: string;
  createdAt: string;
}
