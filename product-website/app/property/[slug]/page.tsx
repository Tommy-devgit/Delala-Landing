"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
  Star,
  Zap,
  Droplets,
  Car,
  Home,
  Shield,
  Calendar,
  Phone,
  MessageSquare,
  CheckCircle2,
  Building,
  Building2,
} from "lucide-react";
import { Skeleton, buttonClasses } from "@/components/ui";

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [similarListings, setSimilarListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [activeImage, setActiveImage] = useState<string>("/images/hero_property.png");

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      setLoading(true);
      const fetchedProperty = await apiClient.getPropertyBySlug(slug);
      setProperty(fetchedProperty);
      if (fetchedProperty) {
        setActiveImage(fetchedProperty.heroImage);
        const allProperties = await apiClient.getProperties({ city: fetchedProperty.city });
        setSimilarListings(allProperties.filter((p) => p.id !== fetchedProperty.id).slice(0, 3));
      }
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-canvas min-h-screen py-10 px-8">
        <Skeleton className="max-w-[1440px] mx-auto h-96 rounded-panel" />
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
          Property Not Found
        </h2>
        <p className="text-xs text-muted">
          The requested property listing does not exist or has been removed from the database.
        </p>
        <Link href="/" className="inline-block px-6 py-2.5 rounded-full bg-primary text-white font-mono-label text-xs font-bold">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const postedAt = formatPostedAt(property.createdAt);
  const posterName = property.broker?.name || "Property owner";
  const posterInitials = posterName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-canvas min-h-screen py-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">

        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
          <div className="flex items-center gap-2 text-xs font-mono-label text-muted">
            <Link href="/" className="hover:text-primary">MARKETPLACE</Link>
            {property.city && (
              <>
                <span>/</span>
                <Link href={`/cities/${property.city.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-primary">
                  {property.city.toUpperCase()}
                </Link>
              </>
            )}
            {property.subCity && (
              <>
                <span>/</span>
                <span className="text-primary font-bold">{property.subCity.toUpperCase()}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFav(!isFav)}
              className={`p-2.5 rounded-full border border-line transition-colors ${
                isFav ? "bg-red-50 text-red-600 border-red-200" : "bg-surface text-muted hover:text-primary"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
            </button>
            <button className="p-2.5 rounded-full bg-surface border border-line text-muted hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {property.verified && (
                <span className="inline-flex items-center gap-1 font-mono-label text-label text-primary bg-accent/25 border border-accent/50 px-2 py-0.5 rounded-full font-bold">
                  <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                  Verified
                </span>
              )}
              <span className="font-mono-label text-label text-muted">{property.propertyType}</span>
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

          <div className="bg-surface p-4 rounded-card border border-line shadow-xs text-right">
            <span className="font-mono-label text-label text-muted block">MONTHLY RENT</span>
            <div className="font-mono-label text-2xl font-bold text-primary">
              ETB {property.rentETB.toLocaleString()} <span className="text-xs font-normal text-muted">/mo</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-6">
          <div className="lg:col-span-8 aspect-[16/10] rounded-panel overflow-hidden border border-line bg-ink relative shadow-md">
            <img src={activeImage} alt={property.title} className="w-full h-full object-cover" />
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            {property.galleryImages.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`rounded-card overflow-hidden border border-line aspect-[4/3] relative ${
                  activeImage === img ? "ring-2 ring-primary" : ""
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4">
            
            {/* Infrastructure Specs */}
            <div className="bg-surface p-5 rounded-panel border border-line space-y-3">
              <h3 className="font-serif-display text-lg text-ink">
                Verified Infrastructure Specs
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono-label text-muted">
                <div>🛏️ {property.bedrooms} Bedrooms</div>
                <div>🚿 {property.bathrooms} Bathrooms</div>
                <div>📐 {property.areaSqm} sqm</div>
                <div>⚡ {property.generator ? "Standby Generator" : "No Generator"}</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-surface p-5 rounded-panel border border-line space-y-2">
              <h3 className="font-serif-display text-lg text-ink">
                Property Overview
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {property.description}
              </p>
            </div>

          </div>

          {/* Right Property Lister Contact Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-surface p-5 rounded-panel border border-line shadow-sm space-y-4 sticky top-24">
              
              <div className="flex items-center gap-3">
                {property.broker?.avatar ? (
                  <img
                    src={property.broker.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover border border-line shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-serif-display text-lg font-light border border-line shrink-0">
                    {posterInitials}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-serif-display text-base text-ink truncate">{posterName}</h4>
                  <p className="text-label font-mono-label text-muted">Listed by owner</p>
                  {(property.phone || property.broker?.phone) && (
                    <p className="text-label font-mono-label text-primary font-bold mt-0.5">
                      {property.phone || property.broker?.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {(property.phone || property.broker?.phone) ? (
                  <>
                    <a
                      href={`tel:${(property.phone || property.broker?.phone).replace(/\s+/g, "")}`}
                      className={buttonClasses({ size: "lg", className: "w-full" })}
                    >
                      <Phone className="w-4 h-4 text-accent" />
                      <span>CALL {property.phone || property.broker?.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${(property.phone || property.broker?.phone).replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-full bg-emerald-700 text-white font-mono-label text-xs font-bold hover:bg-emerald-800 transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WHATSAPP LISTER</span>
                    </a>
                  </>
                ) : null}

                <button
                  onClick={() => setIsScheduleOpen(true)}
                  className="w-full py-3 rounded-full bg-canvas text-ink font-mono-label text-xs font-bold hover:bg-line transition-colors border border-line flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>SCHEDULE WALKTHROUGH</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Listings */}
        {similarListings.length > 0 && (
          <div className="mt-10 pt-6 border-t border-line">
            <h3 className="font-serif-display text-xl text-ink mb-4">
              Similar Verified Listings in {property.city}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {similarListings.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        property={property}
      />

    </div>
  );
}
