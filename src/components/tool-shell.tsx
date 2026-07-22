import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function ToolAtmosphere({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("tool-atmosphere", className)} />
}

export function ToolSectionLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p className={cn("tool-section-label", className)}>
      <span aria-hidden="true">//</span>
      {children}
    </p>
  )
}

export function ToolStatusPill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode
  tone?: "neutral" | "success" | "info" | "warning"
  className?: string
}) {
  return <span className={cn("tool-status-pill", `tool-status-pill--${tone}`, className)}>{children}</span>
}

