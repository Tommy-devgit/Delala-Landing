import Link from "next/link";
import type { Metadata } from "next";
import { AlertTriangle, Flag, KeyRound, LifeBuoy, Mail, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Delala",
  description: "How to reach Delala about an account, a listing, or something that looks wrong.",
};

/**
 * Contact.
 *
 * Deliberately routes most reasons somewhere more useful than a general inbox —
 * a report belongs on the listing, a safety question belongs in the guidance —
 * and is honest that the two things people most often need (a password reset,
 * a verification review) are handled by a person, because Delala has no email
 * delivery and nothing here is automated.
 *
 * No contact form. A form that posts nowhere is the same failure as the reset
 * page that reported success for a request that 404'd.
 */
export default function ContactPage() {
  return (
    <div className="bg-canvas min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-14 space-y-10">
        <header className="space-y-3 pb-6 border-b border-line">
          <LifeBuoy className="w-7 h-7 text-primary" aria-hidden="true" />
          <h1 className="font-serif-display text-3xl sm:text-4xl font-light text-ink">Contact Delala</h1>
          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            Most things are faster to resolve from the page they concern. Here is where each kind of
            question actually goes.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-light text-ink">Start here</h2>

          <div className="p-5 rounded-card bg-surface border border-line flex gap-3">
            <Flag className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-medium text-ink">A listing looks wrong or fraudulent</h3>
              <p className="text-micro text-muted mt-1 leading-relaxed">
                Use <strong>Report listing</strong> on the property page itself. It reaches
                Delala&rsquo;s moderators with the listing attached, and the poster is never told who
                reported them — which a message to a general inbox cannot promise.
              </p>
              <Link href="/search" className="text-micro text-primary hover:underline mt-2 inline-block">
                Find the listing &rarr;
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-card bg-surface border border-line flex gap-3">
            <KeyRound className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-medium text-ink">You cannot sign in</h3>
              <p className="text-micro text-muted mt-1 leading-relaxed">
                Delala cannot send password reset emails — there is no email delivery configured, so
                the reset link has to be set by an administrator and passed to you directly. Get in
                touch with the email address on your account and someone will do it.
              </p>
              <Link
                href="/auth/forgot-password"
                className="text-micro text-primary hover:underline mt-2 inline-block"
              >
                More about resetting a password &rarr;
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-card bg-surface border border-line flex gap-3">
            <Building2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-medium text-ink">You want your account verified</h3>
              <p className="text-micro text-muted mt-1 leading-relaxed">
                Phone, identity and business verification are all done by a person at Delala
                reviewing evidence. Nothing is granted automatically. Get in touch and say which you
                are applying for.
              </p>
              <Link href="/safety" className="text-micro text-primary hover:underline mt-2 inline-block">
                What each badge means &rarr;
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif-display text-2xl font-light text-ink">Getting in touch</h2>
          <div className="p-5 rounded-card bg-canvas border border-line flex gap-3">
            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-2">
              <p className="text-micro text-body leading-relaxed">
                Contact details are set by whoever operates this Delala deployment. If you are
                running it, replace this block with the address or number you actually monitor —
                there is no contact form here on purpose, because a form that posts nowhere is worse
                than none.
              </p>
              <p className="text-micro text-muted leading-relaxed">
                When you write in, include the email address on your account and, for anything about
                a specific property, the link to the listing.
              </p>
            </div>
          </div>
        </section>

        <section className="p-5 rounded-card bg-primary/5 border border-primary/25 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h2 className="text-sm font-medium text-ink">If you have lost money</h2>
            <p className="text-micro text-body mt-1 leading-relaxed">
              Contact the police. Delala never takes payment for a property and cannot recover money
              sent outside the platform. Report the listing as well, so the poster can be removed
              before it happens to somebody else.
            </p>
          </div>
        </section>

        <section className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/help"
            className="flex-1 inline-flex items-center justify-center h-12 px-5 rounded-control border border-line bg-surface text-body text-micro font-medium hover:border-primary/40 transition-colors"
          >
            Common questions
          </Link>
          <Link
            href="/guides"
            className="flex-1 inline-flex items-center justify-center h-12 px-5 rounded-control border border-line bg-surface text-body text-micro font-medium hover:border-primary/40 transition-colors"
          >
            Read the guides
          </Link>
        </section>
      </div>
    </div>
  );
}
