import { cn } from "@/lib/utils"

export function ProjectVisual({
  number,
  status,
  tone,
}: {
  number: string
  status: string
  tone: "blue" | "sage" | "steel" | "forest"
}) {
  return (
    <div className={cn("project-visual", `project-visual--${tone}`)}>
      <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between gap-4 md:inset-x-6 md:top-6">
        <span className="font-mono text-xs text-foreground/45">{number}</span>
        <span className="rounded-full bg-background/75 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.13em] text-primary backdrop-blur-md">
          {status}
        </span>
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 360 260"
        className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2 text-foreground/15"
      >
        <line x1="180" y1="28" x2="180" y2="232" stroke="currentColor" strokeWidth="1" />
        <line x1="72" y1="130" x2="288" y2="130" stroke="currentColor" strokeWidth="1" />
        <circle cx="180" cy="130" r="72" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="180" cy="130" r="44" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="180" cy="130" r="4" fill="currentColor" />
      </svg>
      <div aria-hidden="true" className="project-visual__glass" />
    </div>
  )
}
