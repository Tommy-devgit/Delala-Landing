import Link from "next/link";
import { Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#FAF8F4] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-white border border-[#ECE7DA] text-[#4C061D] flex items-center justify-center mb-6 shadow-xs font-serif-display text-2xl">
        404
      </div>

      <h1 className="font-serif-display text-4xl sm:text-5xl font-light text-[#1c1b12] mb-3">
        Page Not Found
      </h1>

      <p className="text-base text-[#736F4E] max-w-md mb-8 font-normal">
        The property listing, neighborhood guide, or marketplace page you are looking for does not exist or has been moved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4C061D] text-white font-mono-label text-xs font-bold shadow-md hover:bg-[#3B3923] transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <Link
          href="/search"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#ECE7DA] text-[#4C061D] font-mono-label text-xs font-bold hover:border-[#4C061D] transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search Homes</span>
        </Link>
      </div>
    </div>
  );
}
