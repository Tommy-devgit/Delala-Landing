import Link from "next/link";
import { SearchX, RefreshCw } from "lucide-react";

export function EmptyState({
  title = "No Verified Homes Match Criteria",
  description = "No listings match your exact search filters. Try widening your price range or turning off generator requirements.",
  actionText = "Reset All Filters",
  onAction,
}: {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}) {
  return (
    <div className="p-12 text-center bg-surface rounded-panel border border-line shadow-xs space-y-4 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-full bg-canvas border border-line text-primary flex items-center justify-center mx-auto shadow-xs">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="font-serif-display text-2xl text-ink">{title}</h3>
      <p className="text-xs text-muted leading-relaxed">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-6 py-3 rounded-full bg-primary text-white font-mono-label text-xs font-bold hover:bg-primary-hover transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5 text-accent" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}
