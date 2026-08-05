"use client";

import Link from "next/link";
import { ShieldCheck, Star, Phone, MapPin } from "lucide-react";
import { Broker } from "@/lib/types";

export function BrokerCard({ broker }: { broker: Broker }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#ECE7DA] shadow-xs hover:shadow-md hover:border-[#B4C292] transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <img
              src={broker.avatar}
              alt={broker.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#ECE7DA] group-hover:border-[#4C061D] transition-colors"
            />
            {broker.verified && (
              <div className="absolute -bottom-1 -right-1 bg-[#4C061D] text-white p-1 rounded-full border border-white">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B4C292]" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 bg-[#FAF8F4] px-2.5 py-1 rounded-full text-xs font-bold border border-[#ECE7DA]">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{broker.rating}</span>
            <span className="text-[10px] text-[#736F4E] font-normal">({broker.reviewsCount})</span>
          </div>
        </div>

        <h3 className="font-serif-display text-xl font-light text-[#1c1b12] group-hover:text-[#4C061D] transition-colors mb-0.5">
          {broker.name}
        </h3>

        <div className="font-mono-label text-[10px] text-[#4C061D] mb-3">
          {broker.agencyName}
        </div>

        <p className="text-xs text-[#736F4E] leading-relaxed line-clamp-2 mb-4">
          {broker.bio}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {broker.specializedAreas.map((area) => (
            <span
              key={area}
              className="px-2 py-0.5 rounded-md bg-[#FAF8F4] text-[#2D2D2D] text-[10px] font-semibold border border-[#ECE7DA]"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[#ECE7DA] flex items-center justify-between">
        <div>
          <span className="font-mono-label text-[9px] text-[#736F4E] block">LISTINGS</span>
          <span className="text-xs font-bold text-[#4C061D]">
            {broker.activeListingsCount} Active Homes
          </span>
        </div>

        <Link
          href={`/brokers/${broker.slug}`}
          className="px-4 py-2 rounded-lg bg-[#FAF8F4] text-[#4C061D] font-mono-label text-[10px] border border-[#ECE7DA] group-hover:bg-[#4C061D] group-hover:text-white group-hover:border-[#4C061D] transition-colors"
        >
          VIEW PROFILE →
        </Link>
      </div>
    </div>
  );
}
