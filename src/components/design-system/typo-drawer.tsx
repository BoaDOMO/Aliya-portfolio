import { useState } from "react"
import { CheckCircle, X } from "@phosphor-icons/react"
import { useDesignTokens, useDesignTokensDispatch } from "@/lib/design-tokens-store"
import { getFontDefinition } from "@/lib/google-fonts"
import type { DrawerContext } from "./drawer-sheet"
import FontBrowserModal from "./font-browser-modal"

export default function TypoDrawer({
  context,
  onClose,
}: {
  context?: DrawerContext
  onClose: () => void
}) {
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()
  const slot = context?.fontSlot ?? "display"
  const family = state.fonts[slot]
  const font = getFontDefinition(family)
  const [showBrowser, setShowBrowser] = useState(false)
  const slotLabel = slot === "mono" ? "Data" : slot.charAt(0).toUpperCase() + slot.slice(1)
  const sample = slot === "display"
    ? "Ideas become systems."
    : slot === "body"
      ? "Good typography makes complex products feel calm and understandable."
      : "STATUS_READY · 12:42:08"

  const handleFontChange = (nextFamily: string) => {
    const type = slot === "display"
      ? "SET_DISPLAY_FONT"
      : slot === "body"
        ? "SET_BODY_FONT"
        : "SET_MONO_FONT"
    dispatch({ type, payload: nextFamily })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <div>
          <p className="text-sm font-semibold text-foreground">{slotLabel} typeface</p>
          <p className="text-[10px] text-muted-foreground">Choose a family for this semantic role</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close typography editor"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        <div
          className="rounded-2xl border border-border bg-surface-raised p-5"
          style={{ fontFamily: family ?? undefined }}
        >
          <p className={slot === "display" ? "text-4xl leading-tight" : slot === "body" ? "text-lg leading-relaxed" : "font-mono text-sm"}>
            {sample}
          </p>
          <p className="mt-5 text-xs opacity-60">{family}</p>
        </div>

        <button
          type="button"
          onClick={() => setShowBrowser(true)}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span>
            <span className="block text-xs font-semibold text-foreground">Browse curated fonts</span>
            <span className="mt-0.5 block text-[10px] text-muted-foreground">Every option is previewed and loadable</span>
          </span>
          <span className="text-xs font-semibold text-primary">Change</span>
        </button>

        {font && (
          <div className="space-y-3 rounded-xl border border-border bg-background p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-success" weight="fill" />
              <span className="text-xs font-semibold text-foreground">Available variants</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {font.weights.map((weight) => (
                <span key={weight} className="rounded-md bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground">
                  {weight}
                </span>
              ))}
              {font.italic && (
                <span className="rounded-md bg-muted px-2 py-1 text-[10px] italic text-muted-foreground">
                  Italic
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <FontBrowserModal
        open={showBrowser}
        onOpenChange={setShowBrowser}
        onSelect={(selected) => handleFontChange(selected.family)}
        preferredCategory={slot === "mono" ? "monospace" : slot === "body" ? "sans-serif" : undefined}
      />
    </div>
  )
}
