"use client";

import Link from "next/link";
import { ArrowRight, Building2, Car, Droplets, MapPin, Zap } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { useAsync } from "@/lib/use-async";
import { Photo } from "@/components/photo";
import { ErrorNotice } from "@/components/error-notice";
import { Skeleton } from "@/components/ui";

/**
 * Living in Addis (§22).
 *
 * The sub-city list is read from the API's location hierarchy rather than typed
 * here, so it cannot drift from what the marketplace actually indexes, and each
 * one links to a real filtered search.
 *
 * What this page deliberately does not carry: rents by area, safety scores,
 * "generator penetration", school ratings. Every one of those is a statistic
 * nobody has measured, and `lib/types.ts` still declares several of them on the
 * `Neighborhood` type as a leftover — they have no columns behind them and must
 * not start being rendered. The practical notes below are descriptions of how
 * the city works, not numbers about it.
 */
const PRACTICALITIES = [
  {
    Icon: Zap,
    title: "Power",
    body: "Interruptions happen. What matters is whether a building has a standby generator and whether it serves your unit or only the lift and the common areas. Ask which, because the difference is whether your fridge runs.",
  },
  {
    Icon: Droplets,
    title: "Water",
    body: "Supply is intermittent in much of the city. A reserve tank is the difference between an inconvenience and a serious problem, and pressure on an upper floor is not the same as pressure on the ground floor — test the one you would live on.",
  },
  {
    Icon: Car,
    title: "Getting around",
    body: "Distance on a map tells you very little here. The same journey can take twenty minutes or an hour and a half depending on the time of day. Travel from an area to your workplace at the hour you would actually travel, before deciding you like it.",
  },
  {
    Icon: Building2,
    title: "How addresses work",
    body: "Most places are found by sub-city, area name and a landmark rather than a street address. Listings on Delala carry the location hierarchy for that reason, and the map pin is deliberately approximate — owners place a rough position, not an exact door.",
  },
];

export default function LivingInAddisPage() {
  const { data, loading, error, retry } = useAsync(() => apiClient.getCities(), []);

  const addis = (data || []).find((c) => c.slug === "addis-ababa" || c.name === "Addis Ababa");
  const subCities = addis?.subCities || [];

  return (
    <div className="bg-canvas min-h-screen">
      <header className="relative border-b border-line">
        <div className="absolute inset-0 bg-ink">
          <Photo slot="editorial-neighbourhoods" sizes="100vw" className="opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/35" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 py-20 sm:py-24">
          <div className="max-w-2xl text-white">
            <p className="text-micro text-accent mb-3">Living in Addis</p>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-light leading-tight">
              Choosing where in the city to live
            </h1>
            <p className="text-sm text-white/80 mt-5 leading-relaxed max-w-xl">
              Addis is a collection of sub-cities that feel like different places to live in. This
              is what to weigh up when you pick between them — and the things that matter here that
              a listing rarely leads with.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-14 space-y-14">
        <section className="space-y-5">
          <div className="border-b border-line pb-3">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
              The sub-cities
            </h2>
            <p className="text-micro text-muted mt-1">
              Every area Delala indexes in Addis Ababa. The counts are live.
            </p>
          </div>

          {error ? (
            <ErrorNotice message={error} onRetry={retry} />
          ) : loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          ) : subCities.length === 0 ? (
            <p className="text-micro text-muted">
              No sub-cities are indexed yet.{" "}
              <Link href="/search" className="text-primary hover:underline">
                Browse everything instead
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {subCities.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/search?subCity=${encodeURIComponent(sub.name)}`}
                  className="group p-4 rounded-card bg-surface border border-line hover:border-primary/40 transition-colors"
                >
                  <h3 className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
                    {sub.name}
                  </h3>
                  {sub.children && sub.children.length > 0 && (
                    <p className="text-label text-muted mt-1">
                      {sub.children.length}{" "}
                      {sub.children.length === 1 ? "neighbourhood" : "neighbourhoods"}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-5">
          <div className="border-b border-line pb-3">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
              What actually shapes daily life
            </h2>
            <p className="text-micro text-muted mt-1">
              The things worth asking about before you sign anything.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRACTICALITIES.map(({ Icon, title, body }) => (
              <div key={title} className="p-5 rounded-card bg-surface border border-line">
                <Icon className="w-5 h-5 text-primary mb-2" aria-hidden="true" />
                <h3 className="text-sm font-medium text-ink">{title}</h3>
                <p className="text-micro text-muted mt-1.5 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-6 rounded-card bg-canvas border border-line space-y-2">
          <h2 className="text-sm font-medium text-ink">
            Why there are no neighbourhood ratings here
          </h2>
          <p className="text-micro text-muted leading-relaxed">
            You will not find a safety score, an average rent by area, or a percentage of buildings
            with a generator on this page. Nobody has measured any of it, and a number invented to
            look authoritative is worse than no number — particularly about a place where people
            live. Where Delala can count something from real listings, it does; everything else is
            described rather than scored.
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/guides/finding-an-apartment-in-addis-ababa"
            className="group p-6 rounded-card bg-surface border border-line hover:border-primary/40 transition-colors"
          >
            <MapPin className="w-5 h-5 text-primary mb-2" aria-hidden="true" />
            <h3 className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
              How to find an apartment in Addis Ababa
            </h3>
            <p className="text-micro text-muted mt-1">
              Where to start and what to line up before viewing.
            </p>
          </Link>

          <Link
            href="/cities/addis-ababa"
            className="group p-6 rounded-card bg-primary text-white hover:bg-primary-hover transition-colors flex flex-col"
          >
            <ArrowRight className="w-5 h-5 text-accent mb-2" aria-hidden="true" />
            <h3 className="text-sm font-medium">See what is available</h3>
            <p className="text-micro text-white/80 mt-1">Every listing in Addis Ababa right now.</p>
          </Link>
        </section>
      </div>
    </div>
  );
}
