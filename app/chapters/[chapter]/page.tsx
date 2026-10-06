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
        <div className="flex items-start gap-2">
          <Badge variant="accent" shape="pill" className="font-semibold">
            {getChapterProgressLabel(chapter)}
          </Badge>
          <Badge
            icon={Clock}
            variant="ghost"
            shape="pill"
            className="font-semibold"
          >
            {`${chapter.readMinutes} min read`}
          </Badge>
        </div>
        <div className="mt-5 flex flex-col gap-5 sm:mt-6 sm:gap-6 md:mt-7 md:gap-8 lg:mt-8 xl:flex-row xl:items-start xl:gap-10">
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
            <ChapterIcon icon={chapter.icon} />
            <h1 className="text-display font-semibold text-foreground">
              {chapter.title}
            </h1>
            <p className="text-lead text-muted-foreground">
              {chapter.description}
            </p>
          </div>
          {chapter.image && (
            <figure className="mx-auto w-full shrink-0 overflow-hidden rounded-xl sm:max-w-sm md:w-72 xl:mx-0 xl:w-64 2xl:w-80">
              <Image
                src={chapter.image.src}
                alt={chapter.image.alt}
                width={800}
                height={800}
                sizes="(max-width: 1280px) min(100vw, 24rem), 20rem"
                className="h-auto w-full object-cover"
                priority={chapter.number === 1}
              />
            </figure>
          )}
        </div>
        {content && <ChapterBlocks blocks={content.blocks} />}
        <ChapterQuiz quiz={quiz} chapterSlug={chapter.slug} />
        <ChapterNav slug={chapter.slug} />
      </article>
    </main>
  );
}
