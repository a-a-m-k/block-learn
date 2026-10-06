"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LinkSection } from "@/components/link-section";
import { materials } from "@/lib/materials";
import { FileTextIcon, X } from "lucide-react";

export function CourseMaterials({
  appearance = "button",
}: {
  appearance?: "button" | "link";
}) {
  const asLink = appearance === "link";

  return (
    <AlertDialog>
      <AlertDialogTrigger
        icon={asLink ? undefined : FileTextIcon}
        iconClassName="size-icon"
        variant={asLink ? "link" : "softOutline"}
        size={asLink ? "sm" : "cta"}
        className={
          asLink
            ? "h-auto px-0 font-normal text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            : undefined
        }
      >
        Sources
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="relative gap-1 border-b px-4 py-5">
          <AlertDialogTitle
            render={<h2 />}
            className="text-title font-medium text-foreground"
          >
            Course Materials &amp; Sources
          </AlertDialogTitle>
          <p className="text-body text-balance text-muted-foreground">
            This course content was gathered and adapted from the references
            below.
          </p>
          <AlertDialogCancel
            variant="outline"
            size="icon"
            aria-label="Close dialog"
            className="absolute top-4 right-4"
          >
            <X className="size-icon-lg" aria-hidden />
          </AlertDialogCancel>
        </AlertDialogHeader>
        <div className="flex-1 overflow-y-auto">
          {materials.map((material) => (
            <LinkSection
              key={material.id}
              title={material.title}
              link={material.link}
              source={material.source}
              description={material.description}
            />
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel variant="softOutline" size="cta">
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
