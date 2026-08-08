"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShieldCheck, Zap, Droplets, Car, Phone, MapPin } from "lucide-react";
import { Property } from "@/lib/types";

export function PropertyCard({
  property,
  isFavorite = false,
  onToggleFavorite,
  isSelected = false,
  onActivate,
}: {
  property: Property;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  /** Marks the card whose marker is currently active on the map. */
  isSelected?: boolean;
  /** Fired on hover/focus so the map can centre on this property. */
  onActivate?: (id: string) => void;
}) {
  const [fav, setFav] = useState(isFavorite);

  const contactPhone = property.phone || property.broker?.phone;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFav(!fav);
    if (onToggleFavorite) {
      onToggleFavorite(property.id);
    }
  };

  const handlePhoneCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (contactPhone) {
      window.location.href = `tel:${contactPhone.replace(/\s+/g, "")}`;
    }
  };

  return (
    <Link
      href={`/property/${property.slug}`}
      onMouseEnter={() => onActivate?.(property.id)}
      onFocus={() => onActivate?.(property.id)}
      aria-current={isSelected ? "true" : undefined}
      className={`group flex flex-col h-full bg-white rounded-xl overflow-hidden listing-card-shadow border transition-all duration-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C061D] focus-visible:ring-offset-1 ${
        isSelected
          ? "border-[#4C061D] ring-2 ring-[#4C061D]/25 shadow-md"
          : "border-[#ECE7DA] hover:border-[#4C061D]/30"
      }`}
    >
      {/* Full Bleed Compact Image Frame */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#1c1b12] rounded-t-xl shrink-0">
        <img
          src={property.heroImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Selected-on-map indicator: text + icon, never colour alone */}
        {isSelected && (
          <div className="absolute bottom-2 right-2 z-10 bg-[#4C061D] text-white px-2 py-0.5 rounded-full text-[9px] font-mono-label font-bold shadow-xs flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#B4C292]" aria-hidden="true" />
            <span>ON MAP</span>
          </div>
        )}

        {/* Top-Left Verified Badge */}
        {property.verified && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 backdrop-blur-md text-[#4C061D] px-2 py-0.5 rounded-full text-[9px] font-mono-label font-bold border border-[#ECE7DA] shadow-xs flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#4C061D]" />
            <span>VERIFIED</span>
          </div>
        )}

        {/* Top-Right Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          aria-label="Save to favorites"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              fav ? "fill-rose-500 text-rose-500" : "text-white"
            }`}
          />
        </button>

        {/* Bottom Amenities Badge Overlay */}
        <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center gap-1 text-[9px] text-white">
          {property.generator && (
            <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <Zap className="w-2.5 h-2.5 text-[#B4C292]" /> Gen
            </span>
          )}
          {property.waterTank && (
            <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <Droplets className="w-2.5 h-2.5 text-cyan-300" /> Tank
            </span>
          )}
          {property.parking && (
            <span className="bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <Car className="w-2.5 h-2.5 text-amber-300" /> Park
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="font-mono-label text-[9.5px] text-[#736F4E] truncate">
              {[property.subCity, property.city].filter(Boolean).join(" • ").toUpperCase()}
            </span>
            <span className="font-mono-label text-[8.5px] text-[#4C061D] bg-[#FAF8F4] px-1.5 py-0.5 rounded border border-[#ECE7DA] font-bold">
              {property.propertyType.toUpperCase()}
            </span>
          </div>

          <h3 className="font-serif-display text-sm font-medium text-[#1c1b12] line-clamp-1 group-hover:text-[#4C061D] transition-colors mb-1">
            {property.title}
          </h3>

          <p className="text-[11px] text-[#736F4E] font-medium mb-2">
            {property.bedrooms} Bed • {property.bathrooms} Bath • {property.areaSqm}m² • {property.furnished ? "Furnished" : "Unfurnished"}
          </p>
        </div>

        {/* Price & Direct Contact Phone Button */}
        <div className="pt-2 border-t border-[#ECE7DA] flex items-center justify-between gap-1.5 mt-auto">
          <div>
            <span className="text-[9px] font-mono-label text-[#736F4E] block">RENTAL</span>
            <span className="text-sm font-bold text-[#4C061D]">
              ETB {property.rentETB.toLocaleString()} <span className="text-[10px] font-normal text-[#736F4E]">/mo</span>
            </span>
          </div>

          {/* Front Contact Phone Button (using button element to avoid nested <a> tags) */}
          {contactPhone && (
            <button
              type="button"
              onClick={handlePhoneCall}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#4C061D] text-white hover:bg-[#3B0416] transition-colors text-[10px] font-mono-label font-bold shadow-xs shrink-0"
              title="Call Property Owner Directly"
            >
              <Phone className="w-3 h-3 text-[#B4C292]" />
              <span>{contactPhone}</span>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
