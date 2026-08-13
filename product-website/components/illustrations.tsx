/**
 * A small illustration language for empty and explanatory states (§27).
 *
 * Rules that keep these coherent, and keep them from turning into clip art:
 *
 * - **Two colours only**, both from the brand: `currentColor` for structure
 *   (inherited, so a burgundy or muted parent both work) and `--color-accent`
 *   for the single point of emphasis.
 * - **Line weight is constant** at 1.5, and shapes are geometric. Nothing is
 *   shaded, nothing has a gradient, nothing is a character.
 * - **One idea each.** They mark the state; the words explain it.
 * - Inline SVG rather than files, so they inherit colour and cost no request.
 *
 * They are decorative — every one is `aria-hidden`, because the heading beside
 * them already carries the meaning. An illustration that needs alt text is
 * doing a job the copy should be doing.
 */

const STROKE = {
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type Props = { className?: string };

const wrapper = (className?: string) =>
  `w-28 h-28 text-muted ${className ?? ""}`;

/** Saved homes: a house holding a bookmark. */
export function SavedIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 96 96" className={wrapper(className)} aria-hidden="true">
      <g stroke="currentColor" {...STROKE}>
        <path d="M20 44 48 22l28 22" />
        <path d="M28 42v30h40V42" />
      </g>
      <path
        d="M42 52h12v20l-6-5-6 5z"
        fill="var(--color-accent)"
        stroke="var(--color-primary)"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** No results: a house behind a magnifier. */
export function SearchIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 96 96" className={wrapper(className)} aria-hidden="true">
      <g stroke="currentColor" {...STROKE}>
        <path d="M18 46 40 28l22 18" />
        <path d="M25 44v26h30V44" />
      </g>
      <circle cx="60" cy="58" r="14" fill="var(--color-accent)" fillOpacity={0.35} />
      <g stroke="var(--color-primary)" {...STROKE}>
        <circle cx="60" cy="58" r="14" />
        <path d="m70 68 8 8" />
      </g>
    </svg>
  );
}

/** Nothing to compare: two panels side by side, one marked. */
export function CompareIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 96 96" className={wrapper(className)} aria-hidden="true">
      <g stroke="currentColor" {...STROKE}>
        <rect x="16" y="26" width="28" height="44" rx="3" />
        <rect x="52" y="26" width="28" height="44" rx="3" />
        <path d="M22 38h16M22 46h12M58 38h16M58 46h12" />
      </g>
      <circle cx="66" cy="60" r="6" fill="var(--color-accent)" />
    </svg>
  );
}

/** Nothing viewed yet: a clock face over a doorway. */
export function HistoryIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 96 96" className={wrapper(className)} aria-hidden="true">
      <g stroke="currentColor" {...STROKE}>
        <path d="M26 40 48 22l22 18" />
        <path d="M32 38v32h32V38" />
      </g>
      <circle cx="48" cy="56" r="13" fill="var(--color-accent)" fillOpacity={0.35} />
      <g stroke="var(--color-primary)" {...STROKE}>
        <circle cx="48" cy="56" r="13" />
        <path d="M48 49v7l5 3" />
      </g>
    </svg>
  );
}

/** No saved searches: a filter funnel with a bookmark. */
export function SavedSearchIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 96 96" className={wrapper(className)} aria-hidden="true">
      <g stroke="currentColor" {...STROKE}>
        <path d="M20 26h44L46 50v18l-8 6V50z" />
      </g>
      <path
        d="M62 44h14v26l-7-6-7 6z"
        fill="var(--color-accent)"
        stroke="var(--color-primary)"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Nothing arrived: a bell at rest. */
export function NotificationsIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 96 96" className={wrapper(className)} aria-hidden="true">
      <g stroke="currentColor" {...STROKE}>
        <path d="M32 62V46a16 16 0 0 1 32 0v16l5 8H27z" />
        <path d="M42 70a6 6 0 0 0 12 0" />
        <path d="M48 30v-6" />
      </g>
      <circle cx="48" cy="46" r="5" fill="var(--color-accent)" />
    </svg>
  );
}

/** No listings of your own yet: an empty plot with a marker. */
export function ListingsIllustration({ className }: Props) {
  return (
    <svg viewBox="0 0 96 96" className={wrapper(className)} aria-hidden="true">
      <g stroke="currentColor" {...STROKE}>
        <path d="M16 72h64" />
        <rect x="24" y="44" width="22" height="28" rx="2" />
        <path d="M30 52h10M30 60h10" />
      </g>
      <path
        d="M62 34a8 8 0 0 1 8 8c0 6-8 14-8 14s-8-8-8-14a8 8 0 0 1 8-8z"
        fill="var(--color-accent)"
        stroke="var(--color-primary)"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}
