import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { GUIDES } from "@/lib/guides";

/**
 * Three guides on the homepage.
 *
 * Picked by slug rather than by taking the first three, so the selection is a
 * deliberate editorial choice — the questions somebody arriving with no
 * particular listing in mind is most likely to have — instead of whatever
 * happens to sit at the top of the array after the next edit.
 */
const FEATURED = [
  "finding-an-apartment-in-addis-ababa",
  "what-to-check-before-you-rent",
  "avoiding-property-scams",
];

export function GuidesStrip() {
  const guides = FEATURED.map((slug) => GUIDES.find((g) => g.slug === slug)).filter(
    (guide): guide is (typeof GUIDES)[number] => Boolean(guide)
  );

  if (guides.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
      <div className="flex items-end justify-between gap-4 mb-4 border-b border-line pb-3">
        <div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
            Before you sign anything
          </h2>
          <p className="text-micro text-muted mt-1">
            What to check, what to ask, and what tends to go wrong.
          </p>
        </div>
        <Link
          href="/guides"
          className="text-micro text-primary font-medium hover:underline flex items-center gap-1 shrink-0"
        >
          <span>All guides</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group flex flex-col gap-2 p-5 rounded-card bg-surface border border-line hover:border-primary/40 transition-colors"
          >
            <span className="text-label text-primary">{guide.category}</span>
            <h3 className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
              {guide.title}
            </h3>
            <p className="text-micro text-muted leading-relaxed">{guide.summary}</p>
            <span className="text-label text-muted mt-auto pt-1 inline-flex items-center gap-1.5">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {guide.readingMinutes} min read
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
