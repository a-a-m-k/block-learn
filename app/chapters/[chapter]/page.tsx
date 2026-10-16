import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  chapters,
  getChapterBySlug,
  getChapterProgressLabel,
} from "@/lib/course";
import { getContentBySlug } from "@/lib/chapter-content";
import { ChapterBlocks } from "@/components/chapter-blocks";
import { ChapterIcon } from "@/components/chapter-icon";
import { ChapterNav } from "@/components/chapter-nav";
import { ChapterQuiz } from "@/components/chapter-quiz";
import { Badge } from "@/components/ui/badge";
import { getQuizByChapterSlug } from "@/lib/quizzes";
import { absoluteUrl, chapterPath, siteConfig, siteOgImage } from "@/lib/site";
import { Clock } from "lucide-react";

type ChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

export function generateStaticParams() {
  return chapters.map((chapter) => ({
    chapter: chapter.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { chapter: slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return {
      title: "Chapter not found",
    };
  }

  const url = absoluteUrl(chapterPath(chapter.slug));
  const title = chapter.title;
  const description = chapter.description;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: chapter.image
        ? [
            {
              url: chapter.image.src,
              alt: chapter.image.alt,
            },
          ]
        : [siteOgImage],
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter: slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return notFound();
  }

  const content = getContentBySlug(chapter.slug);
  const quiz = getQuizByChapterSlug(chapter.slug);

  return (
    <main className="page-gutter">
      <article>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="accent"
                shape="pill"
                className="font-medium tracking-[0.12em] uppercase"
              >
                {getChapterProgressLabel(chapter)}
              </Badge>
              <Badge
                icon={Clock}
                variant="ghost"
                shape="pill"
                className="px-0 font-normal"
              >
                {`${chapter.readMinutes} min read`}
              </Badge>
            </div>
            <ChapterIcon icon={chapter.icon} />
            <h1 className="text-display font-semibold text-foreground">
              {chapter.title}
            </h1>
            <p className="max-w-xl text-lead text-muted-foreground">
              {chapter.description}
            </p>
          </div>
          {chapter.image ? (
            <figure className="mx-auto hidden aspect-square w-full max-w-56 shrink-0 overflow-hidden rounded-xl lg:mx-0 lg:block lg:w-56">
              <Image
                src={chapter.image.src}
                alt={chapter.image.alt}
                width={380}
                height={380}
                sizes="14rem"
                className="h-full w-full object-contain"
              />
            </figure>
          ) : null}
        </div>
        {content && <ChapterBlocks blocks={content.blocks} />}
        <ChapterQuiz quiz={quiz} chapterSlug={chapter.slug} />
        <ChapterNav slug={chapter.slug} />
      </article>
    </main>
  );
}
