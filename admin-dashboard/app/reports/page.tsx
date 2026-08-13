"use client";

import { useState } from "react";
import Link from "next/link";
import { Flag } from "lucide-react";
import { adminApi, formatDate } from "@/lib/admin-api";
import { useResource } from "@/lib/use-admin";
import {
  Badge,
  Button,
  DataTable,
  EmptyState,
  ErrorNotice,
  PageHeader,
  statusLabel,
  statusTone,
} from "@/components/ui";

export default function ReportsPage() {
  const { data, loading, error, reload } = useResource(() => adminApi.getReports(), []);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  const resolve = async (id: string, status: "RESOLVED" | "DISMISSED") => {
    setBusyId(id);
    setActionError("");
    try {
      await adminApi.resolveReport(id, status);
      reload();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "The report could not be updated.");
    } finally {
      setBusyId(null);
    }
  };

/**
 * Severity, derived from the structured reason the report form records.
 *
 * `reports.reason` stores `"<reason>: <free text>"` — the enum from the public
 * report modal followed by whatever the reporter typed. Grouping by it lets the
 * queue put a fraud claim above a duplicate listing, which a flat
 * newest-first list cannot do. Anything unrecognised is treated as medium
 * rather than silently sorted to the bottom.
 */
const SEVERITY: Record<string, { rank: number; label: string; tone: "danger" | "warn" | "neutral" }> = {
  scam: { rank: 0, label: "High", tone: "danger" },
  fake_property: { rank: 0, label: "High", tone: "danger" },
  suspicious_behaviour: { rank: 1, label: "Medium", tone: "warn" },
  inappropriate_content: { rank: 1, label: "Medium", tone: "warn" },
  incorrect_information: { rank: 2, label: "Low", tone: "neutral" },
  duplicate_listing: { rank: 2, label: "Low", tone: "neutral" },
  other: { rank: 2, label: "Low", tone: "neutral" },
};

const READABLE_REASON: Record<string, string> = {
  scam: "Looks like a scam",
  fake_property: "Property does not exist",
  suspicious_behaviour: "Suspicious behaviour",
  inappropriate_content: "Inappropriate content",
  incorrect_information: "Incorrect information",
  duplicate_listing: "Duplicate listing",
  other: "Something else",
};

const parseReason = (raw: string) => {
  const [key, ...rest] = (raw || "other").split(":");
  const code = key.trim().toLowerCase();
  return {
    code,
    label: READABLE_REASON[code] ?? raw,
    detail: rest.join(":").trim(),
    severity: SEVERITY[code] ?? SEVERITY.other,
  };
};

  const reports = data ?? [];
  const open = reports.filter((r) => r.status === "OPEN").length;

  // Open first, then by severity, then newest. An operator working top-down
  // reaches the most serious unresolved thing first.
  const ordered = [...reports].sort((a, b) => {
    if ((a.status === "OPEN") !== (b.status === "OPEN")) return a.status === "OPEN" ? -1 : 1;
    const rank = parseReason(a.reason).severity.rank - parseReason(b.reason).severity.rank;
    if (rank !== 0) return rank;
    return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
  });

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Listings flagged by users"
        actions={!loading && <Badge tone={open > 0 ? "warn" : "ok"}>{open} open</Badge>}
      />

      {actionError && <div className="mb-3"><ErrorNotice message={actionError} /></div>}

      {error ? (
        <ErrorNotice message={error} onRetry={reload} />
      ) : (
        <DataTable
          columns={["Severity", "Listing", "Reported by", "Reason", "Status", "Received", ""]}
          loading={loading}
          empty={
            reports.length === 0 ? (
              <EmptyState
                icon={<Flag className="w-6 h-6" aria-hidden="true" />}
                title="No reports"
                description="Nothing has been flagged by users."
              />
            ) : null
          }
        >
          {ordered.map((r) => {
            const reason = parseReason(r.reason);
            return (
            <tr key={r.id} className="hover:bg-canvas/60 transition-colors">
              <td className="px-4 py-3">
                <Badge tone={reason.severity.tone}>{reason.severity.label}</Badge>
              </td>
              <td className="px-4 py-3">
                {/* Straight through to the listing being complained about, so a
                    decision does not require hunting for it. */}
                {r.propertyId ? (
                  <Link
                    href={`/properties?search=${encodeURIComponent(r.targetTitle)}`}
                    className="text-micro font-semibold text-ink hover:text-primary transition-colors truncate max-w-56 inline-block"
                  >
                    {r.targetTitle}
                  </Link>
                ) : (
                  <span className="text-micro font-semibold text-ink truncate max-w-56">{r.targetTitle}</span>
                )}
              </td>
              <td className="px-4 py-3 text-micro text-body truncate max-w-40">{r.reporterName}</td>
              <td className="px-4 py-3 max-w-72">
                <p className="text-micro text-ink">{reason.label}</p>
                {reason.detail && <p className="text-label text-muted mt-0.5">{reason.detail}</p>}
              </td>
              <td className="px-4 py-3">
                <Badge tone={statusTone(r.status)}>{statusLabel(r.status)}</Badge>
              </td>
              <td className="px-4 py-3 text-label text-muted whitespace-nowrap">{formatDate(r.reportedAt)}</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                {r.status === "OPEN" ? (
                  <span className="inline-flex gap-2">
                    <Button variant="secondary" size="sm" disabled={busyId === r.id} onClick={() => resolve(r.id, "DISMISSED")}>
                      Dismiss
                    </Button>
                    <Button size="sm" disabled={busyId === r.id} onClick={() => resolve(r.id, "RESOLVED")}>
                      Resolve
                    </Button>
                  </span>
                ) : (
                  <span className="text-label text-muted">Closed</span>
                )}
              </td>
            </tr>
            );
          })}
        </DataTable>
      )}
    </div>
  );
}
