"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Flag, X } from "lucide-react";
import { apiClient, REPORT_REASONS } from "@/lib/api-client";
import { useSession } from "@/lib/use-session";
import { Button, FieldLabel, Textarea } from "@/components/ui";

/**
 * "Report listing" (§21).
 *
 * The `reports` table and the admin queue that reads it both already existed;
 * nothing could write to it, so the queue could only ever be empty and this
 * action could not be offered anywhere. The reasons come from the shared list
 * so the moderators' grouping matches what people were actually asked.
 *
 * Deliberately says nothing about what happens next: telling a reporter that
 * their report was actioned tells them, and anyone who can see their screen,
 * something about another user's account.
 */
export function ReportListingModal({
  propertyId,
  propertyTitle,
  isOpen,
  onClose,
}: {
  propertyId: string;
  propertyTitle: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const session = useSession();
  const [reason, setReason] = useState<string>(REPORT_REASONS[0].value);
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      await apiClient.reportProperty({ propertyId, reason, details: details.trim() || undefined });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send that report.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[900] bg-black/45 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-title"
    >
      <div className="bg-surface w-full sm:max-w-lg rounded-t-panel sm:rounded-panel border border-line p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-primary" aria-hidden="true" />
            <h2 id="report-title" className="font-serif-display text-xl text-ink">
              Report this listing
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-canvas transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {sent ? (
          <div className="space-y-3">
            <p className="text-micro text-body leading-relaxed">
              Thank you — this has gone to Delala&rsquo;s moderators. The poster is not told who
              reported them.
            </p>
            <p className="text-micro text-muted leading-relaxed">
              If you have lost money or been threatened, contact the police. Delala cannot recover
              payments made outside the platform.
            </p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <>
            <p className="text-micro text-muted leading-relaxed truncate">{propertyTitle}</p>

            <fieldset className="space-y-2">
              <legend className="text-micro font-medium text-ink mb-1">
                What is wrong with it?
              </legend>
              {REPORT_REASONS.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-2.5 p-3 rounded-control border border-line bg-canvas cursor-pointer hover:border-primary/40 transition-colors"
                >
                  <input
                    type="radio"
                    name="report-reason"
                    value={option.value}
                    checked={reason === option.value}
                    onChange={() => setReason(option.value)}
                    className="w-4 h-4 accent-primary shrink-0"
                  />
                  <span className="text-micro text-body">{option.label}</span>
                </label>
              ))}
            </fieldset>

            <div>
              <FieldLabel htmlFor="report-details">Anything else? (optional)</FieldLabel>
              <Textarea
                id="report-details"
                rows={3}
                value={details}
                maxLength={1000}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Whatever would help a moderator understand the problem."
              />
            </div>

            {error && (
              <p role="alert" className="text-micro text-primary">
                {error}
              </p>
            )}

            {!session && (
              <p className="text-micro text-muted">You will be asked to sign in first.</p>
            )}

            <div className="flex items-center gap-2 pt-1">
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Sending…" : "Send report"}
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
