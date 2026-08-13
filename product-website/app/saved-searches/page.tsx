"use client";

import { useState } from "react";
import Link from "next/link";
import { BellOff, Bookmark, Pencil, Trash2 } from "lucide-react";
import { SAVED_SEARCH_KEY, SavedSearch, useLocalCollection } from "@/lib/use-local-collection";
import { EmptyState } from "@/components/empty-state";
import { SavedSearchIllustration } from "@/components/illustrations";
import { Button, Input, Skeleton } from "@/components/ui";

/** Turns a stored query string back into something a person can read. */
const describe = (query: string): string => {
  const params = new URLSearchParams(query);
  const parts: string[] = [];

  const listing = params.get("listingType");
  if (listing) parts.push(listing === "sale" ? "For sale" : "To rent");
  const type = params.get("propertyType");
  if (type) parts.push(type.charAt(0).toUpperCase() + type.slice(1));
  const beds = params.get("bedrooms");
  if (beds) parts.push(`${beds}+ bed`);
  const area = params.get("neighborhood") || params.get("subCity") || params.get("city");
  if (area) parts.push(`in ${area}`);
  const max = params.get("maxPrice");
  if (max) parts.push(`under ETB ${Number(max).toLocaleString()}`);
  const q = params.get("q");
  if (q) parts.push(`matching "${q}"`);

  return parts.length > 0 ? parts.join(" · ") : "All properties";
};

/**
 * Saved searches (§15).
 *
 * Stored per device, like compare and recently viewed. Re-running a search is
 * just a link back into Explore with the same query string, so nothing needs a
 * backend.
 *
 * Notifications are **not** offered. The brief asks for them "only if the
 * backend supports it", and it does not: there is no scheduled job to re-run a
 * search, and no email delivery of any kind — the same gap that makes password
 * resets impossible. A toggle here would be a switch wired to nothing.
 */
export default function SavedSearchesPage() {
  const { items, ready, remove, clear } = useLocalCollection<SavedSearch>(SAVED_SEARCH_KEY);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");

  const commitRename = (search: SavedSearch) => {
    const name = draftName.trim();
    if (name) {
      // Rewritten as a remove plus an add, which the collection supports
      // directly; there is no in-place update and this is rare enough.
      const rest = items.filter((s) => s.id !== search.id);
      const next = [{ ...search, name }, ...rest.filter((s) => s.id !== search.id)];
      window.localStorage.setItem(SAVED_SEARCH_KEY, JSON.stringify(next));
      window.dispatchEvent(new StorageEvent("storage", { key: SAVED_SEARCH_KEY }));
    }
    setRenaming(null);
    setDraftName("");
  };

  return (
    <div className="bg-canvas min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-3 pb-4 border-b border-line">
          <div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-light text-ink">
              Saved searches
            </h1>
            <p className="text-micro text-muted mt-1">
              Filters you want to come back to. Kept on this device.
            </p>
          </div>
          {items.length > 0 && (
            <Button variant="secondary" size="sm" onClick={clear}>
              Clear all
            </Button>
          )}
        </header>

        {!ready ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }, (_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            illustration={SavedSearchIllustration}
            title="No saved searches yet"
            description="Set up filters in Explore and save them, so you can check the same search again without rebuilding it."
            actionText="Open Explore"
            actionHref="/search"
          />
        ) : (
          <ul className="space-y-3">
            {items.map((search) => (
              <li key={search.id} className="p-5 rounded-card bg-surface border border-line">
                {renaming === search.id ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      value={draftName}
                      autoFocus
                      onChange={(e) => setDraftName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") commitRename(search);
                        if (e.key === "Escape") setRenaming(null);
                      }}
                      aria-label={`Rename ${search.name}`}
                      className="flex-1 min-w-40"
                    />
                    <Button size="sm" onClick={() => commitRename(search)}>
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setRenaming(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/search?${search.query}`}
                        className="text-sm font-medium text-ink hover:text-primary transition-colors"
                      >
                        {search.name}
                      </Link>
                      <p className="text-micro text-muted mt-0.5">{describe(search.query)}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setRenaming(search.id);
                          setDraftName(search.name);
                        }}
                        aria-label={`Rename ${search.name}`}
                        className="w-8 h-8 rounded-full border border-line text-muted hover:text-primary hover:border-primary/40 flex items-center justify-center transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove((s) => s.id === search.id)}
                        aria-label={`Delete ${search.name}`}
                        className="w-8 h-8 rounded-full border border-line text-muted hover:text-primary hover:border-primary/40 flex items-center justify-center transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="p-5 rounded-card bg-canvas border border-line flex gap-3">
          <BellOff className="w-4 h-4 text-muted shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-micro text-muted leading-relaxed">
            Delala cannot alert you when a new property matches one of these. There is no scheduled
            job to re-run a saved search and no email delivery configured, so an alerts toggle would
            be a switch connected to nothing. Check back and re-run the search instead.
          </p>
        </div>
      </div>
    </div>
  );
}
