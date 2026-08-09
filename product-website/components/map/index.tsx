"use client";

import dynamic from "next/dynamic";
import { MapErrorBoundary } from "./map-error-boundary";
import type { LocationPickerProps } from "./location-picker";
import type { PropertyMapProps } from "./property-map";

/**
 * Single entry point for every map surface. Leaflet touches `window` and
 * `document` at module scope, so the real components are only ever loaded in the
 * browser via `ssr: false`, and each is wrapped in an error boundary so a map
 * failure can never take the surrounding page down with it.
 */

function MapSkeleton({ label }: { label: string }) {
  return (
    <div className="w-full h-full min-h-[280px] rounded-card bg-line/60 border border-line animate-pulse flex items-center justify-center">
      <span className="font-mono-label text-label text-muted">{label}</span>
    </div>
  );
}

const PropertyMapImpl = dynamic(() => import("./property-map").then((mod) => mod.PropertyMap), {
  ssr: false,
  loading: () => <MapSkeleton label="LOADING MAP…" />,
});

const LocationPickerImpl = dynamic(() => import("./location-picker").then((mod) => mod.LocationPicker), {
  ssr: false,
  loading: () => <MapSkeleton label="LOADING MAP…" />,
});

export function PropertyMap(props: PropertyMapProps) {
  return (
    <MapErrorBoundary label="The map could not be loaded. All matching listings are still shown in the list.">
      <PropertyMapImpl {...props} />
    </MapErrorBoundary>
  );
}

export function LocationPicker(props: LocationPickerProps) {
  return (
    <MapErrorBoundary label="The map could not be loaded. You can still publish your property without a location pin.">
      <LocationPickerImpl {...props} />
    </MapErrorBoundary>
  );
}

export type { LocationPickerProps, PropertyMapProps };
