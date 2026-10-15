import { cn } from "@/lib/utils";

type ChapterCubesProps = {
  className?: string;
};

function CubeStack({
  layers,
  className,
}: {
  layers: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 72 88"
      className={cn("h-24 w-16 text-blue-500", className)}
      aria-hidden
    >
      {Array.from({ length: layers }, (_, index) => {
        const y = 58 - index * 18;
        return (
          <g key={index} opacity={1 - index * 0.12}>
            <path
              d={`M36 ${y} L64 ${y + 12} L36 ${y + 24} L8 ${y + 12} Z`}
              className="fill-blue-950 stroke-blue-400"
              strokeWidth="1.25"
            />
            <path
              d={`M8 ${y + 12} L36 ${y + 24} L36 ${y + 36} L8 ${y + 24} Z`}
              className="fill-sky-950 stroke-blue-700"
              strokeWidth="1.25"
            />
            <path
              d={`M36 ${y + 24} L64 ${y + 12} L64 ${y + 24} L36 ${y + 36} Z`}
              className="fill-blue-900 stroke-blue-400"
              strokeWidth="1.25"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function ChapterCubes({ className }: ChapterCubesProps) {
  return (
    <div className={cn("items-end gap-5", className)} aria-hidden>
      <CubeStack layers={3} />
      <CubeStack layers={2} className="mb-2 opacity-80" />
      <CubeStack layers={3} className="opacity-90" />
    </div>
  );
}
