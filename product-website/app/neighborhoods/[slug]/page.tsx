"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { Property } from "@/lib/types";
import { PropertyCard } from "@/components/property-card";
import { ShieldCheck, Zap, Droplets, ArrowRight, Building2 } from "lucide-react";

export default function NeighborhoodDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [nhProperties, setNhProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const nhName = slug ? slug.replace(/-/g, " ") : "Bole Medhanialem";

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await apiClient.getProperties();
      setNhProperties(data.filter((p) => p.subCity.toLowerCase().includes(nhName.toLowerCase()) || p.neighborhood.toLowerCase().includes(nhName.toLowerCase())));
      setLoading(false);
    }
    loadData();
  }, [nhName]);

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Neighborhood Guide Banner */}
        <div className="bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs mb-12">
          <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#FAF8F4] border border-[#ECE7DA] px-3.5 py-1 rounded-full inline-block mb-3 uppercase">
            NEIGHBORHOOD DIRECTORY
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-light text-[#1c1b12] mb-3 capitalize">
            {nhName} Neighborhood Guide
          </h1>
          <p className="text-sm text-[#736F4E] leading-relaxed mb-6 font-normal">
            Verified residential compounds, serviced apartments, and diplomatic residences in {nhName}.
          </p>
        </div>

        {/* Verified Neighborhood Listings */}
        <div className="mb-8 flex items-center justify-between border-b border-[#ECE7DA] pb-4">
          <div>
            <span className="font-mono-label text-[10px] text-[#4C061D] block mb-1">
              FIELD VERIFIED MARKETPLACE
            </span>
            <h2 className="font-serif-display text-3xl font-light text-[#1c1b12] capitalize">
              Available Homes in {nhName} ({nhProperties.length})
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-3xl bg-white border border-[#ECE7DA] animate-pulse" />
            ))}
          </div>
        ) : nhProperties.length === 0 ? (
          <div className="py-16 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#4C061D]/10 text-[#4C061D] flex items-center justify-center mx-auto">
              <Building2 className="w-8 h-8" />
            </div>
            <h2 className="font-serif-display text-2xl text-[#1C1B12] capitalize">
              No Homes Listed in {nhName}
            </h2>
            <p className="text-xs text-[#736F4E]">
              There are currently no active properties listed in {nhName} in your database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nhProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
