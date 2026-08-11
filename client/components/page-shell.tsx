import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Shared furniture for the content pages, so they share one rhythm instead of
 * each re-inventing its own header and call to action.
 */

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="max-w-4xl mx-auto px-6 py-14 sm:py-16">
        {eyebrow && <p className="text-micro text-primary font-semibold mb-2">{eyebrow}</p>}
        <h1 className="font-serif-display text-3xl sm:text-5xl font-light text-ink leading-[1.05]">
          {title}
        </h1>
        {lead && <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed max-w-2xl">{lead}</p>}
      </div>
    </section>
  );
}

export function Section({
  title,
  lead,
  children,
  tone = "canvas",
}: {
  title?: string;
  lead?: string;
  children: React.ReactNode;
  tone?: "canvas" | "surface";
}) {
  return (
    <section className={tone === "surface" ? "bg-surface border-y border-line" : ""}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        {title && <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">{title}</h2>}
        {lead && <p className="mt-2 text-base text-muted leading-relaxed max-w-2xl">{lead}</p>}
        <div className={title || lead ? "mt-6" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-4">
          <span className="w-7 h-7 rounded-full bg-primary text-white text-micro font-bold flex items-center justify-center shrink-0">
            {i + 1}
          </span>
          <div>
            <h3 className="text-base font-semibold text-ink">{item.title}</h3>
            <p className="text-micro text-muted mt-1 leading-relaxed">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Points({ items }: { items: { icon?: React.ElementType; title: string; body: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map(({ icon: Icon, title, body }) => (
        <div key={title} className="rounded-card border border-line bg-surface p-4">
          {Icon && (
            <span className="w-8 h-8 rounded-control bg-primary/10 text-primary flex items-center justify-center mb-2.5">
              <Icon className="w-4 h-4" aria-hidden="true" />
            </span>
          )}
          <h3 className="text-base font-semibold text-ink">{title}</h3>
          <p className="text-micro text-muted mt-1 leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  );
}

export function CalloutCTA({
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="bg-primary text-white">
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h2 className="font-serif-display text-2xl sm:text-3xl font-light">{title}</h2>
        <p className="mt-2 text-base text-white/80 max-w-xl mx-auto leading-relaxed">{body}</p>
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-primary text-sm font-semibold hover:bg-line transition-colors"
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center h-11 px-6 rounded-full border border-white/35 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
