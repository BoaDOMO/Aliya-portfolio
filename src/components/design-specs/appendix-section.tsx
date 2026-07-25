import { useDesignTokens } from "@/lib/design-tokens-store"
import { getPresetById } from "@/lib/style-preset-presets"
import { Link } from "react-router-dom"

export default function AppendixSection() {
  const state = useDesignTokens()
  const preset = getPresetById(state.stylePreset.activePreset)

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Quick links to the four export formats. The full theme is available in
        the Design System under Export.
      </p>
      <ul className="space-y-2 text-sm">
        <li>
          <Link to="/design-studio" className="text-primary hover:underline">
            → Open Design System to copy AI Context, Tailwind v4, Plain CSS, or theme.json
          </Link>
        </li>
      </ul>
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Style preset
        </p>
        <pre className="whitespace-pre-wrap break-words font-mono text-[11px] text-foreground">
{JSON.stringify(
  preset && {
    id: preset.id,
    name: preset.name,
    harmonyPolicy: {
      allowedHarmonies: preset.colorRules.allowedHarmonies,
      defaultHarmony: preset.colorRules.defaultHarmony,
    },
    typography: {
      display: preset.typography.displayFont,
      body: preset.typography.bodyFont,
      mono: preset.typography.monoFont,
      density: preset.typography.density,
      paragraphSpacing: preset.typography.paragraphSpacing,
    },
  },
  null,
  2
)}
        </pre>
      </div>
    </div>
  )
}
