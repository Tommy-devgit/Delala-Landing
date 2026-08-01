"use client";

import { useParams } from "react";
import Link from "next/link";
import { NEIGHBORHOODS, PROPERTIES } from "@/lib/data";
import { PropertyCard } from "@/components/property-card";
import { ShieldCheck, Zap, Droplets, ArrowRight } from "lucide-react";

export default function NeighborhoodDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const nh = NEIGHBORHOODS.find((n) => n.slug === slug) || NEIGHBORHOODS[0];
  const nhProperties = PROPERTIES.filter((p) => p.neighborhood.toLowerCase() === nh.name.toLowerCase());

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        {/* Neighborhood Guide Banner */}
        <div className="bg-white p-8 rounded-3xl border border-[#ECE7DA] shadow-xs mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#FAF8F4] border border-[#ECE7DA] px-3.5 py-1 rounded-full inline-block mb-3">
              {nh.subCity.toUpperCase()} • {nh.city.toUpperCase()}
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-light text-[#1c1b12] mb-3">
              {nh.name} Neighborhood Guide
            </h1>
            <p className="text-sm text-[#736F4E] leading-relaxed mb-6 font-normal">
              {nh.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA]">
                <span className="font-mono-label text-[9px] text-[#736F4E] block">SECURITY SCORE</span>
                <span className="text-xl font-bold text-[#4C061D] flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#4C061D]" /> {nh.securityScore} / 10
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA]">
                <span className="font-mono-label text-[9px] text-[#736F4E] block">GENERATOR COVERAGE</span>
                <span className="text-xs font-bold text-[#1c1b12] flex items-center gap-1 mt-1">
                  <Zap className="w-3.5 h-3.5 text-[#B4C292]" /> {nh.generatorPenetration}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA]">
                <span className="font-mono-label text-[9px] text-[#736F4E] block">WATER RELIABILITY</span>
                <span className="text-xs font-bold text-[#1c1b12] flex items-center gap-1 mt-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600" /> {nh.waterReliability}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 aspect-[4/3] rounded-2xl overflow-hidden bg-[#1c1b12] border border-[#ECE7DA]">
            <img src={nh.heroImage} alt={nh.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Listings */}
        <div className="mb-8 flex items-center justify-between border-b border-[#ECE7DA] pb-4">
          <h2 className="font-serif-display text-3xl font-light text-[#1c1b12]">
            Homes in {nh.name}
          </h2>
          <span className="font-mono-label text-[10px] text-[#4C061D] font-bold">
            {nhProperties.length} ACTIVE HOMES
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nhProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

      </div>
    </div>
  );
}
