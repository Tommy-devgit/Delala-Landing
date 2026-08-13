import { BadgeCheck } from "lucide-react";
import type { PosterType, PosterVerification } from "@/lib/types";

const CHECKS: { key: keyof PosterVerification; label: string; title: string }[] = [
  { key: "phone", label: "Phone verified", title: "Delala confirmed this poster controls the phone number on their profile." },
  { key: "identity", label: "Identity verified", title: "Delala checked identification against the name on this profile." },
  { key: "business", label: "Business verified", title: "A registered agency showed Delala its business registration." },
];

export const POSTER_TYPE_LABELS: Record<PosterType, string> = {
  owner: "Property owner",
  broker: "Broker",
  agency: "Real estate agency",
};

/**
 * The checks a poster has actually passed.
 *
 * Renders nothing when none have been. That is the normal state and it is the
 * point: the profile header used to show a shield badge reading "Agent" or
 * "Owner" for every poster on the site, derived from `role` — an authorization
 * field meaning user, admin or moderator — and styled identically to a trust
 * badge. It looked like verification, was shown to everybody, and meant
 * nothing.
 *
 * Each badge names exactly what was checked, and `title` explains the limit of
 * that claim, because "verified" on its own invites the reader to assume more
 * than Delala actually knows.
 */
export function VerificationBadges({
  verification,
  className = "",
}: {
  verification: PosterVerification;
  className?: string;
}) {
  const passed = CHECKS.filter((check) => verification[check.key]);
  if (passed.length === 0) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {passed.map((check) => (
        <li
          key={check.key}
          title={check.title}
          className="inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent/25 px-2 py-0.5 text-label text-primary"
        >
          <BadgeCheck className="w-3 h-3" aria-hidden="true" />
          {check.label}
        </li>
      ))}
    </ul>
  );
}

/**
 * Said plainly when a poster has passed nothing, rather than leaving a silence
 * a reader might mistake for approval.
 */
export function NoVerificationNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-label text-muted ${className}`}>
      This poster has not completed any verification checks.
    </p>
  );
}
