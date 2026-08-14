"use client";

import { useState } from "react";
import { BadgeCheck, Search, Users as UsersIcon } from "lucide-react";
import { adminApi, formatDate } from "@/lib/admin-api";
import type { AdminUserChanges, AdminVerification } from "@/lib/admin-api";
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
import { Avatar } from "@/components/avatar";

const ROLES = ["USER", "BROKER", "MODERATOR", "ADMIN"];

/**
 * The three checks an administrator can grant, and the field each one sets.
 *
 * This is the only place in the entire system that writes these. Until somebody
 * ticks one here, every trust badge on the marketplace and the "verified
 * posters" section of the homepage are empty â€” which is correct, and was the
 * point of removing the `verified: true` that used to be attached to every
 * poster automatically.
 *
 * The labels say precisely what was checked, because that is what a visitor
 * reads on the listing. Only tick one when you have actually seen the evidence.
 */
const CHECKS: { key: keyof AdminVerification; field: keyof AdminUserChanges; label: string; hint: string }[] = [
  { key: "phone", field: "phoneVerified", label: "Phone", hint: "The poster controls the number on their profile" },
  { key: "identity", field: "identityVerified", label: "ID", hint: "Identification checked against the profile name" },
  { key: "business", field: "businessVerified", label: "Business", hint: "A registered agency showed its registration" },
];

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

  const mutate = async (id: string, changes: AdminUserChanges) => {
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
          <div className="relative flex-1 min-w-40 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by email"
              aria-label="Search users by email"
              className="pl-8 w-full sm:w-52"
            />
          </div>
        }
      />

      {actionError && <div className="mb-3"><ErrorNotice message={actionError} /></div>}

      {error ? (
        <ErrorNotice message={error} onRetry={reload} />
      ) : (
        <DataTable
          columns={["Account", "Role", "Status", "Verification", "Listings", "Joined", ""]}
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
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar src={u.avatarUrl} name={u.fullName} size={32} />
                    <div className="min-w-0">
                      <p className="text-micro font-semibold text-ink truncate max-w-48">{u.fullName}</p>
                      <p className="text-label text-muted truncate max-w-48">{u.email}</p>
                    </div>
                  </div>
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
                <td className="px-4 py-3">
                  {isAdmin ? (
                    <fieldset className="flex items-center gap-2.5">
                      <legend className="sr-only">Verification checks for {u.email}</legend>
                      {CHECKS.map((check) => (
                        <label
                          key={check.key}
                          title={check.hint}
                          className="flex items-center gap-1 text-label text-body cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={u.verification[check.key]}
                            disabled={busyId === u.id}
                            onChange={(e) => mutate(u.id, { [check.field]: e.target.checked })}
                            className="w-3.5 h-3.5 accent-primary"
                          />
                          {check.label}
                        </label>
                      ))}
                    </fieldset>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      {CHECKS.filter((check) => u.verification[check.key]).map((check) => (
                        <Badge key={check.key} tone="ok">
                          <BadgeCheck className="w-3 h-3" aria-hidden="true" />
                          {check.label}
                        </Badge>
                      ))}
                      {!CHECKS.some((check) => u.verification[check.key]) && (
                        <span className="text-label text-muted">None</span>
                      )}
                    </div>
                  )}
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
