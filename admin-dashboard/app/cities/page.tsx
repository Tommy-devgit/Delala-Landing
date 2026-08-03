"use client";

import { Plus } from "lucide-react";

const CITIES_DATA = [
  { id: "c1", name: "Addis Ababa", tagline: "Ethiopia's Capital & Diplomatic Hub", startingRent: 28000, listings: 412 },
  { id: "c2", name: "Hawassa", tagline: "Lakeside Resort & Industrial Hub", startingRent: 18000, listings: 68 },
  { id: "c3", name: "Adama", tagline: "Commercial Gateway of Oromia", startingRent: 15000, listings: 42 },
  { id: "c4", name: "Bahir Dar", tagline: "Scenic Lake Tana & Business Hub", startingRent: 16000, listings: 22 },
];

export default function AdminCitiesPage() {
  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE7DA] pb-6">
        <div>
          <span className="text-[11px] font-mono-label font-bold text-[#736F4E] tracking-widest uppercase">
            GEOGRAPHIC BENCHMARKS
          </span>
          <h1 className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mt-1">
            Cities & Regional Markets
          </h1>
          <p className="text-xs text-[#736F4E] font-mono-label mt-1">
            Geographic market coverage & baseline rental benchmarks
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-xl bg-[#4C061D] text-white text-xs font-mono-label font-bold hover:bg-[#3B0416] transition-colors flex items-center gap-2 shadow-sm">
          <Plus className="w-4 h-4" />
          <span>Add New City Region</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CITIES_DATA.map((city) => (
          <div key={city.id} className="bg-white p-6 rounded-2xl border border-[#ECE7DA] shadow-xs hover:shadow-md transition-shadow space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-serif-display font-light text-2xl text-[#1C1B12]">{city.name}</div>
                <div className="text-xs text-[#736F4E] mt-0.5">{city.tagline}</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label font-bold text-[#4C061D]">
                {city.listings} Listings
              </span>
            </div>

            <div className="pt-3 border-t border-[#ECE7DA] flex items-center justify-between text-xs font-mono-label">
              <span className="text-[#736F4E]">Baseline Monthly Rent:</span>
              <span className="font-bold text-[#4C061D]">ETB {city.startingRent.toLocaleString()}/mo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
