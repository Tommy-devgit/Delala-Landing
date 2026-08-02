"use client";

import { useState } from "react";
import { StatsCard } from "@/components/stats-card";
import { PropertyTable } from "@/components/property-table";
import { ApprovalModal } from "@/components/approval-modal";
import { ADMIN_METRICS, ADMIN_PROPERTIES, AdminProperty } from "@/lib/mock-admin-data";
import { Users, Building2, CheckSquare, ShieldCheck, Flag, Calendar, Activity } from "lucide-react";

export default function AdminOverviewPage() {
  const [properties, setProperties] = useState<AdminProperty[]>(ADMIN_PROPERTIES);
  const [selectedProp, setSelectedProp] = useState<AdminProperty | null>(null);

  const handleAction = (id: string, action: "APPROVED" | "REJECTED", reason?: string, notes?: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: action, rejectionReason: reason, fieldAgentNotes: notes } : p)),
    );
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">PLATFORM OVERVIEW</h1>
          <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
            Real-time marketplace system health & operational metrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-md bg-[#1E293B] border border-[#334155] text-xs font-mono text-[#B4C292]">
            API /api/v1 CONNECTED
          </span>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="TOTAL USERS"
          value={ADMIN_METRICS.totalUsers.toLocaleString()}
          subtitle="Platform accounts"
          icon={Users}
          trend="+12% this mo"
        />
        <StatsCard
          title="ACTIVE LISTINGS"
          value={ADMIN_METRICS.activeListings}
          subtitle="Verified properties"
          icon={Building2}
          trend="+8 new today"
        />
        <StatsCard
          title="PENDING APPROVALS"
          value={ADMIN_METRICS.pendingApprovals}
          subtitle="Awaiting agent audit"
          icon={CheckSquare}
          trend="12 in queue"
        />
        <StatsCard
          title="VERIFIED BROKERS"
          value={ADMIN_METRICS.verifiedBrokers}
          subtitle="Licensed agencies"
          icon={ShieldCheck}
          trend="100% active"
        />
      </div>

      {/* Main Section: Pending Submissions Queue */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#B4C292]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              RECENT PROPERTY SUBMISSIONS
            </h2>
          </div>
          <span className="text-xs font-mono text-[#94A3B8]">Showing 5 most recent</span>
        </div>

        <PropertyTable properties={properties} onOpenReview={(p) => setSelectedProp(p)} />
      </div>

      {/* Approval Modal */}
      <ApprovalModal
        isOpen={!!selectedProp}
        onClose={() => setSelectedProp(null)}
        property={selectedProp}
        onAction={handleAction}
      />
    </div>
  );
}
