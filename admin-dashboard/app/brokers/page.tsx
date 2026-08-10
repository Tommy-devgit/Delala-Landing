"use client";

import { BadgeCheck } from "lucide-react";
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

/**
 * Brokers are a role rather than a separate table, so this is the users list
 * narrowed to that role. The old screen invented licence numbers, ratings and
 * specialisms that do not exist in the schema.
 */
export default function BrokersPage() {
  const { data, loading, error, reload } = useResource(() => adminApi.getUsers(), []);
  const brokers = (data ?? []).filter((u) => u.role === "BROKER");

  return (
    <div>
      <PageHeader
        title="Brokers"
        description="Accounts holding the broker role"
        actions={!loading && <Badge>{brokers.length} brokers</Badge>}
      />

      {error ? (
        <ErrorNotice message={error} onRetry={reload} />
      ) : (
        <DataTable
          columns={["Broker", "Contact", "Listings", "Status", "Joined"]}
          loading={loading}
          empty={
            brokers.length === 0 ? (
              <EmptyState
                icon={<BadgeCheck className="w-6 h-6" aria-hidden="true" />}
                title="No brokers yet"
                description="Give an account the broker role from the Users screen and it will appear here."
              />
            ) : null
          }
        >
          {brokers.map((b) => (
            <tr key={b.id} className="hover:bg-canvas/60 transition-colors">
              <td className="px-4 py-3">
                <p className="text-micro font-semibold text-ink truncate max-w-56">{b.fullName}</p>
                <p className="text-label text-muted truncate max-w-56">{b.email}</p>
              </td>
              <td className="px-4 py-3 text-micro text-body whitespace-nowrap">{b.phone || "—"}</td>
              <td className="px-4 py-3 text-micro text-body tabular">{b.listingCount}</td>
              <td className="px-4 py-3">
                <Badge tone={statusTone(b.status)}>{statusLabel(b.status)}</Badge>
              </td>
              <td className="px-4 py-3 text-label text-muted whitespace-nowrap">{formatDate(b.joinedAt)}</td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
