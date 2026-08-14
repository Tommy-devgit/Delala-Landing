import Link from "next/link";
import { CalendarCheck, Compass, MessageSquare, Search, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    Icon: Search,
    title: "Search",
    body: "Filter by area, price, bedrooms and what the property actually has — a generator, a water tank, parking.",
  },
  {
    Icon: Compass,
    title: "Explore",
    body: "Compare listings side by side, see where each one sits on the map, and save the ones worth a second look.",
  },
  {
    Icon: ShieldCheck,
    title: "Verify",
    body: "Check what the poster has actually proved — phone, identity, business — and read reviews from people who dealt with them.",
  },
  {
    Icon: MessageSquare,
    title: "Contact",
    body: "Call or message the poster directly. Delala never handles your money.",
  },
  {
    Icon: CalendarCheck,
    title: "Arrange a viewing",
    body: "Request a date and time that suits you, and see the property in person before you commit to anything.",
  },
];

/**
 * The five-step explanation from §5 of the brief.
 *
 * Static copy on purpose — this describes how the product works, not what is in
 * the database, so there is nothing here to fetch and nothing to invent. The
 * verify step deliberately describes checking what a poster has *proved* rather
 * than promising the listings are vetted.
 */
export function HowItWorks() {
  return (
    <section className="bg-surface border-y border-line py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
            How Delala works
          </h2>
          <p className="text-micro text-muted mt-2 leading-relaxed">
            Delala is where the listing and the poster are visible to you. Everything after
            that — the viewing, the negotiation, the payment — happens directly between you and
            them.
          </p>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {STEPS.map(({ Icon, title, body }, index) => (
            <li key={title} className="flex flex-col gap-2 p-5 rounded-card bg-canvas border border-line">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-label font-medium shrink-0">
                  {index + 1}
                </span>
                <Icon className="w-4 h-4 text-muted" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-medium text-ink">{title}</h3>
              <p className="text-micro text-muted leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6">
          <Link href="/safety" className="text-micro text-primary font-medium hover:underline">
            Read how to keep yourself safe when renting or buying &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
