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
      type="button"
      onClick={onClick}
      className="group flex min-h-24 w-full items-start gap-3 rounded-xl border border-border bg-surface-control p-3.5 text-left transition-colors hover:border-border-strong hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted font-mono text-[10px] font-semibold text-muted-foreground">
        01
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold text-muted-foreground">
          Pick a style
        </span>
        <span className="mt-1 block text-sm font-semibold text-foreground">
          {preset?.name ?? "Flat"}
        </span>
        <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
          {preset?.description ?? "Clean, modern, and focused."}
        </span>
      </span>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground">
        <CaretRight className="size-4" />
      </span>
    </button>
  )
}
