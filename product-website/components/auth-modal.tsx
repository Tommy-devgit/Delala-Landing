"use client";

import { useState } from "react";
import { authClient, UserSession } from "@/lib/auth-client";
import { ShieldCheck, User, Building2, CheckCircle2, X, Lock, Mail, Sparkles, KeyRound } from "lucide-react";
import { Input, buttonClasses } from "@/components/ui";

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
    } catch (err) {
      setError((err instanceof Error ? err.message : "") || "Authentication failed. Make sure your NestJS server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface rounded-panel border border-line shadow-2xl max-w-md w-full p-6 sm:p-8 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-canvas border border-line text-muted hover:text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center max-w-sm mx-auto space-y-2 mb-6">
          <span className="font-mono-label text-label text-primary bg-canvas border border-line px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>AUTHENTICATION</span>
          </span>
          <h2 className="font-serif-display text-3xl text-ink">
            {isSignUp ? "Create Your Account" : "Sign In to Delala"}
          </h2>
          <p className="text-xs text-muted">
            {isSignUp
              ? "Create a seller/broker account to list properties on Supabase PostgreSQL database."
              : "Sign in with your verified email and password."}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-card bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-label font-mono-label text-muted font-bold uppercase mb-1">
                FULL NAME / AGENCY NAME *
              </label>
              <div className="relative">
                <Input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Bole Premier Real Estate"
                  className="pl-10"
                />
                <User className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-label font-mono-label text-muted font-bold uppercase mb-1">
              EMAIL ADDRESS *
            </label>
            <div className="relative">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.et"
                className="pl-10"
              />
              <Mail className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-label font-mono-label text-muted font-bold uppercase mb-1">
              PASSWORD *
            </label>
            <div className="relative">
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10"
              />
              <KeyRound className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={buttonClasses({ size: "lg", className: "w-full mt-2" })}
          >
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span>{loading ? "Authenticating..." : isSignUp ? "Create Account →" : "Sign In →"}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-line text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-xs text-primary font-mono-label font-bold hover:underline"
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account to list property? Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
}
