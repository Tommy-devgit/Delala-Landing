"use client";

import { useState } from "react";
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

  const reports = data ?? [];
  const open = reports.filter((r) => r.status === "OPEN").length;

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
          columns={["Listing", "Reported by", "Reason", "Status", "Received", ""]}
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
          {reports.map((r) => (
            <tr key={r.id} className="hover:bg-canvas/60 transition-colors">
              <td className="px-4 py-3 text-micro font-semibold text-ink truncate max-w-56">{r.targetTitle}</td>
              <td className="px-4 py-3 text-micro text-body truncate max-w-40">{r.reporterName}</td>
              <td className="px-4 py-3 text-micro text-body max-w-72">{r.reason}</td>
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
          ))}
        </DataTable>
      )}
    </div>
  );
}
