import { RADIUS_SCALE, RADIUS_CSS_MAP } from "@/lib/style-preset-utils"
import { useDesignTokens } from "@/lib/design-tokens-store"

const SPACING_TOKENS = [
  { token: "--spacing(0.5)", px: "2px", size: 0.5 },
  { token: "--spacing(1)", px: "4px", size: 1 },
  { token: "--spacing(2)", px: "8px", size: 2 },
  { token: "--spacing(3)", px: "12px", size: 3 },
  { token: "--spacing(4)", px: "16px", size: 4 },
  { token: "--spacing(5)", px: "20px", size: 5 },
  { token: "--spacing(6)", px: "24px", size: 6 },
  { token: "--spacing(8)", px: "32px", size: 8 },
  { token: "--spacing(10)", px: "40px", size: 10 },
  { token: "--spacing(12)", px: "48px", size: 12 },
  { token: "--spacing(16)", px: "64px", size: 16 },
]

export default function SpacingSection() {
  const state = useDesignTokens()
  const preset = state.stylePreset.activePreset

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Density, spacing scale, and border radius — the three pieces that govern
        layout rhythm.
      </p>

      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Density
        </p>
        <p className="font-mono text-xs text-foreground">
          {preset} · spacing-scale = 1.0 · paragraph-spacing = 1.0
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Spacing scale
        </p>
        <div className="space-y-2">
          {SPACING_TOKENS.map((s) => (
            <div key={s.token} className="flex items-center gap-4">
              <div className="w-32 shrink-0">
                <p className="font-mono text-xs font-medium text-foreground">{s.token}</p>
                <p className="text-[8px] text-muted-foreground/60">{s.px}</p>
              </div>
              <div
                className="h-5 rounded bg-primary/20 ring-1 ring-primary/30"
                style={{ width: `${s.size * 4}px` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Border radius
        </p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {RADIUS_SCALE.map(({ token, value }) => (
            <div
              key={token}
              className="border border-border bg-card p-3 transition-all"
              style={{ borderRadius: RADIUS_CSS_MAP[token] }}
            >
              <p className="text-xs font-semibold text-foreground">{token}</p>
              <p className="mt-0.5 break-all text-[10px] text-muted-foreground/70">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
