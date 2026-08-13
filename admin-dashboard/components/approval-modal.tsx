"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ImageOff, Loader2, X, XCircle } from "lucide-react";
import { AdminProperty, formatETB, formatDate } from "@/lib/admin-api";
import { Badge, Button, statusLabel, statusTone } from "@/components/ui";

/**
 * Moderation dialog. The decision is sent to the API and only closes once the
 * request succeeds — previously it mutated local state and forgot the change on
 * the next refresh.
 */
export function ApprovalModal({
  property,
  onClose,
  onDecide,
}: {
  property: AdminProperty | null;
  onClose: () => void;
  onDecide: (id: string, status: "APPROVED" | "REJECTED", reason?: string) => Promise<void>;
}) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState<"APPROVED" | "REJECTED" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!property) return null;

  const decide = async (status: "APPROVED" | "REJECTED") => {
    if (status === "REJECTED" && !reason.trim()) {
      setError("Give a reason so the owner knows what to fix.");
      return;
    }
    setError("");
    setSubmitting(status);
    try {
      await onDecide(property.id, status, reason.trim() || undefined);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "The decision could not be saved.");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45"
      role="dialog"
      aria-modal="true"
      aria-label={`Review ${property.title}`}
      onClick={onClose}
    >
      <div
        className="bg-surface w-full max-w-lg rounded-panel border border-line shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 border-b border-line flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-serif-display text-lg text-ink truncate">{property.title}</h2>
            <p className="text-label text-muted mt-0.5">
              Submitted {formatDate(property.submittedAt)} by {property.ownerName}
              {property.ownerPhone && (
                <>
                  {" · "}
                  <a href={`tel:${property.ownerPhone}`} className="text-primary hover:underline">
                    {property.ownerPhone}
                  </a>
                </>
              )}
            </p>
            <p className="text-label text-muted mt-0.5">
              {[property.subCity, property.city].filter(Boolean).join(", ") || "No location given"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full text-muted hover:text-ink hover:bg-canvas flex items-center justify-center shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* The photograph, which this modal did not show at all — an operator
              was approving a listing without seeing the thing being listed. A
              listing with none is itself a moderation signal, so the absence is
              stated rather than hidden behind a placeholder. */}
          <div className="aspect-16/9 rounded-card overflow-hidden bg-canvas border border-line">
            {property.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={property.heroImage}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-muted">
                <ImageOff className="w-5 h-5" aria-hidden="true" />
                <span className="text-label">No photographs submitted</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Rent", value: formatETB(property.rentETB) },
              { label: "Type", value: property.propertyType },
              { label: "Bedrooms", value: String(property.bedrooms) },
              { label: "Area", value: property.areaSqm ? `${property.areaSqm} m²` : "—" },
            ].map((f) => (
              <div key={f.label}>
                <p className="text-label text-muted">{f.label}</p>
                <p className="text-micro font-semibold text-ink mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Badge tone={statusTone(property.status)}>{statusLabel(property.status)}</Badge>
            <span className="text-label text-muted">
              {[property.subCity, property.city].filter(Boolean).join(", ") || "No location set"}
            </span>
          </div>

          <div>
            <label htmlFor="reason" className="block text-label font-semibold text-muted mb-1">
              Reason (required to reject)
            </label>
            <textarea
              id="reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Photos do not match the described property"
              className="w-full p-3 rounded-control bg-canvas border border-line text-micro text-ink placeholder:text-muted/70 focus:outline-none focus:border-primary"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-control bg-danger-soft border border-danger/25 px-3 py-2 text-label text-danger">
              {error}
            </p>
          )}
        </div>

        <div className="px-5 py-3.5 bg-canvas border-t border-line flex items-center justify-end gap-2">
          <Button variant="danger" onClick={() => decide("REJECTED")} disabled={submitting !== null}>
            {submitting === "REJECTED" ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <XCircle className="w-4 h-4" aria-hidden="true" />
            )}
            <span>Reject</span>
          </Button>

          <Button onClick={() => decide("APPROVED")} disabled={submitting !== null}>
            {submitting === "APPROVED" ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-accent" aria-hidden="true" />
            )}
            <span>Approve &amp; publish</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
