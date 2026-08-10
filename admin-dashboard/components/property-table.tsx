"use client";

import { Building2 } from "lucide-react";
import { AdminProperty, formatETB, formatDate } from "@/lib/admin-api";
import { Badge, Button, DataTable, EmptyState, statusLabel, statusTone } from "@/components/ui";

export function PropertyTable({
  properties,
  loading,
  onReview,
  emptyTitle = "No listings",
  emptyDescription,
}: {
  properties: AdminProperty[];
  loading?: boolean;
  onReview?: (property: AdminProperty) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  return (
    <DataTable
      columns={["Listing", "Location", "Owner", "Rent", "Status", "Submitted", ""]}
      loading={loading}
      empty={
        properties.length === 0 ? (
          <EmptyState
            icon={<Building2 className="w-6 h-6" aria-hidden="true" />}
            title={emptyTitle}
            description={emptyDescription}
          />
        ) : null
      }
    >
      {properties.map((p) => (
        <tr key={p.id} className="hover:bg-canvas/60 transition-colors">
          <td className="px-4 py-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {p.heroImage && !p.heroImage.startsWith("data:") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.heroImage}
                  alt=""
                  loading="lazy"
                  className="w-9 h-9 rounded-control object-cover border border-line shrink-0"
                />
              ) : (
                <span className="w-9 h-9 rounded-control bg-canvas border border-line flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-muted" aria-hidden="true" />
                </span>
              )}
              <div className="min-w-0">
                <p className="text-micro font-semibold text-ink truncate max-w-56">{p.title}</p>
                <p className="text-label text-muted">
                  {p.propertyType} · {p.bedrooms} bed · {p.bathrooms} bath
                </p>
              </div>
            </div>
          </td>
          <td className="px-4 py-3 text-micro text-body whitespace-nowrap">
            {[p.subCity, p.city].filter(Boolean).join(", ") || "—"}
          </td>
          <td className="px-4 py-3 text-micro text-body whitespace-nowrap">
            <p className="truncate max-w-40">{p.ownerName}</p>
            {p.ownerPhone && <p className="text-label text-muted">{p.ownerPhone}</p>}
          </td>
          <td className="px-4 py-3 text-micro text-ink font-semibold tabular whitespace-nowrap">
            {formatETB(p.rentETB)}
          </td>
          <td className="px-4 py-3">
            <Badge tone={statusTone(p.status)}>{statusLabel(p.status)}</Badge>
          </td>
          <td className="px-4 py-3 text-label text-muted whitespace-nowrap">{formatDate(p.submittedAt)}</td>
          <td className="px-4 py-3 text-right">
            {onReview && (
              <Button variant="secondary" size="sm" onClick={() => onReview(p)}>
                Review
              </Button>
            )}
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
