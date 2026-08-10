"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react";
import { Button, Input, buttonClasses } from "@/components/ui";

export const dynamic = "force-dynamic";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await authClient.resetPassword(password, token);
      setCompleted(true);
    } catch (err) {
      setError((err instanceof Error ? err.message : "") || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-canvas flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-5">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="font-serif-display font-light text-3xl tracking-tight text-primary">
              DELALA
            </span>
          </Link>
          <h1 className="font-serif-display text-3xl font-light text-ink">
            Create New Password
          </h1>
          <p className="text-xs text-muted mt-1.5 font-medium">
            Set a new secure password for your Delala account.
          </p>
        </div>

        {/* Reset Password Card */}
        <div className="bg-surface rounded-panel border border-line shadow-xl p-6 sm:p-6 space-y-4">
          {completed ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 text-primary flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif-display text-xl text-ink">
                Password Reset Successfully
              </h3>
              <p className="text-xs text-muted">
                Your password has been updated. You can now sign in with your new password.
              </p>
              <Link
                href="/auth/signin"
                className={buttonClasses({ size: "lg", className: "w-full" })}
              >
                <span>Proceed to Sign In →</span>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-4 rounded-card bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-label font-mono-label text-muted font-bold uppercase mb-1.5">
                  NEW PASSWORD *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
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

              <div>
                <label className="block text-label font-mono-label text-muted font-bold uppercase mb-1.5">
                  CONFIRM NEW PASSWORD *
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="pl-11"
                  />
                  <Lock className="w-4 h-4 text-muted absolute left-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full"
              >
                <span>{loading ? "Updating Password..." : "Update Password →"}</span>
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-[calc(100vh-80px)] bg-canvas flex items-center justify-center text-xs text-muted">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
