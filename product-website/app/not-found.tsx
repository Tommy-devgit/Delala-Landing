import Link from "next/link";
import { Search, Home } from "lucide-react";
import { buttonClasses } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-canvas flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-surface border border-line text-primary flex items-center justify-center mb-6 shadow-xs font-serif-display text-2xl">
        404
      </div>

      <h1 className="font-serif-display text-4xl sm:text-5xl font-light text-ink mb-3">
        Page Not Found
      </h1>

      <p className="text-base text-muted max-w-md mb-8 font-normal">
        The property listing, neighborhood guide, or marketplace page you are looking for does not exist or has been moved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className={buttonClasses({ size: "md" })}
        >
          <Home className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-control bg-surface border border-line text-primary font-mono-label text-xs font-bold hover:border-primary transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search Homes</span>
        </Link>
      </div>
    </div>
  );
}
