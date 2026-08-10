"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { Button, Input, Panel } from "@/components/ui";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await adminApi.signIn(email.trim(), password);
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
      <Panel className="w-full max-w-sm p-7">
        <div className="flex items-center gap-2.5 mb-5">
          <span className="w-9 h-9 rounded-control bg-primary text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-accent" aria-hidden="true" />
          </span>
          <div>
            <p className="font-serif-display text-lg text-ink leading-tight">Delala Admin</p>
            <p className="text-label text-muted">Staff access only</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <p role="alert" className="rounded-control bg-danger-soft border border-danger/25 px-3 py-2 text-label text-danger">
              {error}
            </p>
          )}

          <div>
            <label htmlFor="email" className="block text-label font-semibold text-muted mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@delala.et"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-label font-semibold text-muted mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full mt-1">
            {submitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            <span>{submitting ? "Signing in…" : "Sign in"}</span>
          </Button>
        </form>

        <p className="text-label text-muted mt-4 leading-relaxed">
          Accounts need the admin or moderator role. Grant one with{" "}
          <code className="text-ink">npm run make-admin -- you@example.com</code> in{" "}
          <code className="text-ink">services/api</code>.
        </p>
      </Panel>
    </div>
  );
}
