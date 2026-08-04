"use client";

import { useState } from "react";
import { authClient, UserSession } from "@/lib/auth-client";
import { ShieldCheck, User, Building2, CheckCircle2, X, Lock, Mail, Sparkles, KeyRound } from "lucide-react";

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: UserSession) => void;
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        const res = await authClient.signUp({ email, password, fullName });
        if (res.user) {
          if (onSuccess) onSuccess(res.user);
          onClose();
        }
      } else {
        const res = await authClient.signIn({ email, password });
        if (res.user) {
          if (onSuccess) onSuccess(res.user);
          onClose();
        }
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Make sure your NestJS server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-[#ECE7DA] shadow-2xl max-w-md w-full p-6 sm:p-8 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#FAF8F4] border border-[#ECE7DA] text-[#736F4E] hover:text-[#4C061D] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center max-w-sm mx-auto space-y-2 mb-6">
          <span className="font-mono-label text-[10px] text-[#4C061D] bg-[#FAF8F4] border border-[#ECE7DA] px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4C061D]" />
            <span>AUTHENTICATION</span>
          </span>
          <h2 className="font-serif-display text-3xl text-[#1C1B12]">
            {isSignUp ? "Create Your Account" : "Sign In to Delala"}
          </h2>
          <p className="text-xs text-[#736F4E]">
            {isSignUp
              ? "Create a seller/broker account to list properties on Supabase PostgreSQL database."
              : "Sign in with your verified email and password."}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
                FULL NAME / AGENCY NAME *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Bole Premier Real Estate"
                  className="w-full p-3.5 pl-10 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
                />
                <User className="w-4 h-4 text-[#736F4E] absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
              EMAIL ADDRESS *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.et"
                className="w-full p-3.5 pl-10 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
              />
              <Mail className="w-4 h-4 text-[#736F4E] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1">
              PASSWORD *
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
              <KeyRound className="w-4 h-4 text-[#736F4E] absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-md flex items-center justify-center gap-2 mt-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#B4C292]" />
            <span>{loading ? "Authenticating..." : isSignUp ? "Create Account →" : "Sign In →"}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#ECE7DA] text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-xs text-[#4C061D] font-mono-label font-bold hover:underline"
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account to list property? Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
}
