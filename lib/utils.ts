import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Custom sizes in app/globals.css. Without this, tailwind-merge treats
      // them as text colors and drops them when a color class follows.
      "font-size": [
        {
          text: ["body", "lead", "title", "display", "chrome", "chrome-meta"],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
