"use client";

import { useState } from "react";
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
import { Skeleton } from "@/components/ui";
import { PropertyPhoto } from "@/components/property-photo";
import { ErrorNotice } from "@/components/error-notice";
import { useAsync } from "@/lib/use-async";
import { useSession } from "@/lib/use-session";

export default function MyListingsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "approved" | "pending" | "archived">("all");
  const session = useSession();
  const ownerId = session?.user.id;

  /**
   * Only this user's listings.
   *
   * This called `getProperties()` with no owner, so "My listings" showed every
   * property on the marketplace — including the counts above it, which meant
   * the approved/pending tallies belonged to the whole site rather than to the
   * person reading them.
   */
  const { data, loading, error, retry } = useAsync(
    async () => (ownerId ? apiClient.getProperties({ ownerId, status: "all" }) : []),
    [ownerId]
  );

  const properties: Property[] = data || [];

  const filteredProperties = properties.filter((p) => {
    if (activeTab === "approved") return p.approved;
    if (activeTab === "pending") return !p.approved;
    return true;
  });

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans pb-24">
      {/* Header */}
      <div className="bg-primary text-white py-8 border-b border-primary-hover">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-4">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-panel bg-surface border border-line shadow-xs">
            <div className="text-xs font-mono-label text-muted">Total properties</div>
            <div className="font-serif-display text-3xl text-ink mt-1">{properties.length}</div>
          </div>
          <div className="p-6 rounded-panel bg-surface border border-line shadow-xs">
            <div className="text-xs font-mono-label text-emerald-700">Approved &amp; live</div>
            <div className="font-serif-display text-3xl text-ink mt-1">
              {properties.filter((p) => p.approved).length}
            </div>
          </div>
          <div className="p-6 rounded-panel bg-surface border border-line shadow-xs">
            <div className="text-xs font-mono-label text-amber-700">Pending review</div>
            <div className="font-serif-display text-3xl text-ink mt-1">
              {properties.filter((p) => !p.approved).length}
            </div>
          </div>
        </div>

        {/* Listings List */}
        <div className="bg-surface rounded-panel border border-line shadow-sm p-6 sm:p-6">
          
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

          {!ownerId ? (
            <div className="py-10 text-center space-y-3">
              <Building2 className="w-12 h-12 text-muted mx-auto opacity-50" />
              <h3 className="font-serif-display text-xl text-ink">Sign in to see your listings</h3>
              <p className="text-xs text-muted">Your properties appear here once you are signed in.</p>
            </div>
          ) : error ? (
            <ErrorNotice message={error} onRetry={retry} />
          ) : loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24" />
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="py-10 text-center space-y-3">
              <Building2 className="w-12 h-12 text-muted mx-auto opacity-50" />
              <h3 className="font-serif-display text-xl text-ink">No Property Listings Found</h3>
              <p className="text-xs text-muted">You haven’t submitted any properties yet. Use “Publish New Listing” above to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="p-5 rounded-card bg-canvas border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-control overflow-hidden shrink-0">
                      <PropertyPhoto src={property.heroImage} alt={property.title} sizeHint="thumb" />
                    </div>
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
