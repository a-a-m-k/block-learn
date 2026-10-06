"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-svh w-full flex-col items-center justify-center gap-5 px-6 py-8 text-center sm:gap-6 sm:px-8"
    >
      <p className="caption font-semibold tracking-wide text-brand-text">Error</p>
      <h1 className="text-display font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="max-w-md text-lead text-muted-foreground">
        The page hit an unexpected error. Try again, or return home.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button type="button" variant="cta" size="cta" onClick={reset}>
          Try again
        </Button>
        <Link href="/" className={buttonVariants({ variant: "softOutline", size: "cta" })}>
          Back home
        </Link>
      </div>
    </main>
  );
}
