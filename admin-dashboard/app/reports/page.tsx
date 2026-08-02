"use client";

import { useState } from "react";
import { ADMIN_REPORTS, AdminReport } from "@/lib/mock-admin-data";
import { Flag, CheckCircle2, XCircle } from "lucide-react";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReport[]>(ADMIN_REPORTS);

  const handleResolve = (id: string, status: "RESOLVED" | "DISMISSED") => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">ABUSE & FLAGGED CONTENT QUEUE</h1>
        <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
          User incident reports, price discrepancy flags & broker compliance investigations
        </p>
      </div>

      <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden">
        <table>
          <thead>
            <tr>
              <th>ID & Target Item</th>
              <th>Reporter</th>
              <th>Reason / Incident Details</th>
              <th>Date Reported</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  <div className="font-bold text-white">{report.targetTitle}</div>
                  <div className="text-[10px] font-mono text-[#94A3B8]">ID: {report.id}</div>
                </td>
                <td className="font-mono text-xs text-[#E2E8F0]">{report.reporterName}</td>
                <td className="text-xs text-rose-300 max-w-xs">{report.reason}</td>
                <td className="font-mono text-xs text-[#94A3B8]">{report.reportedAt}</td>
                <td>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      report.status === "PENDING"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        : report.status === "RESOLVED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td>
                  {report.status === "PENDING" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleResolve(report.id, "RESOLVED")}
                        className="px-2.5 py-1 rounded bg-emerald-600 text-white text-xs font-mono font-bold hover:bg-emerald-500"
                      >
                        RESOLVE
                      </button>
                      <button
                        onClick={() => handleResolve(report.id, "DISMISSED")}
                        className="px-2.5 py-1 rounded bg-[#0F172A] border border-[#334155] text-xs font-mono text-[#94A3B8] hover:text-white"
                      >
                        DISMISS
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
