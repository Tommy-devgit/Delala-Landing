"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { PROPERTIES } from "@/lib/data";
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
} from "lucide-react";

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const property = PROPERTIES.find((p) => p.slug === slug) || PROPERTIES[0];
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [activeImage, setActiveImage] = useState(property.heroImage);

  if (!property) return null;

  const similarListings = PROPERTIES.filter(
    (p) => p.id !== property.id && p.city === property.city
  ).slice(0, 3);

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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#ECE7DA] text-xs font-mono-label text-[#2D2D2D] hover:border-[#4C061D]"
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
              <span>{isFav ? "SAVED" : "SAVE"}</span>
            </button>

            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#ECE7DA] text-xs font-mono-label text-[#2D2D2D] hover:border-[#4C061D]"
            >
              <Share2 className="w-3.5 h-3.5 text-[#4C061D]" />
              <span>SHARE</span>
            </button>
          </div>
        </div>

        {/* Property Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#B4C292]/30 border border-[#B4C292]/50 px-3 py-1 rounded-full font-bold">
              {property.propertyType.toUpperCase()}
            </span>
            {property.verified && (
              <span className="font-mono-label text-[10px] text-[#4C061D] bg-white border border-[#ECE7DA] px-3 py-1 rounded-full font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" /> FIELD VERIFIED RESIDENCE
              </span>
            )}
          </div>

          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#1c1b12] mb-2">
            {property.title}
          </h1>

          <p className="text-sm text-[#736F4E] flex items-center gap-1 font-medium">
            <MapPin className="w-4 h-4 text-[#4C061D]" />
            <span>{property.address}, {property.neighborhood}, {property.subCity}, {property.city}</span>
          </p>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-12">
          {/* Main Hero Photo (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden aspect-[16/10] bg-[#1c1b12] border border-[#ECE7DA] shadow-md">
            <img
              src={activeImage}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Side Thumbnails (4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
            {property.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative rounded-xl overflow-hidden aspect-[16/9] border-2 transition-all ${
                  activeImage === img ? "border-[#4C061D] shadow-md" : "border-[#ECE7DA] opacity-80 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Details & Sidebar Booking Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Quick Specs Bar */}
            <div className="bg-white p-6 rounded-2xl border border-[#ECE7DA] shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <span className="font-mono-label text-[9px] text-[#736F4E] block">MONTHLY RENT</span>
                <span className="text-xl font-bold text-[#4C061D]">ETB {property.rentETB.toLocaleString()}</span>
              </div>
              <div>
                <span className="font-mono-label text-[9px] text-[#736F4E] block">BEDROOMS</span>
                <span className="text-xl font-bold text-[#1c1b12]">{property.bedrooms} Beds</span>
              </div>
              <div>
                <span className="font-mono-label text-[9px] text-[#736F4E] block">BATHROOMS</span>
                <span className="text-xl font-bold text-[#1c1b12]">{property.bathrooms} Baths</span>
              </div>
              <div>
                <span className="font-mono-label text-[9px] text-[#736F4E] block">AREA SIZE</span>
                <span className="text-xl font-bold text-[#1c1b12]">{property.areaSqm} sqm</span>
              </div>
            </div>

            {/* Field Agent Inspection Audit Report */}
            {property.fieldAgentNotes && (
              <div className="bg-white p-6 rounded-2xl border border-[#B4C292] shadow-xs relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#4C061D]" />
                  <h3 className="font-serif-display text-xl font-light text-[#1c1b12]">
                    Field Verification Audit Report
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#736F4E] leading-relaxed font-normal bg-[#FAF8F4] p-4 rounded-xl border border-[#ECE7DA]">
                  "{property.fieldAgentNotes}"
                </p>

                <div className="mt-3 flex items-center justify-between font-mono-label text-[10px] text-[#4C061D]">
                  <span>INSPECTED BY LICENSED FIELD AGENT</span>
                  <span className="font-bold">STATUS: 100% AUDITED</span>
                </div>
              </div>
            )}

            {/* Overview Description */}
            <div>
              <h3 className="font-serif-display text-2xl font-light text-[#1c1b12] mb-3">
                Property Overview
              </h3>
              <p className="text-sm text-[#736F4E] leading-relaxed font-normal">
                {property.description}
              </p>
            </div>

            {/* Infrastructure & Essential Amenities Checklist */}
            <div>
              <h3 className="font-serif-display text-2xl font-light text-[#1c1b12] mb-4">
                Essential Infrastructure & Features
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#ECE7DA] flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#B4C292]" />
                  <div>
                    <div className="text-xs font-bold text-[#1c1b12]">Standby Generator</div>
                    <div className="text-[10px] text-[#736F4E]">{property.generator ? "Installed & Auto Transfer" : "Grid Power Only"}</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#ECE7DA] flex items-center gap-3">
                  <Droplets className="w-5 h-5 text-cyan-600" />
                  <div>
                    <div className="text-xs font-bold text-[#1c1b12]">Reserve Water Tank</div>
                    <div className="text-[10px] text-[#736F4E]">{property.waterTank ? "Installed with Pump" : "Municipal Line"}</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#ECE7DA] flex items-center gap-3">
                  <Car className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="text-xs font-bold text-[#1c1b12]">Private Parking</div>
                    <div className="text-[10px] text-[#736F4E]">{property.parking ? "Dedicated Slot" : "Street Parking"}</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#ECE7DA] flex items-center gap-3">
                  <Home className="w-5 h-5 text-[#4C061D]" />
                  <div>
                    <div className="text-xs font-bold text-[#1c1b12]">Furnishing Status</div>
                    <div className="text-[10px] text-[#736F4E]">{property.furnished ? "Fully Furnished" : "Unfurnished"}</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#ECE7DA] flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-xs font-bold text-[#1c1b12]">Security Guard</div>
                    <div className="text-[10px] text-[#736F4E]">{property.securityGuard ? "24/7 Guardhouse" : "Gated Entry"}</div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#ECE7DA] flex items-center gap-3">
                  <Building className="w-5 h-5 text-indigo-600" />
                  <div>
                    <div className="text-xs font-bold text-[#1c1b12]">Private Balcony</div>
                    <div className="text-[10px] text-[#736F4E]">{property.balcony ? "Available" : "None"}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar Booking & Broker Contact (4 cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            
            {/* Booking Action Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#ECE7DA] shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-[#ECE7DA] pb-4">
                <div>
                  <span className="font-mono-label text-[9px] text-[#736F4E] block">RENTAL RATE</span>
                  <span className="text-2xl font-bold text-[#4C061D]">
                    ETB {property.rentETB.toLocaleString()} <span className="text-xs font-normal text-[#736F4E]">/ mo</span>
                  </span>
                </div>
                <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#FAF8F4] px-2.5 py-1 rounded-full border border-[#ECE7DA] font-bold">
                  AVAILABLE {property.availableDate.toUpperCase()}
                </span>
              </div>

              <button
                onClick={() => setIsScheduleOpen(true)}
                className="w-full py-3.5 rounded-xl bg-[#4C061D] text-white font-mono-label text-xs font-bold shadow-md hover:bg-[#3B3923] transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#B4C292]" />
                <span>SCHEDULE FIELD WALKTHROUGH</span>
              </button>

              {/* Broker Details inside Card */}
              <div className="pt-4 border-t border-[#ECE7DA]">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={property.broker.avatar}
                    alt={property.broker.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#ECE7DA]"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-serif-display text-base font-light text-[#1c1b12]">
                        {property.broker.name}
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" />
                    </div>
                    <span className="text-[11px] text-[#736F4E] block">
                      {property.broker.agencyName}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#736F4E] font-medium bg-[#FAF8F4] p-3 rounded-xl border border-[#ECE7DA]">
                  <div className="flex items-center justify-between">
                    <span>Broker Rating:</span>
                    <span className="font-bold text-[#1c1b12] flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {property.broker.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Response Time:</span>
                    <span className="font-bold text-[#4C061D]">{property.broker.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Languages:</span>
                    <span className="font-bold text-[#1c1b12]">{property.broker.languages.join(", ")}</span>
                  </div>
                </div>

                <a
                  href={`tel:${property.broker.phone}`}
                  className="mt-4 w-full py-2.5 rounded-lg bg-white border border-[#ECE7DA] text-[#4C061D] font-mono-label text-[11px] font-bold hover:border-[#4C061D] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL AGENT DIRECTLY</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Similar Listings Carousel */}
        {similarListings.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#ECE7DA]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
                Similar Verified Homes in {property.city}
              </h2>
              <Link href="/search" className="font-mono-label text-[11px] text-[#4C061D] font-bold">
                VIEW ALL →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarListings.map((sim) => (
                <PropertyCard key={sim.id} property={sim} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Schedule Walkthrough Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        property={property}
      />
    </div>
  );
}
