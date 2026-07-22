import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

type ContainerWidth = "editorial" | "standard" | "wide"

const widths: Record<ContainerWidth, string> = {
  editorial: "max-w-3xl",
  standard: "max-w-6xl",
  wide: "max-w-7xl",
}

export function PageContainer({
  width = "standard",
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & { width?: ContainerWidth }) {
  return (
    <div
      className={cn("mx-auto w-full px-6 md:px-8", widths[width], className)}
      {...props}
    />
  )
}

export function PageSection({
  tone = "default",
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"section"> & {
  tone?: "default" | "muted"
}) {
  return (
    <section
      className={cn(
        "py-20 md:py-32",
        tone === "muted" && "bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}
