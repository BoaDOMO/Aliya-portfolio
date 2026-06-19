import { useState } from "react"
import { useDesignTokens, useDesignTokensDispatch } from "@/lib/design-tokens-store"
import type { DrawerContext } from "./drawer-sheet"
import { XIcon } from "lucide-react"
import FontBrowserModal from "./font-browser-modal"
import { injectFontLink, removeFontLink } from "@/lib/google-fonts"

const WEIGHT_OPTIONS = [
  { value: 300, label: "Light" },
  { value: 400, label: "Regular" },
  { value: 500, label: "Medium" },
  { value: 600, label: "Semi Bold" },
  { value: 700, label: "Bold" },
  { value: 800, label: "Extra Bold" },
  { value: 900, label: "Black" },
]

function Label({ children }: { children: string }) {
  return <span className="text-xs font-semibold text-foreground">{children}</span>
}

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
  const font = state.fonts[slot]
  const customization = state.fontCustomization[slot]
  const [showBrowser, setShowBrowser] = useState(false)

  const handleFontChange = (family: string) => {
    const prev = state.fonts[slot]
    if (prev) removeFontLink(prev)
    injectFontLink(family)
    const actionType = slot === "display" ? "SET_DISPLAY_FONT" as const
      : slot === "body" ? "SET_BODY_FONT" as const
      : "SET_MONO_FONT" as const
    dispatch({ type: actionType, payload: family })
  }

  const slotLabel = slot.charAt(0).toUpperCase() + slot.slice(1)

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-bold">{slotLabel}</span>
        <button
          onClick={onClose}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <XIcon className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div className="space-y-2">
          <Label>Font</Label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBrowser(true)}
              className="flex-1 rounded-lg border bg-background px-3 py-2 text-xs text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span className="truncate block" style={{ fontFamily: font ?? undefined }}>
                {font ?? `Select ${slotLabel}...`}
              </span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Size</Label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={10}
              max={96}
              step={1}
              value={customization.size}
              onChange={(e) => dispatch({ type: "SET_FONT_SIZE", payload: { slot, value: parseInt(e.target.value) } })}
              className="flex-1 h-1.5 rounded-full appearance-none bg-muted cursor-pointer accent-foreground [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:shadow-sm"
            />
            <span className="w-10 text-right text-xs font-mono text-muted-foreground">{customization.size}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Weight</Label>
          <div className="flex flex-wrap gap-1.5">
            {WEIGHT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => dispatch({ type: "SET_FONT_WEIGHT", payload: { slot, value: opt.value } })}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                  customization.weight === opt.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground bg-muted/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Style</Label>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch({ type: "SET_FONT_STYLE", payload: { slot, value: "normal" } })}
              className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                !customization.italic
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted"
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => dispatch({ type: "SET_FONT_STYLE", payload: { slot, value: "italic" } })}
              className={`flex-1 rounded-lg border py-2 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                customization.italic
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted"
              }`}
              style={{ fontStyle: "italic" }}
            >
              Italic
            </button>
          </div>
        </div>
      </div>

      <FontBrowserModal
        open={showBrowser}
        onOpenChange={setShowBrowser}
        onSelect={(f) => handleFontChange(f.family)}
      />
    </div>
  )
}
