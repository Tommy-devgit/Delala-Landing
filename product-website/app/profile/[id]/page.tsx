"use client";

export const dynamic = "force-dynamic";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Building2, MessageSquare, Phone, UserRound } from "lucide-react";
import { PublicProfile, apiClient } from "@/lib/api-client";
import { Property } from "@/lib/types";
import { formatPostedDate } from "@/lib/format";
import { Avatar } from "@/components/avatar";
import { NoVerificationNote, POSTER_TYPE_LABELS, VerificationBadges } from "@/components/verification-badges";
import { ReviewsSection } from "@/components/reviews-section";
import { useAsync } from "@/lib/use-async";
import { PropertyCard } from "@/components/property-card";
import { Skeleton, buttonClasses } from "@/components/ui";

const PAGE_SIZE = 8;

/**
 * Public profile of someone who posts homes.
 *
 * Reached from "Listed by" on a property. Shows only what the public endpoint
 * returns — the account's email is deliberately not part of that payload.
 */
export default function PublicProfilePage() {
  const params = useParams();
  const id = params?.id as string;

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [listings, setListings] = useState<Property[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  // Declared here rather than beside the section that renders it: hooks
  // cannot live below the loading and error returns further down.
  const reviews = useAsync(() => apiClient.getReviews({ posterId: id }), [id]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [nonce, setNonce] = useState(0);
  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    (async () => {
      try {
        // Listings are fetched by ownerId rather than pulling the whole
        // marketplace and filtering in the browser.
        const [fetchedProfile, fetchedListings] = await Promise.all([
          apiClient.getPublicProfile(id),
          apiClient.getProperties({ ownerId: id }),
        ]);
        if (cancelled) return;

        if (!fetchedProfile) {
          setError("This profile is no longer available.");
          return;
        }
        setProfile(fetchedProfile);
        setListings(fetchedListings);
        setError("");
      } catch {
        if (!cancelled) setError("We couldn't load this profile.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, nonce]);

  if (loading) {
    return (
      <div className="bg-canvas min-h-screen">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 space-y-5">
          <Skeleton className="h-32 rounded-panel" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-72" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-canvas min-h-screen">
        <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <UserRound className="w-7 h-7" aria-hidden="true" />
          </div>
          <h1 className="font-serif-display text-2xl text-ink">Profile unavailable</h1>
          <p className="text-micro text-muted">{error || "This profile could not be found."}</p>
          <div className="flex items-center justify-center gap-2">
            <button type="button" onClick={reload} className={buttonClasses({ size: "md" })}>
              Try again
            </button>
            <Link href="/search" className={buttonClasses({ variant: "secondary", size: "md" })}>
              Browse homes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const visible = listings.slice(0, visibleCount);

  /**
   * Areas served, counted from this poster's own listings rather than declared.
   * A self-reported "specialised areas" field would be a claim; this is a fact
   * about where their properties are.
   */
  const areas = (() => {
    const counts = new Map<string, number>();
    listings.forEach((p) => {
      const area = p.subCity || p.city;
      if (!area) return;
      counts.set(area, (counts.get(area) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  })();

  const forRent = listings.filter((p) => p.listingType === "rent").length;
  const forSale = listings.filter((p) => p.listingType === "sale").length;

  return (
    <div className="bg-canvas min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
        {/* Identity */}
        <div className="bg-surface border border-line rounded-panel p-5 sm:p-6 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar src={profile.avatarUrl} name={profile.fullName} size={72} className="border border-line" />

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif-display text-2xl text-ink">{profile.fullName}</h1>
                {/* What this poster is on the marketplace — a plain label, not
                    a trust badge. It was a shield-iconed accent pill reading
                    "Agent" or "Owner", shown to every poster and derived from
                    `role`, which is an authorization field. */}
                {profile.posterType && (
                  <span className="text-label text-muted border border-line rounded-full px-2 py-0.5">
                    {POSTER_TYPE_LABELS[profile.posterType]}
                  </span>
                )}
              </div>

              <div className="mt-2 space-y-1.5">
                <VerificationBadges verification={profile.verification} />
                {!profile.verification.phone &&
                  !profile.verification.identity &&
                  !profile.verification.business && <NoVerificationNote />}
              </div>

              {profile.bio && (
                <p className="text-micro text-body mt-1.5 max-w-xl leading-relaxed">{profile.bio}</p>
              )}

              <p className="text-label text-muted mt-1.5">
                {/* null until somebody reviews, and rendered as absent rather
                    than as a zero. */}
                {profile.rating !== null && (
                  <>
                    <span className="text-ink">{profile.rating.toFixed(1)}</span> from{" "}
                    {profile.reviewCount} {profile.reviewCount === 1 ? "review" : "reviews"} ·{" "}
                  </>
                )}
                {profile.activeListingCount} live{" "}
                {profile.activeListingCount === 1 ? "listing" : "listings"}
                {profile.listingCount !== profile.activeListingCount &&
                  ` · ${profile.listingCount} total`}
                {profile.memberSince && ` · joined ${formatPostedDate(profile.memberSince)}`}
              </p>
            </div>

            {profile.phone && (
              <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className={buttonClasses({ size: "md" })}>
                  <Phone className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses({ variant: "secondary", size: "md" })}
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Statistics — every figure counted, none declared. There is no
            response-rate or response-time here because nothing measures either;
            they were previously shown as "95%" and "Under 15 minutes" on every
            poster on the site. */}
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Live listings", value: String(profile.activeListingCount) },
            { label: "Listings in total", value: String(profile.listingCount) },
            {
              label: "Rating",
              value: profile.rating !== null ? profile.rating.toFixed(1) : "No reviews yet",
            },
            {
              label: "On Delala since",
              value: profile.memberSince ? formatPostedDate(profile.memberSince) : "Unknown",
            },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-card bg-surface border border-line">
              <dt className="text-label text-muted">{stat.label}</dt>
              <dd className="text-sm text-ink mt-1">{stat.value}</dd>
            </div>
          ))}
        </dl>

        {/* Areas served, derived from where their properties actually are. */}
        {areas.length > 0 && (
          <section className="mb-6">
            <h2 className="font-serif-display text-xl text-ink mb-2">Where they list</h2>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <Link
                  key={area.name}
                  href={`/search?subCity=${encodeURIComponent(area.name)}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-control border border-line bg-surface text-micro hover:border-primary/40 transition-colors"
                >
                  <span className="text-ink">{area.name}</span>
                  <span className="text-muted">{area.count}</span>
                </Link>
              ))}
            </div>
            {(forRent > 0 || forSale > 0) && (
              <p className="text-label text-muted mt-2.5">
                {forRent > 0 && `${forRent} to rent`}
                {forRent > 0 && forSale > 0 && " · "}
                {forSale > 0 && `${forSale} for sale`}
              </p>
            )}
          </section>
        )}

        {/* Their homes */}
        <div className="flex items-end justify-between gap-3 pb-3 mb-4 border-b border-line">
          <h2 className="font-serif-display text-xl text-ink">
            Homes by {profile.fullName.split(" ")[0]}
          </h2>
          <span className="text-label text-muted">{listings.length} total</span>
        </div>

        {listings.length === 0 ? (
          <div className="rounded-panel border border-line bg-surface py-14 px-6 text-center space-y-2">
            <Building2 className="w-7 h-7 text-muted mx-auto opacity-60" aria-hidden="true" />
            <h3 className="font-serif-display text-lg text-ink">No live listings</h3>
            <p className="text-micro text-muted max-w-sm mx-auto">
              This person doesn&rsquo;t have any homes on the marketplace right now.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {visible.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {visibleCount < listings.length && (
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className={buttonClasses({ variant: "secondary", size: "md" })}
                >
                  Show more homes
                </button>
              </div>
            )}
          </>
        )}

        {/* Reviews across everything this poster has listed. Loaded separately
            so a failure here leaves the listings above intact. */}
        <div className="mt-8">
          <ReviewsSection
            summary={reviews.data}
            loading={reviews.loading}
            error={reviews.error}
            onRetry={reviews.retry}
            title={`Reviews of ${profile.fullName}`}
            emptyMessage="Nobody has reviewed this poster's properties yet."
          />
        </div>
      </div>
    </div>
  );
}
