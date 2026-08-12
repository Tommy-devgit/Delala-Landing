"use client";

import { useCallback, useEffect, useState } from "react";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  /** A message safe to show a user. Raw backend errors never reach here. */
  error: string | null;
  /** Re-runs the loader. Wire this to the retry button in an ErrorNotice. */
  retry: () => void;
}

/**
 * Runs an async loader and reports loading, error and retry state.
 *
 * Every page used to call the API inside its own effect and swallow failures,
 * so an outage rendered as an empty result — "no properties match your search"
 * when the truth was that nothing had loaded. Sharing one hook means every
 * surface gets the same three states without each page reinventing them.
 *
 * The shape of the effect is dictated by `react-hooks/set-state-in-effect`:
 * the first write must not be synchronous, hence the `await Promise.resolve()`.
 * Retry is a nonce bumped from an event handler. See §6 of HANDOUT.md.
 */
export function useAsync<T>(loader: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const retry = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await Promise.resolve();
      if (cancelled) return;

      setLoading(true);
      setError(null);

      try {
        const result = await loader();
        if (!cancelled) setData(result);
      } catch (err) {
        if (!cancelled) {
          // The thrown message is ours — the API client turns HTTP failures
          // into sentences. Anything else falls back to something generic
          // rather than leaking a stack or a backend string.
          const message = err instanceof Error ? err.message : "";
          setError(message || "Something went wrong. Please try again.");
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // `loader` is intentionally not a dependency: it is redefined on every
    // render by callers, which would restart the request in a loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  return { data, loading, error, retry };
}
