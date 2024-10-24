import { cn } from "@/lib/utils";

export default function RetroGrid({
  className,
  angle = 65,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <div
      className={cn(
        "size-full pointer-events-none absolute overflow-hidden opacity-50 [perspective:200px]",
        className
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",

            "[background-repeat:repeat] [background-size:60px_60px] [inset:0%_0px] [transform-origin:100%_0_0] [width:600vw] [margin-left:-90%] [height:1200vh]",

            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_2px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_2px,transparent_0)]",

            // Dark styles
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.5)_2px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.5)_2px,transparent_0)]"
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  );
}
