"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle2, Calendar, ShieldCheck, Tag, Lock } from "lucide-react";
import { authClient, UserSession } from "@/lib/auth-client";
import { AuthModal } from "@/components/auth-modal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export default function NotificationsPage() {
  const [session, setSession] = useState<{ user: UserSession; token: string } | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

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
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1B12] font-sans pb-24">
      <div className="bg-[#4C061D] text-white py-12 border-b border-[#3B0416]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif-display text-3xl sm:text-4xl text-white">
            Notifications & System Alerts
          </h1>
          <p className="mt-1 text-sm text-[#ECE7DA]/80">
            Realtime walkthrough confirmations, field audit statuses, and saved property updates.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-4">
        {!session?.user ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#ECE7DA] p-8 max-w-md mx-auto space-y-4 shadow-sm">
            <Lock className="w-12 h-12 text-[#4C061D] mx-auto opacity-70" />
            <h2 className="font-serif-display text-2xl text-[#1C1B12]">
              Sign in to view alerts
            </h2>
            <p className="text-xs text-[#736F4E]">
              Authenticate with your account to view walkthrough confirmations and property updates.
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-3 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold shadow-md hover:bg-[#3B0416] transition-colors"
            >
              Sign In →
            </button>
          </div>
        ) : loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-3xl bg-white border border-[#ECE7DA] animate-pulse" />
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-[#ECE7DA] p-8 max-w-md mx-auto space-y-3 shadow-xs">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-serif-display text-xl text-[#1C1B12]">All Caught Up</h3>
            <p className="text-xs text-[#736F4E]">You have no new unread system notifications at this time.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="p-6 rounded-3xl bg-white border border-[#ECE7DA] shadow-xs flex items-start gap-4 hover:border-[#4C061D] transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D] flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 text-[#4C061D]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#1C1B12]">{n.title}</h3>
                  <span className="text-[10px] font-mono-label text-[#736F4E]">{n.createdAt || "Just now"}</span>
                </div>
                <p className="text-xs text-[#736F4E] mt-1">{n.message}</p>
              </div>
            </div>
          ))
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
