import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, Section, CalloutCTA } from "@/components/page-shell";
import { MARKETS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cities on Delala | Ethiopian housing markets",
  description:
    "The Ethiopian cities Delala covers: Addis Ababa, Hawassa, Adama, Bahir Dar, Dire Dawa and Gondar.",
};

export default function CitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title={<>Where Delala works.</>}
        lead="Six cities today, with the location hierarchy built out sub-city by sub-city rather than dropped in all at once."
      />

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MARKETS.map((market) => (
            <article key={market.slug} className="rounded-card border border-line bg-surface overflow-hidden flex flex-col">
              {market.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={market.image}
                  alt=""
                  loading="lazy"
                  className="h-36 w-full object-cover"
                />
              ) : (
                <div className="h-36 w-full bg-primary flex items-center justify-center">
                  <span className="font-serif-display text-4xl text-white/25">{market.name.charAt(0)}</span>
                </div>
              )}

              <div className="p-4 flex-1 flex flex-col">
                <h2 className="font-serif-display text-xl text-ink">{market.name}</h2>
                <p className="text-micro text-muted mt-1 leading-relaxed flex-1">{market.blurb}</p>
                <p className="text-label text-muted mt-3">{market.areas}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Not seeing your city?" tone="surface">
        <p className="text-base text-muted leading-relaxed">
          Coverage grows where there are homes to list. If you manage property in a city that is not
          here yet,{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            tell us
          </Link>{" "}
          and we will prioritise it.
        </p>
      </Section>

      <CalloutCTA
        title="See what is available"
        body="Browse live listings across every city Delala covers."
        primaryHref="/download"
        primaryLabel="Open the marketplace"
        secondaryHref="/for-buyers"
        secondaryLabel="How searching works"
      />
    </>
  );
}
