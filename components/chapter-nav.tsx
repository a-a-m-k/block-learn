import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { getAdjacentChapters, type ChapterSlug } from "@/lib/course";
import { chapterPath } from "@/lib/site";
import { cn } from "@/lib/utils";

type ChapterNavProps = {
  slug: ChapterSlug;
};

const navLinkClass = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "h-auto w-full max-w-none gap-3 whitespace-normal px-4 py-3 sm:max-w-sm",
);

export function ChapterNav({ slug }: ChapterNavProps) {
  const { prev, next } = getAdjacentChapters(slug);

  return (
    <nav
      aria-label="Chapter navigation"
      className="section-y flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-stretch sm:justify-between"
    >
      {prev ? (
        <Link
          href={chapterPath(prev.slug)}
          className={cn(navLinkClass, "justify-start text-left")}
        >
          <ArrowLeftIcon data-icon="inline-start" className="size-icon shrink-0" />
          <NavLinkLabel eyebrow="Previous" title={prev.title} />
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={chapterPath(next.slug)}
          className={cn(navLinkClass, "justify-end text-right sm:ml-auto")}
        >
          <NavLinkLabel eyebrow="Next" title={next.title} />
          <ArrowRightIcon data-icon="inline-end" className="size-icon shrink-0" />
        </Link>
      ) : null}
    </nav>
  );
}

function NavLinkLabel({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <span className="flex min-w-0 flex-col gap-0.5">
      <span className="caption font-normal text-muted-foreground">{eyebrow}</span>
      <span className="text-body font-medium">{title}</span>
    </span>
  );
}
