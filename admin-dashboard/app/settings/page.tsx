"use client";

import { Settings, ShieldCheck, Database, Key } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">SYSTEM CONFIGURATION & AUDIT LOGS</h1>
        <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
          Backend API credentials, Supabase database status & security audit logs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Supabase Status */}
        <div className="bg-[#1E293B] p-5 rounded-xl border border-[#334155] space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Database className="w-4 h-4 text-[#B4C292]" />
            <span>SUPABASE POSTGRESQL & AUTH</span>
          </div>
          <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155] text-xs font-mono space-y-1">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Database Status:</span>
              <span className="text-emerald-400 font-bold">CONNECTED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">JWT Provider:</span>
              <span className="text-white">Supabase Auth (HS256)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Storage Buckets:</span>
              <span className="text-white">property-images, avatar-images</span>
            </div>
          </div>
        </div>

        {/* API Rate Limiting */}
        <div className="bg-[#1E293B] p-5 rounded-xl border border-[#334155] space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Key className="w-4 h-4 text-[#B4C292]" />
            <span>NESTJS API REST V1 STATUS</span>
          </div>
          <div className="p-3 bg-[#0F172A] rounded-lg border border-[#334155] text-xs font-mono space-y-1">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Base URL:</span>
              <span className="text-white">http://localhost:4000/api/v1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Swagger Specs:</span>
              <span className="text-emerald-400 font-bold">http://localhost:4000/api/docs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Global Rate Limit:</span>
              <span className="text-white">100 req / min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Audit Logs */}
      <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden">
        <div className="p-4 bg-[#0F172A] border-b border-[#334155] flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-[#B4C292]" />
            <span>SECURITY AUDIT TRAIL LOGS</span>
          </div>
          <span className="text-xs font-mono text-[#94A3B8]">Showing last 5 events</span>
        </div>

        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Admin / User</th>
              <th>Action Executed</th>
              <th>Target Entity</th>
            </tr>
          </thead>
          <tbody>
            {[
              { time: "2026-08-02 18:32:10", user: "SuperAdmin (admin@delala.et)", action: "PROPERTY_APPROVED", target: "Property #p1 (Bole Villa)" },
              { time: "2026-08-02 16:14:05", user: "SuperAdmin (admin@delala.et)", action: "BROKER_VERIFIED", target: "Broker #b2 (Selamawit Alemu)" },
              { time: "2026-08-01 14:00:22", user: "Moderator (mod@delala.et)", action: "REPORT_RESOLVED", target: "Report #r2" },
            ].map((log, idx) => (
              <tr key={idx}>
                <td className="font-mono text-xs text-[#94A3B8]">{log.time}</td>
                <td className="font-mono text-xs text-white">{log.user}</td>
                <td className="font-mono font-bold text-emerald-400">{log.action}</td>
                <td className="text-xs text-[#E2E8F0]">{log.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
