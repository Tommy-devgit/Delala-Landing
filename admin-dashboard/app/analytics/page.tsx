"use client";

import { BarChart3 } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-[#ECE7DA] pb-6">
        <span className="text-[11px] font-mono-label font-bold text-[#736F4E] tracking-widest uppercase">
          MARKET INTELLIGENCE
        </span>
        <h1 className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mt-1">
          Marketplace Analytics & Intelligence
        </h1>
        <p className="text-xs text-[#736F4E] font-mono-label mt-1">
          Real estate market trends, search keywords, average rent per sub-city & platform growth
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-[#ECE7DA] shadow-xs space-y-2">
          <div className="text-[10px] font-mono-label text-[#736F4E] font-bold uppercase">TOP SEARCHED SUB-CITY</div>
          <div className="text-3xl font-serif-display font-light text-[#1C1B12]">Bole Medhanialem</div>
          <div className="text-xs text-[#4C061D] font-mono-label font-bold">42% of total search traffic</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#ECE7DA] shadow-xs space-y-2">
          <div className="text-[10px] font-mono-label text-[#736F4E] font-bold uppercase">MOST REQUESTED AMENITY</div>
          <div className="text-3xl font-serif-display font-light text-[#1C1B12]">Standby Generator</div>
          <div className="text-xs text-[#4C061D] font-mono-label font-bold">Filter applied in 89% searches</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#ECE7DA] shadow-xs space-y-2">
          <div className="text-[10px] font-mono-label text-[#736F4E] font-bold uppercase">AVG ADDIS ABABA RENT</div>
          <div className="text-3xl font-serif-display font-light text-[#4C061D]">ETB 45,200 / mo</div>
          <div className="text-xs text-[#736F4E] font-mono-label">+6.4% YoY index</div>
        </div>
      </div>

      {/* Sub-city Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-[#ECE7DA] shadow-xs space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center text-[#4C061D]">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-serif-display font-light text-[#1C1B12]">SUB-CITY AVERAGE RENT INDEX</h2>
        </div>

        <div className="space-y-4">
          {[
            { name: "Old Airport", rent: "ETB 75,000", pct: 90 },
            { name: "Bole Medhanialem", rent: "ETB 65,000", pct: 82 },
            { name: "Kazanchis", rent: "ETB 38,000", pct: 60 },
            { name: "CMC Sunshine", rent: "ETB 35,000", pct: 55 },
            { name: "Hawassa Waterfront", rent: "ETB 28,000", pct: 40 },
          ].map((item) => (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono-label">
                <span className="text-[#1C1B12] font-bold">{item.name}</span>
                <span className="text-[#4C061D] font-bold">{item.rent}</span>
              </div>
              <div className="w-full bg-[#FAF8F4] h-2.5 rounded-full overflow-hidden border border-[#ECE7DA]">
                <div className="bg-[#4C061D] h-full rounded-full" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
