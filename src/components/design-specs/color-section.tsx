import { useDesignTokens } from "@/lib/design-tokens-store"
import { toast } from "sonner"
import { useCallback } from "react"

interface Swatch {
  label: string
  token: string
  light: string
  dark: string
  foreground?: { light: string; dark: string }
}

function SwatchRow({ swatch }: { swatch: Swatch }) {
  const handleCopy = useCallback(
    async (value: string, variant: "light" | "dark") => {
      try {
        await navigator.clipboard.writeText(value)
        toast.success(`Copied ${swatch.token} (${variant}): ${value}`)
      } catch {
        toast.error("Failed to copy")
      }
    },
    [swatch.token]
  )

  return (
    <div className="grid grid-cols-2 gap-2 border-b border-border/40 py-3 last:border-b-0 sm:grid-cols-[minmax(120px,1fr)_1fr_1fr] sm:items-center sm:gap-3 sm:py-2">
      <div className="col-span-2 min-w-0 sm:col-span-1">
        <p className="truncate text-xs font-mono font-semibold text-foreground">
          {swatch.token}
        </p>
        <p className="truncate text-[10px] text-muted-foreground">{swatch.label}</p>
      </div>
      <button
        onClick={() => handleCopy(swatch.light, "light")}
        className="group flex min-w-0 items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        aria-label={`Copy ${swatch.token} light`}
      >
        <span
          className="size-7 shrink-0 rounded border border-border/50 ring-1 ring-foreground/5"
          style={{ backgroundColor: swatch.light }}
        />
        <span className="truncate font-mono text-[11px] text-muted-foreground group-hover:text-foreground">
          {swatch.light}
        </span>
      </button>
      <button
        onClick={() => handleCopy(swatch.dark, "dark")}
        className="group flex min-w-0 items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        aria-label={`Copy ${swatch.token} dark`}
      >
        <span
          className="size-7 shrink-0 rounded border border-border/50 ring-1 ring-foreground/5"
          style={{ backgroundColor: swatch.dark }}
        />
        <span className="truncate font-mono text-[11px] text-muted-foreground group-hover:text-foreground">
          {swatch.dark}
        </span>
      </button>
    </div>
  )
}

function SwatchGroup({
  title,
  swatches,
}: {
  title: string
  swatches: Swatch[]
}) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-2 gap-2 bg-muted/30 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:grid-cols-[minmax(120px,1fr)_1fr_1fr] sm:gap-3">
          <span className="col-span-2 sm:col-span-1">Token</span>
          <span>Light</span>
          <span>Dark</span>
        </div>
        <div className="px-3">
          {swatches.map((s) => (
            <SwatchRow key={s.token} swatch={s} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ColorSection() {
  const state = useDesignTokens()
  const { light, dark, states } = state.tokens

  const brand: Swatch[] = [
    { label: "Primary", token: "--primary", light: light.primary, dark: dark.primary },
    {
      label: "Primary fg",
      token: "--primary-foreground",
      light: light["primary-foreground"],
      dark: dark["primary-foreground"],
    },
    { label: "Secondary", token: "--secondary", light: light.secondary, dark: dark.secondary },
    {
      label: "Secondary fg",
      token: "--secondary-foreground",
      light: light["secondary-foreground"],
      dark: dark["secondary-foreground"],
    },
    { label: "Accent", token: "--accent", light: light.accent, dark: dark.accent },
    {
      label: "Accent fg",
      token: "--accent-foreground",
      light: light["accent-foreground"],
      dark: dark["accent-foreground"],
    },
  ]

  const surface: Swatch[] = [
    { label: "Background", token: "--background", light: light.background, dark: dark.background },
    { label: "Foreground", token: "--foreground", light: light.foreground, dark: dark.foreground },
    { label: "Card", token: "--card", light: light.card, dark: dark.card },
    {
      label: "Card fg",
      token: "--card-foreground",
      light: light["card-foreground"],
      dark: dark["card-foreground"],
    },
    { label: "Popover", token: "--popover", light: light.popover, dark: dark.popover },
    {
      label: "Popover fg",
      token: "--popover-foreground",
      light: light["popover-foreground"],
      dark: dark["popover-foreground"],
    },
    { label: "Muted", token: "--muted", light: light.muted, dark: dark.muted },
    {
      label: "Muted fg",
      token: "--muted-foreground",
      light: light["muted-foreground"],
      dark: dark["muted-foreground"],
    },
  ]

  const borders: Swatch[] = [
    { label: "Border", token: "--border", light: light.border, dark: dark.border },
    { label: "Input", token: "--input", light: light.input, dark: dark.input },
    { label: "Ring", token: "--ring", light: light.ring, dark: dark.ring },
  ]

  const semantic: Swatch[] = [
    { label: "Destructive", token: "--destructive", light: states.destructive, dark: states.destructive },
    { label: "Success", token: "--success", light: states.success, dark: states.success },
    { label: "Warning", token: "--warning", light: states.warning, dark: states.warning },
    { label: "Info", token: "--info", light: states.info, dark: states.info },
  ]

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Every role token in the system, with light and dark values side by side.
        Click any swatch to copy the value.
      </p>
      <div className="space-y-5">
        <SwatchGroup title="Brand" swatches={brand} />
        <SwatchGroup title="Surfaces" swatches={surface} />
        <SwatchGroup title="Borders &amp; inputs" swatches={borders} />
        <SwatchGroup title="Semantic" swatches={semantic} />
      </div>
    </div>
  )
}
