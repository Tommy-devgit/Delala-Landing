"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent, Marker as LeafletMarker } from "leaflet";
import { MapPin } from "lucide-react";
import { Coordinates } from "@/lib/types";
import { ETHIOPIA_CENTER, MAP_ZOOM, formatApproximateCoordinates, toCoordinates } from "@/lib/map";
import { DelalaMap } from "./delala-map";
import { MapControls } from "./map-controls";
import { createPinIcon } from "./property-marker";

/** Turns the map surface into a click-to-pin target. */
function ClickToPin({ onPick }: { onPick: (coordinates: Coordinates) => void }) {
  useMapEvents({
    click: (event: LeafletMouseEvent) => {
      const picked = toCoordinates(event.latlng.lat, event.latlng.lng);
      if (picked) onPick(picked);
    },
  });
  return null;
}

/**
 * Recentres the view when the publisher picks a different city / sub-city /
 * neighborhood. The pin itself is left alone — it is the publisher's choice.
 */
function FocusOnLocation({ focus, zoom }: { focus: Coordinates | null; zoom: number }) {
  const map = useMap();
  const isFirstRender = useRef(true);
  const signature = focus ? `${focus.latitude},${focus.longitude},${zoom}` : "";

  useEffect(() => {
    if (!focus) return;
    if (isFirstRender.current) {
      // The map was already created at this position — settle it without motion.
      map.setView([focus.latitude, focus.longitude], zoom, { animate: false });
      return;
    }
    map.flyTo([focus.latitude, focus.longitude], zoom, { duration: 0.6 });
    // `signature` collapses the focus point and zoom into one dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, signature]);

  // Declared after the effect above so the first pass still sees `true`.
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return null;
}

export interface LocationPickerProps {
  /** The pin currently stored in form state, or null when none has been placed. */
  value: Coordinates | null;
  onChange: (coordinates: Coordinates) => void;
  /** Centre suggested by the selected city / sub-city / neighborhood. */
  focus?: Coordinates | null;
  focusZoom?: number;
  className?: string;
}

/**
 * Approximate-location picker for /publish. The pin deliberately represents an
 * approximate position — publishers are never asked for an exact address, and
 * the displayed coordinates are rounded even though full precision is stored.
 */
export function LocationPicker({
  value,
  onChange,
  focus = null,
  focusZoom = MAP_ZOOM.city,
  className = "",
}: LocationPickerProps) {
  const markerRef = useRef<LeafletMarker | null>(null);
  const pinIcon = useMemo(() => createPinIcon(), []);
  const initialCenter = value ?? focus ?? ETHIOPIA_CENTER;
  const initialZoom = value ? MAP_ZOOM.property : focus ? focusZoom : MAP_ZOOM.country;

  const handleDragEnd = useCallback(() => {
    const marker = markerRef.current;
    if (!marker) return;
    const position = marker.getLatLng();
    const dragged = toCoordinates(position.lat, position.lng);
    if (dragged) onChange(dragged);
  }, [onChange]);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative w-full h-[300px] sm:h-[360px] rounded-2xl overflow-hidden border border-[#ECE7DA]">
        <DelalaMap
          center={initialCenter}
          zoom={initialZoom}
          scrollWheelZoom={false}
          ariaLabel="Set the approximate location of the property"
        >
          <MapControls />
          <ClickToPin onPick={onChange} />
          <FocusOnLocation focus={focus} zoom={focusZoom} />
          {value && (
            <Marker
              ref={markerRef}
              position={[value.latitude, value.longitude]}
              icon={pinIcon}
              draggable
              autoPan
              alt="Approximate property location"
              eventHandlers={{ dragend: handleDragEnd }}
            />
          )}
        </DelalaMap>

        {!value && (
          <div className="absolute inset-x-3 bottom-7 z-[600] rounded-xl bg-white/95 backdrop-blur-md border border-[#ECE7DA] px-3 py-2 shadow-sm flex items-center gap-2 pointer-events-none">
            <MapPin className="w-3.5 h-3.5 text-[#4C061D] shrink-0" aria-hidden="true" />
            <span className="text-[11px] text-[#736F4E]">
              Tap the map to set the approximate location of the property.
            </span>
          </div>
        )}
      </div>

      <p className="text-[10px] text-[#736F4E] leading-relaxed">
        {value ? (
          <>
            Approximate location set near{" "}
            <span className="font-mono-label text-[#4C061D] font-bold">
              {formatApproximateCoordinates(value)}
            </span>
            . Drag the pin to adjust. This is shown to renters as a general area, not an exact address.
          </>
        ) : (
          "Optional. Adding an approximate location helps renters find your property on the marketplace map."
        )}
      </p>
    </div>
  );
}
