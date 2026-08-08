"use client";

import { Component, ReactNode } from "react";
import { MapPinOff } from "lucide-react";

/**
 * The map is an additive layer over the marketplace: if Leaflet fails to
 * initialize, this keeps the failure contained so the property list, filters and
 * cards continue to work.
 */
export class MapErrorBoundary extends Component<
  { children: ReactNode; label?: string },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="status"
          className="w-full h-full min-h-[280px] flex flex-col items-center justify-center gap-2 bg-[#FAF8F4] border border-[#ECE7DA] rounded-2xl p-6 text-center"
        >
          <MapPinOff className="w-7 h-7 text-[#736F4E]" aria-hidden="true" />
          <p className="font-mono-label text-[10px] text-[#4C061D] font-bold">MAP UNAVAILABLE</p>
          <p className="text-xs text-[#736F4E] max-w-xs">
            {this.props.label || "The map could not be loaded. Everything else on this page still works."}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
