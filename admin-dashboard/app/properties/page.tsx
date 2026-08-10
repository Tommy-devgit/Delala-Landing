"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AdminProperty, adminApi } from "@/lib/admin-api";
import { useResource } from "@/lib/use-admin";
import { PropertyTable } from "@/components/property-table";
import { ApprovalModal } from "@/components/approval-modal";
import { ErrorNotice, Input, PageHeader, Select } from "@/components/ui";

const STATUSES = [
  { value: "ALL", label: "All statuses" },
  { value: "PENDING_APPROVAL", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export default function PropertiesPage() {
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AdminProperty | null>(null);

  const { data, loading, error, reload } = useResource(
    () => adminApi.getProperties(status, search || undefined),
    [status, search]
  );

  const decide = async (id: string, next: "APPROVED" | "REJECTED", reason?: string) => {
    await adminApi.moderateProperty(id, next, reason);
    reload();
  };

  return (
    <div>
      <PageHeader
        title="Properties"
        description="Every listing in the marketplace, whatever its status"
        actions={
          <>
            <div className="relative">
              <Search
                className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search titles"
                aria-label="Search listings by title"
                className="pl-8 w-44"
              />
            </div>
            <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </>
        }
      />

      {error ? (
        <ErrorNotice message={error} onRetry={reload} />
      ) : (
        <PropertyTable
          properties={data ?? []}
          loading={loading}
          onReview={setSelected}
          emptyTitle="No listings match"
          emptyDescription="Try a different status filter or clear the search."
        />
      )}

      <ApprovalModal property={selected} onClose={() => setSelected(null)} onDecide={decide} />
    </div>
  );
}
