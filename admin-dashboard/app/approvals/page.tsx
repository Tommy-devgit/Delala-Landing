"use client";

import { useState } from "react";
import { AdminProperty, adminApi } from "@/lib/admin-api";
import { useResource } from "@/lib/use-admin";
import { PropertyTable } from "@/components/property-table";
import { ApprovalModal } from "@/components/approval-modal";
import { Badge, ErrorNotice, PageHeader } from "@/components/ui";

export default function ApprovalsPage() {
  const { data, loading, error, reload } = useResource(
    () => adminApi.getProperties("PENDING_APPROVAL"),
    []
  );
  const [selected, setSelected] = useState<AdminProperty | null>(null);

  const decide = async (id: string, status: "APPROVED" | "REJECTED", reason?: string) => {
    await adminApi.moderateProperty(id, status, reason);
    reload();
  };

  const pending = data ?? [];

  return (
    <div>
      <PageHeader
        title="Approvals"
        description="Listings waiting for a decision before they are marked verified"
        actions={
          !loading && (
            <Badge tone={pending.length > 0 ? "warn" : "ok"}>
              {pending.length} awaiting review
            </Badge>
          )
        }
      />

      {error ? (
        <ErrorNotice message={error} onRetry={reload} />
      ) : (
        <PropertyTable
          properties={pending}
          loading={loading}
          onReview={setSelected}
          emptyTitle="The queue is clear"
          emptyDescription="Every submitted listing has been reviewed. New submissions will appear here."
        />
      )}

      <ApprovalModal property={selected} onClose={() => setSelected(null)} onDecide={decide} />
    </div>
  );
}
