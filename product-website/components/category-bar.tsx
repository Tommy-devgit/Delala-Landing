"use client";

import { Building2, Home, Sparkles, ShieldCheck, Flame, BedDouble, Landmark } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Verified", icon: Flame },
  { id: "Apartment", label: "Apartments", icon: Building2 },
  { id: "Villa", label: "Villas & Compounds", icon: Home },
  { id: "Studio", label: "Executive Studios", icon: BedDouble },
  { id: "G+1 Residence", label: "G+1 Residences", icon: Landmark },
  { id: "Penthouse", label: "Penthouses", icon: Sparkles },
  { id: "diplomatic", label: "Diplomatic Enclave", icon: ShieldCheck },
];

export function CategoryBar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (catId: string) => void;
}) {
  return (
    <div className="w-full bg-[#FAF8F4] border-b border-[#ECE7DA] py-3.5 px-4 sm:px-8">
      <div className="max-w-[1440px] mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selected === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 border select-none ${
                isActive
                  ? "bg-[#4C061D] text-white border-[#4C061D] shadow-xs font-bold"
                  : "bg-white text-[#2D2D2D] border-[#ECE7DA] hover:border-[#4C061D]/50 hover:text-[#4C061D]"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#B4C292]" : "text-[#736F4E]"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
