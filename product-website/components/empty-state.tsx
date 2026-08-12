import Link from "next/link";
import { RefreshCw, SearchX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The "there is nothing here" state.
 *
 * §24 of the brief: an empty area has to say what is missing, why, and what to
 * do next. The defaults used to be search-specific — they mentioned widening a
 * price range and turning off generator requirements — so every empty surface
 * in the app, favourites included, gave search advice.
 */
export function EmptyState({
  title,
  description,
  icon: Icon = SearchX,
  actionText,
  actionHref,
  onAction,
  className = "",
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  /** Use for navigation; `onAction` for in-place actions like resetting filters. */
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}) {
  const actionClasses =
    "mt-2 px-5 h-11 rounded-control bg-primary text-white text-micro font-medium hover:bg-primary-hover transition-colors inline-flex items-center justify-center gap-2";

  return (
    <div
      className={`p-10 text-center bg-surface rounded-card border border-line space-y-3 max-w-lg mx-auto ${className}`}
    >
      <div className="w-14 h-14 rounded-full bg-canvas border border-line text-primary flex items-center justify-center mx-auto">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="font-serif-display text-xl text-ink">{title}</h3>
      <p className="text-micro text-muted leading-relaxed max-w-sm mx-auto">{description}</p>

      {actionText && actionHref && (
        <Link href={actionHref} className={actionClasses}>
          {actionText}
        </Link>
      )}

      {actionText && !actionHref && onAction && (
        <button type="button" onClick={onAction} className={actionClasses}>
          <RefreshCw className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}
