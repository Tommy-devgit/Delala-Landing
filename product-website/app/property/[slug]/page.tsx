"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { Property } from "@/lib/types";
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
  CheckCircle2,
  Building,
  Building2,
} from "lucide-react";

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
      <div className="bg-[#FAF8F4] min-h-screen py-16 px-8">
        <div className="max-w-[1440px] mx-auto h-96 rounded-3xl bg-white border border-[#ECE7DA] animate-pulse" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-[#FAF8F4] min-h-screen py-24 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#4C061D]/10 text-[#4C061D] flex items-center justify-center mx-auto">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="font-serif-display text-2xl text-[#1C1B12]">
          Property Not Found
        </h2>
        <p className="text-xs text-[#736F4E]">
          The requested property listing does not exist or has been removed from the database.
        </p>
        <Link href="/" className="inline-block px-6 py-2.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Top Breadcrumb & Actions Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#ECE7DA]">
          <div className="flex items-center gap-2 text-xs font-mono-label text-[#736F4E]">
            <Link href="/" className="hover:text-[#4C061D]">MARKETPLACE</Link>
            <span>/</span>
            <Link href={`/cities/${property.city.toLowerCase().replace(/ /g, "-")}`} className="hover:text-[#4C061D]">
              {property.city.toUpperCase()}
            </Link>
            <span>/</span>
            <span className="text-[#4C061D] font-bold">{property.subCity.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFav(!isFav)}
              className={`p-2.5 rounded-full border border-[#ECE7DA] transition-colors ${
                isFav ? "bg-red-50 text-red-600 border-red-200" : "bg-white text-[#736F4E] hover:text-[#4C061D]"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
            </button>
            <button className="p-2.5 rounded-full bg-white border border-[#ECE7DA] text-[#736F4E] hover:text-[#4C061D] transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#B4C292]/30 border border-[#B4C292]/50 px-2.5 py-0.5 rounded-full font-bold">
                VERIFIED PROPERTY
              </span>
              <span className="text-xs font-mono-label text-[#736F4E]">
                {property.propertyType}
              </span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl font-light text-[#1c1b12]">
              {property.title}
            </h1>

            <p className="text-xs text-[#736F4E] mt-1 flex items-center gap-1 font-mono-label">
              <MapPin className="w-3.5 h-3.5 text-[#4C061D]" />
              <span>{property.address} • {property.neighborhood}, {property.subCity}, {property.city}</span>
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#ECE7DA] shadow-xs text-right">
            <span className="font-mono-label text-[10px] text-[#736F4E] block">MONTHLY RENT</span>
            <div className="font-mono-label text-2xl font-bold text-[#4C061D]">
              ETB {property.rentETB.toLocaleString()} <span className="text-xs font-normal text-[#736F4E]">/mo</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          <div className="lg:col-span-8 aspect-[16/10] rounded-3xl overflow-hidden border border-[#ECE7DA] bg-[#1c1b12] relative shadow-md">
            <img src={activeImage} alt={property.title} className="w-full h-full object-cover" />
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {property.galleryImages.slice(0, 4).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`rounded-2xl overflow-hidden border border-[#ECE7DA] aspect-[4/3] relative ${
                  activeImage === img ? "ring-2 ring-[#4C061D]" : ""
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            
            {/* Infrastructure Specs */}
            <div className="bg-white p-6 rounded-3xl border border-[#ECE7DA] space-y-4">
              <h3 className="font-serif-display text-xl text-[#1c1b12]">
                Verified Infrastructure Specs
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono-label text-[#736F4E]">
                <div>🛏️ {property.bedrooms} Bedrooms</div>
                <div>🚿 {property.bathrooms} Bathrooms</div>
                <div>📐 {property.areaSqm} sqm</div>
                <div>⚡ {property.generator ? "Standby Generator" : "No Generator"}</div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-3xl border border-[#ECE7DA] space-y-3">
              <h3 className="font-serif-display text-xl text-[#1c1b12]">
                Property Overview
              </h3>
              <p className="text-sm text-[#736F4E] leading-relaxed">
                {property.description}
              </p>
            </div>

          </div>

          {/* Right Broker Contact Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#ECE7DA] shadow-md space-y-6 sticky top-24">
              
              <div className="flex items-center gap-4">
                <img src={property.broker.avatar} alt="" className="w-14 h-14 rounded-full object-cover border border-[#ECE7DA]" />
                <div>
                  <h4 className="font-serif-display text-lg text-[#1c1b12]">{property.broker.name}</h4>
                  <p className="text-xs font-mono-label text-[#4C061D]">{property.broker.agencyName}</p>
                </div>
              </div>

              <button
                onClick={() => setIsScheduleOpen(true)}
                className="w-full py-4 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#B4C292]" />
                <span>SCHEDULE FIELD WALKTHROUGH</span>
              </button>

            </div>
          </div>
        </div>

        {/* Similar Listings */}
        {similarListings.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[#ECE7DA]">
            <h3 className="font-serif-display text-2xl text-[#1c1b12] mb-6">
              Similar Verified Listings in {property.city}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
