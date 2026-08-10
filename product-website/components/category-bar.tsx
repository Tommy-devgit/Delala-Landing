"use client";

import { Building2, Home, Hotel, LayoutGrid, BedDouble, Landmark, Store } from "lucide-react";

/**
 * Property categories. Plain names on purpose — these are the actual listing
 * types, not marketing labels.
 */
const CATEGORIES = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "Apartment", label: "Apartments", icon: Building2 },
  { id: "Villa", label: "Villas", icon: Home },
  { id: "Studio", label: "Studios", icon: BedDouble },
  { id: "G+1 Residence", label: "G+1", icon: Landmark },
  { id: "Penthouse", label: "Penthouses", icon: Hotel },
  { id: "Commercial Space", label: "Commercial", icon: Store },
];

/**
 * Horizontal category strip. Reads as a set of tabs — icon above a short label,
 * the active one marked by weight and an underline rather than a filled pill.
 */
export function CategoryBar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (catId: string) => void;
}) {
  return (
    <div className="w-full bg-surface border-b border-line">
      <div
        className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-stretch gap-7 overflow-x-auto no-scrollbar"
        role="tablist"
        aria-label="Property categories"
      >
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selected === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(cat.id)}
              className={`group relative flex shrink-0 flex-col items-center gap-1.5 pt-3 pb-2.5 transition-colors ${
                isActive ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className={`text-micro whitespace-nowrap ${isActive ? "font-bold" : "font-medium"}`}>
                {cat.label}
              </span>
              {/* Underline marks the active tab; hover previews it faintly. */}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full transition-colors ${
                  isActive ? "bg-ink" : "bg-transparent group-hover:bg-line"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
