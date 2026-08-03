"use client";

import { useState } from "react";
import { ADMIN_REPORTS, AdminReport } from "@/lib/mock-admin-data";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReport[]>(ADMIN_REPORTS);

  const handleResolve = (id: string, status: "RESOLVED" | "DISMISSED") => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="border-b border-[#ECE7DA] pb-6">
        <span className="text-[11px] font-mono-label font-bold text-[#736F4E] tracking-widest uppercase">
          INCIDENT REVIEW
        </span>
        <h1 className="text-3xl font-serif-display font-light text-[#1C1B12] tracking-tight mt-1">
          Abuse & Flagged Content Queue
        </h1>
        <p className="text-xs text-[#736F4E] font-mono-label mt-1">
          User incident reports, price discrepancy flags & broker compliance investigations
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#ECE7DA] overflow-hidden shadow-xs">
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
                  <div className="font-bold text-[#1C1B12]">{report.targetTitle}</div>
                  <div className="text-[10px] font-mono-label text-[#736F4E]">ID: {report.id}</div>
                </td>
                <td className="font-mono-label text-xs text-[#1C1B12]">{report.reporterName}</td>
                <td className="text-xs text-rose-700 font-medium max-w-xs">{report.reason}</td>
                <td className="font-mono-label text-xs text-[#736F4E]">{report.reportedAt}</td>
                <td>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-label font-bold ${
                      report.status === "PENDING"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : report.status === "RESOLVED"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-50 text-slate-700 border border-slate-200"
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
                        className="px-3 py-1 rounded-xl bg-[#4C061D] text-white text-xs font-mono-label font-bold hover:bg-[#3B0416]"
                      >
                        RESOLVE
                      </button>
                      <button
                        onClick={() => handleResolve(report.id, "DISMISSED")}
                        className="px-3 py-1 rounded-xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label text-[#736F4E] hover:text-[#1C1B12]"
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
