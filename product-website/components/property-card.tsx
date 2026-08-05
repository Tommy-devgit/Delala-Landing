"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShieldCheck, Zap, Droplets, Car } from "lucide-react";
import { Property } from "@/lib/types";

export function PropertyCard({
  property,
  isFavorite = false,
  onToggleFavorite,
}: {
  property: Property;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}) {
  const [fav, setFav] = useState(isFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFav(!fav);
    if (onToggleFavorite) {
      onToggleFavorite(property.id);
    }
  };

  return (
    <Link
      href={`/property/${property.slug}`}
      className="group block bg-white rounded-xl overflow-hidden listing-card-shadow border border-[#ECE7DA] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Full Bleed Image Frame with 12px Radius */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1c1b12] rounded-t-xl">
          <img
            src={property.heroImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top-Left Verified Badge */}
          {property.verified && (
            <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md text-[#4C061D] px-2.5 py-1 rounded-full text-[10px] font-mono-label font-bold border border-[#ECE7DA] shadow-xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" />
              <span>FIELD VERIFIED</span>
            </div>
          )}

          {/* Top-Right Wishlist Heart Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
            aria-label="Save to favorites"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                fav ? "fill-rose-500 text-rose-500" : "text-white"
              }`}
            />
          </button>

          {/* Bottom Amenities Badge Overlay */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-1.5 text-[10px] text-white">
            {property.generator && (
              <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#B4C292]" /> Gen
              </span>
            )}
            {property.waterTank && (
              <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1">
                <Droplets className="w-3 h-3 text-cyan-300" /> Tank
              </span>
            )}
            {property.parking && (
              <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1">
                <Car className="w-3 h-3 text-amber-300" /> Park
              </span>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="font-mono-label text-[10px] text-[#736F4E] truncate">
                {property.subCity.toUpperCase()} • {property.city.toUpperCase()}
              </span>
              <span className="font-mono-label text-[9px] text-[#4C061D] bg-[#FAF8F4] px-2 py-0.5 rounded-full border border-[#ECE7DA] font-bold">
                {property.propertyType.toUpperCase()}
              </span>
            </div>

            <h3 className="font-serif-display text-lg font-light text-[#1c1b12] line-clamp-1 group-hover:text-[#4C061D] transition-colors mb-1.5">
              {property.title}
            </h3>

            <p className="text-xs text-[#736F4E] font-medium mb-3">
              {property.bedrooms} Beds • {property.bathrooms} Baths • {property.areaSqm} sqm • {property.furnished ? "Furnished" : "Unfurnished"}
            </p>
          </div>

          <div className="pt-3 border-t border-[#ECE7DA] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono-label text-[#736F4E] block">RENTAL</span>
              <span className="text-base font-bold text-[#4C061D]">
                ETB {property.rentETB.toLocaleString()} <span className="text-xs font-normal text-[#736F4E]">/ mo</span>
              </span>
            </div>

            <span className="text-xs font-mono-label text-[#4C061D] group-hover:translate-x-0.5 transition-transform">
              VIEW →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
