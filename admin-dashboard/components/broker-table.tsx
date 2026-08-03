"use client";

import { AdminBroker } from "@/lib/mock-admin-data";
import { ShieldCheck, ShieldAlert, Star } from "lucide-react";

export function BrokerTable({
  brokers,
  onToggleVerify,
}: {
  brokers: AdminBroker[];
  onToggleVerify?: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#ECE7DA] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Broker Name & Agency</th>
              <th>License Number</th>
              <th>Rating</th>
              <th>Listings</th>
              <th>Specialized Areas</th>
              <th>Verification Badge</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((broker) => (
              <tr key={broker.id}>
                <td>
                  <div className="font-bold text-[#1C1B12]">{broker.name}</div>
                  <div className="text-[10px] font-mono-label text-[#736F4E]">{broker.agencyName}</div>
                </td>
                <td className="font-mono-label text-xs font-bold text-[#4C061D]">{broker.licenseNumber}</td>
                <td>
                  <div className="flex items-center gap-1 font-mono-label text-xs text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{broker.rating}</span>
                  </div>
                </td>
                <td className="font-mono-label text-xs text-[#1C1B12]">{broker.activeListings} Properties</td>
                <td className="text-xs text-[#736F4E]">{broker.specializedAreas.join(", ")}</td>
                <td>
                  <button
                    onClick={() => onToggleVerify && onToggleVerify(broker.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono-label font-bold transition-all border ${
                      broker.verified
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
                        : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    {broker.verified ? (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> VERIFIED BADGE
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> UNVERIFIED
                      </>
                    )}
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
