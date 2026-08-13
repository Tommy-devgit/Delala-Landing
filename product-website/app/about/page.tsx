import Link from "next/link";
import type { Metadata } from "next";
import { AlertTriangle, Building2, Eye, MessageSquare, ShieldCheck } from "lucide-react";
import { Photo } from "@/components/photo";

export const metadata: Metadata = {
  title: "About Delala",
  description:
    "Why Delala exists: finding a home in Ethiopia should not mean scrolling through hundreds of Telegram messages.",
};

const PROBLEMS = [
  {
    Icon: MessageSquare,
    title: "The listing is a message, not a record",
    body: "A property circulates as a forwarded message with three photographs and a phone number. There is no price history, no way to filter, and no way to tell whether the message is from today or from four months ago.",
  },
  {
    Icon: Eye,
    title: "You cannot see who is behind it",
    body: "The same property appears from four different numbers at three different prices. Working out who actually has the right to let it costs phone calls, and sometimes a wasted journey across the city.",
  },
  {
    Icon: AlertTriangle,
    title: "The same scams keep working",
    body: "A price far below the area, a reason you cannot view it today, and a deposit to hold it. It works because there is nowhere to check anything, and nowhere to report it afterwards.",
  },
];

const PRINCIPLES = [
  {
    title: "Say what is known, and what is not",
    body: "An amenity appears only when the poster said the property has it. A verification badge names exactly what was checked. A rating is absent until somebody writes a review — never a number chosen to look reassuring.",
  },
  {
    title: "The poster is part of the listing",
    body: "Every property links to whoever posted it, what they have verified, and everything else they have listed. Who you are dealing with is not a detail at the bottom of the page.",
  },
  {
    title: "Delala never touches your money",
    body: "There is no payment on this platform, no escrow and no fee taken from a transaction. Anything financial is arranged directly between you and the poster, in person.",
  },
  {
    title: "A property is a place, not a stock photograph",
    body: "Listings show their own photographs or none at all. Location cards carry no photography, because a picture of somewhere that is not the place is a lie about a real neighbourhood.",
  },
];

/**
 * The brand story (§25).
 *
 * Written as a problem statement rather than a mission statement. Everything
 * claimed here is something the product actually does — the principles section
 * is a description of decisions visible in the interface, not aspirations.
 */
export default function AboutPage() {
  return (
    <div className="bg-canvas min-h-screen">
      <header className="relative border-b border-line">
        <div className="absolute inset-0 bg-ink">
          <Photo slot="editorial-living" sizes="100vw" className="opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/40" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 py-20 sm:py-28">
          <div className="max-w-2xl text-white">
            <p className="text-micro text-accent mb-3">About Delala</p>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-light leading-tight">
              Finding a home shouldn&rsquo;t mean scrolling through hundreds of messages.
            </h1>
            <p className="text-sm text-white/80 mt-5 leading-relaxed max-w-xl">
              ደላላ is the Amharic word for the person who stands between someone with a property and
              someone looking for one. Delala is that role, made visible: the listing, the area, the
              price and the person, all in one place you can search.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-14 space-y-14">
        <section className="space-y-5">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
            What we are trying to fix
          </h2>
          <p className="text-sm text-body leading-relaxed">
            Property in Ethiopia mostly moves through Telegram groups, word of mouth and brokers
            with a phone. That works — people do find homes this way — but it puts all of the effort
            and all of the risk on whoever is searching.
          </p>

          <div className="space-y-3">
            {PROBLEMS.map(({ Icon, title, body }) => (
              <div key={title} className="flex gap-3 p-5 rounded-card bg-surface border border-line">
                <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-medium text-ink">{title}</h3>
                  <p className="text-micro text-muted mt-1 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
            What Delala is building
          </h2>
          <p className="text-sm text-body leading-relaxed">
            A property marketplace where a listing is a record rather than a message: searchable by
            area, price, size and what the place actually has, attached to a poster you can look up,
            with the information you would need to decide whether it is worth your afternoon.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRINCIPLES.map((principle) => (
              <div key={principle.title} className="p-5 rounded-card bg-surface border border-line">
                <h3 className="text-sm font-medium text-ink">{principle.title}</h3>
                <p className="text-micro text-muted mt-1.5 leading-relaxed">{principle.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
            Where this is going
          </h2>
          <p className="text-sm text-body leading-relaxed">
            Delala is early. Verification is done by hand, the marketplace is small, and there are
            features described on this site as coming rather than working — we would rather say so
            than pretend otherwise.
          </p>
          <p className="text-sm text-body leading-relaxed">
            What we will not do is fill the gaps with invented numbers. If a rating is not there, it
            is because nobody has left one. If a poster has no badge, it is because they have not
            been through a check. An empty space that tells the truth is worth more than a full one
            that does not.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/how-it-works"
            className="group p-6 rounded-card bg-surface border border-line hover:border-primary/40 transition-colors"
          >
            <Building2 className="w-5 h-5 text-primary mb-2" aria-hidden="true" />
            <h3 className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
              How Delala works
            </h3>
            <p className="text-micro text-muted mt-1">Search to viewing, step by step.</p>
          </Link>

          <Link
            href="/safety"
            className="group p-6 rounded-card bg-surface border border-line hover:border-primary/40 transition-colors"
          >
            <ShieldCheck className="w-5 h-5 text-primary mb-2" aria-hidden="true" />
            <h3 className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
              Safety &amp; trust
            </h3>
            <p className="text-micro text-muted mt-1">What the badges mean, and what they do not.</p>
          </Link>
        </section>

        <section className="p-8 rounded-card bg-primary text-white space-y-3">
          <h2 className="font-serif-display text-2xl font-light">Start with an area</h2>
          <p className="text-micro text-white/80 leading-relaxed max-w-lg">
            Pick a city, narrow to a sub-city, and see what is actually available there today.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              href="/search"
              className="inline-flex items-center justify-center h-11 px-5 rounded-control bg-white text-primary text-micro font-medium hover:bg-accent transition-colors"
            >
              Explore properties
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-11 px-5 rounded-control border border-white/30 text-white text-micro font-medium hover:bg-white/10 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
