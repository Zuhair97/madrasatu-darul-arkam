"use client";

import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="app-shell">
      <section className="status-card">
        <h1>Something went wrong</h1>
        <p>
          An unexpected error occurred. Please try again.
        </p>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </section>
    </main>
  );
}
