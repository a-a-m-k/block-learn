import type { FaceGaze, FaceMood, FaceVariant } from "./face-types";

export function Eyes({ mood, gaze }: { mood: FaceMood; gaze: FaceGaze }) {
  const gx = gaze.x;
  const gy = gaze.y;

  if (mood === "angry") {
    // Side-eye only horizontally, seated below brows (y≥8)
    return (
      <>
        <rect x={4 + gx} y={8} width="1" height="1" fill="#0a0a0a" />
        <rect x={4 + gx} y={9} width="1" height="2" fill="#0a0a0a" />
        <rect x={10 + gx} y={8} width="1" height="1" fill="#0a0a0a" />
        <rect x={9 + gx} y={9} width="1" height="2" fill="#0a0a0a" />
      </>
    );
  }

  return (
    <>
      <rect x={5 + gx} y={7 + gy} width="2" height="2" fill="#111" />
      <rect x={9 + gx} y={7 + gy} width="2" height="2" fill="#111" />
    </>
  );
}

export function Hair({
  variant,
  hair,
  shade,
}: {
  variant: FaceVariant;
  hair: string;
  shade: string;
}) {
  switch (variant) {
    case "mustache":
      return (
        <>
          <rect x="3" y="3" width="10" height="3" fill={hair} />
          <rect x="4" y="2" width="8" height="1" fill={shade} />
        </>
      );
    case "beard":
      return (
        <>
          <rect x="3" y="3" width="10" height="2" fill={hair} />
          <rect x="3" y="5" width="2" height="2" fill={shade} />
          <rect x="11" y="5" width="2" height="2" fill={shade} />
        </>
      );
    case "spiky":
      return (
        <>
          <rect x="4" y="1" width="2" height="2" fill={shade} />
          <rect x="7" y="0" width="2" height="3" fill={hair} />
          <rect x="10" y="1" width="2" height="2" fill={shade} />
          <rect x="3" y="3" width="10" height="2" fill={hair} />
          <rect x="2" y="4" width="2" height="8" fill={hair} />
          <rect x="12" y="4" width="2" height="8" fill={hair} />
          <rect x="2" y="12" width="2" height="2" fill={shade} />
          <rect x="12" y="12" width="2" height="2" fill={shade} />
        </>
      );
    case "short":
      return (
        <>
          <rect x="3" y="3" width="10" height="2" fill={hair} />
          <rect x="4" y="2" width="8" height="1" fill={shade} />
          <rect x="2" y="4" width="2" height="9" fill={hair} />
          <rect x="12" y="4" width="2" height="9" fill={hair} />
          <rect x="2" y="13" width="2" height="1" fill={shade} />
          <rect x="12" y="13" width="2" height="1" fill={shade} />
          <rect x="3" y="5" width="1" height="3" fill={shade} />
          <rect x="12" y="5" width="1" height="3" fill={shade} />
        </>
      );
  }
}

export function Brows({ mood, color }: { mood: FaceMood; color: string }) {
  if (mood === "angry") {
    // Mild V — slightly straighter tilt
    return (
      <>
        <rect x="3" y="5" width="3" height="1" fill={color} />
        <rect x="5" y="6" width="2" height="1" fill={color} />
        <rect x="9" y="6" width="2" height="1" fill={color} />
        <rect x="10" y="5" width="3" height="1" fill={color} />
      </>
    );
  }

  if (mood === "disappointed") {
    return (
      <>
        <rect x="5" y="6" width="2" height="1" fill={color} />
        <rect x="9" y="6" width="2" height="1" fill={color} />
      </>
    );
  }

  return (
    <>
      <rect x="5" y="5" width="2" height="1" fill={color} />
      <rect x="9" y="5" width="2" height="1" fill={color} />
    </>
  );
}

export function Mouth({ mood, color }: { mood: FaceMood; color: string }) {
  if (mood === "happy") {
    return (
      <>
        <rect x="6" y="11" width="1" height="1" fill={color} />
        <rect x="7" y="12" width="2" height="1" fill={color} />
        <rect x="9" y="11" width="1" height="1" fill={color} />
      </>
    );
  }

  if (mood === "angry") {
    // Narrow sad frown (control point above = ∩, not ∪)
    return (
      <path
        d="M6.75 13 Q8 11.25 9.25 13"
        fill="none"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        shapeRendering="geometricPrecision"
      />
    );
  }

  if (mood === "disappointed") {
    return (
      <>
        <rect x="6" y="11" width="1" height="1" fill={color} />
        <rect x="7" y="11" width="1" height="1" fill={color} />
        <rect x="8" y="12" width="1" height="1" fill={color} />
        <rect x="9" y="12" width="1" height="1" fill={color} />
      </>
    );
  }

  return (
    <>
      <rect x="6" y="11" width="1" height="1" fill={color} />
      <rect x="7" y="11" width="2" height="1" fill={color} />
      <rect x="9" y="11" width="1" height="1" fill={color} />
    </>
  );
}
