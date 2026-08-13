"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, KeyRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, buttonClasses } from "@/components/ui";

/**
 * Completes a reset with a token.
 *
 * Reachable only with `?email=…&token=…` — the token is minted by
 * `/auth/forgot-password` and, because there is no mailer, is handed over by an
 * administrator rather than emailed. The page used to accept any input and
 * report success unconditionally against an endpoint that did not exist.
 */
function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const missingLink = !email || !token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Choose a password of at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Those two passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await authClient.resetPassword(email, token, password);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "That reset link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-canvas min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">
        <Link
          href="/auth/signin"
          className="inline-flex items-center gap-1.5 text-micro text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Back to sign in
        </Link>

        <div className="bg-surface border border-line rounded-panel p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <KeyRound className="w-6 h-6 text-primary" aria-hidden="true" />
            <h1 className="font-serif-display text-2xl text-ink">Choose a new password</h1>
            {email && <p className="text-micro text-muted">For {email}</p>}
          </div>

          {done ? (
            <div className="space-y-4">
              <p className="text-micro text-body leading-relaxed">
                Your password has been changed. You can sign in with it now.
              </p>
              <Button size="lg" className="w-full" onClick={() => router.push("/auth/signin")}>
                Sign in
              </Button>
            </div>
          ) : missingLink ? (
            <div className="space-y-4">
              <p className="text-micro text-body leading-relaxed">
                This page needs a reset link. Delala cannot email one — ask an administrator to
                reset your password and pass you the link, or a new password directly.
              </p>
              <Link
                href="/auth/forgot-password"
                className={buttonClasses({ variant: "secondary", size: "md", className: "w-full" })}
              >
                How to get a reset
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="new-password" className="text-micro text-body block mb-1.5">
                  New password
                </label>
                <Input
                  id="new-password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="text-micro text-body block mb-1.5">
                  Confirm new password
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>

              {error && (
                <p role="alert" className="text-micro text-primary">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Saving…" : "Set new password"}
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
    <Suspense
      fallback={<div className="bg-canvas min-h-screen p-12 text-center text-micro text-muted">Loading…</div>}
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
