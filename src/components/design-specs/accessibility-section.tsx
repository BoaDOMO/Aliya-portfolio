import { useDesignTokens } from "@/lib/design-tokens-store"
import { getContrastRatio, getContrastGrade } from "@/lib/contrast-utils"

export default function AccessibilitySection() {
  const state = useDesignTokens()
  const { light, dark } = state.tokens

  const pairs = [
    {
      label: "primary-fg ↔ primary",
      fgL: light["primary-foreground"],
      bgL: light.primary,
      fgD: dark["primary-foreground"],
      bgD: dark.primary,
    },
    {
      label: "foreground ↔ background",
      fgL: light.foreground,
      bgL: light.background,
      fgD: dark.foreground,
      bgD: dark.background,
    },
    {
      label: "foreground ↔ card",
      fgL: light.foreground,
      bgL: light.card,
      fgD: dark.foreground,
      bgD: dark.card,
    },
    {
      label: "muted-fg ↔ muted",
      fgL: light["muted-foreground"],
      bgL: light.muted,
      fgD: dark["muted-foreground"],
      bgD: dark.muted,
    },
    {
      label: "secondary-fg ↔ secondary",
      fgL: light["secondary-foreground"],
      bgL: light.secondary,
      fgD: dark["secondary-foreground"],
      bgD: dark.secondary,
    },
    {
      label: "accent-fg ↔ accent",
      fgL: light["accent-foreground"],
      bgL: light.accent,
      fgD: dark["accent-foreground"],
      bgD: dark.accent,
    },
  ]

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        WCAG contrast ratios for every primary role pair. AA requires ≥ 4.5:1
        for body text; AAA requires ≥ 7:1.
      </p>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-3 gap-2 bg-muted/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:grid-cols-[1fr_120px_120px_120px] sm:gap-3">
          <span className="col-span-3 sm:col-span-1">Pair</span>
          <span>Light ratio</span>
          <span>Dark ratio</span>
          <span>Status</span>
        </div>
        <div className="px-3">
          {pairs.map((p) => {
            const lr = getContrastRatio(p.fgL, p.bgL)
            const dr = getContrastRatio(p.fgD, p.bgD)
            const ok = lr >= 4.5 && dr >= 4.5
            return (
              <div
                key={p.label}
                className="grid grid-cols-3 items-center gap-2 border-b border-border/40 py-3 last:border-b-0 sm:grid-cols-[1fr_120px_120px_120px] sm:gap-3 sm:py-2"
              >
                <span className="col-span-3 font-mono text-xs text-foreground sm:col-span-1">{p.label}</span>
                <span className="font-mono text-[10px] sm:text-xs">
                  {lr.toFixed(2)}:1 ({getContrastGrade(lr).toUpperCase()})
                </span>
                <span className="font-mono text-[10px] sm:text-xs">
                  {dr.toFixed(2)}:1 ({getContrastGrade(dr).toUpperCase()})
                </span>
                <span
                  className={`text-xs font-semibold ${
                    ok ? "text-success" : "text-destructive"
                  }`}
                >
                  {ok ? "PASS" : "FAIL"}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Export gate:{" "}
        <span className="font-semibold">
          {state.report.exportReady ? "READY" : "BLOCKED — fix failing pairs above"}
        </span>
        .
      </p>
    </div>
  )
}
