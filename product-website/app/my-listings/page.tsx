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
    <div className="min-h-screen bg-canvas text-ink font-sans pb-24">
      {/* Header */}
      <div className="bg-primary text-white py-12 border-b border-primary-hover">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif-display text-3xl sm:text-4xl text-white">
              My Property Listings
            </h1>
            <p className="mt-1 text-sm text-line/80">
              Broker & Owner Listing Dashboard • Manage active listings, track walkthrough inquiries, and view field audit status.
            </p>
          </div>
          <Link
            href="/publish"
            className="px-6 py-3.5 rounded-full bg-accent text-primary font-mono-label text-xs font-bold hover:bg-surface transition-colors shadow-md flex items-center gap-2"
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
          <div className="p-6 rounded-panel bg-surface border border-line shadow-xs">
            <div className="text-xs font-mono-label text-muted">TOTAL PROPERTIES</div>
            <div className="font-serif-display text-3xl text-ink mt-1">{properties.length}</div>
          </div>
          <div className="p-6 rounded-panel bg-surface border border-line shadow-xs">
            <div className="text-xs font-mono-label text-emerald-700">APPROVED & LIVE</div>
            <div className="font-serif-display text-3xl text-ink mt-1">
              {properties.filter((p) => p.verified).length}
            </div>
          </div>
          <div className="p-6 rounded-panel bg-surface border border-line shadow-xs">
            <div className="text-xs font-mono-label text-amber-700">PENDING FIELD AUDIT</div>
            <div className="font-serif-display text-3xl text-ink mt-1">
              {properties.filter((p) => !p.verified).length}
            </div>
          </div>
          <div className="p-6 rounded-panel bg-surface border border-line shadow-xs">
            <div className="text-xs font-mono-label text-primary">WALKTHROUGH REQUESTS</div>
            <div className="font-serif-display text-3xl text-ink mt-1">12</div>
          </div>
        </div>

        {/* Listings List */}
        <div className="bg-surface rounded-panel border border-line shadow-sm p-6 sm:p-8">
          
          <div className="flex items-center gap-2 mb-6 border-b border-line pb-4">
            {(["all", "approved", "pending"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full font-mono-label text-xs font-bold uppercase transition-colors ${
                  activeTab === tab ? "bg-primary text-white" : "bg-canvas text-muted hover:bg-line"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 rounded-card bg-canvas animate-pulse" />
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Building2 className="w-12 h-12 text-muted mx-auto opacity-50" />
              <h3 className="font-serif-display text-xl text-ink">No Property Listings Found</h3>
              <p className="text-xs text-muted">You haven't submitted any properties yet. Click "Publish New Listing" above to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="p-5 rounded-card bg-canvas border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img src={property.heroImage} alt="" className="w-16 h-16 rounded-control object-cover" />
                    <div>
                      <h4 className="font-serif-display text-lg text-ink">{property.title}</h4>
                      <p className="text-xs text-muted font-mono-label">
                        {property.subCity}, {property.city} • ETB {property.rentETB.toLocaleString()}/mo
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/property/${property.slug}`}
                      className="px-4 py-2 rounded-full bg-surface border border-line text-xs font-mono-label text-ink"
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
