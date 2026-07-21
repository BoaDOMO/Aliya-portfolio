import { cn } from "@/lib/utils"

export interface PresetBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function PresetBox({ children, className, ...props }: PresetBoxProps) {
  return (
    <div
      className={cn("bg-card", className)}
      style={{
        borderRadius: "var(--preset-radius)",
        boxShadow: "var(--preset-shadow)",
        backgroundColor: "oklch(from var(--card) l c h / var(--preset-bg-opacity))",
        border: "var(--preset-border-width) solid oklch(from var(--border) l c h / var(--preset-border-opacity))",
        backdropFilter: "var(--preset-backdrop)",
      }}
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
        "px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        variantClasses,
        className
      )}
      style={{ borderRadius: "var(--preset-radius)" }}
      {...props}
    >
      {children}
    </button>
  )
}
