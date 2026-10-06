import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { chapterPath } from "@/lib/site";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-svh w-full flex-col items-center justify-center gap-5 px-6 py-8 text-center sm:gap-6 sm:px-8"
    >
      <p className="caption font-semibold tracking-wide text-brand-text">404</p>
      <h1 className="text-display font-semibold text-foreground">
        Page not found
      </h1>
      <p className="max-w-md text-lead text-muted-foreground">
        That route isn’t part of the course. Head home or jump back into the
        first chapter.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className={buttonVariants({ variant: "cta", size: "cta" })}>
          Back home
        </Link>
        <Link
          href={chapterPath("what-is-blockchain")}
          className={buttonVariants({ variant: "softOutline", size: "cta" })}
        >
          Start chapter 1
        </Link>
      </div>
    </main>
  );
}
