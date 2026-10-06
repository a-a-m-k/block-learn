import { BookOpenIcon } from "lucide-react";

import { CourseProgress } from "@/components/course-progress";
import { CourseSyllabus } from "@/components/course-syllabus";
import { SiteFooter } from "@/components/site-footer";
import { StartCourseCta } from "@/components/start-course-cta";
import { Badge } from "@/components/ui/badge";
import { estimatedReadMinutes } from "@/lib/course";

export default function Home() {
  return (
    <main
      className="mx-auto flex w-full min-w-0 max-w-[var(--container-page)] flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:gap-10 lg:py-12 xl:px-10"
      id="main-content"
      tabIndex={-1}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 text-center">
        <Badge icon={BookOpenIcon} shape="pill" variant="subtle">
          Interactive Course
        </Badge>

        <div className="flex flex-col gap-3">
          <h1 className="text-display font-bold text-foreground">
            Blockchain Basics
          </h1>
          <p className="text-lead text-balance text-muted-foreground">
            Five short chapters on how a blockchain keeps one shared record.
          </p>
          <p className="text-chrome text-muted-foreground">
            {estimatedReadMinutes} min · quiz after each chapter
          </p>
        </div>

        <StartCourseCta />
        <CourseProgress />
      </div>

      <CourseSyllabus />
      <SiteFooter />
    </main>
  );
}
