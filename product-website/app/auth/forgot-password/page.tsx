"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, buttonClasses } from "@/components/ui";

/**
 * Forgotten password.
 *
 * This page used to show "check your email" every single time. The endpoint it
 * called did not exist, the client caught the 404 and returned success anyway,
 * and no email was ever going to arrive — Delala has no mailer, and it does not
 * use Supabase Auth, so nothing anywhere in the stack can send one.
 *
 * It now says that. An honest dead end a person can act on beats a cheerful
 * message that sends them to an inbox to wait for something that will never
 * come.
 */
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ delivered: boolean; message: string } | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Enter the email address on your account.");
      return;
    }

    setLoading(true);
    try {
      setResult(await authClient.forgotPassword(email));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start a password reset.");
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
            <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
            <h1 className="font-serif-display text-2xl text-ink">Forgotten your password?</h1>
            <p className="text-micro text-muted leading-relaxed">
              Delala cannot send password reset emails yet. There is no email delivery configured,
              so an administrator has to reset it for you.
            </p>
          </div>

          {result ? (
            <div className="space-y-4">
              <div className="flex gap-3 p-4 rounded-card bg-primary/5 border border-primary/25">
                <AlertTriangle className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-2">
                  <p className="text-micro text-body leading-relaxed">
                    {result.message ||
                      "Delala cannot send password reset emails yet. Ask an administrator to reset your password for you."}
                  </p>
                  <p className="text-micro text-muted leading-relaxed">
                    Contact Delala with the email address on your account and someone will set a new
                    password and pass it to you directly.
                  </p>
                </div>
              </div>

              <Link href="/contact" className={buttonClasses({ size: "md", className: "w-full" })}>
                Contact Delala
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="text-micro text-body block mb-1.5">
                  Email address
                </label>
                <Input
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              {error && (
                <p role="alert" className="text-micro text-primary">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Checking…" : "Continue"}
              </Button>
            </form>
          )}
        </div>

        <p className="text-label text-muted text-center leading-relaxed">
          Delala does not use Supabase Auth, so nothing appears in the Supabase dashboard for these
          accounts either. See §3 of the handover notes.
        </p>
      </div>
    </div>
  );
}
