"use client";

import { MapPin, MapPinOff } from "lucide-react";
import { adminApi, formatETB } from "@/lib/admin-api";
import { useResource } from "@/lib/use-admin";
import { Badge, DataTable, EmptyState, ErrorNotice, PageHeader } from "@/components/ui";

/**
 * Shared table for the cities and neighborhoods screens — the two differ only
 * by which level of the hierarchy they request.
 */
export function LocationDirectory({
  type,
  title,
  description,
  parentLabel,
}: {
  type: "city" | "sub_city" | "neighborhood";
  title: string;
  description: string;
  parentLabel: string;
}) {
  const { data, loading, error, reload } = useResource(() => adminApi.getLocations(type), [type]);
  const locations = data ?? [];
  const missingPins = locations.filter((l) => l.latitude === null).length;

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        actions={
          !loading && (
            <>
              <Badge>{locations.length} total</Badge>
              {missingPins > 0 && <Badge tone="warn">{missingPins} without coordinates</Badge>}
            </>
          )
        }
      />

      {error ? (
        <ErrorNotice message={error} onRetry={reload} />
      ) : (
        <DataTable
          columns={["Name", parentLabel, "Listings", "Average rent", "Map"]}
          loading={loading}
          empty={
            locations.length === 0 ? (
              <EmptyState
                icon={<MapPin className="w-6 h-6" aria-hidden="true" />}
                title="Nothing here yet"
                description="Locations are created from the seed script and from published listings."
              />
            ) : null
          }
        >
          {locations.map((l) => (
            <tr key={l.id} className="hover:bg-canvas/60 transition-colors">
              <td className="px-4 py-3 text-micro font-semibold text-ink">{l.name}</td>
              <td className="px-4 py-3 text-micro text-body">{l.parentName || "—"}</td>
              <td className="px-4 py-3 text-micro text-body tabular">{l.listingCount}</td>
              <td className="px-4 py-3 text-micro text-body tabular whitespace-nowrap">
                {/* Nothing to average is not an average of zero. */}
                {l.averageRentETB === null ? (
                  <span className="text-muted">—</span>
                ) : (
                  formatETB(l.averageRentETB)
                )}
              </td>
              <td className="px-4 py-3">
                {l.latitude !== null && l.longitude !== null ? (
                  <span className="inline-flex items-center gap-1 text-label text-muted tabular">
                    <MapPin className="w-3 h-3 text-ok" aria-hidden="true" />
                    {l.latitude.toFixed(3)}, {l.longitude.toFixed(3)}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-label text-warn">
                    <MapPinOff className="w-3 h-3" aria-hidden="true" />
                    Not pinned
                  </span>
                )}
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}
