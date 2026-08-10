"use client";

import { ScrollText } from "lucide-react";
import { API_BASE, adminApi, formatDate } from "@/lib/admin-api";
import { useAdminSession, useResource } from "@/lib/use-admin";
import {
  Badge,
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

        <Panel className="p-4">
          <h2 className="text-micro font-semibold text-ink mb-3">Connection</h2>
          <dl className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-label text-muted">API</dt>
              <dd className="text-label text-ink truncate max-w-56">{API_BASE}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-label text-muted">Admin endpoints</dt>
              <dd>
                <Badge tone={error ? "danger" : "ok"}>{error ? "Unreachable" : "Reachable"}</Badge>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-label text-muted">Access control</dt>
              <dd>
                <Badge tone="ok">Role enforced</Badge>
              </dd>
            </div>
          </dl>
        </Panel>
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
