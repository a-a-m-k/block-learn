import type { ReactNode } from "react";

/** Renders chapter copy with optional `**bold**` markers. */
export function richText(text: string): ReactNode {
  return text.split(/(\*\*.+?\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}
