"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Une erreur est survenue</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-300">{error.message}</p>
      <button onClick={reset} className="mt-6 btn">Réessayer</button>
    </main>
  );
}

