import { cn } from "@/lib/utils"

export function SectionLabel({
  children,
  className,
  align = "start",
  line = true,
}: {
  children: React.ReactNode
  className?: string
  align?: "start" | "center"
  line?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        align === "center" && "justify-center",
        className
      )}
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
        {children}
      </p>
      {line && <span aria-hidden="true" className="h-px w-12 bg-border" />}
    </div>
  )
}
