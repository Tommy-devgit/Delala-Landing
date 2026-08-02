"use client";

import { MapPin, Building, Plus } from "lucide-react";

const CITIES_DATA = [
  { id: "c1", name: "Addis Ababa", tagline: "Ethiopia's Capital & Diplomatic Hub", startingRent: 28000, listings: 412 },
  { id: "c2", name: "Hawassa", tagline: "Lakeside Resort & Industrial Hub", startingRent: 18000, listings: 68 },
  { id: "c3", name: "Adama", tagline: "Commercial Gateway of Oromia", startingRent: 15000, listings: 42 },
  { id: "c4", name: "Bahir Dar", tagline: "Scenic Lake Tana & Business Hub", startingRent: 16000, listings: 22 },
];

export default function AdminCitiesPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">CITIES & REGIONAL MARKETS</h1>
          <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
            Geographic coverage & baseline rental market benchmarks
          </p>
        </div>

        <button className="px-4 py-2 rounded-lg bg-[#4C061D] text-white text-xs font-bold hover:bg-[#3B3923] transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          <span>Add New City Region</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CITIES_DATA.map((city) => (
          <div key={city.id} className="bg-[#1E293B] p-5 rounded-xl border border-[#334155] space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold text-lg text-white">{city.name}</div>
                <div className="text-xs text-[#94A3B8]">{city.tagline}</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#0F172A] border border-[#334155] text-xs font-mono font-bold text-[#B4C292]">
                {city.listings} Active Listings
              </span>
            </div>

            <div className="pt-3 border-t border-[#334155] flex items-center justify-between text-xs font-mono">
              <span className="text-[#94A3B8]">Baseline Rent:</span>
              <span className="font-bold text-emerald-400">ETB {city.startingRent.toLocaleString()}/mo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
