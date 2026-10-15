export function LandingHeroIllustration() {
  return (
    <div
      className="relative mx-auto w-full max-w-2xl text-brand"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-1/4 rounded-full bg-brand/15 blur-3xl" />
      <svg
        viewBox="0 0 640 520"
        fill="none"
        className="relative h-auto w-full overflow-visible"
      >
        <defs>
          <linearGradient id="block-face" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--brand)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--background)" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient id="chain-stroke" x1="80" y1="390" x2="560" y2="100">
            <stop stopColor="var(--brand)" stopOpacity="0.18" />
            <stop offset="0.5" stopColor="var(--brand-text)" />
            <stop offset="1" stopColor="var(--brand)" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        <g className="text-brand/15" stroke="currentColor">
          <path d="M32 474 320 292 608 474" />
          <path d="M96 488 320 292 544 488" />
          <path d="M176 504 320 292 464 504" />
          <path d="M0 438h640M0 466h640M0 494h640" />
        </g>

        <path
          d="m116 372 140-78 132-88 132-90"
          stroke="url(#chain-stroke)"
          strokeWidth="2"
        />

        <g stroke="currentColor" strokeWidth="1.5">
          <g>
            <path
              d="m58 346 64-12 38 26-65 13-37-27Z"
              fill="var(--background)"
              className="text-brand/35"
            />
            <path
              d="m95 373 65-13v74l-65 14v-75Z"
              fill="url(#block-face)"
              className="text-brand/70"
            />
            <path
              d="m58 346 37 27v75l-37-29v-73Z"
              fill="var(--background)"
              className="text-brand/25"
            />
            <circle
              cx="139"
              cy="382"
              r="4"
              fill="var(--brand-text)"
              stroke="none"
              className="motion-safe:animate-pulse"
            />
          </g>

          <g>
            <path
              d="m202 264 68-12 39 26-68 13-39-27Z"
              fill="var(--background)"
              className="text-brand/35"
            />
            <path
              d="m241 291 68-13v80l-68 14v-81Z"
              fill="url(#block-face)"
              className="text-brand/80"
            />
            <path
              d="m202 264 39 27v81l-39-30v-78Z"
              fill="var(--background)"
              className="text-brand/30"
            />
            <circle
              cx="286"
              cy="302"
              r="4"
              fill="var(--brand-text)"
              stroke="none"
            />
          </g>

          <g>
            <path
              d="m340 170 72-13 41 27-72 14-41-28Z"
              fill="var(--background)"
              className="text-brand/40"
            />
            <path
              d="m381 198 72-14v86l-72 15v-87Z"
              fill="url(#block-face)"
              className="text-brand/90"
            />
            <path
              d="m340 170 41 28v87l-41-31v-84Z"
              fill="var(--background)"
              className="text-brand/35"
            />
            <circle
              cx="429"
              cy="211"
              r="4"
              fill="var(--brand-text)"
              stroke="none"
              className="motion-safe:animate-pulse"
            />
          </g>

          <g>
            <path
              d="m478 76 76-14 43 29-76 15-43-30Z"
              fill="var(--background)"
              className="text-brand/45"
            />
            <path
              d="m521 106 76-15v90l-76 16v-91Z"
              fill="url(#block-face)"
              className="text-brand"
            />
            <path
              d="m478 76 43 30v91l-43-33V76Z"
              fill="var(--background)"
              className="text-brand/40"
            />
            <circle
              cx="571"
              cy="120"
              r="4"
              fill="var(--brand-text)"
              stroke="none"
            />
          </g>
        </g>

        <g className="text-brand/55" stroke="currentColor">
          <rect x="76" y="176" width="104" height="70" rx="4" />
          <path d="M92 196h40M92 210h68M92 224h52" />
          <rect x="456" y="338" width="122" height="82" rx="4" />
          <path d="M474 360h46M474 376h84M474 392h62" />
        </g>
      </svg>
    </div>
  );
}
