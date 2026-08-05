"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    try {
      await authClient.forgotPassword(email);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to process password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FAF8F4] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="font-serif-display font-light text-3xl tracking-tight text-[#4C061D]">
              DELALA
            </span>
          </Link>
          <h1 className="font-serif-display text-3xl font-light text-[#1C1B12]">
            Reset Your Password
          </h1>
          <p className="text-xs text-[#736F4E] mt-1.5 font-medium">
            Enter your email to receive password reset instructions.
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-3xl border border-[#ECE7DA] shadow-xl p-6 sm:p-8 space-y-6">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#B4C292]/20 text-[#4C061D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-[#4C061D]" />
              </div>
              <h3 className="font-serif-display text-xl text-[#1C1B12]">
                Reset Link Sent
              </h3>
              <p className="text-xs text-[#736F4E] leading-relaxed">
                If an account exists for <span className="font-bold text-[#1C1B12]">{email}</span>, password reset instructions have been dispatched.
              </p>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {error}
                </div>
              )}

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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#4C061D] text-white font-mono-label text-xs font-bold hover:bg-[#3B0416] transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <span>{loading ? "Sending link..." : "Send Reset Instructions →"}</span>
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-[#ECE7DA] text-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-1.5 text-xs font-mono-label text-[#4C061D] font-bold hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
