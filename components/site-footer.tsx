import { CourseMaterials } from "@/components/course-materials";
import { portfolioNote, siteCredit } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-2 border-t pt-5 text-chrome text-muted-foreground">
      <p>
        Built by{" "}
        <a
          href={siteCredit.profileUrl}
          className="text-foreground underline-offset-4 hover:underline"
        >
          {siteCredit.handle}
        </a>
        . {portfolioNote}
      </p>
      <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <a
          href={siteCredit.repoUrl}
          className="text-foreground underline-offset-4 hover:underline"
        >
          Source
        </a>
        <CourseMaterials appearance="link" />
      </p>
    </footer>
  );
}
