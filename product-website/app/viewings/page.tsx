"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { CalendarClock, Check, Lock, Phone, X } from "lucide-react";
import { apiClient, Visit, VisitStatus } from "@/lib/api-client";
import { useAsync } from "@/lib/use-async";
import { useSession } from "@/lib/use-session";
import { ErrorNotice } from "@/components/error-notice";
import { EmptyState } from "@/components/empty-state";
import { Badge, BadgeTone, Button, Skeleton, buttonClasses } from "@/components/ui";

const STATUS_TONE: Record<VisitStatus, BadgeTone> = {
  requested: "accent",
  accepted: "primary",
  declined: "neutral",
  completed: "neutral",
  cancelled: "neutral",
};

const STATUS_LABEL: Record<VisitStatus, string> = {
  requested: "Awaiting your answer",
  accepted: "Confirmed",
  declined: "Declined",
  completed: "Completed",
  cancelled: "Cancelled",
};

const formatWhen = (iso: string | null): string => {
  if (!iso) return "No date set";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "No date set";
  return date.toLocaleString("en-GB", { dateStyle: "full", timeStyle: "short" });
};

/**
 * Viewing requests, both sides.
 *
 * Requesting a viewing already notified the owner — but the notification led
 * nowhere, because there was no screen on which an owner could answer it. The
 * whole point of the notification is the decision it is asking for, so this is
 * where that decision gets made.
 *
 * The API decides who may do what; this only offers the actions that will be
 * accepted, so an owner sees accept and decline while a requester sees cancel.
 */
export default function ViewingsPage() {
  const session = useSession();
  const userId = session?.user?.id ?? null;

  const { data, loading, error, retry } = useAsync(
    async () => (userId ? apiClient.getVisits() : []),
    [userId]
  );

  const [pendingId, setPendingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  const visits: Visit[] = data || [];

  const update = useCallback(
    async (visitId: string, status: VisitStatus) => {
      setPendingId(visitId);
      setActionError("");
      try {
        await apiClient.updateVisitStatus(visitId, status);
        retry();
      } catch (err) {
        setActionError(err instanceof Error ? err.message : "Could not update that viewing.");
      } finally {
        setPendingId(null);
      }
    },
    [retry]
  );

  if (!session?.user) {
    return (
      <div className="bg-canvas min-h-screen">
        <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" aria-hidden="true" />
          </div>
          <h1 className="font-serif-display text-2xl text-ink">Sign in to see your viewings</h1>
          <p className="text-micro text-muted leading-relaxed">
            Viewings you have requested, and requests on properties you have listed, appear here.
          </p>
          <Link href="/auth/signin?callbackUrl=/viewings" className={buttonClasses({ size: "lg" })}>
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  const asOwner = visits.filter((v) => v.role === "owner");
  const asRequester = visits.filter((v) => v.role === "requester");

  const renderVisit = (visit: Visit) => {
    const isOwner = visit.role === "owner";
    const busy = pendingId === visit.id;
    const open = visit.status === "requested" || visit.status === "accepted";

    return (
      <li key={visit.id} className="p-5 rounded-card bg-surface border border-line space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-ink truncate">
              {visit.property ? (
                <Link href={`/property/${visit.property.id}`} className="hover:text-primary transition-colors">
                  {visit.property.title}
                </Link>
              ) : (
                "This listing has been removed"
              )}
            </h3>
            <p className="text-micro text-muted mt-0.5 flex items-center gap-1.5">
              <CalendarClock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {formatWhen(visit.visitDate)}
            </p>
          </div>
          <Badge tone={STATUS_TONE[visit.status]}>{STATUS_LABEL[visit.status]}</Badge>
        </div>

        {isOwner && (
          <p className="text-micro text-muted">
            Requested by <span className="text-ink">{visit.requester.name}</span>
            {/* Only shown to the owner, and only once they have accepted. */}
            {visit.requester.phone && visit.status === "accepted" && (
              <>
                {" · "}
                <a href={`tel:${visit.requester.phone}`} className="text-primary hover:underline inline-flex items-center gap-1">
                  <Phone className="w-3 h-3" aria-hidden="true" />
                  {visit.requester.phone}
                </a>
              </>
            )}
          </p>
        )}

        {open && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {isOwner && visit.status === "requested" && (
              <>
                <Button size="sm" disabled={busy} onClick={() => update(visit.id, "accepted")}>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Accept</span>
                </Button>
                <Button size="sm" variant="secondary" disabled={busy} onClick={() => update(visit.id, "declined")}>
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Decline</span>
                </Button>
              </>
            )}
            {isOwner && visit.status === "accepted" && (
              <Button size="sm" variant="secondary" disabled={busy} onClick={() => update(visit.id, "completed")}>
                Mark as done
              </Button>
            )}
            <Button size="sm" variant="secondary" disabled={busy} onClick={() => update(visit.id, "cancelled")}>
              Cancel
            </Button>
          </div>
        )}
      </li>
    );
  };

  const section = (title: string, description: string, list: Visit[]) =>
    list.length > 0 && (
      <section className="space-y-3">
        <div>
          <h2 className="font-serif-display text-xl font-light text-ink">{title}</h2>
          <p className="text-micro text-muted">{description}</p>
        </div>
        <ul className="space-y-3">{list.map(renderVisit)}</ul>
      </section>
    );

  return (
    <div className="bg-canvas min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        <header className="pb-4 border-b border-line">
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">Viewings</h1>
          <p className="text-micro text-muted mt-1">
            Requests you have made, and requests on the properties you have listed.
          </p>
        </header>

        {actionError && (
          <p role="alert" className="text-micro text-primary">
            {actionError}
          </p>
        )}

        {error ? (
          <ErrorNotice message={error} onRetry={retry} />
        ) : loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
        ) : visits.length === 0 ? (
          <EmptyState
            icon={CalendarClock}
            title="No viewings yet"
            description="When you ask to view a property — or somebody asks to view one of yours — it will show up here."
            actionText="Browse listings"
            actionHref="/search"
          />
        ) : (
          <>
            {section(
              "Requests for your properties",
              "You decide whether these go ahead. The person who asked is notified either way.",
              asOwner
            )}
            {section("Your requests", "Viewings you have asked for.", asRequester)}
          </>
        )}
      </div>
    </div>
  );
}
