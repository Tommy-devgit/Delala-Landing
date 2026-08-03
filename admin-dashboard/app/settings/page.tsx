"use client";

import { ShieldCheck, Database, Key } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-[#ECE7DA] pb-6">
        <span className="text-[11px] font-mono-label font-bold text-[#736F4E] tracking-widest uppercase">
          SYSTEM HEALTH
        </span>
        <h1 className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mt-1">
          System Configuration & Audit Logs
        </h1>
        <p className="text-xs text-[#736F4E] font-mono-label mt-1">
          Backend API credentials, Supabase database status & security audit logs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Supabase Status */}
        <div className="bg-white p-6 rounded-2xl border border-[#ECE7DA] shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-[#1C1B12] font-serif-display text-lg">
            <Database className="w-5 h-5 text-[#4C061D]" />
            <span>Supabase PostgreSQL & Auth</span>
          </div>
          <div className="p-4 bg-[#FAF8F4] rounded-xl border border-[#ECE7DA] text-xs font-mono-label space-y-2">
            <div className="flex justify-between">
              <span className="text-[#736F4E]">Database Status:</span>
              <span className="text-emerald-700 font-bold">CONNECTED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#736F4E]">JWT Provider:</span>
              <span className="text-[#1C1B12]">Supabase Auth (HS256)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#736F4E]">Storage Buckets:</span>
              <span className="text-[#1C1B12]">property-images, avatar-images</span>
            </div>
          </div>
        </div>

        {/* API Rate Limiting */}
        <div className="bg-white p-6 rounded-2xl border border-[#ECE7DA] shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 text-[#1C1B12] font-serif-display text-lg">
            <Key className="w-5 h-5 text-[#4C061D]" />
            <span>NestJS API REST V1 Status</span>
          </div>
          <div className="p-4 bg-[#FAF8F4] rounded-xl border border-[#ECE7DA] text-xs font-mono-label space-y-2">
            <div className="flex justify-between">
              <span className="text-[#736F4E]">Base URL:</span>
              <span className="text-[#1C1B12]">http://localhost:4000/api/v1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#736F4E]">Swagger Specs:</span>
              <span className="text-[#4C061D] font-bold">http://localhost:4000/api/docs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#736F4E]">Global Rate Limit:</span>
              <span className="text-[#1C1B12]">100 req / min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Audit Logs */}
      <div className="bg-white rounded-2xl border border-[#ECE7DA] overflow-hidden shadow-xs">
        <div className="p-5 bg-[#FAF8F4] border-b border-[#ECE7DA] flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[#1C1B12] font-serif-display text-lg">
            <ShieldCheck className="w-5 h-5 text-[#4C061D]" />
            <span>Security Audit Trail Logs</span>
          </div>
          <span className="text-xs font-mono-label text-[#736F4E]">Showing last 5 events</span>
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
                <td className="font-mono-label text-xs text-[#736F4E]">{log.time}</td>
                <td className="font-mono-label text-xs text-[#1C1B12]">{log.user}</td>
                <td className="font-mono-label font-bold text-[#4C061D]">{log.action}</td>
                <td className="text-xs text-[#1C1B12]">{log.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
