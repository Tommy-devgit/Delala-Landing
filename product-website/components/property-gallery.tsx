"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { PropertyPhoto } from "@/components/property-photo";

/**
 * The photographs of one property.
 *
 * Replaces a static hero plus four thumbnails that could only ever show the
 * first five images and had no way to see any of them larger. This adds the
 * things a gallery is expected to do — full screen, arrow keys, swipe, a count
 * — without decorating the photographs themselves, which are the point.
 *
 * A listing with no photographs still renders: `PropertyPhoto` draws the
 * absence honestly rather than substituting a stock interior.
 */
export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const count = images.length;
  const current = images[index] ?? null;

  const go = useCallback(
    (delta: number) => {
      if (count === 0) return;
      // Wraps, so arrowing past either end continues rather than dead-ends.
      setIndex((i) => (i + delta + count) % count);
    },
    [count]
  );

  // Arrow keys drive the gallery whenever it is open full screen; Escape
  // closes. Bound to the document because the overlay owns the whole screen.
  useEffect(() => {
    if (!fullscreen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "Escape") setFullscreen(false);
    };

    document.addEventListener("keydown", onKey);
    // The page behind must not scroll while the overlay is up.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [fullscreen, go]);

  // Focus moves into the overlay when it opens, so the keyboard is immediately
  // in the right place and Escape is discoverable.
  useEffect(() => {
    if (fullscreen) closeButtonRef.current?.focus();
  }, [fullscreen]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    // 50px so a slightly untidy tap is not read as a swipe.
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
        <div
          className="lg:col-span-8 aspect-16/10 rounded-panel overflow-hidden border border-line bg-ink relative group"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <PropertyPhoto src={current} alt={title} sizeHint="hero" />

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photograph"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface/90 text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photograph"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface/90 text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </>
          )}

          {count > 0 && (
            <>
              <button
                type="button"
                onClick={() => setFullscreen(true)}
                className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-surface/90 text-ink text-label hover:bg-surface transition-colors"
              >
                <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                View full screen
              </button>
              <span className="absolute left-3 bottom-3 px-2.5 py-1 rounded-full bg-ink/70 text-white text-label">
                {index + 1} of {count}
              </span>
            </>
          )}
        </div>

        {/* Thumbnails. Every photograph, not the first four. */}
        {count > 1 && (
          <div className="lg:col-span-4 grid grid-cols-4 lg:grid-cols-2 gap-3 lg:max-h-[calc(100%)] lg:overflow-y-auto">
            {images.map((img, idx) => (
              <button
                key={img + idx}
                type="button"
                onClick={() => setIndex(idx)}
                aria-label={`Show photograph ${idx + 1} of ${count}`}
                aria-current={idx === index}
                className={`rounded-card overflow-hidden border aspect-4/3 transition-colors ${
                  idx === index ? "border-primary ring-2 ring-primary/30" : "border-line hover:border-primary/40"
                }`}
              >
                <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {fullscreen && current && (
        <div
          className="fixed inset-0 z-[1000] bg-ink/95 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={`Photographs of ${title}`}
        >
          <div className="flex items-center justify-between p-4 text-white shrink-0">
            <span className="text-micro" aria-live="polite">
              {index + 1} of {count}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setFullscreen(false)}
              aria-label="Close full screen"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="flex-1 min-h-0 flex items-center justify-center px-4 pb-4"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={current}
              alt={`${title} — photograph ${index + 1} of ${count}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {count > 1 && (
            <div className="flex items-center justify-center gap-3 p-4 shrink-0">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photograph"
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photograph"
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
