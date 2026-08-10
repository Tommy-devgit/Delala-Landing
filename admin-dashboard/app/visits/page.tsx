"use client";

import { Calendar } from "lucide-react";
import { adminApi, formatDate } from "@/lib/admin-api";
import { useResource } from "@/lib/use-admin";
import {
  Badge,
  DataTable,
  EmptyState,
  ErrorNotice,
  PageHeader,
  statusLabel,
  statusTone,
} from "@/components/ui";

export default function VisitsPage() {
  const { data, loading, error, reload } = useResource(() => adminApi.getVisits(), []);
  const visits = data ?? [];

  return (
    <div>
      <PageHeader
        title="Visits"
        description="Walkthrough requests raised from listing pages"
        actions={!loading && <Badge>{visits.length} total</Badge>}
      />

      {error ? (
        <ErrorNotice message={error} onRetry={reload} />
      ) : (
        <DataTable
          columns={["Listing", "Requested by", "Preferred date", "Status", "Requested"]}
          loading={loading}
          empty={
            visits.length === 0 ? (
              <EmptyState
                icon={<Calendar className="w-6 h-6" aria-hidden="true" />}
                title="No visit requests"
                description="Requests made from a property page will appear here."
              />
            ) : null
          }
        >
          {visits.map((v) => (
            <tr key={v.id} className="hover:bg-canvas/60 transition-colors">
              <td className="px-4 py-3 text-micro font-semibold text-ink truncate max-w-64">{v.propertyTitle}</td>
              <td className="px-4 py-3 text-micro text-body truncate max-w-40">{v.seekerName}</td>
              <td className="px-4 py-3 text-micro text-body whitespace-nowrap">{formatDate(v.visitDate)}</td>
              <td className="px-4 py-3">
                <Badge tone={statusTone(v.status)}>{statusLabel(v.status)}</Badge>
              </td>
              <td className="px-4 py-3 text-label text-muted whitespace-nowrap">{formatDate(v.requestedAt)}</td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
