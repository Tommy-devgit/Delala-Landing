import Link from "next/link";
import type { Metadata } from "next";
import { AlertTriangle, BadgeCheck, Banknote, Eye, Flag, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Safety & trust — Delala",
  description:
    "What Delala's verification badges mean, how to spot a listing that is not what it claims, and how to report one.",
};

const VERIFICATION_LEVELS = [
  {
    Icon: BadgeCheck,
    title: "Phone verified",
    body: "Delala has confirmed the poster controls the phone number on their profile. It says nothing about the property itself.",
  },
  {
    Icon: BadgeCheck,
    title: "Identity verified",
    body: "The poster has provided identification that Delala has checked against their profile name.",
  },
  {
    Icon: BadgeCheck,
    title: "Business verified",
    body: "A registered agency or brokerage has shown Delala its business registration.",
  },
];

const WARNING_SIGNS = [
  "The price is far below everything comparable in the same area.",
  "The poster will not let you see the property before you pay anything.",
  "You are asked to send a deposit to hold the property, before any viewing.",
  "The photographs look like a catalogue — no power sockets, no wear, no neighbours.",
  "The same photographs appear on another listing at a different address.",
  "The poster wants to move the conversation somewhere Delala cannot see it, immediately.",
  "You are pushed to decide today, or told several other people are about to take it.",
];

const VIEWING_RULES = [
  "See the property in person, in daylight, before any money changes hands.",
  "Tell someone where you are going and roughly when you expect to be back.",
  "Bring somebody with you where you can.",
  "Ask to see proof that the person showing you the property is entitled to let or sell it.",
  "Check the water and the power while you are there rather than taking the listing's word for it.",
];

/**
 * Safety & trust centre (§20).
 *
 * Deliberately plain about the limits of what Delala knows. The site used to
 * describe every listing as "physically verified by a Delala field inspector"
 * and mark every poster verified — nobody inspects these properties, and this
 * page is where that is said out loud rather than quietly dropped.
 */
export default function SafetyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 space-y-12">
      <header className="space-y-3">
        <ShieldCheck className="w-7 h-7 text-primary" aria-hidden="true" />
        <h1 className="font-serif-display text-3xl sm:text-4xl font-light text-ink">
          Safety &amp; trust
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Delala is a place to find properties and the people posting them. We do not hold your
          money, we do not act as an agent, and we do not visit the properties. What we can tell
          you is exactly what has and has not been checked — this page explains how to read that.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="font-serif-display text-2xl font-light text-ink">
          What the badges actually mean
        </h2>
        <div className="space-y-3">
          {VERIFICATION_LEVELS.map(({ Icon, title, body }) => (
            <div key={title} className="p-5 rounded-card bg-surface border border-line flex gap-3">
              <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-medium text-ink">{title}</h3>
                <p className="text-micro text-muted mt-1 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-card bg-canvas border border-line">
          <h3 className="text-sm font-medium text-ink flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" aria-hidden="true" />
            &ldquo;Reviewed&rdquo; on a listing
          </h3>
          <p className="text-micro text-muted mt-1 leading-relaxed">
            A listing marked <strong>Reviewed</strong> has been through Delala&rsquo;s moderation
            queue — somebody has looked at the listing and let it through. It is a check on the
            advert, not on the building. Nobody from Delala has stood in that property.
          </p>
        </div>

        <p className="text-micro text-muted leading-relaxed">
          A poster with no badges is not necessarily a problem — most posters have not been through
          verification yet. It simply means we have nothing to tell you about them, so the checks
          below matter more.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif-display text-2xl font-light text-ink flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" aria-hidden="true" />
          Signs a listing may not be real
        </h2>
        <ul className="space-y-2">
          {WARNING_SIGNS.map((sign) => (
            <li
              key={sign}
              className="text-micro text-body leading-relaxed pl-4 border-l-2 border-line py-1"
            >
              {sign}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif-display text-2xl font-light text-ink">Viewing a property</h2>
        <ul className="space-y-2">
          {VIEWING_RULES.map((rule) => (
            <li
              key={rule}
              className="text-micro text-body leading-relaxed pl-4 border-l-2 border-line py-1"
            >
              {rule}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif-display text-2xl font-light text-ink flex items-center gap-2">
          <Banknote className="w-5 h-5 text-primary" aria-hidden="true" />
          Paying
        </h2>
        <p className="text-micro text-muted leading-relaxed">
          Delala never takes payment for a property and will never ask you to send money through
          the site. Any deposit, rent or purchase price is arranged directly between you and the
          poster. Pay in a way that leaves a record, get a receipt and a signed agreement, and do
          not transfer anything before you have seen the property and confirmed the person you are
          dealing with is entitled to let or sell it.
        </p>
      </section>

      <section className="p-6 rounded-card bg-surface border border-line space-y-3">
        <h2 className="font-serif-display text-2xl font-light text-ink flex items-center gap-2">
          <Flag className="w-5 h-5 text-primary" aria-hidden="true" />
          Reporting something
        </h2>
        <p className="text-micro text-muted leading-relaxed">
          Every listing has a <strong>Report listing</strong> action on its page. Use it for
          anything that looks like a scam, a duplicate, a property that does not exist, or a poster
          behaving in a way that worries you. Reports go to Delala&rsquo;s moderators, and the
          poster is not told who reported them.
        </p>
        <p className="text-micro text-muted leading-relaxed">
          If you believe you have lost money or been threatened, contact the police. Delala cannot
          recover payments made outside the platform.
        </p>
        <Link
          href="/search"
          className="inline-flex items-center justify-center h-11 px-5 rounded-control bg-primary text-white text-micro font-medium hover:bg-primary-hover transition-colors w-fit"
        >
          Browse listings
        </Link>
      </section>
    </div>
  );
}
