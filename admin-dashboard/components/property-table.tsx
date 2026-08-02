"use client";

import { AdminProperty } from "@/lib/mock-admin-data";
import { CheckCircle2, XCircle, Clock, Eye, SlidersHorizontal } from "lucide-react";

export function PropertyTable({
  properties,
  onOpenReview,
}: {
  properties: AdminProperty[];
  onOpenReview?: (prop: AdminProperty) => void;
}) {
  return (
    <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>ID & Property Title</th>
              <th>Type</th>
              <th>City / Sub-City</th>
              <th>Monthly Rent</th>
              <th>Broker</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop) => (
              <tr key={prop.id}>
                <td>
                  <div className="font-bold text-white line-clamp-1">{prop.title}</div>
                  <div className="text-[10px] font-mono text-[#94A3B8]">ID: {prop.id} • {prop.bedrooms} Bed, {prop.bathrooms} Bath</div>
                </td>
                <td>
                  <span className="px-2 py-0.5 rounded-md bg-[#0F172A] border border-[#334155] text-[10px] font-mono font-bold text-[#F8FAFC]">
                    {prop.propertyType}
                  </span>
                </td>
                <td>
                  <div className="font-mono text-xs text-[#E2E8F0]">{prop.subCity}</div>
                  <div className="text-[10px] text-[#94A3B8]">{prop.city}</div>
                </td>
                <td className="font-mono font-bold text-emerald-400">
                  ETB {prop.rentETB.toLocaleString()}/mo
                </td>
                <td className="font-mono text-xs text-[#94A3B8]">{prop.brokerName}</td>
                <td>
                  {prop.status === "APPROVED" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> APPROVED
                    </span>
                  )}
                  {prop.status === "PENDING_APPROVAL" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <Clock className="w-3 h-3" /> PENDING
                    </span>
                  )}
                  {prop.status === "REJECTED" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                      <XCircle className="w-3 h-3" /> REJECTED
                    </span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => onOpenReview && onOpenReview(prop)}
                    className="px-3 py-1 rounded bg-[#0F172A] border border-[#334155] text-xs font-mono text-[#F8FAFC] hover:bg-[#334155] transition-colors"
                  >
                    REVIEW →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
