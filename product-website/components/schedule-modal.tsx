"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, CheckCircle2, X } from "lucide-react";
import { Property } from "@/lib/types";
import { apiClient } from "@/lib/api-client";
import { useSession } from "@/lib/use-session";
import { buttonClasses, FieldLabel, Input, Select } from "@/components/ui";
import { PropertyPhoto } from "@/components/property-photo";

/** 09:00 to 18:00 on the half hour — the window most viewings happen in. */
const TIME_SLOTS = Array.from({ length: 19 }, (_, i) => {
  const minutes = 9 * 60 + i * 30;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

const tomorrow = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
};

/**
 * Requests a viewing.
 *
 * The date was a `<select>` of strings like "Tomorrow (10:00 AM)", sent to an
 * API that discarded it — so no visit in the database had a date, and neither
 * side could know when anybody was coming. Name and phone were collected and
 * also discarded; they are on the requester's profile, which the owner is shown
 * when the request arrives, so this no longer asks for them twice.
 *
 * A viewing is now attributed to the signed-in user rather than the literal
 * string `"guest-user"`, which means signing in is a precondition.
 */
export function ScheduleModal({
  isOpen,
  onClose,
  property,
}: {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}) {
  const router = useRouter();
  const session = useSession();

  const [date, setDate] = useState(tomorrow());
  const [time, setTime] = useState("10:00");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      router.push(`/auth/signin?callbackUrl=/property/${property.slug}`);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Built in the visitor's own timezone and sent as an instant, so the
      // owner sees the time the visitor meant.
      await apiClient.scheduleVisit({
        propertyId: property.id,
        visitDate: new Date(`${date}T${time}`).toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      // This used to report success unconditionally, so a request that never
      // reached the server still showed a confirmation.
      setError(err instanceof Error ? err.message : "Could not request that viewing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-title"
    >
      <div className="bg-surface w-full max-w-lg rounded-panel border border-line shadow-2xl overflow-hidden font-sans max-h-[90vh] overflow-y-auto">
        <div className="p-6 bg-canvas border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-card bg-primary text-white flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 id="schedule-title" className="font-serif-display text-xl text-ink">
                Request a viewing
              </h3>
              <p className="text-micro text-muted">
                The poster decides whether to accept, and you will be notified either way.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-control text-muted hover:text-primary hover:bg-line transition-colors shrink-0"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
            </div>
            <h4 className="font-serif-display text-2xl text-ink">Request sent</h4>
            <p className="text-micro text-muted max-w-xs mx-auto leading-relaxed">
              <strong className="text-ink">{property.broker?.name || "The poster"}</strong> has been
              notified about <strong className="text-ink">{property.title}</strong>. Nothing is
              confirmed until they accept.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className={buttonClasses({ size: "md" })}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3.5 rounded-card bg-canvas border border-line flex items-center gap-3">
              <div className="w-14 h-14 rounded-control overflow-hidden shrink-0">
                <PropertyPhoto src={property.heroImage} alt={property.title} sizeHint="thumb" />
              </div>
              <div className="min-w-0">
                <div className="font-medium text-sm text-ink line-clamp-1">{property.title}</div>
                <div className="text-micro text-primary">
                  ETB {property.rentETB.toLocaleString()}
                  {property.listingType === "sale" ? "" : "/mo"}
                  {property.subCity ? ` • ${property.subCity}` : ""}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <FieldLabel htmlFor="visit-date">Preferred date</FieldLabel>
                <Input
                  id="visit-date"
                  type="date"
                  required
                  min={tomorrow()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel htmlFor="visit-time">Preferred time</FieldLabel>
                <Select id="visit-time" value={time} onChange={(e) => setTime(e.target.value)}>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <p className="text-micro text-muted leading-relaxed">
              Read the{" "}
              <a href="/safety" className="text-primary hover:underline">
                viewing safety guidance
              </a>{" "}
              before you go. Never pay anything before seeing the property.
            </p>

            {error && (
              <p role="alert" className="text-micro text-primary">
                {error}
              </p>
            )}

            {!session && (
              <p className="text-micro text-muted">You will be asked to sign in first.</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={buttonClasses({ size: "lg", className: "w-full" })}
            >
              <span>{isSubmitting ? "Sending…" : "Request viewing"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
