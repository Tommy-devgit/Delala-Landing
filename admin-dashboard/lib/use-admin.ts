"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { AdminSessionUser, ApiError, adminSession } from "./admin-api";

type Session = { user: AdminSessionUser; token: string } | null;

const subscribe = (onChange: () => void) => {
  window.addEventListener("delala_admin_auth", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("delala_admin_auth", onChange);
    window.removeEventListener("storage", onChange);
  };
};

// Cached against the raw stored values: adminSession.get() parses JSON and
// returns a new object each call, which would re-render forever otherwise.
let cachedKey: string | null = null;
let cachedSession: Session = null;

const getSnapshot = (): Session => {
  const key = `${localStorage.getItem("delala_admin_token") ?? ""}|${localStorage.getItem("delala_admin_user") ?? ""}`;
  if (key !== cachedKey) {
    cachedKey = key;
    cachedSession = adminSession.get();
  }
  return cachedSession;
};

export const useAdminSession = (): Session =>
  useSyncExternalStore(subscribe, getSnapshot, () => null);

interface Resource<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

/**
 * Loads data from the admin API with loading and error states, and a reload
 * hook so mutations can refresh the view they came from.
 */
export function useResource<T>(load: () => Promise<T>, deps: unknown[] = []): Resource<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  // `load` is typically an inline arrow, so it is intentionally not a dependency;
  // callers declare what it actually depends on via `deps`.
  const run = useCallback(load, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    run()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError || err instanceof Error ? err.message : "Something went wrong.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [run, nonce]);

  return { data, loading, error, reload: () => setNonce((n) => n + 1) };
}
