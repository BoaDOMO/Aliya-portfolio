import { useState, useRef, useEffect } from "react"
import { useDesignTokens, useDesignTokensDispatch } from "@/lib/design-tokens-store"
import type { HarmonyType } from "@/lib/color-utils"
import { generateHarmony, generateShadeScale, computeForeground } from "@/lib/color-utils"
import { ChevronDown, Shuffle } from "lucide-react"

const HARMONIES: { value: HarmonyType; label: string }[] = [
  { value: "shadcn", label: "shadcn" },
  { value: "monochromatic", label: "Mono" },
  { value: "analogous", label: "Analogous" },
  { value: "complementary", label: "Complement" },
  { value: "split-complementary", label: "Split" },
  { value: "triadic", label: "Triadic" },
  { value: "compound", label: "Compound" },
  { value: "tetradic", label: "Tetradic" },
  { value: "double-complementary", label: "Double" },
  { value: "golden-ratio", label: "Golden" },
  { value: "near-complementary", label: "Near" },
  { value: "pentadic", label: "Pentadic" },
  { value: "analogous-accent", label: "Analogous Accent" },
]

function HarmonyDropdown({
  primary,
  active,
  onChange,
}: {
  primary: string
  active: HarmonyType
  onChange: (v: HarmonyType) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const activeHarmony = HARMONIES.find((h) => h.value === active)!

  function stripPreview(type: HarmonyType) {
    const h = generateHarmony(primary, type)
    return h.palette.slice(0, 4)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-lg border bg-background px-3 py-2 text-left text-xs focus-visible:ring-2 focus-visible:ring-ring outline-none"
      >
        <div className="flex h-5 flex-1 gap-0.5 rounded overflow-hidden">
          {stripPreview(active).map((c, i) => (
            <div key={i} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="font-medium text-foreground">{activeHarmony?.label ?? "Harmony"}</span>
        <ChevronDown className={`size-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-20 w-full rounded-lg border border-border bg-card p-1 shadow-lg">
          {HARMONIES.map((h) => (
            <button
              key={h.value}
              onClick={() => { onChange(h.value); setOpen(false) }}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors ${
                active === h.value ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <div className="flex h-5 flex-1 gap-0.5 rounded overflow-hidden">
                {stripPreview(h.value).map((c, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="font-medium">{h.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function PaletteCard({
  color,
  label,
  shadeIndex,
  onClick,
}: {
  color: string
  label: string
  shadeIndex?: number | null
  onClick: () => void
}) {
  const fg = computeForeground(color)
  const scale = generateShadeScale(color)
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-1 flex-col items-center gap-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <div
        className="flex w-full flex-col items-center justify-center rounded-lg border py-4 text-center transition-all group-hover:scale-[1.02] group-hover:shadow-sm group-focus-visible:scale-[1.02] group-focus-visible:shadow-sm overflow-hidden relative"
        style={{ backgroundColor: color, color: fg }}
      >
        {shadeIndex != null && (
          <span className="absolute top-1 right-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-bold font-mono text-foreground leading-none shadow-sm">
            {shadeIndex}
          </span>
        )}
        <span className="font-mono text-[11px] opacity-70 leading-none">{color}</span>
      </div>
      <div className="flex h-1 w-full gap-px overflow-hidden rounded-sm">
        {scale.slice(1, -1).map((s, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{ backgroundColor: s }} />
        ))}
      </div>
      <span className="text-xs font-medium text-center text-foreground">{label}</span>
    </button>
  )
}

function ColorPair({
  color,
  fgColor,
  label,
  shadeIndex,
  onClickColor,
  onClickFg,
}: {
  color: string
  fgColor?: string
  label: string
  shadeIndex?: number | null
  onClickColor: () => void
  onClickFg?: () => void
}) {
  const scale = generateShadeScale(color)
  return (
    <div className="relative flex flex-1 flex-col items-center gap-1">
      <div className="flex w-full gap-1.5">
        <button
          onClick={onClickColor}
          className="group relative flex flex-1 flex-col items-center justify-center rounded-lg border py-3.5 text-center transition-all hover:scale-[1.02] hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none overflow-hidden"
          style={{ backgroundColor: color, color: computeForeground(color) }}
        >
          {shadeIndex != null && (
            <span className="absolute top-1 right-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-bold font-mono text-foreground leading-none shadow-sm">
              {shadeIndex}
            </span>
          )}
          <span className="font-mono text-[11px] opacity-70 leading-none">{color}</span>
        </button>
        {fgColor && onClickFg && (
          <button
            onClick={onClickFg}
            className="group relative flex w-14 shrink-0 flex-col items-center justify-center rounded-lg border py-3.5 text-center transition-all hover:scale-[1.05] hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none overflow-hidden"
            style={{ backgroundColor: fgColor, color: computeForeground(fgColor) }}
          >
            <span className="text-[10px] font-semibold uppercase leading-none opacity-70">A</span>
            <span className="font-mono text-[9px] opacity-50 leading-none mt-1">{fgColor}</span>
          </button>
        )}
      </div>
      <div className="flex h-1 w-full gap-px overflow-hidden rounded-sm">
        {scale.slice(1, -1).map((s, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{ backgroundColor: s }} />
        ))}
      </div>
      <span className="text-xs font-medium text-center text-foreground">{label}</span>
    </div>
  )
}

export default function ColorSection({
  onOpenDrawer,
}: {
  onOpenDrawer?: (key: string, label: string, type?: "light" | "dark" | "states") => void
}) {
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()
  const { light, dark, states } = state.tokens
  const tokens = state.previewMode === "dark" ? dark : light
  const mode = state.previewMode === "dark" ? "dark" : "light"

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Harmony</span>
          <button
            onClick={() => dispatch({ type: "SHUFFLE_HARMONY" })}
            className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="New primary color, same harmony"
          >
            <Shuffle className="size-3.5" />
          </button>
        </div>
        <HarmonyDropdown
          primary={tokens.primary}
          active={state.harmonyType}
          onChange={(v) => dispatch({ type: "SET_HARMONY_TYPE", payload: v })}
        />
      </div>

      <div className="space-y-3">
        <span className="text-xs font-semibold text-foreground">Core Palette</span>
        <div className="grid grid-cols-2 gap-3">
          <ColorPair
            color={tokens.primary}
            fgColor={tokens["primary-foreground"]}
            label="Primary"
            shadeIndex={state.shadeMeta.primary}
            onClickColor={() => onOpenDrawer?.("primary", "Primary", mode)}
            onClickFg={() => onOpenDrawer?.("primary-foreground", "Primary Foreground", mode)}
          />
          <ColorPair
            color={tokens.secondary}
            fgColor={tokens["secondary-foreground"]}
            label="Secondary"
            shadeIndex={state.shadeMeta.secondary}
            onClickColor={() => onOpenDrawer?.("secondary", "Secondary", mode)}
            onClickFg={() => onOpenDrawer?.("secondary-foreground", "Secondary Foreground", mode)}
          />
          <ColorPair
            color={tokens.accent}
            fgColor={tokens["accent-foreground"]}
            label="Accent"
            shadeIndex={state.shadeMeta.accent}
            onClickColor={() => onOpenDrawer?.("accent", "Accent", mode)}
            onClickFg={() => onOpenDrawer?.("accent-foreground", "Accent Foreground", mode)}
          />
          <ColorPair
            color={tokens.muted}
            fgColor={tokens["muted-foreground"]}
            label="Muted"
            shadeIndex={state.shadeMeta.muted}
            onClickColor={() => onOpenDrawer?.("muted", "Muted", mode)}
            onClickFg={() => onOpenDrawer?.("muted-foreground", "Muted Foreground", mode)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-semibold text-foreground">Neutrals</span>
        <div className="grid grid-cols-2 gap-3">
          <ColorPair
            color={tokens.background}
            fgColor={tokens.foreground}
            label="Background"
            shadeIndex={state.shadeMeta.background}
            onClickColor={() => onOpenDrawer?.("background", "Background", mode)}
            onClickFg={() => onOpenDrawer?.("foreground", "Foreground", mode)}
          />
          <ColorPair
            color={tokens.card}
            fgColor={tokens["card-foreground"]}
            label="Card"
            shadeIndex={state.shadeMeta.card}
            onClickColor={() => onOpenDrawer?.("card", "Card", mode)}
            onClickFg={() => onOpenDrawer?.("card-foreground", "Card Foreground", mode)}
          />
          <ColorPair
            color={tokens.popover}
            fgColor={tokens["popover-foreground"]}
            label="Popover"
            shadeIndex={state.shadeMeta.popover}
            onClickColor={() => onOpenDrawer?.("popover", "Popover", mode)}
            onClickFg={() => onOpenDrawer?.("popover-foreground", "Popover Foreground", mode)}
          />
          <PaletteCard
            color={tokens.border as string}
            label="Border"
            onClick={() => onOpenDrawer?.("border", "Border", mode)}
          />
          <PaletteCard
            color={tokens.input as string}
            label="Input"
            onClick={() => onOpenDrawer?.("input", "Input", mode)}
          />
          <PaletteCard
            color={tokens.ring as string}
            label="Ring"
            onClick={() => onOpenDrawer?.("ring", "Ring", mode)}
          />
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-semibold text-foreground">State Colors</span>
        <div className="grid grid-cols-2 gap-3">
          <ColorPair
            color={states.success}
            fgColor={states["success-foreground"]}
            label="Success"
            onClickColor={() => onOpenDrawer?.("success", "Success", "states")}
            onClickFg={() => onOpenDrawer?.("success-foreground", "Success Foreground", "states")}
          />
          <ColorPair
            color={states.warning}
            fgColor={states["warning-foreground"]}
            label="Warning"
            onClickColor={() => onOpenDrawer?.("warning", "Warning", "states")}
            onClickFg={() => onOpenDrawer?.("warning-foreground", "Warning Foreground", "states")}
          />
          <ColorPair
            color={states.destructive}
            fgColor={states["destructive-foreground"]}
            label="Destructive"
            onClickColor={() => onOpenDrawer?.("destructive", "Destructive", "states")}
            onClickFg={() => onOpenDrawer?.("destructive-foreground", "Destructive Foreground", "states")}
          />
          <ColorPair
            color={states.info}
            fgColor={states["info-foreground"]}
            label="Info"
            onClickColor={() => onOpenDrawer?.("info", "Info", "states")}
            onClickFg={() => onOpenDrawer?.("info-foreground", "Info Foreground", "states")}
          />
        </div>
      </div>
    </div>
  )
}
