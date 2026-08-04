"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        const res = await authClient.signUp({ email, password, fullName });
        if (res.user) {
          router.push("/profile");
        }
      } else {
        const res = await authClient.signIn({ email, password });
        if (res.user) {
          router.push("/profile");
        }
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check credentials or API server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1C1B12] font-sans flex items-center justify-center p-4 py-16">
      <div className="bg-white w-full max-w-md rounded-3xl border border-[#ECE7DA] shadow-2xl p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[10px] font-mono-label text-[#4C061D] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>BETTER AUTHENTICATION ENGINE</span>
          </div>
          <h1 className="font-serif-display text-3xl text-[#1C1B12]">
            {isRegister ? "Create Delala Account" : "Sign In to Delala"}
          </h1>
          <p className="text-xs text-[#736F4E]">
            {isRegister
              ? "Join Ethiopia's verified real estate marketplace."
              : "Access your saved wishlist, walkthrough visits, and messages."}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                FULL NAME
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Selam Tesfaye"
                  className="w-full p-3.5 pl-10 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                />
                <User className="w-4 h-4 text-[#736F4E] absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="selam@delala.et"
                className="w-full p-3.5 pl-10 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
              />
              <Mail className="w-4 h-4 text-[#736F4E] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
              PASSWORD
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3.5 pl-10 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
              />
              <Lock className="w-4 h-4 text-[#736F4E] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? "Authenticating..." : isRegister ? "Create Account →" : "Sign In →"}</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#ECE7DA]">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-[#736F4E] hover:text-[#4C061D] font-mono-label font-bold"
          >
            {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register Now"}
          </button>
        </div>

      </div>
    </div>
  );
}
