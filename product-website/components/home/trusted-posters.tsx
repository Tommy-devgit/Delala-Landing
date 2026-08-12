"use client";

import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { VerifiedPoster } from "@/lib/api-client";
import { Avatar } from "@/components/avatar";

const POSTER_TYPE_LABELS: Record<string, string> = {
  owner: "Property owner",
  broker: "Broker",
  agency: "Real estate agency",
};

const CHECK_LABELS: { key: keyof VerifiedPoster["verification"]; label: string }[] = [
  { key: "phone", label: "Phone verified" },
  { key: "identity", label: "Identity verified" },
  { key: "business", label: "Business verified" },
];

/**
 * Posters who have actually passed a verification check.
 *
 * This section renders nothing when nobody has — which, until somebody works
 * through the verification queue, is everybody. That is the intended behaviour
 * and not a bug to route around: the previous build showed a verified badge on
 * every poster on the site, which is the failure this section exists to avoid
 * repeating in a more prominent place.
 */
export function TrustedPosters({ posters }: { posters: VerifiedPoster[] }) {
  if (posters.length === 0) return null;

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-8">
      <div className="mb-4 border-b border-line pb-3">
        <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
          Posters who have verified themselves
        </h2>
        <p className="text-micro text-muted mt-1">
          Each of these has completed at least one check with Delala. The badges below say exactly
          which.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {posters.slice(0, 4).map((poster) => {
          const passed = CHECK_LABELS.filter(({ key }) => poster.verification[key]);

          return (
            <Link
              key={poster.id}
              href={`/profile/${poster.id}`}
              className="group flex flex-col gap-3 p-5 rounded-card bg-surface border border-line hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar src={poster.avatarUrl} name={poster.fullName} size={44} />
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-ink truncate group-hover:text-primary transition-colors">
                    {poster.fullName}
                  </h3>
                  {poster.posterType && (
                    <p className="text-label text-muted">
                      {POSTER_TYPE_LABELS[poster.posterType] || poster.posterType}
                    </p>
                  )}
                </div>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {passed.map(({ key, label }) => (
                  <li
                    key={key}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/25 border border-accent/50 text-label text-primary"
                  >
                    <BadgeCheck className="w-3 h-3" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>

              <p className="text-label text-muted mt-auto">
                {poster.activeListingCount}{" "}
                {poster.activeListingCount === 1 ? "live listing" : "live listings"}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
