"use client";

import { useState } from "react";
import { UserTable } from "@/components/user-table";
import { ADMIN_USERS, AdminUser } from "@/lib/mock-admin-data";
import { Users, UserPlus } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);

  const handleRoleChange = (id: string, newRole: AdminUser["role"]) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  const handleStatusToggle = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" } : u)),
    );
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">USER ROLE & ACCESS MANAGEMENT</h1>
          <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
            Platform accounts, permission scopes & suspension controls
          </p>
        </div>
      </div>

      <UserTable users={users} onRoleChange={handleRoleChange} onStatusToggle={handleStatusToggle} />
    </div>
  );
}
