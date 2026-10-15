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
import { ChapterCubes } from "@/components/chapter-cubes";
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
                className="border border-sky-900 bg-slate-800 font-medium tracking-[0.12em] text-blue-300 uppercase"
              >
                {getChapterProgressLabel(chapter)}
              </Badge>
              <Badge
                icon={Clock}
                variant="ghost"
                shape="pill"
                className="px-0 font-normal text-gray-500"
              >
                {`${chapter.readMinutes} min read`}
              </Badge>
            </div>
            <ChapterIcon icon={chapter.icon} />
            <h1 className="text-display font-semibold text-white">
              {chapter.title}
            </h1>
            <p className="max-w-xl text-lead text-gray-400">
              {chapter.description}
            </p>
          </div>
          {chapter.number === 1 ? (
            <ChapterCubes className="hidden shrink-0 lg:flex" />
          ) : chapter.image ? (
            <figure className="mx-auto w-full shrink-0 overflow-hidden rounded-xl sm:max-w-sm md:w-72 lg:mx-0 lg:w-64">
              <Image
                src={chapter.image.src}
                alt={chapter.image.alt}
                width={800}
                height={800}
                sizes="(max-width: 1024px) min(100vw, 24rem), 16rem"
                className="h-auto w-full object-cover"
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
