import { CaretDown, MagicWand, X } from "@phosphor-icons/react"
import { useDesignTokens, useDesignTokensDispatch } from "@/lib/design-tokens-store"
import { getPresetById } from "@/lib/style-preset-presets"
import ColorSection, { ColorAdvancedSettings } from "./color-section"
import FontSection, { FontAdvancedSettings } from "./font-section"
import StylePresetRow from "./style-preset-row"
import type { DrawerContext, DrawerType } from "./drawer-sheet"

export default function LeftPanel({
  onClose,
  onOpenDrawer,
}: {
  onClose?: () => void
  onOpenDrawer?: (type: DrawerType, context?: DrawerContext) => void
}) {
  const dispatch = useDesignTokensDispatch()
  const state = useDesignTokens()
  const activePreset = getPresetById(state.stylePreset.activePreset)

  const expectedIntent = (() => {
    const harmony = activePreset?.colorRules.defaultHarmony
    if (harmony === "shadcn" || harmony === "monochromatic") return "neutral"
    if (harmony === "analogous" || harmony === "analogous-accent") return "subtle"
    return "expressive"
  })()

  const hasTokenOverrides =
    Object.keys(state.recipe.overrides.light).length > 0 ||
    Object.keys(state.recipe.overrides.dark).length > 0 ||
    Object.keys(state.recipe.overrides.states).length > 0
  const expectedTypeScale = (() => {
    const displaySize = activePreset?.typography.scale.display.size ?? 48
    if (displaySize <= 44) return "compact"
    if (displaySize >= 56) return "editorial"
    return "balanced"
  })()
  const hasFontOverrides =
    state.typeScaleId !== expectedTypeScale ||
    Object.values(state.fontCustomizationOverridden).some(Boolean)
  const hasAdvancedChanges =
    hasTokenOverrides || hasFontOverrides || state.colorIntent !== expectedIntent

  const openColor = (
    key: string,
    label: string,
    type?: "light" | "dark" | "states",
  ) => {
    onOpenDrawer?.("color", {
      colorKey: key,
      colorLabel: label,
      colorTokenType: type,
    })
  }

  const openFont = (slot: "display" | "body" | "mono") => {
    onOpenDrawer?.("typography", { fontSlot: slot })
  }

  return (
    <aside className="flex h-full min-h-0 flex-col bg-tool-panel">
      <div className="flex h-[var(--tool-bar-height)] shrink-0 items-center border-b border-border px-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Theme recipe</p>
          <p className="truncate text-[11px] text-muted-foreground">Pick three things. We build the system.</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inspector"
            className="ml-auto flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div aria-label="Theme recipe" className="space-y-3">
          <StylePresetRow onClick={() => onOpenDrawer?.("style")} />
          <ColorSection onOpenDrawer={openColor} />
          <FontSection />
        </div>

        <details className="group mt-4 rounded-xl border border-border bg-surface-control">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Advanced settings
            {hasAdvancedChanges && (
              <span className="rounded-md bg-accent px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent-foreground">
                Modified
              </span>
            )}
            <CaretDown className="ml-auto size-3.5 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <div className="space-y-6 border-t border-border px-3 py-4">
            <ColorAdvancedSettings onOpenDrawer={openColor} />
            <div className="border-t border-border" />
            <FontAdvancedSettings onOpenDrawer={openFont} />
          </div>
        </details>
      </div>

      <div className="shrink-0 border-t border-border p-3">
        <button
          type="button"
          onClick={() => dispatch({ type: "RANDOMIZE_ALL" })}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-control px-3 text-xs font-semibold text-foreground transition-colors hover:border-border-strong hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MagicWand className="size-4" />
          Surprise me
        </button>
      </div>
    </aside>
  )
}
