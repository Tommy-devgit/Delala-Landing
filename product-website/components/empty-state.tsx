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
    <div className="p-12 text-center bg-white rounded-3xl border border-[#ECE7DA] shadow-xs space-y-4 max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[#4C061D] flex items-center justify-center mx-auto shadow-xs">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="font-serif-display text-2xl text-[#1C1B12]">{title}</h3>
      <p className="text-xs text-[#736F4E] leading-relaxed">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-6 py-3 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#B4C292]" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}
