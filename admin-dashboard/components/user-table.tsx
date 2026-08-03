"use client";

import { AdminUser } from "@/lib/mock-admin-data";

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
    <div className="bg-white rounded-2xl border border-[#ECE7DA] overflow-hidden shadow-xs">
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
                  <div className="font-bold text-[#1C1B12]">{user.fullName}</div>
                  <div className="text-[10px] font-mono-label text-[#736F4E]">{user.email}</div>
                </td>
                <td className="font-mono-label text-xs text-[#1C1B12]">{user.phone}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => onRoleChange && onRoleChange(user.id, e.target.value as any)}
                    className="bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label text-[#4C061D] font-bold px-2.5 py-1 rounded-xl focus:outline-none focus:border-[#4C061D] cursor-pointer"
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
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-label font-bold ${
                      user.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="font-mono-label text-xs text-[#736F4E]">{user.joinedAt}</td>
                <td>
                  <button
                    onClick={() => onStatusToggle && onStatusToggle(user.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono-label font-bold transition-colors border ${
                      user.status === "ACTIVE"
                        ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-600 hover:text-white"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-600 hover:text-white"
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
