"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { Broker, Property } from "@/lib/types";
import { PropertyCard } from "@/components/property-card";
import { ShieldCheck, Star, Phone, Mail, Clock, MapPin, Building2 } from "lucide-react";

export default function BrokerProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [broker, setBroker] = useState<Broker | null>(null);
  const [brokerListings, setBrokerListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      setLoading(true);
      const brokers = await apiClient.getBrokers();
      const foundBroker = brokers.find((b) => b.slug === slug) || brokers[0] || null;
      setBroker(foundBroker);
      if (foundBroker) {
        const allProps = await apiClient.getProperties();
        setBrokerListings(allProps.filter((p) => p.broker.id === foundBroker.id));
      }
      setLoading(false);
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#FAF8F4] min-h-screen py-16 px-8">
        <div className="max-w-[1440px] mx-auto h-80 rounded-3xl bg-white border border-[#ECE7DA] animate-pulse" />
      </div>
    );
  }

  if (!broker) {
    return (
      <div className="bg-[#FAF8F4] min-h-screen py-24 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-[#4C061D]/10 text-[#4C061D] flex items-center justify-center mx-auto">
          <Building2 className="w-8 h-8" />
        </div>
        <h2 className="font-serif-display text-2xl text-[#1C1B12]">
          Broker Profile Not Found
        </h2>
        <p className="text-xs text-[#736F4E]">
          The specified broker profile does not exist in your database.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs mb-12 flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="flex items-start gap-6">
            <div className="relative">
              <img
                src={broker.avatar || "/images/hero_home_away.jpg"}
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
        </div>

        {/* Broker Listings */}
        <div className="mb-8 flex items-center justify-between border-b border-[#ECE7DA] pb-4">
          <div>
            <span className="font-mono-label text-[10px] text-[#4C061D] block mb-1">
              FIELD VERIFIED INVENTORY
            </span>
            <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
              Active Listings by {broker.name} ({brokerListings.length})
            </h2>
          </div>
        </div>

        {brokerListings.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-[#ECE7DA] p-8 max-w-md mx-auto">
            <Building2 className="w-12 h-12 text-[#736F4E] mx-auto opacity-50" />
            <h3 className="font-serif-display text-xl text-[#1C1B12]">No Active Listings</h3>
            <p className="text-xs text-[#736F4E]">This broker currently has no approved active listings in the database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brokerListings.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
