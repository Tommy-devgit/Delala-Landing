"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { Property } from "@/lib/types";
import { formatPostedAt, formatPostedDate } from "@/lib/format";
import { ScheduleModal } from "@/components/schedule-modal";
import { PropertyCard } from "@/components/property-card";
import {
  ShieldCheck,
  Heart,
  Share2,
  MapPin,
  Zap,
  Droplets,
  Car,
  Sofa,
  BedDouble,
  Bath,
  Ruler,
  Calendar,
  Phone,
  MessageSquare,
  Building2,
  Flag,
  GitCompare,
  Wifi,
} from "lucide-react";
import { Skeleton, buttonClasses } from "@/components/ui";
import { PropertyMap } from "@/components/map";
import { Avatar } from "@/components/avatar";
import {
  NoVerificationNote,
  POSTER_TYPE_LABELS,
  VerificationBadges,
} from "@/components/verification-badges";
import { useFavorites } from "@/lib/use-favorites";
import { PropertyGallery } from "@/components/property-gallery";
import {
  COMPARE_KEY,
  COMPARE_LIMIT,
  RECENT_KEY,
  useLocalCollection,
} from "@/lib/use-local-collection";
import { ErrorNotice } from "@/components/error-notice";
import { ReportListingModal } from "@/components/report-listing-modal";
import { ReviewsSection } from "@/components/reviews-section";
import { useAsync } from "@/lib/use-async";

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [similarListings, setSimilarListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);
  const [isReportOpen, setIsReportOpen] = useState(false);
  // Keyed on the loaded property rather than the slug, because the slug in
  // the URL may be a title-derived string while reviews are keyed by id.
  const reviews = useAsync(
    async () => (property ? apiClient.getReviews({ propertyId: property.id }) : null),
    [property?.id]
  );
  const { isSaved, toggle } = useFavorites();
  const recent = useLocalCollection<string>(RECENT_KEY, { limit: 24 });
  const compare = useLocalCollection<string>(COMPARE_KEY, { limit: COMPARE_LIMIT });

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    (async () => {
      await Promise.resolve();
      if (cancelled) return;

      setLoading(true);
      setLoadError(null);

      try {
        const fetchedProperty = await apiClient.getPropertyBySlug(slug);
        if (cancelled) return;

        setProperty(fetchedProperty);

        if (fetchedProperty) {
          // Similar homes are a nicety; if they fail, the listing itself still
          // renders rather than the whole page reporting an error.
          const nearby = await apiClient
            .getProperties({ city: fetchedProperty.city, pageSize: 4 })
            .catch(() => []);
          if (!cancelled) {
            setSimilarListings(nearby.filter((p) => p.id !== fetchedProperty.id).slice(0, 3));
          }
        }
      } catch (err) {
        // A 404 returns null and falls through to the not-found view. This is
        // the other case — the API is unreachable — which used to be
        // indistinguishable from "this listing does not exist".
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "We couldn't load this property.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug, reloadNonce]);

  // Recorded on this device only — see lib/use-local-collection.ts. Runs after
  // the property resolves so a failed load never enters the history.
  useEffect(() => {
    if (!property?.id) return;
    recent.add(property.id);
    // `recent` is recreated each render; depending on it would loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [property?.id]);

  if (loading) {
    return (
      <div className="bg-canvas min-h-screen py-10 px-8">
        <Skeleton className="max-w-[1440px] mx-auto h-96 rounded-panel" />
      </div>
    );
  }

  // Distinct from "not found": the listing may well exist and simply could not
  // be fetched, so this offers a retry rather than sending the reader away.
  if (loadError) {
    return (
      <div className="bg-canvas min-h-screen py-10 px-4 sm:px-8">
        <div className="max-w-md mx-auto">
          <ErrorNotice message={loadError} onRetry={() => setReloadNonce((n) => n + 1)} />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-canvas min-h-screen py-10 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="font-serif-display text-2xl text-ink">
          Property not found
        </h2>
        <p className="text-xs text-muted">
          The requested property listing does not exist or has been removed from the database.
        </p>
        <Link href="/" className={buttonClasses({ size: "md" })}>
          Back to marketplace
        </Link>
      </div>
    );
  }

  const postedAt = formatPostedAt(property.createdAt);
  const hasPin = property.latitude !== null && property.longitude !== null;

  // Only list what the property actually has, rather than showing every
  // amenity with a yes/no beside it.
  const amenities = [
    { has: property.generator, icon: Zap, label: "Standby generator" },
    { has: property.waterTank, icon: Droplets, label: "Reserve water tank" },
    { has: property.parking, icon: Car, label: "Dedicated parking" },
    { has: property.furnished, icon: Sofa, label: "Furnished" },
    { has: property.securityGuard, icon: ShieldCheck, label: "Security guard" },
    { has: property.balcony, icon: Building2, label: "Balcony" },
    { has: property.internet, icon: Wifi, label: "Internet" },
  ].filter((a) => a.has);

  const posterName = property.broker?.name || "Property owner";
  const saved = isSaved(property.id);
  return (
    <div className="bg-canvas min-h-screen py-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">

        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
          <div className="flex items-center gap-2 text-xs font-mono-label text-muted">
            <Link href="/" className="hover:text-primary">Marketplace</Link>
            {property.city && (
              <>
                <span>/</span>
                <Link href={`/cities/${property.city.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-primary">
                  {property.city}
                </Link>
              </>
            )}
            {property.subCity && (
              <>
                <span>/</span>
                <span className="text-primary font-bold">{property.subCity}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={async () => {
                const handled = await toggle(property.id);
                if (!handled) router.push(`/auth/signin?callbackUrl=/property/${property.slug}`);
              }}
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved homes" : "Save this home"}
              className={`p-2.5 rounded-full border transition-colors ${
                saved
                  ? "bg-rose-50 text-rose-600 border-rose-200"
                  : "bg-surface text-muted border-line hover:text-primary"
              }`}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-current" : ""}`} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => navigator.share?.({ title: property.title, url: window.location.href })}
              aria-label="Share this listing"
              className="p-2.5 rounded-full bg-surface border border-line text-muted hover:text-primary transition-colors"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() =>
                compare.has((id) => id === property.id)
                  ? compare.remove((id) => id === property.id)
                  : compare.add(property.id)
              }
              aria-pressed={compare.has((id) => id === property.id)}
              aria-label={
                compare.has((id) => id === property.id)
                  ? "Remove from comparison"
                  : "Add to comparison"
              }
              className={`p-2.5 rounded-full border transition-colors ${
                compare.has((id) => id === property.id)
                  ? "bg-primary text-white border-primary"
                  : "bg-surface text-muted border-line hover:text-primary"
              }`}
            >
              <GitCompare className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setIsReportOpen(true)}
              aria-label="Report this listing"
              className="p-2.5 rounded-full bg-surface border border-line text-muted hover:text-primary transition-colors"
            >
              <Flag className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {property.approved && (
                <span className="inline-flex items-center gap-1 font-mono-label text-label text-primary bg-accent/25 border border-accent/50 px-2 py-0.5 rounded-full font-bold">
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                  Reviewed by Delala
                </span>
              )}
              {property.propertyType && (
                <span className="font-mono-label text-label text-muted">{property.propertyType}</span>
              )}
              {postedAt && (
                <span className="font-mono-label text-label text-muted" title={formatPostedDate(property.createdAt)}>
                  · Posted {postedAt}
                </span>
              )}
            </div>

            <h1 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
              {property.title}
            </h1>

            <p className="text-xs text-muted mt-1.5 flex items-center gap-1 font-mono-label">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>
                {property.address || [property.neighborhood, property.subCity, property.city].filter(Boolean).join(", ")}
              </span>
            </p>
          </div>

          <div className="shrink-0 md:text-right">
            <div className="text-2xl font-bold text-primary leading-none">
              ETB {property.rentETB.toLocaleString()}
              <span className="text-sm font-normal text-muted"> /month</span>
            </div>
          </div>
        </div>

        <PropertyGallery images={property.galleryImages} title={property.title} />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* One continuous column, divided by rules rather than broken into
              separate floating panels with their own padding and borders. */}
          <div className="lg:col-span-8 bg-surface rounded-panel border border-line divide-y divide-line">

            {/* Key facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-line">
              {[
                { icon: BedDouble, value: property.bedrooms, label: "Bedrooms" },
                { icon: Bath, value: property.bathrooms, label: "Bathrooms" },
                { icon: Ruler, value: `${property.areaSqm}`, label: "Square metres" },
                {
                  icon: Zap,
                  value: property.generator ? "Yes" : "No",
                  label: "Standby generator",
                },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="px-4 py-3.5 text-center">
                  <Icon className="w-4 h-4 text-primary mx-auto mb-1.5" aria-hidden="true" />
                  <div className="text-base font-bold text-ink leading-none">{value}</div>
                  <div className="text-label text-muted mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="px-5 py-4">
              <h2 className="font-serif-display text-lg text-ink mb-1.5">About this home</h2>
              <p className="text-sm text-body leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities, only those the listing actually has */}
            {amenities.length > 0 && (
              <div className="px-5 py-4">
                <h2 className="font-serif-display text-lg text-ink mb-2.5">What this place offers</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                  {amenities.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm text-body">
                      <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location — the coordinates are already on the property */}
            <div className="px-5 py-4">
              <h2 className="font-serif-display text-lg text-ink mb-1">Where you&rsquo;ll be</h2>
              <p className="text-xs text-muted mb-3">
                {[property.neighborhood, property.subCity, property.city].filter(Boolean).join(", ")}
                {hasPin ? " · approximate location" : ""}
              </p>
              {hasPin ? (
                <div className="h-64 rounded-card overflow-hidden border border-line">
                  <PropertyMap properties={[property]} />
                </div>
              ) : (
                <p className="text-xs text-muted bg-canvas border border-line rounded-card px-4 py-3">
                  The owner has not pinned this property on the map yet.
                </p>
              )}
            </div>
          </div>

          {/* Right Property Lister Contact Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-surface p-5 rounded-panel border border-line shadow-sm space-y-4 sticky top-24">
              
              <div className="flex items-center gap-3">
                <Avatar
                  src={property.broker?.avatar}
                  name={posterName}
                  size={48}
                  className="border border-line"
                />
                <div className="min-w-0">
                  {property.broker?.id ? (
                    <Link
                      href={`/profile/${property.broker.id}`}
                      className="font-serif-display text-base text-ink truncate hover:text-primary transition-colors block"
                    >
                      {posterName}
                    </Link>
                  ) : (
                    <h4 className="font-serif-display text-base text-ink truncate">{posterName}</h4>
                  )}
                  {/* Was hardcoded "Listed by owner", which asserted the
                      poster owns the property whoever they actually are. */}
                  <p className="text-label text-muted">
                    {property.broker?.posterType
                      ? POSTER_TYPE_LABELS[property.broker.posterType]
                      : "Posted on Delala"}
                  </p>
                  {(property.phone || property.broker?.phone) && (
                    <p className="text-label font-mono-label text-primary font-bold mt-0.5">
                      {property.phone || property.broker?.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* What this poster has actually proved. Renders nothing when
                  they have proved nothing, and the note below says so rather
                  than leaving a silence that reads as approval. */}
              {property.broker && (
                <div className="space-y-1.5">
                  <VerificationBadges verification={property.broker.verification} />
                  {!property.broker.verification.phone &&
                    !property.broker.verification.identity &&
                    !property.broker.verification.business && <NoVerificationNote />}
                </div>
              )}

              <div className="space-y-3">
                {(property.phone || property.broker?.phone) ? (
                  <>
                    <a
                      href={`tel:${(property.phone || property.broker?.phone).replace(/\s+/g, "")}`}
                      className={buttonClasses({ size: "lg", className: "w-full" })}
                    >
                      <Phone className="w-4 h-4 text-accent" />
                      <span>Call {property.phone || property.broker?.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${(property.phone || property.broker?.phone).replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-11 rounded-full bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp owner</span>
                    </a>
                  </>
                ) : null}

                {property.broker?.id && (
                  <Link
                    href={`/profile/${property.broker.id}`}
                    className="w-full h-11 rounded-full bg-canvas text-ink text-xs font-bold hover:bg-line transition-colors border border-line flex items-center justify-center gap-2"
                  >
                    <span>See all homes by {posterName.split(" ")[0]}</span>
                  </Link>
                )}

                <button
                  onClick={() => setIsScheduleOpen(true)}
                  className="w-full h-11 rounded-full bg-canvas text-ink text-xs font-bold hover:bg-line transition-colors border border-line flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Schedule a visit</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Reviews of this specific property. Loaded on its own so a failure
            leaves the listing itself readable. */}
        <div className="mt-10 pt-6 border-t border-line">
          <ReviewsSection
            summary={reviews.data}
            loading={reviews.loading}
            error={reviews.error}
            onRetry={reviews.retry}
            title="Reviews of this property"
            emptyMessage="Nobody has reviewed this property yet."
          />
        </div>

        {/* Similar Listings */}
        {similarListings.length > 0 && (
          <div className="mt-10 pt-6 border-t border-line">
            <h2 className="font-serif-display text-xl text-ink mb-4">
              More homes in {property.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {similarListings.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      <ReportListingModal
        propertyId={property.id}
        propertyTitle={property.title}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        property={property}
      />

    </div>
  );
}
