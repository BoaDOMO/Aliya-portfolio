import { cn } from "@/lib/utils"

export interface PresetBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  tone?: "card" | "raised" | "featured" | "popover"
}

export function PresetBox({ children, className, tone = "card", ...props }: PresetBoxProps) {
  return (
    <div
      className={cn("preview-preset-surface", `preview-preset-surface--${tone}`, className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function PresetButton({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" }) {
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:opacity-90"
      : variant === "secondary"
        ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        : "bg-transparent border border-border text-foreground hover:bg-muted"

  return (
    <button
      className={cn(
        "preview-preset-radius inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        variantClasses,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
