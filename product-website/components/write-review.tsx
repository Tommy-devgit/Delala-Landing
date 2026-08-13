"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useSession } from "@/lib/use-session";
import { Button, Textarea } from "@/components/ui";

/**
 * Writing a review.
 *
 * The last missing link in the trust chain: `POST /reviews` has worked for a
 * while and both the property page and the poster profile render the list, but
 * nothing called it — so every rating on the site was null and every review
 * list empty, which made the honest "no reviews yet" states permanent.
 *
 * Hidden from the property's own owner, because the API refuses those anyway
 * (a poster rating their own listings is precisely what a rating is evidence
 * against) and offering a form that always fails is worse than not offering it.
 */
export function WriteReview({
  propertyId,
  ownerId,
  onPosted,
}: {
  propertyId: string;
  ownerId?: string;
  onPosted: () => void;
}) {
  const router = useRouter();
  const session = useSession();

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const isOwnListing = Boolean(session && ownerId && session.user.id === ownerId);
  if (isOwnListing) return null;

  if (done) {
    return (
      <div className="p-5 rounded-card bg-surface border border-line">
        <p className="text-micro text-body">
          Thank you — your review is on this property now.
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-5 rounded-card bg-surface border border-line flex flex-wrap items-center justify-between gap-3">
        <p className="text-micro text-muted">Dealt with this property? Sign in to leave a review.</p>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push(`/auth/signin?callbackUrl=/property/${propertyId}`)}
        >
          Sign in
        </Button>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) {
      setError("Choose a rating from one to five stars.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await apiClient.createReview({ propertyId, rating, comment: comment.trim() || undefined });
      setDone(true);
      onPosted();
    } catch (err) {
      // Covers "you have already reviewed this property" and the owner check,
      // both of which the API enforces.
      setError(err instanceof Error ? err.message : "Could not post that review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="p-5 rounded-card bg-surface border border-line space-y-3">
      <h3 className="text-sm font-medium text-ink">Leave a review</h3>

      <fieldset>
        <legend className="text-micro text-muted mb-1.5">Your rating</legend>
        <div className="flex items-center gap-1" onMouseLeave={() => setHovered(0)}>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              onMouseEnter={() => setHovered(value)}
              onFocus={() => setHovered(value)}
              aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
              aria-pressed={rating === value}
              className="p-0.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Star
                className={`w-6 h-6 transition-colors ${
                  value <= (hovered || rating) ? "fill-primary text-primary" : "text-line"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
          {rating > 0 && <span className="text-micro text-muted ml-2">{rating} of 5</span>}
        </div>
      </fieldset>

      <div>
        <label htmlFor="review-comment" className="text-micro text-muted block mb-1.5">
          What should other people know? (optional)
        </label>
        <Textarea
          id="review-comment"
          rows={3}
          maxLength={2000}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="How the property compared to the listing, and how the poster was to deal with."
        />
      </div>

      {error && (
        <p role="alert" className="text-micro text-primary">
          {error}
        </p>
      )}

      <Button type="submit" size="sm" disabled={submitting}>
        {submitting ? "Posting…" : "Post review"}
      </Button>
    </form>
  );
}
