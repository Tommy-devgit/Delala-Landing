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
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE7DA] pb-6">
        <div>
          <span className="text-[11px] font-mono-label font-bold text-[#736F4E] tracking-widest uppercase">
            MODERATION STREAM
          </span>
          <h1 className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mt-1">
            Pending Approvals Queue
          </h1>
          <p className="text-xs text-[#736F4E] font-mono-label mt-1">
            Property listings awaiting field agent verification & title deed audit
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full text-amber-800 font-mono-label text-xs font-bold shadow-xs">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>{pendingProps.length} LISTINGS AWAITING DECISION</span>
        </div>
      </div>

      {pendingProps.length > 0 ? (
        <PropertyTable properties={pendingProps} onOpenReview={(p) => setSelectedProp(p)} />
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-[#ECE7DA] text-center text-[#736F4E] shadow-xs">
          <CheckSquare className="w-10 h-10 mx-auto text-[#4C061D] mb-3" />
          <div className="font-serif-display text-2xl text-[#1C1B12]">Approval Queue Clean</div>
          <div className="text-xs mt-1 font-mono-label">All pending property submissions have been moderated.</div>
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
