import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AlertTriangle, ArrowLeft, Check, Clock, Info } from "lucide-react";
import { GUIDES, getGuide, type GuideBlock } from "@/lib/guides";

/** Prerenders every guide, so they are static rather than rendered per request. */
export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found — Delala" };

  return {
    title: `${guide.title} — Delala`,
    description: guide.summary,
  };
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.kind) {
    case "paragraph":
      return <p className="text-sm text-body leading-relaxed">{block.text}</p>;

    case "list":
      return (
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="text-sm text-body leading-relaxed pl-4 border-l-2 border-line py-0.5">
              {item}
            </li>
          ))}
        </ul>
      );

    case "checklist":
      return (
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-body leading-relaxed">
              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout": {
      const isWarning = block.tone === "warning";
      const Icon = isWarning ? AlertTriangle : Info;
      return (
        <div
          className={`flex gap-3 p-4 rounded-card border ${
            isWarning ? "bg-primary/5 border-primary/25" : "bg-canvas border-line"
          }`}
        >
          <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-micro text-body leading-relaxed">{block.text}</p>
        </div>
      );
    }
  }
}

/**
 * One guide.
 *
 * Rendered from the structured blocks in `lib/guides.ts` rather than from
 * markup embedded in the page, so the same rendering keeps working when the
 * content moves to the database and the admin dashboard.
 */
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) notFound();

  const related = GUIDES.filter((g) => g.category === guide.category && g.slug !== guide.slug).slice(0, 2);

  return (
    <div className="bg-canvas min-h-screen">
      <article className="max-w-2xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-micro text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          All guides
        </Link>

        <header className="space-y-3 pb-6 border-b border-line">
          <span className="text-label text-primary">{guide.category}</span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-light text-ink leading-tight">
            {guide.title}
          </h1>
          <p className="text-sm text-muted leading-relaxed">{guide.summary}</p>
          <p className="text-label text-muted flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {guide.readingMinutes} min read
            </span>
            {/* Shown so a reader can judge how current the advice is. */}
            <span>
              Updated{" "}
              <time dateTime={guide.updatedAt}>
                {new Date(guide.updatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </span>
          </p>
        </header>

        {guide.sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="font-serif-display text-xl font-light text-ink">{section.heading}</h2>
            {section.blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </section>
        ))}

        <footer className="pt-6 border-t border-line space-y-6">
          {related.length > 0 && (
            <section className="space-y-3">
              <h2 className="font-serif-display text-lg font-light text-ink">Read next</h2>
              <ul className="space-y-2">
                {related.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/guides/${other.slug}`}
                      className="block p-4 rounded-card bg-surface border border-line hover:border-primary/40 transition-colors"
                    >
                      <span className="text-sm font-medium text-ink">{other.title}</span>
                      <span className="block text-micro text-muted mt-1">{other.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="p-5 rounded-card bg-surface border border-line">
            <p className="text-micro text-muted leading-relaxed">
              This is general guidance, not legal or financial advice. Anything involving ownership,
              transfer or a contract is worth confirming with a professional for your specific
              situation.
            </p>
          </div>

          <Link
            href="/search"
            className="inline-flex items-center justify-center h-11 px-5 rounded-control bg-primary text-white text-micro font-medium hover:bg-primary-hover transition-colors"
          >
            Browse listings
          </Link>
        </footer>
      </article>
    </div>
  );
}
