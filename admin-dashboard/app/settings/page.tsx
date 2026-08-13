"use client";

import { ScrollText } from "lucide-react";
import { adminApi, formatDate } from "@/lib/admin-api";
import { useAdminSession, useResource } from "@/lib/use-admin";
import {
  DataTable,
  EmptyState,
  ErrorNotice,
  PageHeader,
  Panel,
} from "@/components/ui";

export default function SettingsPage() {
  const session = useAdminSession();
  const { data, loading, error, reload } = useResource(() => adminApi.getAuditLogs(), []);
  const logs = data ?? [];

  return (
    <div className="space-y-5">
      <PageHeader title="Settings" description="Environment and the record of administrative actions" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Panel className="p-4">
          <h2 className="text-micro font-semibold text-ink mb-3">Signed in as</h2>
          <dl className="space-y-2">
            {[
              ["Name", session?.user.fullName],
              ["Email", session?.user.email],
              ["Role", session?.user.role],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3">
                <dt className="text-label text-muted">{label}</dt>
                <dd className="text-micro text-ink truncate max-w-52">{value || "—"}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        {/* The "Connection" panel that sat here — API base URL, a reachable
            badge, an "access control: role enforced" badge — told an operator
            nothing they could act on. If the API is unreachable every screen
            already says so, loudly, where it matters. */}
      </div>

      <div>
        <h2 className="text-micro font-semibold text-ink mb-2">Audit log</h2>
        {error ? (
          <ErrorNotice message={error} onRetry={reload} />
        ) : (
          <DataTable
            columns={["Action", "Performed by", "Record", "When"]}
            loading={loading}
            empty={
              logs.length === 0 ? (
                <EmptyState
                  icon={<ScrollText className="w-6 h-6" aria-hidden="true" />}
                  title="No entries yet"
                  description="Approvals, rejections and account changes are recorded here."
                />
              ) : null
            }
          >
            {logs.map((l) => (
              <tr key={l.id} className="hover:bg-canvas/60 transition-colors">
                <td className="px-4 py-3 text-micro font-semibold text-ink">{l.action}</td>
                <td className="px-4 py-3 text-micro text-body truncate max-w-40">{l.actorName}</td>
                <td className="px-4 py-3 text-label text-muted">
                  {l.tableName}
                  {l.recordId ? ` · ${l.recordId.slice(0, 8)}` : ""}
                </td>
                <td className="px-4 py-3 text-label text-muted whitespace-nowrap">{formatDate(l.createdAt)}</td>
              </tr>
            ))}
          </DataTable>
        )}
      </div>
    </div>
  );
}
