"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { Property } from "@/lib/types";
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

export default function MyListingsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "approved" | "pending" | "archived">("all");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const data = await apiClient.getProperties();
      setProperties(data);
      setLoading(false);
    }
    loadProperties();
  }, []);

  const filteredProperties = properties.filter((p) => {
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
            <div className="font-serif-display text-3xl text-[#1C1B12] mt-1">{properties.length}</div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-[#ECE7DA] shadow-xs">
            <div className="text-xs font-mono-label text-emerald-700">APPROVED & LIVE</div>
            <div className="font-serif-display text-3xl text-[#1C1B12] mt-1">
              {properties.filter((p) => p.verified).length}
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-[#ECE7DA] shadow-xs">
            <div className="text-xs font-mono-label text-amber-700">PENDING FIELD AUDIT</div>
            <div className="font-serif-display text-3xl text-[#1C1B12] mt-1">
              {properties.filter((p) => !p.verified).length}
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-white border border-[#ECE7DA] shadow-xs">
            <div className="text-xs font-mono-label text-[#4C061D]">WALKTHROUGH REQUESTS</div>
            <div className="font-serif-display text-3xl text-[#1C1B12] mt-1">12</div>
          </div>
        </div>

        {/* Listings List */}
        <div className="bg-white rounded-3xl border border-[#ECE7DA] shadow-sm p-6 sm:p-8">
          
          <div className="flex items-center gap-2 mb-6 border-b border-[#ECE7DA] pb-4">
            {(["all", "approved", "pending"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-mono-label text-xs font-bold uppercase transition-colors ${
                  activeTab === tab ? "bg-[#4C061D] text-white" : "bg-[#FAF8F4] text-[#736F4E] hover:bg-[#ECE7DA]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-2xl bg-[#FAF8F4] animate-pulse" />
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Building2 className="w-12 h-12 text-[#736F4E] mx-auto opacity-50" />
              <h3 className="font-serif-display text-xl text-[#1C1B12]">No Property Listings Found</h3>
              <p className="text-xs text-[#736F4E]">You haven't submitted any properties yet. Click "Publish New Listing" above to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img src={property.heroImage} alt="" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-serif-display text-lg text-[#1C1B12]">{property.title}</h4>
                      <p className="text-xs text-[#736F4E] font-mono-label">
                        {property.subCity}, {property.city} • ETB {property.rentETB.toLocaleString()}/mo
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/property/${property.slug}`}
                      className="px-4 py-2 rounded-full bg-white border border-[#ECE7DA] text-xs font-mono-label text-[#1C1B12]"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
