"use client";

import { AdminUser } from "@/lib/mock-admin-data";
import { UserCheck, Shield, AlertTriangle } from "lucide-react";

export function UserTable({
  users,
  onRoleChange,
  onStatusToggle,
}: {
  users: AdminUser[];
  onRoleChange?: (id: string, role: AdminUser["role"]) => void;
  onStatusToggle?: (id: string) => void;
}) {
  return (
    <div className="bg-[#1E293B] rounded-xl border border-[#334155] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>User Name & Email</th>
              <th>Phone</th>
              <th>Platform Role</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="font-bold text-white">{user.fullName}</div>
                  <div className="text-[10px] font-mono text-[#94A3B8]">{user.email}</div>
                </td>
                <td className="font-mono text-xs text-[#E2E8F0]">{user.phone}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => onRoleChange && onRoleChange(user.id, e.target.value as any)}
                    className="bg-[#0F172A] border border-[#334155] text-xs font-mono text-[#F8FAFC] px-2 py-1 rounded focus:outline-none cursor-pointer"
                  >
                    <option value="USER">USER</option>
                    <option value="OWNER">OWNER</option>
                    <option value="BROKER">BROKER</option>
                    <option value="MODERATOR">MODERATOR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      user.status === "ACTIVE"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="font-mono text-xs text-[#94A3B8]">{user.joinedAt}</td>
                <td>
                  <button
                    onClick={() => onStatusToggle && onStatusToggle(user.id)}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold transition-colors border ${
                      user.status === "ACTIVE"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                    }`}
                  >
                    {user.status === "ACTIVE" ? "SUSPEND" : "ACTIVATE"}
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
