"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  CheckCircle2,
  Clock,
  Eye,
  Calendar,
  Edit,
  Trash2,
  Filter,
} from "lucide-react";
import { PROPERTIES } from "@/lib/data";

export default function MyListingsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "approved" | "pending" | "archived">("all");

  const filteredProperties = PROPERTIES.filter((p) => {
    if (activeTab === "approved") return p.verified;
    if (activeTab === "pending") return !p.verified;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1B12] font-sans pb-24">
      {/* Header */}
      <div className="bg-[#4C061D] text-white py-12 border-b border-[#3B0416]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif-display text-3xl sm:text-4xl text-white">
              My Property Listings
            </h1>
            <p className="mt-1 text-sm text-[#ECE7DA]/80">
              Broker & Owner Listing Dashboard • Manage active listings, track walkthrough inquiries, and view field audit status.
            </p>
          </div>
          <Link
            href="/publish"
            className="px-6 py-3.5 rounded-full bg-[#B4C292] text-[#4C061D] font-mono-label text-xs font-bold hover:bg-white transition-colors shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Listing</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-white border border-[#ECE7DA] shadow-xs">
            <div className="text-xs font-mono-label text-[#736F4E]">TOTAL PROPERTIES</div>
            <div className="font-serif-display text-3xl text-[#1C1B12] mt-1">{PROPERTIES.length}</div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-[#ECE7DA] shadow-xs">
            <div className="text-xs font-mono-label text-emerald-700">APPROVED & LIVE</div>
            <div className="font-serif-display text-3xl text-emerald-800 mt-1">
              {PROPERTIES.filter((p) => p.verified).length}
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-[#ECE7DA] shadow-xs">
            <div className="text-xs font-mono-label text-amber-700">PENDING FIELD AUDIT</div>
            <div className="font-serif-display text-3xl text-amber-800 mt-1">1</div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-[#ECE7DA] shadow-xs">
            <div className="text-xs font-mono-label text-[#4C061D]">WALKTHROUGH VISITS</div>
            <div className="font-serif-display text-3xl text-[#4C061D] mt-1">12</div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 border-b border-[#ECE7DA] pb-3">
          {(["all", "approved", "pending", "archived"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-mono-label text-xs capitalize transition-colors ${
                activeTab === tab
                  ? "bg-[#4C061D] text-white font-bold"
                  : "bg-white text-[#736F4E] border border-[#ECE7DA] hover:text-[#1C1B12]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Listings Table / Cards */}
        <div className="bg-white rounded-3xl border border-[#ECE7DA] shadow-sm overflow-hidden">
          <div className="divide-y divide-[#ECE7DA]">
            {filteredProperties.map((property) => (
              <div key={property.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FAF8F4]/50 transition-colors">
                <div className="flex items-start md:items-center gap-4">
                  <img src={property.heroImage} alt="" className="w-20 h-20 rounded-2xl object-cover border border-[#ECE7DA]" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#1C1B12]">{property.title}</h3>
                      {property.verified ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono-label text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> LIVE
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-mono-label text-[10px] font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> PENDING AUDIT
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#736F4E] mt-1 font-mono-label">
                      ETB {property.rentETB.toLocaleString()}/mo • {property.subCity}, {property.city} • {property.bedrooms} Beds
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-[#ECE7DA]">
                  <Link
                    href={`/property/${property.slug}`}
                    className="px-4 py-2 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label text-[#1C1B12] hover:bg-[#ECE7DA] transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </Link>
                  <button className="px-4 py-2 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label text-[#1C1B12] hover:bg-[#ECE7DA] transition-colors flex items-center gap-1.5">
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
