"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { screenCenterTop } from "./place-on-screen";

type ScreenCenterProps = {
  children: ReactNode;
  className?: string;
  /** Follow the viewport. Otherwise center inside the diagram. */
  trackViewport?: boolean;
};

export function ScreenCenter({
  children,
  className,
  trackViewport = true,
}: ScreenCenterProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const card = cardRef.current;
    if (!frame || !card) return;

    const place = () => {
      const bounds = frame.getBoundingClientRect();
      const viewport = window.visualViewport;
      const viewTop = viewport?.offsetTop ?? 0;
      const viewHeight = viewport?.height ?? window.innerHeight;
      const viewMid = trackViewport
        ? viewTop + viewHeight / 2
        : bounds.top + bounds.height / 2;
      card.style.top = `${screenCenterTop(bounds, card.offsetHeight, viewMid, 16)}px`;
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(frame);
    observer.observe(card);
    document.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    viewportListen(place, true);
    return () => {
      observer.disconnect();
      document.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
      viewportListen(place, false);
    };
  }, [trackViewport]);

  return (
    <div ref={frameRef} className="pointer-events-none absolute inset-0 z-20">
      <div
        ref={cardRef}
        className={cn("absolute left-1/2 -translate-x-1/2", className)}
      >
        {children}
      </div>
    </div>
  );
}

function viewportListen(place: () => void, on: boolean) {
  const viewport = window.visualViewport;
  if (!viewport) return;
  const method = on ? "addEventListener" : "removeEventListener";
  viewport[method]("scroll", place);
  viewport[method]("resize", place);
}
