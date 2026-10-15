"use client";

import { useEffect } from "react";

/**
 * Figma Make's preview returns the HTML document for Next.js client
 * navigations, which the app router then fails to parse. Full page loads
 * use the same request that already renders the preview.
 */
export function FigmaMakeNavigation() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FIGMA_MAKE !== "1") return;

    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(url.href);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
