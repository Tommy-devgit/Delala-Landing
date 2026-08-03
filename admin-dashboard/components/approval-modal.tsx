"use client";

import { useState } from "react";
import { X, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { AdminProperty } from "@/lib/mock-admin-data";

export function ApprovalModal({
  isOpen,
  onClose,
  property,
  onAction,
}: {
  isOpen: boolean;
  onClose: () => void;
  property: AdminProperty | null;
  onAction: (id: string, action: "APPROVED" | "REJECTED", reason?: string, notes?: string) => void;
}) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState(property?.fieldAgentNotes || "");

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-[#ECE7DA] shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="p-5 bg-[#FAF8F4] border-b border-[#ECE7DA] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#4C061D] text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#B4C292]" />
            </div>
            <h3 className="font-serif-display text-lg text-[#1C1B12]">
              Review Listing #{property.id}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#736F4E] hover:text-[#4C061D] hover:bg-[#ECE7DA] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-[#FAF8F4] p-4 rounded-xl border border-[#ECE7DA]">
            <div className="text-[10px] font-mono-label text-[#736F4E] font-bold mb-1">
              {property.subCity.toUpperCase()} • {property.city.toUpperCase()} • ETB {property.rentETB.toLocaleString()}/mo
            </div>
            <div className="font-bold text-base text-[#1C1B12]">
              {property.title}
            </div>
            <div className="text-xs text-[#736F4E] mt-1 font-mono-label">
              Submitted by Broker: <strong className="text-[#4C061D]">{property.brokerName}</strong> on {property.submittedAt}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
              FIELD AGENT AUDIT NOTES
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 45kVA standby generator and 12,000L water reserve verified operational."
              className="w-full p-3 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] placeholder-[#736F4E] focus:outline-none focus:border-[#4C061D]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
              REJECTION REASON (IF REJECTING)
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Discrepancy in title deed or unverified backup generator"
              className="w-full p-3 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] placeholder-[#736F4E] focus:outline-none focus:border-[#4C061D]"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-[#FAF8F4] border-t border-[#ECE7DA] flex items-center justify-end gap-3">
          <button
            onClick={() => {
              onAction(property.id, "REJECTED", reason, notes);
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-mono-label font-bold hover:bg-rose-600 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject Listing</span>
          </button>

          <button
            onClick={() => {
              onAction(property.id, "APPROVED", undefined, notes);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#4C061D] text-white text-xs font-mono-label font-bold hover:bg-[#3B0416] transition-colors flex items-center gap-1.5 shadow-md"
          >
            <CheckCircle2 className="w-4 h-4 text-[#B4C292]" />
            <span>Approve & Publish →</span>
          </button>
        </div>

      </div>
    </div>
  );
}
