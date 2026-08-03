"use client";

import { useState } from "react";
import { PropertyTable } from "@/components/property-table";
import { ApprovalModal } from "@/components/approval-modal";
import { ADMIN_PROPERTIES, AdminProperty } from "@/lib/mock-admin-data";

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
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE7DA] pb-6">
        <div>
          <span className="text-[11px] font-mono-label font-bold text-[#736F4E] tracking-widest uppercase">
            DATABASE CATALOG
          </span>
          <h1 className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mt-1">
            Property Management
          </h1>
          <p className="text-xs text-[#736F4E] font-mono-label mt-1">
            Marketplace listings directory & field agent physical verification status
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#ECE7DA] shadow-xs">
          {["ALL", "APPROVED", "PENDING_APPROVAL", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-label font-bold transition-all ${
                filterStatus === status
                  ? "bg-[#4C061D] text-white shadow-xs"
                  : "text-[#736F4E] hover:text-[#4C061D]"
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
