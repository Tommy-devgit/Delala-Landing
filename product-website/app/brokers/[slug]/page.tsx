"use client";

import { useParams } from "next/navigation";
import { BROKERS, PROPERTIES } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { ShieldCheck, Star, Phone, Mail, Clock, MapPin } from "lucide-react";

export default function BrokerProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const broker = BROKERS.find((b) => b.slug === slug) || BROKERS[0];
  const brokerListings = PROPERTIES.filter((p) => p.broker.id === broker.id);

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs mb-12 flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={broker.avatar}
                alt={broker.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#ECE7DA]"
              />
              {broker.verified && (
                <div className="absolute bottom-0 right-0 bg-[#4C061D] text-white p-1.5 rounded-full border-2 border-white">
                  <ShieldCheck className="w-5 h-5 text-[#B4C292]" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-serif-display text-3xl font-light text-[#1c1b12]">
                  {broker.name}
                </h1>
                <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#B4C292]/30 px-2.5 py-0.5 rounded-full border border-[#B4C292]/50 font-bold">
                  VERIFIED AGENT
                </span>
              </div>

              <div className="font-mono-label text-[11px] text-[#4C061D] font-bold mb-3">
                {broker.agencyName}
              </div>

              <p className="text-xs text-[#736F4E] max-w-xl leading-relaxed mb-4">
                {broker.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#2D2D2D]">
                <span className="flex items-center gap-1 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {broker.rating} ({broker.reviewsCount} Reviews)
                </span>
                <span className="flex items-center gap-1 text-[#736F4E]">
                  <Clock className="w-4 h-4 text-[#4C061D]" /> Response: {broker.responseTime}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto bg-[#FAF8F4] p-5 rounded-2xl border border-[#ECE7DA] space-y-3 shrink-0">
            <a
              href={`tel:${broker.phone}`}
              className="w-full px-6 py-3 rounded-xl bg-[#4C061D] text-white font-mono-label text-xs font-bold shadow-xs hover:bg-[#3B3923] transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>CALL {broker.phone}</span>
            </a>

            <a
              href={`mailto:${broker.email}`}
              className="w-full px-6 py-2.5 rounded-xl bg-white border border-[#ECE7DA] text-[#4C061D] font-mono-label text-xs font-bold hover:border-[#4C061D] transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>SEND EMAIL</span>
            </a>
          </div>
        </div>

        {/* Active Listings by Broker */}
        <div className="mb-8 flex items-center justify-between border-b border-[#ECE7DA] pb-4">
          <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
            Active Listings by {broker.name}
          </h2>
          <span className="font-mono-label text-[10px] text-[#4C061D] font-bold">
            {brokerListings.length} HOMES
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brokerListings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

      </div>
    </div>
  );
}
