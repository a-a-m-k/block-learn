import { CourseProgress } from "@/components/course-progress";
import { CourseSyllabus } from "@/components/course-syllabus";
import { SiteFooter } from "@/components/site-footer";
import { StartCourseCta } from "@/components/start-course-cta";
import { estimatedReadMinutes } from "@/lib/course";

export default function Home() {
  return (
    <main
      className="mx-auto flex w-full min-w-0 max-w-[var(--container-page)] flex-col gap-8 px-4 py-8 sm:px-6 md:px-8 md:py-10 xl:px-10"
      id="main-content"
      tabIndex={-1}
    >
      <div className="grid w-full items-end gap-6 py-2 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 md:py-4">
        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="text-hero font-bold tracking-tight text-foreground">
            Blockchain Basics
          </h1>
          <p className="max-w-2xl text-lead text-pretty text-muted-foreground">
            Five short chapters on how a blockchain keeps one shared record.
          </p>
          <p className="text-chrome text-muted-foreground">
            {estimatedReadMinutes} min · quiz after each chapter
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <StartCourseCta />
          <CourseProgress />
        </div>
      </div>

      <CourseSyllabus />
      <SiteFooter />
    </main>
  );
}
