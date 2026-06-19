import { SHADOW_SCALE } from "@/lib/style-preset-utils"

const SHADOW_DESCRIPTIONS: Record<string, string> = {
  none: "No shadow",
  "2xs": "Tiny line — dividers",
  xs: "Subtle — card hover",
  sm: "Default — cards, popovers",
  md: "Elevated — dropdowns",
  lg: "Floating — modals, sheets",
  xl: "Prominent — dialogs, toasts",
  "2xl": "Highest — alerts, drawers",
}

export default function ElevationSection() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Shadows
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SHADOW_SCALE.map(({ token, value }) => (
          <div
            key={token}
            className="rounded-xl border border-border bg-card p-4 transition-all"
            style={{ boxShadow: token === "none" ? "none" : value }}
          >
            <p className="text-xs font-semibold text-foreground">
              {token}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {SHADOW_DESCRIPTIONS[token]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
