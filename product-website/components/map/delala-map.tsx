"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import type { Map as LeafletMapInstance } from "leaflet";
import "leaflet/dist/leaflet.css";
import { WifiOff } from "lucide-react";
import { Coordinates } from "@/lib/types";
import { ETHIOPIA_CENTER, MAP_ZOOM, OSM_ATTRIBUTION, OSM_TILE_URL } from "@/lib/map";

/** Number of failed tiles tolerated before the offline notice is shown. */
const TILE_ERROR_THRESHOLD = 6;

/**
 * Publishes the Leaflet instance to the parent and keeps the canvas in sync with
 * its container. Without the resize handling the map renders grey when it is
 * revealed by a layout change (e.g. the mobile List/Map toggle).
 */
function MapLifecycle({ onReady }: { onReady?: (map: LeafletMapInstance) => void }) {
  const map = useMap();

  useEffect(() => {
    onReady?.(map);

    const container = map.getContainer();
    const observer = new ResizeObserver(() => map.invalidateSize({ animate: false }));
    observer.observe(container);

    // The container is frequently still collapsed on the first paint.
    const raf = requestAnimationFrame(() => map.invalidateSize({ animate: false }));

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [map, onReady]);

  return null;
}

export interface DelalaMapProps {
  /** Initial view only — react-leaflet ignores later changes, pan imperatively instead. */
  center?: Coordinates;
  zoom?: number;
  /** Receives the Leaflet instance once, so the map is never rebuilt on data changes. */
  onReady?: (map: LeafletMapInstance) => void;
  scrollWheelZoom?: boolean;
  className?: string;
  ariaLabel?: string;
  children?: ReactNode;
}

/**
 * Delala's OpenStreetMap canvas. The Leaflet instance is created once and stays
 * stable for the lifetime of the component; markers and layers are updated by
 * the children instead of remounting the map.
 */
export function DelalaMap({
  center = ETHIOPIA_CENTER,
  zoom = MAP_ZOOM.country,
  onReady,
  scrollWheelZoom = true,
  className = "",
  ariaLabel = "Map of Ethiopian property locations",
  children,
}: DelalaMapProps) {
  const [tilesUnavailable, setTilesUnavailable] = useState(false);
  const tileErrors = useRef(0);
  const tilesLoaded = useRef(false);

  return (
    <div
      className={`relative w-full h-full min-h-[280px] overflow-hidden ${className}`}
      role="region"
      aria-label={ariaLabel}
    >
      <MapContainer
        center={[center.latitude, center.longitude]}
        zoom={zoom}
        zoomControl={false}
        scrollWheelZoom={scrollWheelZoom}
        className="w-full h-full min-h-[280px] z-0 bg-[#ECE7DA]"
      >
        <TileLayer
          url={OSM_TILE_URL}
          attribution={OSM_ATTRIBUTION}
          maxZoom={19}
          eventHandlers={{
            tileload: () => {
              tilesLoaded.current = true;
              if (tilesUnavailable) setTilesUnavailable(false);
            },
            tileerror: () => {
              tileErrors.current += 1;
              if (!tilesLoaded.current && tileErrors.current >= TILE_ERROR_THRESHOLD) {
                setTilesUnavailable(true);
              }
            },
          }}
        />
        <MapLifecycle onReady={onReady} />
        {children}
      </MapContainer>

      {tilesUnavailable && (
        <div
          role="status"
          className="absolute inset-x-3 top-3 z-[500] flex items-center gap-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#ECE7DA] px-3 py-2 shadow-sm"
        >
          <WifiOff className="w-3.5 h-3.5 text-[#4C061D] shrink-0" aria-hidden="true" />
          <span className="text-[11px] text-[#736F4E]">
            Map tiles could not be loaded. Listings below are unaffected.
          </span>
        </div>
      )}
    </div>
  );
}
