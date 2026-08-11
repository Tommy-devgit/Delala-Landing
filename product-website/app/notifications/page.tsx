"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, CheckCircle2, Home, Lock, XCircle } from "lucide-react";
import { AppNotification, apiClient } from "@/lib/api-client";
import { useSession } from "@/lib/use-session";
import { formatPostedAt } from "@/lib/format";
import { Skeleton, buttonClasses } from "@/components/ui";

const ICONS: Record<string, { icon: React.ElementType; tone: string }> = {
  LISTING_APPROVED: { icon: CheckCircle2, tone: "text-emerald-600 bg-emerald-50" },
  LISTING_REJECTED: { icon: XCircle, tone: "text-rose-600 bg-rose-50" },
  VISIT_CONFIRMED: { icon: CheckCircle2, tone: "text-emerald-600 bg-emerald-50" },
  VISIT_REQUESTED: { icon: Home, tone: "text-primary bg-primary/10" },
};

export default function NotificationsPage() {
  const session = useSession();
  const [items, setItems] = useState<AppNotification[]>([]);
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
        const data = await apiClient.getNotifications();
        if (!cancelled) {
          setItems(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "We couldn't load your notifications.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId, nonce]);

  const markRead = async (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    await apiClient.markNotificationRead(id);
    window.dispatchEvent(new Event("delala_notifications_change"));
  };

  const markAllRead = async () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    await apiClient.markAllNotificationsRead();
    window.dispatchEvent(new Event("delala_notifications_change"));
  };

  const unread = items.filter((n) => !n.read).length;

  if (!session?.user) {
    return (
      <div className="bg-canvas min-h-screen">
        <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" aria-hidden="true" />
          </div>
          <h1 className="font-serif-display text-2xl text-ink">Sign in to see your notifications</h1>
          <p className="text-micro text-muted">
            We&rsquo;ll tell you when a listing is approved or someone asks to visit.
          </p>
          <Link href="/auth/signin?callbackUrl=/notifications" className={buttonClasses({ size: "lg" })}>
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-canvas min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex items-end justify-between gap-3 pb-4 mb-5 border-b border-line">
          <div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">Notifications</h1>
            <p className="text-micro text-muted mt-1">
              {loading ? "Loading…" : unread > 0 ? `${unread} unread` : "You're all caught up"}
            </p>
          </div>
          {unread > 0 && (
            <button type="button" onClick={markAllRead} className={buttonClasses({ variant: "secondary", size: "sm" })}>
              <CheckCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-panel border border-rose-200 bg-rose-50 p-6 text-center space-y-3">
            <p className="text-sm font-semibold text-rose-700">We couldn&rsquo;t load your notifications.</p>
            <p className="text-micro text-rose-700/80">{error}</p>
            <button type="button" onClick={reload} className={buttonClasses({ size: "md" })}>
              Try again
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-panel border border-line bg-surface py-16 px-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
              <Bell className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 className="font-serif-display text-xl text-ink">Nothing yet</h2>
            <p className="text-micro text-muted max-w-sm mx-auto leading-relaxed">
              When one of your listings is reviewed, or someone asks to visit a home, it will show up here.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {items.map((n) => {
              const { icon: Icon, tone } = ICONS[n.type] ?? { icon: Bell, tone: "text-muted bg-canvas" };
              return (
                <li
                  key={n.id}
                  className={`rounded-card border p-3.5 flex items-start gap-3 transition-colors ${
                    n.read ? "border-line bg-surface" : "border-primary/25 bg-primary/3"
                  }`}
                >
                  <span className={`w-9 h-9 rounded-control flex items-center justify-center shrink-0 ${tone}`}>
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">{n.title}</p>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" aria-label="Unread" />
                      )}
                    </div>
                    {n.body && <p className="text-micro text-muted mt-0.5 leading-relaxed">{n.body}</p>}

                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-label text-muted">{formatPostedAt(n.createdAt) || "Just now"}</span>
                      {n.propertyId && (
                        <Link href={`/property/${n.propertyId}`} className="text-label text-primary font-semibold hover:underline">
                          View listing
                        </Link>
                      )}
                      {!n.read && (
                        <button
                          type="button"
                          onClick={() => markRead(n.id)}
                          className="text-label text-muted hover:text-primary"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
