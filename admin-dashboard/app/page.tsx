"use client";

import Link from "next/link";
import {
  BadgeCheck,
  Users,
  Building2,
  CheckSquare,
  Flag,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import { adminApi, formatETB, formatDate } from "@/lib/admin-api";
import { useResource } from "@/lib/use-admin";
import {
  Badge,
  ErrorNotice,
  Panel,
  Skeleton,
  statusLabel,
  statusTone,
} from "@/components/ui";

function Metric({
  icon: Icon,
  label,
  value,
  change,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  change?: number | null;
  href?: string;
}) {
  const body = (
    <Panel className="p-4 h-full transition-colors hover:border-primary/30">
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <span className="w-8 h-8 rounded-control bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4" aria-hidden="true" />
        </span>
        {typeof change === "number" && (
          <span
            className={`inline-flex items-center gap-0.5 text-label font-semibold ${
              change >= 0 ? "text-ok" : "text-danger"
            }`}
          >
            {change >= 0 ? (
              <TrendingUp className="w-3 h-3" aria-hidden="true" />
            ) : (
              <TrendingDown className="w-3 h-3" aria-hidden="true" />
            )}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-ink tabular leading-none">{value}</p>
      <p className="text-label text-muted mt-1.5">{label}</p>
    </Panel>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {body}
    </Link>
  ) : (
    body
  );
}

export default function AdminOverviewPage() {
  const overview = useResource(() => adminApi.getOverview(), []);
  const pending = useResource(() => adminApi.getProperties("PENDING_APPROVAL"), []);
  const audit = useResource(() => adminApi.getAuditLogs(), []);

  const m = overview.data?.metrics;
  const t = overview.data?.trends;

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-line">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl text-ink">Overview</h1>
          <p className="text-micro text-muted mt-1">
            Live figures from the marketplace database
            {overview.data && ` · updated ${new Date(overview.data.timestamp).toLocaleTimeString()}`}
          </p>
        </div>
      </div>

      {overview.error ? (
        <ErrorNotice message={overview.error} onRetry={overview.reload} />
      ) : overview.loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Metric icon={Users} label="Total accounts" value={m!.totalUsers} change={t?.usersChangePercent} href="/users" />
          <Metric icon={Building2} label="Live listings" value={m!.activeListings} change={t?.listingsChangePercent} href="/properties" />
          <Metric icon={CheckSquare} label="Awaiting approval" value={m!.pendingApprovals} href="/approvals" />
          <Metric icon={Flag} label="Open reports" value={m!.pendingReports} href="/reports" />
          <Metric icon={BadgeCheck} label="Verified posters" value={m!.verifiedPosters} href="/users" />
          <Metric icon={Calendar} label="Visits this month" value={m!.totalVisitsThisMonth} href="/visits" />
          <Metric icon={Building2} label="Properties in total" value={m!.totalProperties} href="/properties" />
          <Metric icon={TrendingUp} label="Average rent" value={formatETB(m!.averageRentETB)} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel className="overflow-hidden">
          <div className="px-4 py-3 border-b border-line flex items-center justify-between">
            <h2 className="text-micro font-semibold text-ink">Awaiting approval</h2>
            <Link href="/approvals" className="text-label text-primary font-semibold inline-flex items-center gap-1 hover:underline">
              Review queue <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>

          {pending.loading ? (
            <div className="p-4 space-y-2">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
            </div>
          ) : pending.data && pending.data.length > 0 ? (
            <ul className="divide-y divide-line">
              {pending.data.slice(0, 5).map((p) => (
                <li key={p.id} className="px-4 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-micro font-semibold text-ink truncate">{p.title}</p>
                    <p className="text-label text-muted truncate">
                      {[p.subCity, p.city].filter(Boolean).join(", ") || "No location"} · {p.ownerName}
                    </p>
                  </div>
                  <span className="text-label text-muted shrink-0 tabular">{formatETB(p.rentETB)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-8 text-center text-micro text-muted">Nothing waiting. The queue is clear.</p>
          )}
        </Panel>

        <Panel className="overflow-hidden">
          <div className="px-4 py-3 border-b border-line">
            <h2 className="text-micro font-semibold text-ink">Recent admin activity</h2>
          </div>

          {audit.loading ? (
            <div className="p-4 space-y-2">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
            </div>
          ) : audit.data && audit.data.length > 0 ? (
            <ul className="divide-y divide-line">
              {audit.data.slice(0, 6).map((entry) => (
                <li key={entry.id} className="px-4 py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-micro text-ink truncate">{entry.action}</p>
                    <p className="text-label text-muted truncate">
                      {entry.actorName} · {entry.tableName}
                    </p>
                  </div>
                  <span className="text-label text-muted shrink-0">{formatDate(entry.createdAt)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-8 text-center text-micro text-muted">
              No administrative actions recorded yet.
            </p>
          )}
        </Panel>
      </div>

      {pending.data && pending.data.length > 0 && (
        <Panel className="p-4 flex items-center gap-3">
          <Badge tone={statusTone("PENDING_APPROVAL")}>{statusLabel("PENDING_APPROVAL")}</Badge>
          <p className="text-micro text-muted">
            {pending.data.length} listing{pending.data.length === 1 ? "" : "s"} need a decision before
            they are marked verified on the marketplace.
          </p>
        </Panel>
      )}
    </div>
  );
}
