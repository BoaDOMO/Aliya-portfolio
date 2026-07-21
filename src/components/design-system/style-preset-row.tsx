import { CaretRight } from "@phosphor-icons/react"
import { useDesignTokens } from "@/lib/design-tokens-store"
import { getPresetById } from "@/lib/style-preset-presets"

export default function StylePresetRow({
  onClick,
}: {
  onClick: () => void
}) {
  const state = useDesignTokens()
  const preset = getPresetById(state.stylePreset.activePreset)

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Style
        </p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">
          {preset?.name ?? "Flat"}
        </p>
      </div>
      <CaretRight className="size-4 text-muted-foreground" />
    </button>
  )
}
