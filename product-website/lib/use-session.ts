"use client";

import { useSyncExternalStore } from "react";
import { authClient, UserSession } from "./auth-client";

export type Session = { user: UserSession; token: string } | null;

const AUTH_EVENT = "delala_auth_change";

const subscribe = (onChange: () => void) => {
  window.addEventListener(AUTH_EVENT, onChange);
  // Keeps other tabs in sync when they sign in or out.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(AUTH_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
};

// `authClient.getSession()` parses JSON and returns a fresh object every call,
// which would make useSyncExternalStore re-render forever. Cache it and only
// rebuild when the underlying storage values actually change.
let cachedKey: string | null = null;
let cachedSession: Session = null;

const getSnapshot = (): Session => {
  const key = `${localStorage.getItem("delala_token") ?? ""}|${localStorage.getItem("delala_user") ?? ""}`;
  if (key !== cachedKey) {
    cachedKey = key;
    cachedSession = authClient.getSession();
  }
  return cachedSession;
};

// There is no session during SSR; the client swaps in the real one on hydration.
const getServerSnapshot = (): Session => null;

/**
 * Subscribes to the signed-in session. Replaces the
 * `useEffect(() => setSession(...))` + manual listener pattern that was repeated
 * across pages — one of which never removed its listener.
 */
export const useSession = (): Session =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
