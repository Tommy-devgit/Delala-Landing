"use client";

import { useState } from "react";
import { PropertyTable } from "@/components/property-table";
import { ApprovalModal } from "@/components/approval-modal";
import { ADMIN_PROPERTIES, AdminProperty } from "@/lib/mock-admin-data";
import { Building2, SlidersHorizontal, Plus } from "lucide-react";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<AdminProperty[]>(ADMIN_PROPERTIES);
  const [selectedProp, setSelectedProp] = useState<AdminProperty | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const filteredProps = properties.filter((p) => {
    if (filterStatus === "ALL") return true;
    return p.status === filterStatus;
  });

  const handleAction = (id: string, action: "APPROVED" | "REJECTED", reason?: string, notes?: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: action, rejectionReason: reason, fieldAgentNotes: notes } : p)),
    );
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">PROPERTY MANAGEMENT</h1>
          <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
            Full marketplace database catalog & agent field audit status
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-2 bg-[#1E293B] p-1 rounded-lg border border-[#334155]">
          {["ALL", "APPROVED", "PENDING_APPROVAL", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition-colors ${
                filterStatus === status ? "bg-[#4C061D] text-white" : "text-[#94A3B8] hover:text-white"
              }`}
            >
              {status.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <PropertyTable properties={filteredProps} onOpenReview={(p) => setSelectedProp(p)} />

      <ApprovalModal
        isOpen={!!selectedProp}
        onClose={() => setSelectedProp(null)}
        property={selectedProp}
        onAction={handleAction}
      />
    </div>
  );
}
