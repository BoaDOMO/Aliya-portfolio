import { useState } from "react"
import { useDesignTokens } from "@/lib/design-tokens-store"

interface FontSpecimen {
  label: string
  size: string
  className: string
  weight: string
  tag: "h1" | "h2" | "h3" | "h4" | "body" | "small" | "caption"
}

const DISPLAY_SCALE: FontSpecimen[] = [
  { label: "Display H1", size: "2rem / 32px", className: "text-3xl font-bold leading-tight", weight: "Bold 700", tag: "h1" },
  { label: "Display H2", size: "1.5rem / 24px", className: "text-2xl font-semibold leading-snug", weight: "Semibold 600", tag: "h2" },
  { label: "Display H3", size: "1.25rem / 20px", className: "text-xl font-semibold leading-snug", weight: "Semibold 600", tag: "h3" },
  { label: "Display H4", size: "1.125rem / 18px", className: "text-lg font-semibold leading-snug", weight: "Semibold 600", tag: "h4" },
]

const BODY_SCALE: FontSpecimen[] = [
  { label: "Body", size: "0.875rem / 14px", className: "text-sm leading-relaxed", weight: "Regular 400", tag: "body" },
  { label: "Small", size: "0.75rem / 12px", className: "text-xs leading-relaxed", weight: "Regular 400", tag: "small" },
  { label: "Caption", size: "0.625rem / 10px", className: "text-[10px] leading-relaxed", weight: "Regular 400", tag: "caption" },
  { label: "Overline", size: "0.625rem / 10px", className: "text-[10px] font-semibold tracking-widest uppercase", weight: "Semibold 600", tag: "caption" },
]

const MONO_SCALE: FontSpecimen[] = [
  { label: "Mono Body", size: "0.8125rem / 13px", className: "text-[13px] leading-relaxed", weight: "Regular 400", tag: "body" },
  { label: "Mono Small", size: "0.6875rem / 11px", className: "text-[11px] leading-relaxed", weight: "Regular 400", tag: "small" },
  { label: "Mono Caption", size: "0.625rem / 10px", className: "text-[10px] leading-relaxed", weight: "Regular 400", tag: "caption" },
]

const WEIGHTS = [
  { label: "Light", value: 300 },
  { label: "Regular", value: 400 },
  { label: "Medium", value: 500 },
  { label: "Semibold", value: 600 },
  { label: "Bold", value: 700 },
]

function SpecimenCard({
  fontFamily,
  specimens,
}: {
  fontFamily: string
  specimens: FontSpecimen[]
}) {
  const [weight, setWeight] = useState(400)
  const fontName = fontFamily.split(",")[0].replace(/['"]/g, "")

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground" style={{ fontFamily }}>{fontName}</p>
          <p className="text-[10px] text-muted-foreground/60">{fontFamily}</p>
        </div>
        <div className="flex items-center gap-1">
          {WEIGHTS.map((w) => (
            <button
              key={w.value}
              onClick={() => setWeight(w.value)}
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                weight === w.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {specimens.map((s) => (
          <div key={s.label} className="flex items-baseline gap-4">
            <div className="w-28 shrink-0">
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <p className="text-[8px] text-muted-foreground/60">{s.size}</p>
            </div>
            <p
              className={`${s.className} text-foreground`}
              style={{ fontFamily, fontWeight: weight }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TypographySection() {
  const state = useDesignTokens()
  const { fonts } = state

  return (
    <div className="space-y-6">
      <SpecimenCard
        fontFamily={fonts.display ?? "Archivo Narrow"}
        specimens={DISPLAY_SCALE}
      />
      <SpecimenCard
        fontFamily={fonts.body ?? "Inter"}
        specimens={BODY_SCALE}
      />
      <SpecimenCard
        fontFamily={fonts.mono ?? "JetBrains Mono"}
        specimens={MONO_SCALE}
      />
    </div>
  )
}
