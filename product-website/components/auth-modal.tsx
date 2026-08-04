"use client";

import { useState } from "react";
import { authClient, UserSession } from "@/lib/auth-client";
import { ShieldCheck, User, Building2, Eye, CheckCircle2, ArrowRight, X, Sparkles } from "lucide-react";

export function AuthModal({
  isOpen,
  onClose,
  onSelectRole,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole?: (user: UserSession) => void;
}) {
  const [selectedRole, setSelectedRole] = useState<"GUEST" | "BUYER" | "BROKER">("BUYER");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [mode, setMode] = useState<"role-select" | "auth-form">("role-select");

  if (!isOpen) return null;

  const handleContinueAsRole = (role: "GUEST" | "BUYER" | "BROKER") => {
    if (role === "GUEST") {
      const user = authClient.setGuestOrRole("GUEST");
      if (user && onSelectRole) onSelectRole(user);
      onClose();
    } else {
      setSelectedRole(role);
      setMode("auth-form");
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const user = authClient.setGuestOrRole(
      selectedRole,
      fullName || (selectedRole === "BROKER" ? "Bole Premier Real Estate" : "Admasu Tesfaye"),
      email || `${selectedRole.toLowerCase()}@delala.et`
    );
    if (user && onSelectRole) onSelectRole(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-[#ECE7DA] shadow-2xl max-w-xl w-full p-6 sm:p-8 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[#736F4E] hover:text-[#4C061D] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {mode === "role-select" ? (
          <div className="space-y-6">
            <div className="text-center max-w-md mx-auto space-y-2">
              <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#FAF8F4] border border-[#ECE7DA] px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#4C061D]" />
                <span>WELCOME TO DELALA ETHIOPIA</span>
              </span>
              <h2 className="font-serif-display text-3xl text-[#1C1B12]">
                Choose your experience
              </h2>
              <p className="text-xs text-[#736F4E]">
                Select how you'd like to use the marketplace today to personalize your dashboard.
              </p>
            </div>

            {/* Role Options */}
            <div className="space-y-3 pt-2">
              
              {/* Option 1: Guest */}
              <div
                onClick={() => handleContinueAsRole("GUEST")}
                className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] hover:border-[#4C061D] cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#ECE7DA] text-[#736F4E] flex items-center justify-center shadow-xs">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#1C1B12] group-hover:text-[#4C061D] transition-colors">
                      Continue as Guest
                    </div>
                    <div className="text-[11px] text-[#736F4E]">
                      Browse residential listings, inspect cities, and compare rents.
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#736F4E] group-hover:translate-x-1 group-hover:text-[#4C061D] transition-all" />
              </div>

              {/* Option 2: Home Seeker / Buyer */}
              <div
                onClick={() => handleContinueAsRole("BUYER")}
                className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] hover:border-[#4C061D] cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#B4C292]/30 border border-[#B4C292]/50 text-[#4C061D] flex items-center justify-center shadow-xs">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#1C1B12] group-hover:text-[#4C061D] transition-colors">
                      Home Seeker Account
                    </div>
                    <div className="text-[11px] text-[#736F4E]">
                      Save wishlists, schedule walkthrough visits, and chat with brokers.
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#736F4E] group-hover:translate-x-1 group-hover:text-[#4C061D] transition-all" />
              </div>

              {/* Option 3: Verified Broker / Landlord */}
              <div
                onClick={() => handleContinueAsRole("BROKER")}
                className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] hover:border-[#4C061D] cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4C061D] text-white flex items-center justify-center shadow-xs">
                    <Building2 className="w-5 h-5 text-[#B4C292]" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#1C1B12] group-hover:text-[#4C061D] transition-colors">
                      Broker / Property Owner Account
                    </div>
                    <div className="text-[11px] text-[#736F4E]">
                      Publish property listings, manage dashboard, and receive lead inquiries.
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#736F4E] group-hover:translate-x-1 group-hover:text-[#4C061D] transition-all" />
              </div>

            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitForm} className="space-y-5">
            <div className="text-center space-y-1">
              <span className="font-mono-label text-[10px] text-[#4C061D] font-bold uppercase">
                {selectedRole} ACCOUNT REGISTRATION
              </span>
              <h2 className="font-serif-display text-2xl text-[#1C1B12]">
                Setup Your Delala Profile
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                  FULL NAME / AGENCY NAME *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={selectedRole === "BROKER" ? "e.g. Bole Premier Real Estate" : "e.g. Abebe Tesfaye"}
                  className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.et"
                  className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setMode("role-select")}
                className="px-5 py-3 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-xs font-mono-label font-bold text-[#1C1B12]"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#B4C292]" />
                <span>Confirm & Access Platform →</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
