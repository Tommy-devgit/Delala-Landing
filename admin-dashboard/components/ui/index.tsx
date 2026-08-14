"use client";

import { ButtonHTMLAttributes, ReactNode, SelectHTMLAttributes, InputHTMLAttributes } from "react";

/* ---------------------------------------------------------------------------
   Shared primitives. Before this, the dashboard repeated the same button and
   panel class strings in every file with slightly different values each time.
   --------------------------------------------------------------------------- */

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover border-transparent",
  secondary: "bg-surface text-ink border-line hover:bg-canvas",
  ghost: "bg-transparent text-muted border-transparent hover:text-ink hover:bg-canvas",
  danger: "bg-danger-soft text-danger border-danger/25 hover:bg-danger hover:text-white",
};

const SIZES: Record<Size, string> = {
  sm: "h-8 px-3 text-label gap-1.5",
  md: "h-10 px-4 text-micro gap-2",
};

export const buttonClasses = ({
  variant = "primary",
  size = "md",
  className = "",
}: { variant?: Variant; size?: Size; className?: string } = {}) =>
  `inline-flex items-center justify-center rounded-control border font-semibold transition-colors disabled:opacity-55 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

/** Page-level container. */
export function Panel({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`bg-surface border border-line rounded-panel ${className}`}>{children}</div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 mb-5 border-b border-line">
      <div>
        <h1 className="font-serif-display text-2xl sm:text-3xl text-ink">{title}</h1>
        {description && <p className="text-micro text-muted mt-1">{description}</p>}
      </div>
      {/* `flex-wrap` because several pages pass a search box plus one or two
          selects; `shrink-0` alone forced them onto a single row that ran off
          the side of a phone. */}
      {actions && (
        <div className="flex flex-wrap items-center gap-2 sm:shrink-0">{actions}</div>
      )}
    </div>
  );
}

type Tone = "neutral" | "ok" | "warn" | "danger" | "primary";

const TONES: Record<Tone, string> = {
  neutral: "bg-canvas text-muted border-line",
  ok: "bg-ok-soft text-ok border-ok/25",
  warn: "bg-warn-soft text-warn border-warn/25",
  danger: "bg-danger-soft text-danger border-danger/25",
  primary: "bg-primary/10 text-primary border-primary/20",
};

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-label font-semibold whitespace-nowrap ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Maps the API's status vocabulary onto a tone, in one place. */
export const statusTone = (status: string): Tone => {
  switch (status.toUpperCase()) {
    case "APPROVED":
    case "ACTIVE":
    case "RESOLVED":
    case "COMPLETED":
      return "ok";
    case "PENDING_APPROVAL":
    case "PENDING":
    case "OPEN":
    case "REQUESTED":
      return "warn";
    case "REJECTED":
    case "SUSPENDED":
      return "danger";
    default:
      return "neutral";
  }
};

export const statusLabel = (status: string): string =>
  status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase());

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full h-10 px-3 rounded-control bg-surface border border-line text-micro text-ink placeholder:text-muted/70 focus:outline-none focus:border-primary transition-colors disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

export function Select({ className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`h-10 pl-3 pr-8 rounded-control bg-surface border border-line text-micro text-ink focus:outline-none focus:border-primary transition-colors disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-card bg-line/60 ${className}`} />;
}

/** Consistent table shell so every list page lines up. */
export function DataTable({
  columns,
  children,
  empty,
  loading,
  rowCount = 5,
}: {
  columns: string[];
  children: ReactNode;
  empty?: ReactNode;
  loading?: boolean;
  rowCount?: number;
}) {
  return (
    <Panel className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-line">
              {columns.map((c) => (
                <th
                  key={c}
                  className="px-4 py-3 text-label font-semibold text-muted whitespace-nowrap"
                  scope="col"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {loading
              ? Array.from({ length: rowCount }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={columns.length} className="px-4 py-3">
                      <Skeleton className="h-6 w-full" />
                    </td>
                  </tr>
                ))
              : children}
          </tbody>
        </table>
      </div>
      {!loading && empty}
    </Panel>
  );
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="px-6 py-14 text-center">
      {icon && <div className="mb-2 flex justify-center text-muted">{icon}</div>}
      <p className="font-serif-display text-lg text-ink">{title}</p>
      {description && <p className="text-micro text-muted mt-1 max-w-sm mx-auto">{description}</p>}
    </div>
  );
}

export function ErrorNotice({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <Panel className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-danger/25 bg-danger-soft">
      <div>
        <p className="text-micro font-semibold text-danger">Could not load this data</p>
        <p className="text-label text-danger/80 mt-0.5">{message}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Panel>
  );
}
