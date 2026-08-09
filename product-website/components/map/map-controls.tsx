"use client";

import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { Crosshair, Loader2, Minus, Plus } from "lucide-react";
import { MAP_ZOOM } from "@/lib/map";

const BUTTON_CLASS =
  "w-9 h-9 flex items-center justify-center bg-surface text-primary hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

/**
 * Zoom and "use my location" controls. Geolocation is only ever requested in
 * response to this button — the map never collects or transmits the visitor's
 * position on its own.
 */
export function MapControls({ showLocateButton = true }: { showLocateButton?: boolean }) {
  const map = useMap();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState("");

  // These controls live inside the Leaflet container, whose native click and
  // wheel listeners fire before React can stop propagation. Without this, using
  // a control would also register as a map click (placing a pin in the location
  // picker) or scroll-zoom the map.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }, []);

  const handleLocate = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setLocateError("Location is not supported by this browser.");
      return;
    }

    setLocateError("");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        map.flyTo([position.coords.latitude, position.coords.longitude], MAP_ZOOM.neighborhood);
      },
      () => {
        setLocating(false);
        setLocateError("Location permission denied.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div ref={containerRef} className="absolute right-3 top-3 z-[500] flex flex-col items-end gap-2">
      <div className="flex flex-col rounded-control overflow-hidden border border-line shadow-sm divide-y divide-line">
        <button type="button" onClick={() => map.zoomIn()} className={BUTTON_CLASS} aria-label="Zoom in">
          <Plus className="w-4 h-4" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => map.zoomOut()} className={BUTTON_CLASS} aria-label="Zoom out">
          <Minus className="w-4 h-4" aria-hidden="true" />
        </button>
        {showLocateButton && (
          <button
            type="button"
            onClick={handleLocate}
            disabled={locating}
            className={BUTTON_CLASS}
            aria-label="Centre the map on my location"
          >
            {locating ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Crosshair className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {locateError && (
        <span
          role="status"
          className="max-w-[180px] rounded-lg bg-surface/95 backdrop-blur-md border border-line px-2 py-1 text-label text-muted shadow-sm"
        >
          {locateError}
        </span>
      )}
    </div>
  );
}
