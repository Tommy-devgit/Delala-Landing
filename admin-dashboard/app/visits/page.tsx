"use client";

import { Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";

const VISITS_DATA = [
  { id: "v1", property: "Bole Medhanialem Modern G+1 Villa", seeker: "Tewodros Kassahun", broker: "Abebe Tesfaye", date: "2026-08-05", time: "10:00 AM", status: "CONFIRMED" },
  { id: "v2", property: "Old Airport Diplomatic Family Compound", seeker: "Bethlehem Tadesse", broker: "Tigist Haile", date: "2026-08-06", time: "02:30 PM", status: "PENDING" },
  { id: "v3", property: "Kazanchis Executive Serviced Studio", seeker: "Samuel Worku", broker: "Selamawit Alemu", date: "2026-08-04", time: "11:00 AM", status: "COMPLETED" },
];

export default function AdminVisitsPage() {
  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">WALKTHROUGH VISITS MONITOR</h1>
        <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
          Scheduled property walkthrough appointments between home seekers & certified brokers
        </p>
      </div>

      <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden">
        <table>
          <thead>
            <tr>
              <th>Property Title</th>
              <th>Home Seeker</th>
              <th>Assigned Broker</th>
              <th>Scheduled Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {VISITS_DATA.map((visit) => (
              <tr key={visit.id}>
                <td className="font-bold text-white">{visit.property}</td>
                <td className="font-mono text-xs text-[#E2E8F0]">{visit.seeker}</td>
                <td className="font-mono text-xs text-[#94A3B8]">{visit.broker}</td>
                <td className="font-mono text-xs text-emerald-400">
                  {visit.date} at {visit.time}
                </td>
                <td>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      visit.status === "CONFIRMED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : visit.status === "PENDING"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                    }`}
                  >
                    {visit.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
