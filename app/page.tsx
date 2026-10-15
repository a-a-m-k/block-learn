import Link from "next/link";
import { ArrowDownIcon, Layers3Icon } from "lucide-react";

import { CourseProgress } from "@/components/course-progress";
import { CourseSyllabus } from "@/components/course-syllabus";
import { LandingHeroIllustration } from "@/components/landing-hero-illustration";
import { SiteFooter } from "@/components/site-footer";
import { StartCourseCta } from "@/components/start-course-cta";
import { estimatedReadMinutes } from "@/lib/course";

export default function Home() {
  return (
    <main
      className="mx-auto flex w-full min-w-0 max-w-[var(--container-page)] flex-col px-4 py-6 sm:px-6 md:px-8 md:py-8 xl:px-10"
      id="main-content"
      tabIndex={-1}
    >
      <div className="flex items-center justify-between border-b pb-6">
        <div className="flex size-control-cta items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-lg shadow-brand/20">
          <Layers3Icon className="size-icon-lg" aria-hidden />
        </div>
        <Link
          href="#learning-path"
          className="inline-flex items-center gap-2 rounded-lg text-chrome text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          Learning path
          <ArrowDownIcon className="size-icon-sm" aria-hidden />
        </Link>
      </div>

      <div className="relative grid items-center gap-8 overflow-hidden border-b py-10 md:py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(26rem,1.08fr)] lg:gap-4 lg:py-16">
        <div className="pointer-events-none absolute left-1/4 top-1/3 size-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative z-10 flex max-w-3xl flex-col items-start">
          <p className="mb-8 inline-flex rounded-full border bg-card/40 px-4 py-2 text-chrome font-medium tracking-wide text-muted-foreground">
            {estimatedReadMinutes} min · quiz after each chapter
          </p>
          <h1 className="landing-title font-bold tracking-tighter text-foreground">
            <span className="block">Blockchain</span>
            <span className="block text-brand-text">Basics</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lead text-pretty text-muted-foreground">
            Five short chapters on how a blockchain keeps one shared record.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <StartCourseCta />
            <CourseProgress />
          </div>
        </div>

        <LandingHeroIllustration />
      </div>

      <div className="pt-8">
        <CourseSyllabus />
      </div>
      <div className="pt-8">
        <SiteFooter />
      </div>
    </main>
  );
}
