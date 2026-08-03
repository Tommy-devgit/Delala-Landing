"use client";

import { useState } from "react";
import { StatsCard } from "@/components/stats-card";
import { PropertyTable } from "@/components/property-table";
import { ApprovalModal } from "@/components/approval-modal";
import { ADMIN_METRICS, ADMIN_PROPERTIES, AdminProperty } from "@/lib/mock-admin-data";
import { Users, Building2, CheckSquare, ShieldCheck, Activity } from "lucide-react";

export default function AdminOverviewPage() {
  const [properties, setProperties] = useState<AdminProperty[]>(ADMIN_PROPERTIES);
  const [selectedProp, setSelectedProp] = useState<AdminProperty | null>(null);

  const handleAction = (id: string, action: "APPROVED" | "REJECTED", reason?: string, notes?: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: action, rejectionReason: reason, fieldAgentNotes: notes } : p)),
    );
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE7DA] pb-6">
        <div>
          <span className="text-[11px] font-mono-label font-bold text-[#736F4E] tracking-widest uppercase">
            DELALA ETHIOPIA
          </span>
          <h1 className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mt-1">
            Platform Overview
          </h1>
          <p className="text-xs text-[#736F4E] font-mono-label mt-1">
            Real-time marketplace operational metrics & field agent review stream
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#ECE7DA] text-xs font-mono-label font-bold text-[#4C061D] shadow-xs">
            API /api/v1 CONNECTED
          </span>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F4] border border-[#ECE7DA] flex items-center justify-center text-[#4C061D]">
              <Activity className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-serif-display font-light text-[#1C1B12]">
              Recent Property Submissions
            </h2>
          </div>
          <span className="text-xs font-mono-label text-[#736F4E]">Showing 5 most recent</span>
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
