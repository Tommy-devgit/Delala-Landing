"use client";

import { useState } from "react";

/** "Tomas Melesse" -> "TM"; falls back to the first two characters. */
export const initialsFrom = (name?: string | null): string => {
  const words = (name || "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

/**
 * Profile picture with an initials fallback.
 *
 * The image is attempted whenever there is a source at all; initials only show
 * if it is missing or fails to load. That covers broken storage links and the
 * legacy placeholder paths without having to special-case URL shapes.
 */
export function Avatar({
  src,
  name,
  size = 28,
  className = "",
}: {
  src?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const usable = Boolean(src) && !failed && src !== "/images/hero_home_away.jpg";

  const dimension = { width: size, height: size };

  if (usable) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src as string}
        alt=""
        style={dimension}
        onError={() => setFailed(true)}
        className={`rounded-full object-cover bg-line shrink-0 ${className}`}
      />
    );
  }

  return (
    <span
      style={dimension}
      aria-hidden="true"
      className={`rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 ${className}`}
    >
      <span style={{ fontSize: Math.max(9, Math.round(size * 0.36)) }}>{initialsFrom(name)}</span>
    </span>
  );
}
