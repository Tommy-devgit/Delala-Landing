"use client";

import { Search, Bell, ShieldCheck, User } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-16 bg-[#1E293B] border-b border-[#334155] px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input */}
      <div className="flex items-center gap-3 bg-[#0F172A] border border-[#334155] px-3.5 py-1.5 rounded-lg w-80">
        <Search className="w-4 h-4 text-[#94A3B8]" />
        <input
          type="text"
          placeholder="Search properties, brokers, users..."
          className="bg-transparent text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none w-full"
        />
      </div>

      {/* Right System Info & Profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 bg-[#0F172A] px-3 py-1 rounded-full border border-[#334155] text-[11px] font-mono text-[#94A3B8]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B4C292]" />
          <span>PRODUCTION • SUPABASE PG</span>
        </div>

        <button className="relative p-2 rounded-lg bg-[#0F172A] border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC]">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-[#334155]">
          <div className="w-8 h-8 rounded-full bg-[#4C061D] text-white font-bold text-xs flex items-center justify-center border border-[#334155]">
            SA
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-[#F8FAFC]">Super Admin</div>
            <div className="text-[10px] text-[#94A3B8] font-mono">admin@delala.et</div>
          </div>
        </div>
      </div>
    </header>
  );
}
