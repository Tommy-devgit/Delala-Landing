import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Clock } from "lucide-react";
import { GUIDES, GUIDE_CATEGORIES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides — Delala",
  description:
    "Practical guides to renting and buying property in Ethiopia: finding a place, what to check before signing, avoiding scams and understanding prices.",
};

/**
 * The guides index.
 *
 * Grouped by category rather than listed flat, because the two audiences barely
 * overlap — somebody looking for a flat to rent and somebody buying are not
 * reading the same things, and a single list makes both scroll past most of it.
 */
export default function GuidesPage() {
  return (
    <div className="bg-canvas min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-10">
        <header className="space-y-3 pb-6 border-b border-line">
          <BookOpen className="w-7 h-7 text-primary" aria-hidden="true" />
          <h1 className="font-serif-display text-3xl sm:text-4xl font-light text-ink">Guides</h1>
          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            Practical writing about finding, renting and buying property in Ethiopia — what to
            check, what to ask, and what tends to go wrong. Written for people doing this
            themselves, not for search engines.
          </p>
        </header>

        {GUIDE_CATEGORIES.map((category) => {
          const guides = GUIDES.filter((guide) => guide.category === category);

          return (
            <section key={category} className="space-y-4">
              <h2 className="font-serif-display text-xl font-light text-ink">{category}</h2>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="group flex flex-col gap-2 h-full p-5 rounded-card bg-surface border border-line hover:border-primary/40 transition-colors"
                    >
                      <h3 className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-micro text-muted leading-relaxed">{guide.summary}</p>
                      <span className="text-label text-muted mt-auto pt-1 inline-flex items-center gap-1.5">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {guide.readingMinutes} min read
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="p-6 rounded-card bg-surface border border-line space-y-3">
          <h2 className="font-serif-display text-xl font-light text-ink">
            Worried about a listing?
          </h2>
          <p className="text-micro text-muted leading-relaxed">
            The safety centre covers what Delala&rsquo;s badges mean, how to spot a listing that is
            not what it claims, and how to report one.
          </p>
          <Link
            href="/safety"
            className="inline-flex items-center justify-center h-11 px-5 rounded-control border border-line bg-canvas text-body text-micro font-medium hover:border-primary/40 transition-colors w-fit"
          >
            Safety &amp; trust
          </Link>
        </section>
      </div>
    </div>
  );
}
