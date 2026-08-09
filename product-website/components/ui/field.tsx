import { InputHTMLAttributes, LabelHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

/**
 * One control treatment shared by every input, select and textarea. Replaces the
 * 33 distinct hand-written control class strings the app had before.
 */
const CONTROL =
  "w-full bg-canvas border border-line text-ink rounded-control transition-colors placeholder:text-muted/70 " +
  "hover:border-muted/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 " +
  "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:border-line";

const CONTROL_HEIGHT = "h-11 px-3.5 text-xs";

export const FieldLabel = ({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={twMerge("block font-mono-label text-label font-bold text-muted mb-1.5", className)}
    {...props}
  />
);

/** Helper or error text under a control. */
export const FieldHint = ({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "error";
}) => (
  <p className={twMerge("text-label mt-1.5 leading-relaxed", tone === "error" ? "text-rose-700" : "text-muted")}>
    {children}
  </p>
);

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={twMerge(CONTROL, CONTROL_HEIGHT, className)} {...props} />;
  }
);

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, ...props }, ref) {
    return <select ref={ref} className={twMerge(CONTROL, CONTROL_HEIGHT, "cursor-pointer", className)} {...props} />;
  }
);

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return <textarea ref={ref} className={twMerge(CONTROL, "p-3.5 text-xs leading-relaxed", className)} {...props} />;
  }
);
