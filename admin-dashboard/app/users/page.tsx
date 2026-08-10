"use client";

import { useState } from "react";
import { Search, Users as UsersIcon } from "lucide-react";
import { adminApi, formatDate } from "@/lib/admin-api";
import { useAdminSession, useResource } from "@/lib/use-admin";
import {
  Badge,
  Button,
  DataTable,
  EmptyState,
  ErrorNotice,
  Input,
  PageHeader,
  Select,
  statusLabel,
  statusTone,
} from "@/components/ui";

const ROLES = ["USER", "BROKER", "MODERATOR", "ADMIN"];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");
  const session = useAdminSession();
  const isAdmin = session?.user.role === "ADMIN";

  const { data, loading, error, reload } = useResource(
    () => adminApi.getUsers(search || undefined),
    [search]
  );

  const mutate = async (id: string, changes: { role?: string; status?: string }) => {
    setBusyId(id);
    setActionError("");
    try {
      await adminApi.updateUser(id, changes);
      reload();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "The change could not be saved.");
    } finally {
      setBusyId(null);
    }
  };

  const users = data ?? [];

  return (
    <div>
      <PageHeader
        title="Users"
        description="Accounts, roles and access across the marketplace"
        actions={
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by email"
              aria-label="Search users by email"
              className="pl-8 w-52"
            />
          </div>
        }
      />

      {actionError && <div className="mb-3"><ErrorNotice message={actionError} /></div>}

      {error ? (
        <ErrorNotice message={error} onRetry={reload} />
      ) : (
        <DataTable
          columns={["Account", "Role", "Status", "Listings", "Joined", ""]}
          loading={loading}
          empty={
            users.length === 0 ? (
              <EmptyState
                icon={<UsersIcon className="w-6 h-6" aria-hidden="true" />}
                title="No accounts found"
                description="No user matches that search."
              />
            ) : null
          }
        >
          {users.map((u) => {
            const isSelf = u.id === session?.user.id;
            const suspended = u.status === "SUSPENDED";

            return (
              <tr key={u.id} className="hover:bg-canvas/60 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-micro font-semibold text-ink truncate max-w-56">{u.fullName}</p>
                  <p className="text-label text-muted truncate max-w-56">{u.email}</p>
                </td>
                <td className="px-4 py-3">
                  {isAdmin && !isSelf ? (
                    <Select
                      value={u.role}
                      disabled={busyId === u.id}
                      aria-label={`Role for ${u.email}`}
                      onChange={(e) => mutate(u.id, { role: e.target.value })}
                      className="h-8 text-label"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {statusLabel(r)}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Badge tone={u.role === "ADMIN" ? "primary" : "neutral"}>{statusLabel(u.role)}</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone(u.status)}>{statusLabel(u.status)}</Badge>
                </td>
                <td className="px-4 py-3 text-micro text-body tabular">{u.listingCount}</td>
                <td className="px-4 py-3 text-label text-muted whitespace-nowrap">{formatDate(u.joinedAt)}</td>
                <td className="px-4 py-3 text-right">
                  {isAdmin && !isSelf && (
                    <Button
                      variant={suspended ? "secondary" : "danger"}
                      size="sm"
                      disabled={busyId === u.id}
                      onClick={() => mutate(u.id, { status: suspended ? "ACTIVE" : "SUSPENDED" })}
                    >
                      {suspended ? "Reactivate" : "Suspend"}
                    </Button>
                  )}
                  {isSelf && <span className="text-label text-muted">You</span>}
                </td>
              </tr>
            );
          })}
        </DataTable>
      )}
    </div>
  );
}
