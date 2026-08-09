"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export function Toast({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-card bg-surface border border-line shadow-2xl text-xs font-sans max-w-sm animate-in slide-in-from-bottom-5">
      {type === "success" ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
      )}
      <span className="text-ink font-medium flex-1">{message}</span>
      <button onClick={onClose} className="p-1 text-muted hover:text-ink">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
