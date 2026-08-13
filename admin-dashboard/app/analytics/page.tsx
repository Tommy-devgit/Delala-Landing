"use client";

import { useState } from "react";
import { adminApi, formatETB } from "@/lib/admin-api";
import { useResource } from "@/lib/use-admin";
import { Badge, ErrorNotice, PageHeader, Panel, Select, Skeleton } from "@/components/ui";

const RANGES = [
  { value: 7, label: "Last 7 days" },
  { value: 30, label: "Last 30 days" },
  { value: 90, label: "Last 90 days" },
];

const SERIES = [
  { key: "listings" as const, label: "Listings", color: "var(--color-primary)" },
  { key: "users" as const, label: "Signups", color: "var(--color-accent)" },
  { key: "visits" as const, label: "Visits", color: "var(--color-muted)" },
];

/** Small inline area chart — avoids pulling a charting library for three lines. */
function TrendChart({
  points,
  metric,
  color,
}: {
  points: { date: string; listings: number; users: number; visits: number }[];
  metric: "listings" | "users" | "visits";
  color: string;
}) {
  const values = points.map((p) => p[metric]);
  const max = Math.max(1, ...values);
  const width = 100;
  const height = 32;

  const step = points.length > 1 ? width / (points.length - 1) : width;
  const coords = values.map((v, i) => [i * step, height - (v / max) * height] as const);
  const line = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  const total = values.reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-label text-muted">Peak {max}</span>
        <span className="text-micro font-semibold text-ink tabular">{total} total</span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-16"
        role="img"
        aria-label={`${metric} over the period, ${total} in total`}
      >
        <path d={area} fill={color} opacity="0.12" />
        <path d={line} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

/** Horizontal bar list for the categorical breakdowns. */
function Breakdown({
  title,
  rows,
  showRent = true,
}: {
  title: string;
  rows: { name: string; count: number; averageRentETB?: number | null }[];
  showRent?: boolean;
}) {
  const max = Math.max(1, ...rows.map((r) => r.count));

  return (
    <Panel className="p-4">
      <h2 className="text-micro font-semibold text-ink mb-3">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-label text-muted py-4 text-center">No data yet.</p>
      ) : (
        <ul className="space-y-2.5">
          {rows.map((r) => (
            <li key={r.name}>
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="text-micro text-ink truncate">{r.name}</span>
                <span className="text-label text-muted shrink-0 tabular">
                  {r.count}
                  {showRent && r.averageRentETB ? ` · ${formatETB(r.averageRentETB)}` : ""}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-line overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(r.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

export default function AnalyticsPage() {
  const [days, setDays] = useState(30);
  const { data, loading, error, reload } = useResource(() => adminApi.getAnalytics(days), [days]);

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Marketplace activity, derived from live records"
        actions={
          <Select value={days} onChange={(e) => setDays(Number(e.target.value))} aria-label="Date range">
            {RANGES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </Select>
        }
      />

      {error ? (
        <ErrorNotice message={error} onRetry={reload} />
      ) : loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
          </div>
          <Skeleton className="h-56" />
        </div>
      ) : (
        data && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SERIES.map((s) => (
                <Panel key={s.key} className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: s.color }} aria-hidden="true" />
                    <h2 className="text-micro font-semibold text-ink">{s.label}</h2>
                  </div>
                  <TrendChart points={data.series} metric={s.key} color={s.color} />
                </Panel>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <Breakdown title="Listings by city" rows={data.byCity} />
              <Breakdown title="Listings by type" rows={data.byPropertyType} />
              <Panel className="p-4">
                <h2 className="text-micro font-semibold text-ink mb-3">Moderation status</h2>
                <ul className="space-y-2">
                  {data.byStatus.map((s) => (
                    <li key={s.name} className="flex items-center justify-between">
                      <Badge
                        tone={s.name === "Approved" ? "ok" : s.name === "Pending" ? "warn" : "danger"}
                      >
                        {s.name}
                      </Badge>
                      <span className="text-micro font-semibold text-ink tabular">{s.count}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          </div>
        )
      )}
    </div>
  );
}
