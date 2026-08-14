import Link from "next/link";
import type { Metadata } from "next";
import { CalendarCheck, Compass, MessageSquare, Search, ShieldCheck } from "lucide-react";
import { Photo } from "@/components/photo";

export const metadata: Metadata = {
  title: "How Delala works",
  description:
    "Search, explore, know the poster, connect, view. What Delala does at each step, and what it deliberately does not.",
};

const STEPS = [
  {
    Icon: Search,
    number: "01",
    title: "Search",
    body: "Filter by area, price, bedrooms and what the property actually has — a generator, a reserve water tank, parking. Sort by newest or by price. Every filter runs against the database, so what you see is everything that matches, not the first page of it.",
    delalaDoes: "Keeps the listings searchable and current.",
    youDo: "Narrow to two or three areas and a real budget before you start viewing.",
  },
  {
    Icon: Compass,
    number: "02",
    title: "Explore",
    body: "Open a listing to see its photographs, its position on the map, what the poster said it has, and the price for rent or for sale. Save the ones worth a second look, and compare them side by side.",
    delalaDoes: "Shows what the poster provided, and marks clearly where they provided nothing.",
    youDo: "Compare against other listings in the same area before deciding anything is a bargain.",
  },
  {
    Icon: ShieldCheck,
    number: "03",
    title: "Know the poster",
    body: "Every listing links to whoever posted it: what they have verified with Delala, everything else they have listed, and any reviews people have left. A poster with no badges is not necessarily a problem — it means we have nothing to tell you, so your own checks matter more.",
    delalaDoes: "States precisely which checks a poster has passed. Nothing is granted automatically.",
    youDo: "Confirm the person is entitled to let or sell the property, against a document.",
  },
  {
    Icon: MessageSquare,
    number: "04",
    title: "Connect",
    body: "Call the poster on the number attached to the listing. Delala takes no fee, holds no deposit and sits in no part of the transaction.",
    delalaDoes: "Publishes the contact details the poster gave.",
    youDo: "Keep the conversation somewhere you can refer back to, and never send money before viewing.",
  },
  {
    Icon: CalendarCheck,
    number: "05",
    title: "View",
    body: "Request a viewing with a date and time. The poster accepts or declines, and you are notified either way. See the property in daylight before anything is agreed.",
    delalaDoes: "Carries the request and the answer, and tells both sides what happened.",
    youDo: "Tell someone where you are going, and take somebody with you where you can.",
  },
];

/**
 * How Delala works (§23), as a page rather than only a homepage strip.
 *
 * Each step names what Delala does and what remains the reader's job. That
 * split is the honest description of a marketplace that does not inspect
 * properties, hold money or vouch for anybody — and stating it here is more
 * useful than a five-icon row that implies the platform handles everything.
 */
export default function HowItWorksPage() {
  return (
    <div className="bg-canvas min-h-screen">
            {/* Pulled up under the sticky navbar, which renders transparent on
          this route (see `hasDarkHeader` in lib/navigation.ts). The extra top
          padding keeps this content clear of the bar. */}
      <header className="relative border-b border-line -mt-[4.5rem]">
        <div className="absolute inset-0 bg-ink">
          <Photo slot="editorial-doorway" sizes="100vw" className="opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/50" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 pt-[10.5rem] pb-20">
          <div className="max-w-2xl text-white">
            <p className="text-micro text-accent mb-3">How it works</p>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-light leading-tight">
              From a search to a set of keys
            </h1>
            <p className="text-sm text-white/80 mt-5 leading-relaxed max-w-xl">
              Five steps, and an honest account of which parts Delala handles and which stay with
              you. The short version: we make the listing and the poster visible. Everything after
              that happens between you and them.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-14 space-y-10">
        <ol className="space-y-4">
          {STEPS.map(({ Icon, number, title, body, delalaDoes, youDo }) => (
            <li key={number} className="p-6 rounded-card bg-surface border border-line">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-serif-display text-2xl font-light text-primary">{number}</span>
                <Icon className="w-4 h-4 text-muted" aria-hidden="true" />
                <h2 className="font-serif-display text-xl font-light text-ink">{title}</h2>
              </div>

              <p className="text-sm text-body leading-relaxed">{body}</p>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-line">
                <div>
                  <dt className="text-label text-muted mb-1">Delala does</dt>
                  <dd className="text-micro text-body leading-relaxed">{delalaDoes}</dd>
                </div>
                <div>
                  <dt className="text-label text-muted mb-1">You do</dt>
                  <dd className="text-micro text-body leading-relaxed">{youDo}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>

        <section className="p-6 rounded-card bg-surface border border-line space-y-3">
          <h2 className="font-serif-display text-xl font-light text-ink">
            What Delala deliberately does not do
          </h2>
          <ul className="space-y-2">
            {[
              "Take payment, hold a deposit, or act as escrow. No money moves through this platform.",
              "Inspect properties. Nobody from Delala has been inside the homes listed here.",
              "Act as your agent, or negotiate on your behalf.",
              "Vouch for a poster beyond naming the checks they have actually passed.",
            ].map((item) => (
              <li key={item} className="text-micro text-body leading-relaxed pl-4 border-l-2 border-line py-1">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/search"
            className="flex-1 inline-flex items-center justify-center h-12 px-5 rounded-control bg-primary text-white text-micro font-medium hover:bg-primary-hover transition-colors"
          >
            Start searching
          </Link>
          <Link
            href="/safety"
            className="flex-1 inline-flex items-center justify-center h-12 px-5 rounded-control border border-line bg-surface text-body text-micro font-medium hover:border-primary/40 transition-colors"
          >
            Read the safety guidance
          </Link>
        </section>
      </div>
    </div>
  );
}
