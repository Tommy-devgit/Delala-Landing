"use client";

import { Search, Bell, ShieldCheck } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-16 bg-[#FAF8F4] border-b border-[#ECE7DA] px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Search Input Capsule */}
      <div className="flex items-center gap-3 bg-white border border-[#ECE7DA] px-4 py-2 rounded-full shadow-xs w-80">
        <Search className="w-4 h-4 text-[#736F4E]" />
        <input
          type="text"
          placeholder="Search properties, brokers, users..."
          className="bg-transparent text-xs text-[#1C1B12] placeholder-[#736F4E] focus:outline-none w-full font-sans"
        />
      </div>

      {/* Right System Info & Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-[#ECE7DA] text-[11px] font-mono-label text-[#736F4E]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" />
          <span>PRODUCTION • SUPABASE PG</span>
        </div>

        <button className="relative p-2 rounded-xl bg-white border border-[#ECE7DA] text-[#736F4E] hover:text-[#4C061D] hover:border-[#4C061D] transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#4C061D]" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-[#ECE7DA]">
          <div className="w-9 h-9 rounded-full bg-[#4C061D] text-white font-serif-display font-bold text-sm flex items-center justify-center shadow-xs">
            SA
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-[#1C1B12]">Super Admin</div>
            <div className="text-[10px] text-[#736F4E] font-mono-label">admin@delala.et</div>
          </div>
        </div>
      </div>
    </header>
  );
}
