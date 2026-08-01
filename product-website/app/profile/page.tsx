"use client";

import Link from "next/link";
import { User, Calendar, ShieldCheck, Heart, Settings, CheckCircle2, Phone } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* User Card */}
        <div className="bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#4C061D] text-white font-serif-display text-3xl font-light flex items-center justify-center border-4 border-[#ECE7DA]">
              DK
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-serif-display text-3xl font-light text-[#1c1b12]">
                  Dawit Kebede
                </h1>
                <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#B4C292]/30 px-2.5 py-0.5 rounded-full border border-[#B4C292]/50 font-bold">
                  VERIFIED SEEKER
                </span>
              </div>
              <p className="text-xs text-[#736F4E] font-mono-label">
                dawit.kebede@example.et • +251 911 889 900
              </p>
            </div>
          </div>

          <Link
            href="/settings"
            className="px-5 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label text-[#4C061D] font-bold hover:border-[#4C061D] transition-colors flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            <span>ACCOUNT SETTINGS</span>
          </Link>
        </div>

        {/* Scheduled Walkthrough Appointments */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#ECE7DA] pb-4">
            <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
              Scheduled Field Walkthroughs
            </h2>
            <span className="font-mono-label text-[10px] text-[#4C061D] font-bold">
              1 UPCOMING VISIT
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#ECE7DA] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D] flex items-center justify-center font-bold">
                <Calendar className="w-6 h-6" />
              </div>

              <div>
                <div className="font-mono-label text-[10px] text-[#4C061D] font-bold mb-0.5">
                  AUG 5, 2026 • 10:00 AM
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
              <a
                href="tel:+251911234567"
                className="px-4 py-2 rounded-lg bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label text-[#4C061D] font-bold hover:border-[#4C061D]"
              >
                CALL AGENT
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
