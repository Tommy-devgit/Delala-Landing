"use client";

import { useState } from "react";
import { BrokerTable } from "@/components/broker-table";
import { ADMIN_BROKERS, AdminBroker } from "@/lib/mock-admin-data";
import { ShieldCheck, Award } from "lucide-react";

export default function AdminBrokersPage() {
  const [brokers, setBrokers] = useState<AdminBroker[]>(ADMIN_BROKERS);

  const handleToggleVerify = (id: string) => {
    setBrokers((prev) => prev.map((b) => (b.id === id ? { ...b, verified: !b.verified } : b)));
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">VERIFIED BROKER DIRECTORY</h1>
          <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
            Licensed agency compliance, real estate registration & listing performance
          </p>
        </div>
      </div>

      <BrokerTable brokers={brokers} onToggleVerify={handleToggleVerify} />
    </div>
  );
}
