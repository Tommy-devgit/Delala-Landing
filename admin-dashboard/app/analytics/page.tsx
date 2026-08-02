"use client";

import { BarChart3, TrendingUp, Search, DollarSign } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">MARKETPLACE ANALYTICS & INTELLIGENCE</h1>
        <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
          Real estate market trends, search keywords, average rent per sub-city & platform growth
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1E293B] p-5 rounded-xl border border-[#334155] space-y-2">
          <div className="text-[10px] font-mono text-[#94A3B8] uppercase">TOP SEARCHED SUB-CITY</div>
          <div className="text-2xl font-bold text-white">Bole Medhanialem</div>
          <div className="text-xs text-emerald-400 font-mono">42% of total search traffic</div>
        </div>

        <div className="bg-[#1E293B] p-5 rounded-xl border border-[#334155] space-y-2">
          <div className="text-[10px] font-mono text-[#94A3B8] uppercase">MOST REQUESTED AMENITY</div>
          <div className="text-2xl font-bold text-white">Standby Generator</div>
          <div className="text-xs text-emerald-400 font-mono">Filter applied in 89% searches</div>
        </div>

        <div className="bg-[#1E293B] p-5 rounded-xl border border-[#334155] space-y-2">
          <div className="text-[10px] font-mono text-[#94A3B8] uppercase">AVG ADDIS ABABA RENT</div>
          <div className="text-2xl font-bold text-emerald-400">ETB 45,200 / mo</div>
          <div className="text-xs text-[#94A3B8] font-mono">+6.4% YoY index</div>
        </div>
      </div>

      {/* Sub-city Breakdown */}
      <div className="bg-[#1E293B] p-5 rounded-xl border border-[#334155] space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#B4C292]" />
          <h2 className="text-sm font-bold text-white uppercase">SUB-CITY AVERAGE RENT INDEX</h2>
        </div>

        <div className="space-y-3">
          {[
            { name: "Old Airport", rent: "ETB 75,000", pct: 90 },
            { name: "Bole Medhanialem", rent: "ETB 65,000", pct: 82 },
            { name: "Kazanchis", rent: "ETB 38,000", pct: 60 },
            { name: "CMC Sunshine", rent: "ETB 35,000", pct: 55 },
            { name: "Hawassa Waterfront", rent: "ETB 28,000", pct: 40 },
          ].map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white">{item.name}</span>
                <span className="text-emerald-400 font-bold">{item.rent}</span>
              </div>
              <div className="w-full bg-[#0F172A] h-2 rounded-full overflow-hidden">
                <div className="bg-[#4C061D] h-full rounded-full" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
