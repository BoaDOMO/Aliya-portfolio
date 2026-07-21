import { MagicWand, X } from "@phosphor-icons/react"
import { useDesignTokensDispatch } from "@/lib/design-tokens-store"
import ColorSection from "./color-section"
import FontSection from "./font-section"
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
    <aside className="flex h-full min-h-0 flex-col bg-background">
      <div className="flex h-14 shrink-0 items-center border-b border-border px-4">
        <div>
          <p className="text-sm font-semibold text-foreground">Build your theme</p>
          <p className="text-[11px] text-muted-foreground">Three decisions, one coherent system</p>
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: "RANDOMIZE_ALL" })}
          className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-surface-raised px-2.5 text-[11px] font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MagicWand className="size-3.5" />
          Surprise me
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inspector"
            className="ml-1 flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <section aria-labelledby="style-heading" className="space-y-3 border-b border-border px-4 py-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">01 · Foundation</p>
            <h2 id="style-heading" className="mt-1 text-sm font-semibold text-foreground">Choose a style</h2>
          </div>
          <StylePresetRow onClick={() => onOpenDrawer?.("style")} />
        </section>

        <section aria-labelledby="colors-heading" className="space-y-4 border-b border-border px-4 py-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">02 · Color</p>
            <h2 id="colors-heading" className="mt-1 text-sm font-semibold text-foreground">Set the visual tone</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Start with one brand color. Semantic roles stay generated and accessible.</p>
          </div>
          <ColorSection onOpenDrawer={openColor} />
        </section>

        <section aria-labelledby="typography-heading" className="space-y-4 px-4 py-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">03 · Typography</p>
            <h2 id="typography-heading" className="mt-1 text-sm font-semibold text-foreground">Choose roles and rhythm</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Pair fonts by purpose, then tune the complete scale at once.</p>
          </div>
          <FontSection onOpenDrawer={openFont} />
        </section>
      </div>
    </aside>
  )
}
