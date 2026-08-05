"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Building2, Lock, Mail, User, Eye, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName.trim()) {
      setError("Please provide your full name.");
      return;
    }

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      await authClient.signUp({ fullName, email, password, role });
      router.push(callbackUrl);
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAF8F4] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        {/* Top Logo / Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="font-serif-display font-light text-3xl tracking-tight text-[#4C061D]">
              DELALA
            </span>
          </Link>
          <h1 className="font-serif-display text-3xl font-light text-[#1C1B12]">
            Create Your Account
          </h1>
          <p className="text-xs text-[#736F4E] mt-1.5 font-medium">
            Join Ethiopia's verified real estate marketplace.
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white rounded-3xl border border-[#ECE7DA] shadow-xl p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <span className="shrink-0 font-bold">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">
                FULL NAME *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Abebe Tesfaye"
                  className="w-full p-3.5 pl-11 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D] transition-colors"
                />
                <User className="w-4 h-4 text-[#736F4E] absolute left-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">
                EMAIL ADDRESS *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.et"
                  className="w-full p-3.5 pl-11 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D] transition-colors"
                />
                <Mail className="w-4 h-4 text-[#736F4E] absolute left-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Account Role Field */}
            <div>
              <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">
                I WANT TO *
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D]"
              >
                <option value="user">Explore & Rent / Buy Properties</option>
                <option value="owner">Post & Manage My Properties</option>
              </select>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[10px] font-mono-label text-[#736F4E] font-bold uppercase mb-1.5">
                CREATE PASSWORD *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full p-3.5 pl-11 pr-11 rounded-2xl bg-[#FAF8F4] border border-[#ECE7DA] text-xs text-[#1C1B12] focus:outline-none focus:border-[#4C061D] transition-colors"
                />
                <Lock className="w-4 h-4 text-[#736F4E] absolute left-4 top-3.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-[#736F4E] hover:text-[#1C1B12] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-lg flex items-center justify-center gap-2 pt-4"
            >
              <span>{loading ? "Creating Account..." : "Create Account →"}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-[#ECE7DA] text-center">
            <p className="text-xs text-[#736F4E]">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="font-mono-label text-[#4C061D] font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Security Footer Note */}
        <div className="mt-6 text-center text-xs text-[#736F4E] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#4C061D]" />
          <span>Encrypted SSL Connection — Supabase PostgreSQL Verified</span>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-80px)] bg-[#FAF8F4] flex items-center justify-center text-xs text-[#736F4E]">Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
