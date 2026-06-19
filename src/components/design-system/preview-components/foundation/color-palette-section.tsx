import { useDesignTokens } from "@/lib/design-tokens-store"
import { toast } from "sonner"
import { useCallback } from "react"

interface Swatch {
  label: string
  token: string
  color: string
  foreground: string
}

function SwatchCard({ swatch }: { swatch: Swatch }) {
  const handleClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(swatch.color)
      toast.success(`Copied ${swatch.token}: ${swatch.color}`)
    } catch {
      toast.error("Failed to copy")
    }
  }, [swatch])

  return (
    <button
      onClick={handleClick}
      className="group flex flex-col gap-2 rounded-xl border border-border p-3 text-left transition-all hover:shadow-md active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <div
        className="h-16 w-full rounded-lg ring-1 ring-foreground/10"
        style={{ backgroundColor: swatch.color }}
      />
      <div className="space-y-0.5">
        <p className="text-xs font-semibold text-foreground">{swatch.label}</p>
        <p className="text-xs font-mono text-muted-foreground">{swatch.color}</p>
        <p className="text-[9px] font-mono text-muted-foreground/60">{swatch.token}</p>
      </div>
    </button>
  )
}

function SwatchGroup({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {swatches.map((s) => (
          <SwatchCard key={s.token} swatch={s} />
        ))}
      </div>
    </div>
  )
}

export default function ColorPaletteSection() {
  const state = useDesignTokens()
  const { light, states } = state.tokens

  const brandSwatches: Swatch[] = [
    { label: "Primary", token: "--primary", color: light.primary, foreground: light["primary-foreground"] },
    { label: "Secondary", token: "--secondary", color: light.secondary, foreground: light["secondary-foreground"] },
    { label: "Accent", token: "--accent", color: light.accent, foreground: light["accent-foreground"] },
  ]

  const surfaceSwatches: Swatch[] = [
    { label: "Background", token: "--background", color: light.background, foreground: light.foreground },
    { label: "Foreground", token: "--foreground", color: light.foreground, foreground: light.background },
    { label: "Card", token: "--card", color: light.card, foreground: light["card-foreground"] },
    { label: "Muted", token: "--muted", color: light.muted, foreground: light["muted-foreground"] },
    { label: "Border", token: "--border", color: light.border, foreground: light.foreground },
    { label: "Input", token: "--input", color: light.input, foreground: light.foreground },
  ]

  const semanticSwatches: Swatch[] = [
    { label: "Success", token: "--success", color: states.success, foreground: states["success-foreground"] },
    { label: "Warning", token: "--warning", color: states.warning, foreground: states["warning-foreground"] },
    { label: "Destructive", token: "--destructive", color: states.destructive, foreground: states["destructive-foreground"] },
    { label: "Info", token: "--info", color: states.info, foreground: states["info-foreground"] },
  ]

  return (
    <div className="space-y-8">
      <SwatchGroup title="Brand Colors" swatches={brandSwatches} />
      <SwatchGroup title="Surfaces" swatches={surfaceSwatches} />
      <SwatchGroup title="Semantic" swatches={semanticSwatches} />
    </div>
  )
}
