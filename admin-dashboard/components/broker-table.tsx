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
    <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden shadow-xs">
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
                  <div className="font-bold text-white">{broker.name}</div>
                  <div className="text-[10px] font-mono text-[#94A3B8]">{broker.agencyName}</div>
                </td>
                <td className="font-mono text-xs text-emerald-400">{broker.licenseNumber}</td>
                <td>
                  <div className="flex items-center gap-1 font-mono text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{broker.rating}</span>
                  </div>
                </td>
                <td className="font-mono text-xs text-white">{broker.activeListings} Properties</td>
                <td className="text-xs text-[#94A3B8]">{broker.specializedAreas.join(", ")}</td>
                <td>
                  <button
                    onClick={() => onToggleVerify && onToggleVerify(broker.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all border ${
                      broker.verified
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-emerald-500/10 hover:text-emerald-400"
                    }`}
                  >
                    {broker.verified ? (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED BADGE
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5" /> UNVERIFIED
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
