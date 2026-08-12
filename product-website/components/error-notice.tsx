import { AlertTriangle, RotateCw } from "lucide-react";

/**
 * What a page shows when data could not be loaded.
 *
 * §26 of the brief: never show a raw backend error, always offer a retry, and
 * never leave the area blank. The message passed in is already a sentence — the
 * API client converts HTTP failures into readable text rather than surfacing
 * status codes or stack traces.
 */
export function ErrorNotice({
  message,
  onRetry,
  className = "",
}: {
  message: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center text-center gap-3 py-12 px-6 rounded-card border border-line bg-surface ${className}`}
    >
      <AlertTriangle className="w-6 h-6 text-primary" aria-hidden="true" />
      <div>
        <h3 className="font-serif-display text-lg text-ink">That didn&rsquo;t load</h3>
        <p className="text-micro text-muted mt-1 max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-control border border-line bg-canvas text-body hover:border-primary/40 transition-colors text-micro font-medium"
        >
          <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
          Try again
        </button>
      )}
    </div>
  );
}
