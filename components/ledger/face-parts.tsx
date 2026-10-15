import type {
  FaceGaze,
  FaceMood,
  FacePalette,
  FaceVariant,
} from "./face-types";

export function Eyes({ mood, gaze }: { mood: FaceMood; gaze: FaceGaze }) {
  const pupilX = gaze.x * 1.35;
  const pupilY = gaze.y * 1.1;

  if (mood === "happy") {
    return (
      <g
        fill="none"
        stroke="#111318"
        strokeLinecap="round"
        strokeWidth="2.25"
      >
        <path d="M21 31.5c1.6-2 4.4-2 6 0" />
        <path d="M37 31.5c1.6-2 4.4-2 6 0" />
      </g>
    );
  }

  return (
    <g>
      <ellipse cx="24" cy="31" rx="4.2" ry="4.6" fill="#f8fafc" />
      <ellipse cx="40" cy="31" rx="4.2" ry="4.6" fill="#f8fafc" />
      <g
        transform={`translate(${pupilX} ${pupilY})`}
        className="transition-transform duration-300 motion-reduce:transition-none"
      >
        <circle cx="24" cy="31.4" r="2.05" fill="#111318" />
        <circle cx="40" cy="31.4" r="2.05" fill="#111318" />
        <circle cx="23.35" cy="30.7" r="0.65" fill="#f8fafc" />
        <circle cx="39.35" cy="30.7" r="0.65" fill="#f8fafc" />
      </g>
    </g>
  );
}

export function HairBack({
  variant,
  palette,
}: {
  variant: FaceVariant;
  palette: FacePalette;
}) {
  switch (variant) {
    case "short":
      return (
        <path
          d="M12 25C12 12 21 5 33 5c12.5 0 20 7.5 20 21v22H11.5l.5-23Z"
          fill={palette.hairShade}
        />
      );
    case "spiky":
      return (
        <>
          <circle cx="15" cy="19" r="8" fill={palette.hairShade} />
          <circle cx="49" cy="19" r="8" fill={palette.hairShade} />
          <path
            d="M13 28C13 13.5 21 7 32 7s19 6.5 19 21v17H13V28Z"
            fill={palette.hairShade}
          />
        </>
      );
    case "beard":
      return (
        <path
          d="M15 25C15 12.5 22.5 7 32 7c10.5 0 17 6.5 17 18v9H15v-9Z"
          fill={palette.hairShade}
        />
      );
    case "mustache":
      return (
        <path
          d="M15 25C15 13 22 7 32 7s17 6 17 18v7H15v-7Z"
          fill={palette.hairShade}
        />
      );
  }
}

export function HairFront({
  variant,
  palette,
}: {
  variant: FaceVariant;
  palette: FacePalette;
}) {
  switch (variant) {
    case "short":
      return (
        <>
          <path
            d="M13 28C13 13 21 7 33 7c8.5 0 15 4.5 18 12-8.5-.5-16.5-4-22-8.5C26 17 21.5 22 13 24v4Z"
            fill={palette.hair}
          />
          <path
            d="M13 24c3.5-1 6.5-2.8 9-5.2V48h-9V24Zm30-6c3 1 5.5 1.4 8 1.5V48h-8V18Z"
            fill={palette.hair}
          />
          <path
            d="M22 18.8c2.7-2.6 4.7-5.5 6.2-8.7"
            fill="none"
            stroke={palette.hairShade}
            strokeLinecap="round"
            strokeWidth="2"
          />
        </>
      );
    case "spiky":
      return (
        <>
          <circle cx="15" cy="17" r="6.5" fill={palette.hair} />
          <circle cx="49" cy="17" r="6.5" fill={palette.hair} />
          <path
            d="M14 26C14 14 21.5 8 32 8c9.5 0 17 5 18 16-7-1-13.2-4-18-9-4.2 4.8-10.2 8.5-18 11Z"
            fill={palette.hair}
          />
          <path
            d="M16 16c0-3 2-5 5-6m22 6c0-3-2-5-5-6"
            fill="none"
            stroke={palette.hairShade}
            strokeLinecap="round"
            strokeWidth="2"
          />
        </>
      );
    case "beard":
      return (
        <>
          <path
            d="M16 24c1-11 7-16 16-16 9.5 0 15 5.5 16 16-6.5-1-12-3.8-16-8-4 4.3-9.3 7-16 8Z"
            fill={palette.hair}
          />
          <path
            d="m20 13 3-3 2.5 3 3.5-4 3 4 3.5-4 3 4 3-2 2.5 4"
            fill="none"
            stroke={palette.hairShade}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </>
      );
    case "mustache":
      return (
        <>
          <path
            d="M16 24C17 13 23 8 32 8c8 0 13.5 4 16 12-8.5.8-15.2-1-20-5.5-2.2 4.5-6.2 7.8-12 9.5Z"
            fill={palette.hair}
          />
          <path
            d="M28 14.5c5.5 2.8 11.5 4 18 3.3"
            fill="none"
            stroke={palette.hairShade}
            strokeLinecap="round"
            strokeWidth="2"
          />
        </>
      );
  }
}

export function Brows({
  mood,
  color,
}: {
  mood: FaceMood;
  color: string;
}) {
  const paths =
    mood === "angry"
      ? ["M20 26.5l7 2", "M37 28.5l7-2"]
      : mood === "disappointed"
        ? ["M20 28l7-2", "M37 26l7 2"]
        : ["M20 26.5c2-1 5-1 7 0", "M37 26.5c2-1 5-1 7 0"];

  return (
    <g
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="2.2"
    >
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </g>
  );
}

export function Nose({ color }: { color: string }) {
  return (
    <path
      d="M32 32.5 30.8 37h2.4"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  );
}

export function FacialHair({
  variant,
  color,
}: {
  variant: FaceVariant;
  color: string;
}) {
  if (variant === "mustache") {
    return (
      <path
        d="M24.5 39.5c3.5-2 6-1.2 7.5.8 1.5-2 4-2.8 7.5-.8-1 3.3-5.5 4.2-7.5 1.7-2 2.5-6.5 1.6-7.5-1.7Z"
        fill={color}
      />
    );
  }

  if (variant === "beard") {
    return (
      <path
        d="M19 38c2.5 3 5 4.5 7.5 5v-3c3.8 2.2 7.2 2.2 11 0v3c2.7-.5 5.2-2.2 7.5-5v7c-1 7-6.5 11-13 11s-12-4-13-11v-7Z"
        fill={color}
        opacity="0.92"
      />
    );
  }

  return null;
}

export function Mouth({ mood, color }: { mood: FaceMood; color: string }) {
  const path =
    mood === "happy"
      ? "M26 41c1.5 4 10.5 4 12 0"
      : mood === "disappointed"
        ? "M27 45c2-3 8-3 10 0"
        : mood === "angry"
          ? "M27 44c2.5-2 7.5-2 10 0"
          : "M28 42.5h8";

  return (
    <path
      d={path}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeWidth={mood === "happy" ? 2.4 : 2}
    />
  );
}
