import { useState } from "react"
import { useDesignTokens } from "@/lib/design-tokens-store"

type Slot = "display" | "body" | "mono"

const WEIGHTS = [
  { label: "Light", value: 300 },
  { label: "Regular", value: 400 },
  { label: "Medium", value: 500 },
  { label: "Semibold", value: 600 },
  { label: "Bold", value: 700 },
]

function SpecimenCard({
  slot,
  sample,
  sizeMultiplier = 1,
}: {
  slot: Slot
  sample: string
  sizeMultiplier?: number
}) {
  const state = useDesignTokens()
  const [overrideWeight, setOverrideWeight] = useState<number | null>(null)

  const themeWeight = state.fontCustomization[slot].weight
  const weight = overrideWeight ?? themeWeight
  const fontFamily = state.fonts[slot] ?? "Inter"
  const themeSize = state.fontCustomization[slot].size
  const size = slot === "display" ? themeSize * sizeMultiplier : themeSize
  const italic = state.fontCustomization[slot].italic
  const fontName = fontFamily.split(",")[0].replace(/['"]/g, "")

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p
            className="text-sm font-semibold capitalize text-foreground"
            style={{ fontFamily }}
          >
            {slot}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/70">
            {fontName} · {size}px / {weight}
            {italic ? " / italic" : ""}
            {overrideWeight !== null ? " (override)" : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1">
          {WEIGHTS.map((w) => {
            const active = weight === w.value
            return (
              <button
                key={w.value}
                onClick={() =>
                  setOverrideWeight(overrideWeight === w.value ? null : w.value)
                }
                className={`rounded-md px-2 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                aria-pressed={active}
              >
                {w.label}
              </button>
            )
          })}
        </div>
      </div>
      <p
        className="text-foreground"
        style={{
          fontFamily,
          fontSize: `${size}px`,
          fontWeight: weight,
          fontStyle: italic ? "italic" : "normal",
          lineHeight: 1.3,
        }}
      >
        {sample}
      </p>
    </div>
  )
}

export default function TypographySection() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Three slots — display, body, mono — each rendered with the live font
        family, size, and weight from the theme. Pick a weight to preview
        alternatives; click the active weight to clear.
      </p>
      <div className="space-y-4">
        <SpecimenCard
          slot="display"
          sizeMultiplier={1.5}
          sample="Design Specs"
        />
        <SpecimenCard
          slot="body"
          sample="The quick brown fox jumps over the lazy dog. 0123456789"
        />
        <SpecimenCard
          slot="mono"
          sample='const greeting = "Hello, world!";'
        />
      </div>
    </div>
  )
}
