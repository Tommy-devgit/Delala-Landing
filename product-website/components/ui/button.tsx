import { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 font-mono-label font-bold whitespace-nowrap transition-colors disabled:opacity-60 disabled:pointer-events-none";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover shadow-sm",
  secondary: "bg-canvas text-ink border border-line hover:bg-line",
  ghost: "bg-transparent text-muted hover:text-primary hover:bg-canvas",
  danger: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-label rounded-control",
  md: "h-10 px-5 text-micro rounded-control",
  lg: "h-12 px-8 text-xs rounded-full",
};

/**
 * Class string for the shared button treatment. Exported separately so `Link`
 * and `<a>` can adopt the exact same styling without nesting a button in a link.
 */
export const buttonClasses = ({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) => twMerge(BASE, VARIANTS[variant], SIZES[size], className);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", className, type = "button", ...props },
  ref
) {
  return <button ref={ref} type={type} className={buttonClasses({ variant, size, className })} {...props} />;
});
