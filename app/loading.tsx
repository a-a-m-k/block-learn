export default function Loading() {
  return (
    <main
      className="flex min-h-svh w-full flex-col items-center justify-center gap-4 px-6 py-8"
      aria-busy
      aria-live="polite"
    >
      <div className="size-10 animate-pulse rounded-lg bg-muted" />
      <p className="sr-only">Loading</p>
      <div className="h-3 w-40 animate-pulse rounded bg-muted" />
    </main>
  );
}
