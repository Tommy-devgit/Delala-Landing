"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShieldCheck, Zap, Droplets, Car, Phone, MapPin } from "lucide-react";
import { Property } from "@/lib/types";

/** Overlay chip used for the badges that sit on top of the photo. */
function PhotoChip({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-mono-label text-label font-bold shadow-sm ${className}`}
    >
      {children}
    </span>
  );
}

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
  const location = [property.subCity, property.city].filter(Boolean).join(" • ");

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFav(!fav);
    onToggleFavorite?.(property.id);
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
      className={`group flex flex-col h-full bg-surface rounded-card overflow-hidden border transition-shadow duration-200 hover:shadow-md ${
        isSelected ? "border-primary ring-2 ring-primary/25 shadow-md" : "border-line listing-card-shadow"
      }`}
    >
      {/* Photo */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-ink shrink-0">
        <img
          src={property.heroImage}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Top row: verification + save */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          {property.verified ? (
            <PhotoChip className="bg-surface/95 backdrop-blur-md text-primary border border-line">
              <ShieldCheck className="w-3 h-3" aria-hidden="true" />
              <span>Verified</span>
            </PhotoChip>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={handleFavoriteClick}
            className="w-8 h-8 rounded-full bg-black/45 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/65 transition-colors shrink-0"
            aria-label={fav ? `Remove ${property.title} from favourites` : `Save ${property.title} to favourites`}
            aria-pressed={fav}
          >
            <Heart className={`w-4 h-4 ${fav ? "fill-rose-500 text-rose-500" : "text-white"}`} aria-hidden="true" />
          </button>
        </div>

        {/* Bottom row: amenities + map selection state */}
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {property.generator && (
              <PhotoChip className="bg-black/60 backdrop-blur-md text-white">
                <Zap className="w-3 h-3 text-accent" aria-hidden="true" /> Gen
              </PhotoChip>
            )}
            {property.waterTank && (
              <PhotoChip className="bg-black/60 backdrop-blur-md text-white">
                <Droplets className="w-3 h-3 text-cyan-300" aria-hidden="true" /> Tank
              </PhotoChip>
            )}
            {property.parking && (
              <PhotoChip className="bg-black/60 backdrop-blur-md text-white">
                <Car className="w-3 h-3 text-amber-300" aria-hidden="true" /> Park
              </PhotoChip>
            )}
          </div>

          {isSelected && (
            <PhotoChip className="bg-primary text-white shrink-0">
              <MapPin className="w-3 h-3 text-accent" aria-hidden="true" />
              <span>On map</span>
            </PhotoChip>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono-label text-label text-muted truncate">{location}</span>
            <span className="font-mono-label text-label font-bold text-primary bg-canvas px-2 py-0.5 rounded-full border border-line shrink-0">
              {property.propertyType}
            </span>
          </div>

          <h3 className="font-serif-display text-base font-medium text-ink line-clamp-1 transition-colors group-hover:text-primary">
            {property.title}
          </h3>

          <p className="text-micro text-muted">
            {property.bedrooms} Bed · {property.bathrooms} Bath · {property.areaSqm}m²
            {property.furnished ? " · Furnished" : ""}
          </p>
        </div>

        {/* Price + direct call. A button, not an anchor, to avoid nesting links. */}
        <div className="mt-auto pt-3 border-t border-line flex items-end justify-between gap-2">
          <div className="min-w-0">
            <span className="font-mono-label text-label text-muted block mb-0.5">Monthly rent</span>
            <span className="text-base font-bold text-primary">
              ETB {property.rentETB.toLocaleString()}
              <span className="text-micro font-normal text-muted"> /mo</span>
            </span>
          </div>

          {contactPhone && (
            <button
              type="button"
              onClick={handlePhoneCall}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-control bg-primary text-white hover:bg-primary-hover transition-colors font-mono-label text-label font-bold shrink-0"
              aria-label={`Call ${contactPhone} about ${property.title}`}
            >
              <Phone className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span className="hidden sm:inline">Call</span>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
