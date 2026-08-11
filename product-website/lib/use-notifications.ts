"use client";

import { useEffect, useState } from "react";
import { apiClient } from "./api-client";
import { useSession } from "./use-session";

/**
 * Unread notification count for the navbar badge.
 *
 * Refreshed on sign-in and whenever the notifications page marks something
 * read, rather than polling.
 */
export function useUnreadNotifications(): number {
  const session = useSession();
  const userId = session?.user?.id ?? null;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;
    const refresh = () => {
      apiClient
        .getUnreadNotificationCount()
        .then((n) => {
          if (!cancelled) setCount(n);
        })
        .catch(() => {
          // A missing badge is preferable to a broken navbar.
        });
    };

    refresh();
    window.addEventListener("delala_notifications_change", refresh);
    return () => {
      cancelled = true;
      window.removeEventListener("delala_notifications_change", refresh);
    };
  }, [userId]);

  // Derived rather than reset in the effect, so signing out cannot leave a
  // stale badge behind and no state is written during the effect body.
  return userId ? count : 0;
}
