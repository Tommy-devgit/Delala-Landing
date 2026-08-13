"use client";

import { Star } from "lucide-react";
import { ReviewSummary } from "@/lib/api-client";
import { Avatar } from "@/components/avatar";
import { ErrorNotice } from "@/components/error-notice";
import { Skeleton } from "@/components/ui";
import { formatPostedDate } from "@/lib/format";

/** Five stars with `filled` of them solid. Decorative — the number is in text. */
function Stars({ filled }: { filled: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-3.5 h-3.5 ${n <= Math.round(filled) ? "fill-primary text-primary" : "text-line"}`}
        />
      ))}
    </span>
  );
}

/**
 * Reviews for a property or across everything a poster has listed.
 *
 * The average is null until somebody has actually written one, and the empty
 * state says so rather than showing a rating of zero. Every poster on the site
 * used to carry a hardcoded 4.9 out of 12 reviews with no review table behind
 * it at all; a visible "no reviews yet" is more use to a reader than a number
 * that was never earned.
 */
export function ReviewsSection({
  summary,
  loading,
  error,
  onRetry,
  emptyMessage = "Nobody has reviewed this poster yet.",
  title = "Reviews",
}: {
  summary: ReviewSummary | null;
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  emptyMessage?: string;
  title?: string;
}) {
  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
        <h2 className="font-serif-display text-xl font-light text-ink">{title}</h2>

        {summary && summary.average !== null && (
          <p className="flex items-center gap-2 text-micro text-body">
            <Stars filled={summary.average} />
            <span className="font-medium text-ink">{summary.average.toFixed(1)}</span>
            <span className="text-muted">
              from {summary.count} {summary.count === 1 ? "review" : "reviews"}
            </span>
          </p>
        )}
      </div>

      {error ? (
        <ErrorNotice message={error} onRetry={onRetry} />
      ) : loading ? (
        <div className="space-y-2">
          {Array.from({ length: 2 }, (_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : !summary || summary.data.length === 0 ? (
        <p className="text-micro text-muted py-2">{emptyMessage}</p>
      ) : (
        <ul className="space-y-3">
          {summary.data.map((review) => (
            <li key={review.id} className="p-4 rounded-card bg-surface border border-line space-y-2">
              <div className="flex items-center gap-2.5">
                <Avatar src={review.author.avatarUrl} name={review.author.name} size={32} />
                <div className="min-w-0">
                  <p className="text-micro font-medium text-ink truncate">{review.author.name}</p>
                  <p className="text-label text-muted">
                    {review.createdAt ? formatPostedDate(review.createdAt) : ""}
                  </p>
                </div>
                {review.rating !== null && (
                  <span className="ml-auto flex items-center gap-1.5 shrink-0">
                    <Stars filled={review.rating} />
                    <span className="sr-only">{review.rating} out of 5</span>
                  </span>
                )}
              </div>

              {review.comment && (
                <p className="text-micro text-body leading-relaxed">{review.comment}</p>
              )}

              {/* On a poster profile the same list spans several listings, so
                  each review says which one it is about. */}
              {review.property && (
                <p className="text-label text-muted">On {review.property.title}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
