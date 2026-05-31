import { cn } from "@/lib/utils"

function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border-l-2 border-primary/20">
      {children}
    </div>
  )
}

function TimelineItem({
  isCurrent,
  children,
}: {
  isCurrent?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="relative pl-8 pb-2 last:pb-0">
      <div
        className={cn(
          "absolute left-0 top-1.5 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2",
          isCurrent
            ? "border-primary bg-primary"
            : "border-primary/40 bg-background"
        )}
      />
      {isCurrent && (
        <span className="absolute left-0 top-1.5 z-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary/30 animate-ping" />
      )}
      <div className="space-y-3">{children}</div>
    </div>
  )
}

export { Timeline, TimelineItem }
