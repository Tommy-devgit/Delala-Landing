"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Building2, Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button, Input } from "@/components/ui";

export const dynamic = "force-dynamic";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      await authClient.signIn({ email, password });
      router.push(callbackUrl);
    } catch (err) {
      setError((err instanceof Error ? err.message : "") || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-canvas flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        {/* Top Logo / Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="font-serif-display font-light text-3xl tracking-tight text-primary">
              DELALA
            </span>
          </Link>
          <h1 className="font-serif-display text-3xl font-light text-ink">
            Sign in to your account
          </h1>
          <p className="text-xs text-muted mt-1.5 font-medium">
            Welcome back! Access your saved properties, messages, and listings.
          </p>
        </div>

        {/* Sign In Card */}
        <div className="bg-surface rounded-panel border border-line shadow-xl p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-card bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <span className="shrink-0 font-bold">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-label font-mono-label text-muted font-bold uppercase mb-1.5">
                EMAIL ADDRESS *
              </label>
              <div className="relative">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.et"
                  className="pl-11"
                />
                <Mail className="w-4 h-4 text-muted absolute left-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-label font-mono-label text-muted font-bold uppercase">
                  PASSWORD *
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-micro font-mono-label text-primary font-bold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-11 pr-11"
                />
                <Lock className="w-4 h-4 text-muted absolute left-4 top-3.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-muted hover:text-ink transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              <span>{loading ? "Signing in..." : "Sign In →"}</span>
            </Button>
          </form>

          <div className="pt-2 border-t border-line text-center">
            <p className="text-xs text-muted">
              Don’t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-mono-label text-primary font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Security Footer Note */}
        <div className="mt-6 text-center text-xs text-muted flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Encrypted SSL Connection — Supabase PostgreSQL Verified</span>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-80px)] bg-canvas flex items-center justify-center text-xs text-muted">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
