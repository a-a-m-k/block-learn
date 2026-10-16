import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { getAdjacentChapters, type ChapterSlug } from "@/lib/course";
import { chapterPath } from "@/lib/site";
import { cn } from "@/lib/utils";

type ChapterNavProps = {
  slug: ChapterSlug;
};

const previousLinkClass = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "w-full max-w-none justify-start sm:w-auto",
);

const nextLinkClass = cn(
  buttonVariants({ variant: "cta", size: "lg" }),
  "w-full max-w-none justify-end sm:ml-auto sm:w-auto",
);

export function ChapterNav({ slug }: ChapterNavProps) {
  const { prev, next } = getAdjacentChapters(slug);

  return (
    <nav
      aria-label="Chapter navigation"
      className="section-y flex flex-col gap-3 border-t border-grid pt-6 sm:flex-row sm:items-center sm:justify-between"
    >
      {prev ? (
        <Link
          href={chapterPath(prev.slug)}
          className={previousLinkClass}
        >
          <ArrowLeftIcon className="size-icon shrink-0" aria-hidden />
          Previous: {prev.title}
        </Link>
      ) : (
        <Link href="/" className={previousLinkClass}>
          Back to course
        </Link>
      )}

      {next ? (
        <Link
          href={chapterPath(next.slug)}
          className={nextLinkClass}
        >
          Continue: {next.title}
          <ArrowRightIcon className="size-icon shrink-0" aria-hidden />
        </Link>
      ) : null}
    </nav>
  );
}
