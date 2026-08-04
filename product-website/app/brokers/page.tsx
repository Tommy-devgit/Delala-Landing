"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { Broker } from "@/lib/types";
import { BrokerCard } from "@/components/broker-card";
import { ShieldCheck, UserCheck } from "lucide-react";

export default function BrokersDirectoryPage() {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBrokers() {
      setLoading(true);
      const data = await apiClient.getBrokers();
      setBrokers(data);
      setLoading(false);
    }
    loadBrokers();
  }, []);

  return (
    <div className="bg-[#FAF8F4] min-h-screen py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="font-mono-label text-[10px] text-[#4C061D] bg-white border border-[#ECE7DA] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>CERTIFIED BROKER DIRECTORY</span>
          </span>

          <h1 className="font-serif-display text-4xl sm:text-5xl font-light text-[#4C061D] mb-4">
            Verified Real Estate Brokers
          </h1>

          <p className="text-base text-[#736F4E] font-medium">
            Connect directly with licensed Ethiopian real estate brokers whose identities, property titles, and listing claims are physically verified by Delala field teams.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 rounded-3xl bg-white border border-[#ECE7DA] animate-pulse" />
            ))}
          </div>
        ) : brokers.length === 0 ? (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#4C061D]/10 text-[#4C061D] flex items-center justify-center mx-auto">
              <UserCheck className="w-8 h-8" />
            </div>
            <h2 className="font-serif-display text-2xl text-[#1C1B12]">
              No Brokers Found
            </h2>
            <p className="text-xs text-[#736F4E]">
              There are no certified real estate brokers currently registered in your database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brokers.map((broker) => (
              <BrokerCard key={broker.id} broker={broker} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
