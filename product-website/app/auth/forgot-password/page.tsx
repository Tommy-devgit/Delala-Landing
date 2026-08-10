"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button, Input, buttonClasses } from "@/components/ui";

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
    } catch (err) {
      setError((err instanceof Error ? err.message : "") || "Failed to process password reset.");
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
            Reset Your Password
          </h1>
          <p className="text-xs text-muted mt-1.5 font-medium">
            Enter your email to receive password reset instructions.
          </p>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-surface rounded-panel border border-line shadow-xl p-6 sm:p-6 space-y-4">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 text-primary flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif-display text-xl text-ink">
                Reset Link Sent
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                If an account exists for <span className="font-bold text-ink">{email}</span>, password reset instructions have been dispatched.
              </p>
              <Link
                href="/auth/signin"
                className={buttonClasses({ size: "lg", className: "w-full" })}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Sign In</span>
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

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="w-full"
              >
                <span>{loading ? "Sending link..." : "Send Reset Instructions →"}</span>
              </Button>
            </form>
          )}

          <div className="pt-2 border-t border-line text-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-1.5 text-xs font-mono-label text-primary font-bold hover:underline"
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
