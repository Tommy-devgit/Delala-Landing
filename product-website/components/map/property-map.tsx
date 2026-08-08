"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Marker, useMap } from "react-leaflet";
import type { Map as LeafletMapInstance } from "leaflet";
import L from "leaflet";
import { Building2, ShieldCheck, X } from "lucide-react";
import { Coordinates, Property } from "@/lib/types";
import { MAP_ZOOM, coordinatesSignature, withCoordinates } from "@/lib/map";
import { DelalaMap } from "./delala-map";
import { MapControls } from "./map-controls";
import { createPropertyIcon } from "./property-marker";

interface MarkerEntry {
  property: Property;
  coordinates: Coordinates;
}

/**
 * Renders one marker per property and keeps the viewport sensible. Markers are
 * updated in place; the surrounding Leaflet instance is never recreated.
 */
function PropertyMarkers({
  entries,
  selectedPropertyId,
  onSelectProperty,
}: {
  entries: MarkerEntry[];
  selectedPropertyId?: string | null;
  onSelectProperty?: (propertyId: string) => void;
}) {
  const map = useMap();
  const signature = useMemo(() => coordinatesSignature(entries), [entries]);

  // Refit only when the marker set itself changes, not on every React render or
  // selection change.
  useEffect(() => {
    if (entries.length === 0) return;

    if (entries.length === 1) {
      const { latitude, longitude } = entries[0].coordinates;
      map.setView([latitude, longitude], MAP_ZOOM.property, { animate: false });
      return;
    }

    const bounds = L.latLngBounds(
      entries.map(({ coordinates }) => [coordinates.latitude, coordinates.longitude] as [number, number])
    );
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: MAP_ZOOM.subCity, animate: false });
    // `signature` is the intentional dependency: it changes only when the actual
    // set of plotted coordinates changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, signature]);

  // Centre on the property the visitor picked from the list.
  useEffect(() => {
    if (!selectedPropertyId) return;
    const selected = entries.find(({ property }) => property.id === selectedPropertyId);
    if (!selected) return;
    map.flyTo([selected.coordinates.latitude, selected.coordinates.longitude], Math.max(map.getZoom(), MAP_ZOOM.subCity), {
      duration: 0.5,
    });
  }, [map, entries, selectedPropertyId]);

  return (
    <>
      {entries.map(({ property, coordinates }) => (
        <Marker
          key={property.id}
          position={[coordinates.latitude, coordinates.longitude]}
          icon={createPropertyIcon(property.rentETB, property.id === selectedPropertyId)}
          zIndexOffset={property.id === selectedPropertyId ? 1000 : 0}
          keyboard
          alt={`${property.title} — ETB ${property.rentETB.toLocaleString()} per month`}
          eventHandlers={{ click: () => onSelectProperty?.(property.id) }}
        />
      ))}
    </>
  );
}

/** Quick preview card shown when a marker is selected. */
function PropertyPreview({ property, onClose }: { property: Property; onClose: () => void }) {
  return (
    <div className="absolute bottom-7 left-3 right-3 z-[600] rounded-2xl bg-white/97 backdrop-blur-md border border-[#ECE7DA] shadow-lg p-3">
      <div className="flex items-center gap-3">
        <img
          src={property.heroImage}
          alt=""
          className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#ECE7DA]"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-mono-label text-[9px] text-[#736F4E] truncate">
              {[property.subCity, property.city].filter(Boolean).join(" • ").toUpperCase()}
            </span>
            {property.verified && (
              <ShieldCheck className="w-3 h-3 text-[#4C061D] shrink-0" aria-label="Field verified" />
            )}
          </div>

          <h4 className="font-serif-display text-sm font-medium text-[#1c1b12] truncate">
            {property.title}
          </h4>

          <p className="text-[11px] text-[#736F4E]">
            {property.bedrooms} Bed • {property.bathrooms} Bath • {property.areaSqm}m²
          </p>

          <p className="text-xs font-bold text-[#4C061D] mt-0.5">
            ETB {property.rentETB.toLocaleString()}
            <span className="font-normal text-[#736F4E]"> /mo</span>
          </p>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#736F4E] hover:text-[#4C061D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C061D]"
            aria-label="Close property preview"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          <Link
            href={`/property/${property.slug}`}
            className="px-3 py-1.5 rounded-lg bg-[#4C061D] text-white font-mono-label text-[10px] font-bold hover:bg-[#3B0416] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4C061D] focus-visible:ring-offset-1"
          >
            VIEW
          </Link>
        </div>
      </div>
    </div>
  );
}

export interface PropertyMapProps {
  /** The same filtered collection that feeds the property grid. */
  properties: Property[];
  /** Pass this to control the selection from the parent; omit for local state. */
  selectedPropertyId?: string | null;
  onSelectProperty?: (propertyId: string | null) => void;
  className?: string;
}

/**
 * Marketplace map. Properties without a usable coordinate pair are simply left
 * off the map — they still appear in the list.
 */
export function PropertyMap({
  properties,
  selectedPropertyId,
  onSelectProperty,
  className = "",
}: PropertyMapProps) {
  const mapRef = useRef<LeafletMapInstance | null>(null);
  const [internalSelection, setInternalSelection] = useState<string | null>(null);

  const entries = useMemo(() => withCoordinates(properties), [properties]);
  // Controlled whenever the parent supplies the prop, so a parent clearing the
  // selection is never overridden by a stale internal value.
  const isControlled = selectedPropertyId !== undefined;
  const activeId = isControlled ? selectedPropertyId : internalSelection;
  const activeProperty = entries.find(({ property }) => property.id === activeId)?.property ?? null;
  const unmappedCount = properties.length - entries.length;

  const handleReady = useCallback((map: LeafletMapInstance) => {
    mapRef.current = map;
  }, []);

  const handleSelect = useCallback(
    (propertyId: string | null) => {
      if (!isControlled) setInternalSelection(propertyId);
      onSelectProperty?.(propertyId);
    },
    [isControlled, onSelectProperty]
  );

  return (
    <div className={`relative w-full h-full ${className}`}>
      <DelalaMap onReady={handleReady} ariaLabel="Map of matching Delala property listings">
        <MapControls />
        <PropertyMarkers
          entries={entries}
          selectedPropertyId={activeId}
          onSelectProperty={handleSelect}
        />
      </DelalaMap>

      {entries.length === 0 && (
        <div className="absolute inset-0 z-[550] flex items-center justify-center pointer-events-none p-6">
          <div className="pointer-events-auto max-w-xs text-center rounded-2xl bg-white/95 backdrop-blur-md border border-[#ECE7DA] shadow-sm px-5 py-4 space-y-1.5">
            <Building2 className="w-6 h-6 text-[#736F4E] mx-auto opacity-60" aria-hidden="true" />
            <p className="font-mono-label text-[10px] text-[#4C061D] font-bold">NO MAPPED LISTINGS</p>
            <p className="text-[11px] text-[#736F4E]">
              {properties.length > 0
                ? "These listings have no location pin yet. Browse them in the list."
                : "No properties match your filters."}
            </p>
          </div>
        </div>
      )}

      {entries.length > 0 && unmappedCount > 0 && (
        <div className="absolute left-3 top-3 z-[500] rounded-lg bg-white/95 backdrop-blur-md border border-[#ECE7DA] px-2.5 py-1 shadow-sm">
          <span className="font-mono-label text-[9.5px] text-[#736F4E]">
            {entries.length} OF {properties.length} MAPPED
          </span>
        </div>
      )}

      {activeProperty && <PropertyPreview property={activeProperty} onClose={() => handleSelect(null)} />}
    </div>
  );
}
