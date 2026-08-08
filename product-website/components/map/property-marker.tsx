"use client";

import L from "leaflet";

/**
 * Markers are built with divIcon rather than Leaflet's default PNG pins: it keeps
 * them on the Delala palette and avoids the bundler-broken default icon assets.
 */

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });

/** Compact monthly rent label, e.g. 65000 -> "65k". */
export const formatMarkerPrice = (rentETB: number): string => {
  if (!Number.isFinite(rentETB) || rentETB <= 0) return "View";
  if (rentETB >= 1_000_000) return `${(rentETB / 1_000_000).toFixed(1)}M`;
  if (rentETB >= 1000) return `${Math.round(rentETB / 1000)}k`;
  return String(Math.round(rentETB));
};

/** Price pill marker for a marketplace property. */
export const createPropertyIcon = (rentETB: number, isSelected: boolean): L.DivIcon => {
  const label = escapeHtml(formatMarkerPrice(rentETB));
  // Selection is signalled by shape and a checkmark glyph as well as colour, so
  // it does not rely on colour alone.
  const palette = isSelected
    ? "background:#4C061D;color:#FFFFFF;border-color:#4C061D;"
    : "background:#FFFFFF;color:#1C1B12;border-color:#ECE7DA;";

  // iconSize/iconAnchor are zeroed so the pill can centre itself on the
  // coordinate via `transform`, independently of its rendered text width.
  return L.divIcon({
    className: "delala-marker",
    html: `<span style="position:absolute;transform:translate(-50%,-50%);display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:9999px;border:1px solid;font-family:var(--font-mono-label),monospace;font-size:11px;font-weight:700;letter-spacing:0.04em;white-space:nowrap;box-shadow:0 2px 6px rgba(59,57,35,0.18);${palette}">${
      isSelected ? '<span aria-hidden="true">&#9679;</span>' : ""
    }${label}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

/** Single teardrop pin whose tip sits on the coordinate. */
export const createPinIcon = (): L.DivIcon =>
  L.divIcon({
    className: "delala-pin",
    html: `<span style="position:absolute;display:block;width:26px;height:26px;border-radius:50% 50% 50% 0;transform:translate(-50%,-50%) translateY(-18px) rotate(-45deg);background:#4C061D;border:3px solid #FFFFFF;box-shadow:0 3px 8px rgba(59,57,35,0.35);"></span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
