"use client";

import { Building, ShieldCheck, Zap, Droplets } from "lucide-react";

const NEIGHBORHOODS_DATA = [
  { id: "n1", name: "Bole Medhanialem", subCity: "Bole", city: "Addis Ababa", securityScore: 4.9, generator: "92%", water: "98%" },
  { id: "n2", name: "Kazanchis", subCity: "Kirkos", city: "Addis Ababa", securityScore: 4.8, generator: "88%", water: "95%" },
  { id: "n3", name: "Old Airport", subCity: "Nifas Silk-Lafto", city: "Addis Ababa", securityScore: 4.95, generator: "96%", water: "99%" },
  { id: "n4", name: "CMC Sunshine", subCity: "Yeka", city: "Addis Ababa", securityScore: 4.7, generator: "78%", water: "90%" },
];

export default function AdminNeighborhoodsPage() {
  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">SUB-CITY NEIGHBORHOOD INFRASTRUCTURE</h1>
        <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
          Neighborhood security ratings & backup generator/water reliability statistics
        </p>
      </div>

      <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden">
        <table>
          <thead>
            <tr>
              <th>Neighborhood Name</th>
              <th>Sub-City</th>
              <th>City</th>
              <th>Security Score</th>
              <th>Generator Penetration</th>
              <th>Water Reliability</th>
            </tr>
          </thead>
          <tbody>
            {NEIGHBORHOODS_DATA.map((n) => (
              <tr key={n.id}>
                <td className="font-bold text-white">{n.name}</td>
                <td className="font-mono text-xs text-[#E2E8F0]">{n.subCity}</td>
                <td className="font-mono text-xs text-[#94A3B8]">{n.city}</td>
                <td className="font-mono font-bold text-amber-400">★ {n.securityScore} / 5.0</td>
                <td className="font-mono font-bold text-emerald-400">{n.generator}</td>
                <td className="font-mono font-bold text-emerald-400">{n.water}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
