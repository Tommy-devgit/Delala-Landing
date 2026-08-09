"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, CheckCircle2, Calendar, ShieldCheck, Tag, Lock } from "lucide-react";
import { authClient, UserSession } from "@/lib/auth-client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export default function NotificationsPage() {
  const [session, setSession] = useState<{ user: UserSession; token: string } | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      const activeSession = authClient.getSession();
      setSession(activeSession);

      if (activeSession?.user?.id) {
        try {
          const res = await fetch(`${API_BASE}/notifications/user/${activeSession.user.id}`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) setNotifications(data);
          }
        } catch (err) {
          console.warn("Notifications API offline.");
        }
      }
      setLoading(false);
    }
    loadNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans pb-24">
      <div className="bg-primary text-white py-12 border-b border-primary-hover">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif-display text-3xl sm:text-4xl text-white">
            Notifications & System Alerts
          </h1>
          <p className="mt-1 text-sm text-line/80">
            Realtime walkthrough confirmations, field audit statuses, and saved property updates.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-4">
        {!session?.user ? (
          <div className="py-16 text-center bg-surface rounded-panel border border-line p-8 max-w-md mx-auto space-y-4 shadow-sm">
            <Lock className="w-12 h-12 text-primary mx-auto opacity-70" />
            <h2 className="font-serif-display text-2xl text-ink">
              Sign in to view alerts
            </h2>
            <p className="text-xs text-muted">
              Authenticate with your account to view walkthrough confirmations and property updates.
            </p>
            <Link
              href="/auth/signin?callbackUrl=/notifications"
              className="inline-block px-6 py-3 rounded-full bg-primary text-white font-mono-label text-xs font-bold shadow-md hover:bg-primary-hover transition-colors"
            >
              Sign In →
            </Link>
          </div>
        ) : loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-panel bg-surface border border-line animate-pulse" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-16 text-center bg-surface rounded-panel border border-line p-8 max-w-md mx-auto space-y-3 shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-serif-display text-xl text-ink">All Caught Up</h3>
            <p className="text-xs text-muted">You have no new unread system notifications at this time.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="p-6 rounded-panel bg-surface border border-line shadow-xs flex items-start gap-4 hover:border-primary transition-colors">
              <div className="w-10 h-10 rounded-card bg-canvas border border-line text-primary flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-ink">{n.title}</h3>
                  <span className="text-label font-mono-label text-muted">{n.createdAt || "Just now"}</span>
                </div>
                <p className="text-xs text-muted mt-1">{n.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
