export default function ChaptersLoading() {
  return (
    <main className="page-gutter" aria-busy aria-live="polite">
      <p className="sr-only">Loading chapter</p>
      <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
        <div className="flex gap-2">
          <div className="h-7 w-28 animate-pulse rounded-full bg-muted" />
          <div className="h-7 w-24 animate-pulse rounded-full bg-muted" />
        </div>
        <div className="flex flex-col gap-4 xl:flex-row xl:gap-10">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div className="size-12 animate-pulse rounded-lg bg-muted" />
            <div className="h-10 w-3/4 max-w-md animate-pulse rounded bg-muted" />
            <div className="h-5 w-full max-w-lg animate-pulse rounded bg-muted" />
            <div className="h-5 w-2/3 max-w-md animate-pulse rounded bg-muted" />
          </div>
          <div className="mx-auto aspect-square w-full max-w-xs animate-pulse rounded-xl bg-muted xl:mx-0 xl:w-64" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </main>
  );
}
