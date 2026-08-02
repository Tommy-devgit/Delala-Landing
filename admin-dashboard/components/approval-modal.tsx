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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#1E293B] w-full max-w-lg rounded-xl border border-[#334155] shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="p-4 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B4C292]" />
            <h3 className="font-bold text-sm text-[#F8FAFC]">
              Review Property Listing #{property.id}
            </h3>
          </div>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="bg-[#0F172A] p-3.5 rounded-lg border border-[#334155]">
            <div className="text-[10px] font-mono text-[#94A3B8] mb-1">
              {property.subCity.toUpperCase()} • {property.city.toUpperCase()} • ETB {property.rentETB.toLocaleString()}/mo
            </div>
            <div className="font-bold text-base text-[#F8FAFC]">
              {property.title}
            </div>
            <div className="text-xs text-[#94A3B8] mt-1">
              Submitted by Broker: <strong className="text-white">{property.brokerName}</strong> on {property.submittedAt}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-[#94A3B8] uppercase mb-1">
              FIELD AGENT AUDIT NOTES
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 45kVA generator tested clean. Underground water tank verified operational."
              className="w-full p-2.5 rounded-lg bg-[#0F172A] border border-[#334155] text-xs text-white placeholder-[#64748B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-[#94A3B8] uppercase mb-1">
              REJECTION REASON (IF REJECTING)
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Invalid title deed documentation or missing generator specs"
              className="w-full p-2.5 rounded-lg bg-[#0F172A] border border-[#334155] text-xs text-white placeholder-[#64748B] focus:outline-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-[#0F172A] border-t border-[#334155] flex items-center justify-end gap-3">
          <button
            onClick={() => {
              onAction(property.id, "REJECTED", reason, notes);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-600/40 text-xs font-bold hover:bg-rose-600 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject Listing</span>
          </button>

          <button
            onClick={() => {
              onAction(property.id, "APPROVED", undefined, notes);
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve & Publish →</span>
          </button>
        </div>

      </div>
    </div>
  );
}
