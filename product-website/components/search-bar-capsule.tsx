"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, MapPin, Building, Banknote } from "lucide-react";

export function SearchBarCapsule({
  onOpenFilters,
  compact = false,
}: {
  onOpenFilters?: () => void;
  compact?: boolean;
}) {
  const router = useRouter();
  const [city, setCity] = useState("Addis Ababa");
  const [subCity, setSubCity] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (subCity) params.set("subCity", subCity);
    if (propertyType) params.set("propertyType", propertyType);
    router.push(`/search?${params.toString()}`);
  };

  if (compact) {
    return (
      <form
        onSubmit={handleSearch}
        className="w-full flex items-center bg-white rounded-full border border-[#ECE7DA] px-4 py-2 shadow-xs"
      >
        <Search className="w-4 h-4 text-[#4C061D] shrink-0 mr-2.5" />
        <input
          type="text"
          value={subCity}
          onChange={(e) => setSubCity(e.target.value)}
          placeholder="Search sub-city e.g. Bole, Kazanchis..."
          className="w-full bg-transparent text-xs text-[#2D2D2D] placeholder-[#736F4E] focus:outline-none font-sans"
        />
        {onOpenFilters && (
          <button
            type="button"
            onClick={onOpenFilters}
            className="p-1.5 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D] shrink-0 ml-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        )}
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-white rounded-full search-capsule-shadow p-1.5 flex items-center divide-x divide-[#ECE7DA]"
    >
      {/* Field 1: City & Sub-City */}
      <div className="flex-1 px-4 py-1.5 flex flex-col text-left">
        <label className="font-mono-label text-[9px] text-[#4C061D] font-bold">
          LOCATION
        </label>
        <input
          type="text"
          value={subCity}
          onChange={(e) => setSubCity(e.target.value)}
          placeholder="Sub-city e.g. Bole, Kazanchis"
          className="w-full bg-transparent text-xs text-[#2D2D2D] placeholder-[#736F4E] focus:outline-none font-medium truncate"
        />
      </div>

      {/* Field 2: Property Type */}
      <div className="flex-1 px-4 py-1.5 flex flex-col text-left">
        <label className="font-mono-label text-[9px] text-[#4C061D] font-bold">
          PROPERTY TYPE
        </label>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full bg-transparent text-xs text-[#2D2D2D] focus:outline-none font-medium appearance-none cursor-pointer"
        >
          <option value="">Any Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa / Compound</option>
          <option value="Studio">Studio</option>
          <option value="G+1 Residence">G+1 Residence</option>
          <option value="Penthouse">Penthouse</option>
        </select>
      </div>

      {/* Field 3: City Selector */}
      <div className="flex-1 px-4 py-1.5 flex flex-col text-left hidden lg:flex">
        <label className="font-mono-label text-[9px] text-[#4C061D] font-bold">
          CITY
        </label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full bg-transparent text-xs text-[#2D2D2D] focus:outline-none font-medium appearance-none cursor-pointer"
        >
          <option value="Addis Ababa">Addis Ababa</option>
          <option value="Hawassa">Hawassa</option>
          <option value="Adama">Adama</option>
          <option value="Bahir Dar">Bahir Dar</option>
        </select>
      </div>

      {/* Right Action: Filters Trigger & Search Button */}
      <div className="pl-2 pr-1 flex items-center gap-2">
        {onOpenFilters && (
          <button
            type="button"
            onClick={onOpenFilters}
            className="p-2.5 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D] hover:bg-[#ECE7DA] transition-colors"
            title="Open detailed filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className="w-10 h-10 rounded-full bg-[#4C061D] text-white flex items-center justify-center hover:bg-[#3B3923] transition-all shrink-0 active:scale-95 shadow-sm"
          aria-label="Search Marketplace"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
