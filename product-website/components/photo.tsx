import { image, type ImageSlot } from "@/lib/imagery";

/**
 * A library photograph, rendered responsively.
 *
 * Plain `<img>` with a `srcset` rather than `next/image`: `next.config.ts` sets
 * `images: { unoptimized: true }`, so `next/image` would add no optimisation
 * here at all — the widths come from `scripts/build-images.mjs` instead, and
 * the browser picks one.
 *
 * `sizes` is required. Without it a browser assumes the image fills the
 * viewport and downloads the largest file for a card in a six-up grid, which
 * defeats the whole pipeline. Making it a required prop means that cannot be
 * forgotten silently.
 */
export function Photo({
  slot,
  sizes,
  className = "",
  priority = false,
}: {
  slot: ImageSlot;
  /** e.g. "(min-width: 1024px) 25vw, 50vw" */
  sizes: string;
  className?: string;
  /** Only for an image above the fold — the hero. Everything else stays lazy. */
  priority?: boolean;
}) {
  const resolved = image(slot);

  return (
    <img
      src={resolved.src}
      srcSet={resolved.srcSet}
      sizes={sizes}
      alt={resolved.alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      style={resolved.position ? { objectPosition: resolved.position } : undefined}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
