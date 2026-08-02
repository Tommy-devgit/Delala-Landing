"use client";

import { useState } from "react";
import { PropertyTable } from "@/components/property-table";
import { ApprovalModal } from "@/components/approval-modal";
import { ADMIN_PROPERTIES, AdminProperty } from "@/lib/mock-admin-data";
import { CheckSquare, ShieldAlert } from "lucide-react";

export default function AdminApprovalsPage() {
  const [properties, setProperties] = useState<AdminProperty[]>(ADMIN_PROPERTIES);
  const [selectedProp, setSelectedProp] = useState<AdminProperty | null>(null);

  const pendingProps = properties.filter((p) => p.status === "PENDING_APPROVAL");

  const handleAction = (id: string, action: "APPROVED" | "REJECTED", reason?: string, notes?: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: action, rejectionReason: reason, fieldAgentNotes: notes } : p)),
    );
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">PENDING APPROVALS QUEUE</h1>
          <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
            Property listings awaiting field agent verification & title deed audit
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg text-amber-400 font-mono text-xs font-bold">
          <ShieldAlert className="w-4 h-4" />
          <span>{pendingProps.length} LISTINGS AWAITING DECISION</span>
        </div>
      </div>

      {pendingProps.length > 0 ? (
        <PropertyTable properties={pendingProps} onOpenReview={(p) => setSelectedProp(p)} />
      ) : (
        <div className="bg-[#1E293B] p-12 rounded-xl border border-[#334155] text-center text-[#94A3B8]">
          <CheckSquare className="w-10 h-10 mx-auto text-emerald-400 mb-3" />
          <div className="font-bold text-white text-base">Approval Queue Clean</div>
          <div className="text-xs mt-1 font-mono">All pending property submissions have been moderated.</div>
        </div>
      )}

      <ApprovalModal
        isOpen={!!selectedProp}
        onClose={() => setSelectedProp(null)}
        property={selectedProp}
        onAction={handleAction}
      />
    </div>
  );
}
