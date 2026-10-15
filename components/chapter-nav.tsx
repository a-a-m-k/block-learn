import Link from "next/link";
import Image from "next/image";
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
  "h-[2.625rem]! min-h-[2.625rem] w-full max-w-none justify-start rounded-none border-zinc-800 bg-neutral-950 px-4 font-['DM_Sans:Regular'] text-[10px] text-neutral-400 hover:bg-zinc-900 hover:text-white sm:w-auto",
);

const nextLinkClass = cn(
  buttonVariants({ variant: "cta", size: "lg" }),
  "h-[2.625rem]! min-h-[2.625rem] w-full max-w-none justify-end gap-3 rounded-none border border-blue-700 bg-blue-600 px-4 font-['DM_Sans:Regular'] text-[10px] text-white shadow-none hover:bg-blue-500 sm:ml-auto sm:w-auto",
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
          <Image
            src="/assets/design-7-5/arrow-right.svg"
            alt=""
            width={18}
            height={18}
          />
        </Link>
      ) : null}
    </nav>
  );
}
