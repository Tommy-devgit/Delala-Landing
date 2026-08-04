"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient, UserSession } from "@/lib/auth-client";
import { AuthModal } from "@/components/auth-modal";
import { User, Calendar, ShieldCheck, Heart, Settings, CheckCircle2, Phone, LogOut, UserCheck } from "lucide-react";

export default function ProfilePage() {
  const [session, setSession] = useState<{ user: UserSession; token: string } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    function loadSession() {
      const activeSession = authClient.getSession();
      setSession(activeSession);
    }
    loadSession();

    window.addEventListener("delala_auth_change", loadSession);
    return () => window.removeEventListener("delala_auth_change", loadSession);
  }, []);

  const handleLogOut = () => {
    authClient.signOut();
    setSession(null);
  };

  const user = session?.user;

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* User Card */}
        {user ? (
          <div className="bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#4C061D] text-white font-serif-display text-3xl font-light flex items-center justify-center border-4 border-[#ECE7DA]">
                {user.fullName.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-serif-display text-3xl font-light text-[#1c1b12]">
                    {user.fullName}
                  </h1>
                  <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#B4C292]/30 px-2.5 py-0.5 rounded-full border border-[#B4C292]/50 font-bold uppercase">
                    {user.role} ACCOUNT
                  </span>
                </div>
                <p className="text-xs text-[#736F4E] font-mono-label">
                  {user.email} • {user.phone || "+251 911 234 567"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label text-[#4C061D] font-bold hover:border-[#4C061D] transition-colors flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>SWITCH ROLE</span>
              </button>

              <button
                onClick={handleLogOut}
                className="px-5 py-2.5 rounded-full bg-red-50 border border-red-200 text-xs font-mono-label text-red-600 font-bold hover:bg-red-100 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>LOG OUT</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-[#ECE7DA] p-8 max-w-xl mx-auto mb-12 shadow-sm space-y-4">
            <User className="w-12 h-12 text-[#4C061D] mx-auto opacity-70" />
            <h2 className="font-serif-display text-2xl text-[#1C1B12]">
              Authentication & Role Gateway
            </h2>
            <p className="text-xs text-[#736F4E] max-w-md mx-auto">
              Please sign in or select your user persona (Guest, Home Seeker, or Verified Broker) to access your profile dashboard.
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold shadow-md hover:bg-[#3B0416] transition-colors"
            >
              Sign In / Choose Persona →
            </button>
          </div>
        )}

        {/* Scheduled Walkthrough Appointments */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#ECE7DA] pb-4">
            <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
              Scheduled Field Walkthroughs
            </h2>
            <span className="font-mono-label text-[10px] text-[#4C061D] font-bold">
              UPCOMING VISITS
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#ECE7DA] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D] flex items-center justify-center font-bold">
                <Calendar className="w-6 h-6" />
              </div>

              <div>
                <div className="font-mono-label text-[10px] text-[#4C061D] font-bold mb-0.5">
                  UPCOMING APPOINTMENT
                </div>
                <h3 className="font-serif-display text-xl font-light text-[#1c1b12]">
                  Bole Medhanialem Modern G+1 Villa
                </h3>
                <p className="text-xs text-[#736F4E]">
                  Meeting Agent Abebe Tesfaye (+251 911 234 567) at property entrance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="px-3 py-1.5 rounded-full bg-[#B4C292]/30 text-[#4C061D] text-xs font-mono-label font-bold border border-[#B4C292]/50 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> CONFIRMED
              </span>
            </div>
          </div>
        </div>

      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSelectRole={(u) => setSession({ user: u, token: "active" })}
      />
    </div>
  );
}
