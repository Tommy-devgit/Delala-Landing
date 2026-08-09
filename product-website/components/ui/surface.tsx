import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

/** White card on the warm canvas. `panel` is the larger page-level container. */
export const Card = ({
  className,
  as: As = "div",
  ...props
}: HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "article" }) => (
  <As className={twMerge("bg-surface border border-line rounded-card", className)} {...props} />
);

export const Panel = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={twMerge("bg-surface border border-line rounded-panel shadow-sm", className)} {...props} />
);

export type BadgeTone = "neutral" | "primary" | "accent";

const BADGE_TONES: Record<BadgeTone, string> = {
  neutral: "bg-canvas text-muted border-line",
  primary: "bg-primary text-white border-primary",
  accent: "bg-accent/30 text-primary border-accent/50",
};

/** The small uppercase mono pill used for counts, statuses and location tags. */
export const Badge = ({
  tone = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) => (
  <span
    className={twMerge(
      "inline-flex items-center gap-1 px-2.5 py-1 rounded-full border font-mono-label text-label font-bold",
      BADGE_TONES[tone],
      className
    )}
    {...props}
  />
);

/** Loading placeholder that matches the warm palette. */
export const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={twMerge("bg-line/60 rounded-card animate-pulse", className)} {...props} />
);
