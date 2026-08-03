"use client";

import { AdminProperty } from "@/lib/mock-admin-data";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export function PropertyTable({
  properties,
  onOpenReview,
}: {
  properties: AdminProperty[];
  onOpenReview?: (prop: AdminProperty) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#ECE7DA] overflow-hidden shadow-xs">
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
                  <div className="font-bold text-[#1C1B12] line-clamp-1">{prop.title}</div>
                  <div className="text-[10px] font-mono-label text-[#736F4E]">
                    ID: {prop.id} • {prop.bedrooms} Bed, {prop.bathrooms} Bath
                  </div>
                </td>
                <td>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[10px] font-mono-label font-bold text-[#4C061D]">
                    {prop.propertyType}
                  </span>
                </td>
                <td>
                  <div className="font-mono-label text-xs font-bold text-[#1C1B12]">{prop.subCity}</div>
                  <div className="text-[10px] text-[#736F4E]">{prop.city}</div>
                </td>
                <td className="font-mono-label font-bold text-[#4C061D]">
                  ETB {prop.rentETB.toLocaleString()}/mo
                </td>
                <td className="font-mono-label text-xs text-[#736F4E]">{prop.brokerName}</td>
                <td>
                  {prop.status === "APPROVED" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono-label font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> APPROVED
                    </span>
                  )}
                  {prop.status === "PENDING_APPROVAL" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono-label font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock className="w-3 h-3 text-amber-600" /> PENDING
                    </span>
                  )}
                  {prop.status === "REJECTED" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono-label font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      <XCircle className="w-3 h-3 text-rose-600" /> REJECTED
                    </span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => onOpenReview && onOpenReview(prop)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#4C061D] text-white text-xs font-mono-label font-bold hover:bg-[#3B0416] transition-colors shadow-xs"
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
