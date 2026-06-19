import { useState, useEffect, useCallback } from "react"
import {
  useDesignTokens,
  useDesignTokensDispatch,
} from "@/lib/design-tokens-store"
import {
  SMART_PAIRINGS,
  injectFontLink,
  removeFontLink,
  randomFont,
  type FontPairing,
} from "@/lib/google-fonts"
import { Shuffle, ChevronDown } from "lucide-react"

function SmartPairingDropdown({
  activePair,
  onChange,
}: {
  activePair: FontPairing | null
  onChange: (pair: FontPairing) => void
}) {
  const [open, setOpen] = useState(false)
  const [dropdownRef, setDropdownRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [dropdownRef])

  return (
    <div ref={setDropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-lg border bg-background px-3 py-2 text-left text-xs focus-visible:ring-2 focus-visible:ring-ring outline-none"
      >
        <span className="flex-1 font-medium text-foreground">
          {activePair?.label ?? "Smart Pairings"}
        </span>
        <span className="text-muted-foreground/60 text-[10px] truncate max-w-[120px]">
          {activePair?.display} · {activePair?.body}
        </span>
        <ChevronDown className={`size-3 text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-20 w-full rounded-lg border border-border bg-card p-1 shadow-lg max-h-60 overflow-y-auto">
          {SMART_PAIRINGS.map((pair) => (
            <button
              key={pair.label}
              onClick={() => { onChange(pair); setOpen(false) }}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs transition-colors ${
                activePair?.label === pair.label ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="font-semibold w-24 truncate">{pair.label}</span>
              <span className="text-muted-foreground/60 truncate" style={{ fontFamily: pair.display }}>{pair.display}</span>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-muted-foreground/60 truncate" style={{ fontFamily: pair.body }}>{pair.body}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function FontSlotCard({
  slot,
  label,
  font,
  onRandomize,
  onClick,
}: {
  slot: "display" | "body" | "mono"
  label: string
  font: string | null
  onRandomize: () => void
  onClick: () => void
}) {
  const previewText = slot === "display" ? "Aa" : "The quick brown fox"
  const previewSize = slot === "display" ? "text-4xl" : slot === "body" ? "text-base" : "text-sm"
  const fontFamily = font ?? "Inter"

  return (
    <div className="relative rounded-xl border bg-card/50 p-4 transition-all hover:border-primary/30 hover:shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{label}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onRandomize() }}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          title={`Random ${label}`}
        >
          <Shuffle className="size-3.5" />
        </button>
      </div>
      <button onClick={onClick} className="w-full text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded">
        <p className={`${previewSize} leading-tight truncate`} style={{ fontFamily }}>
          {previewText}
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1 truncate" style={{ fontFamily }}>
          {font ?? `Select ${label}...`}
        </p>
      </button>
    </div>
  )
}

export default function FontSection({
  onOpenDrawer,
}: {
  onOpenDrawer?: (slot: "display" | "body" | "mono") => void
}) {
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()

  const hasApiKey = Boolean(import.meta.env.VITE_GOOGLE_FONTS_API_KEY)

  const activePair = SMART_PAIRINGS.find(
    (p) =>
      state.fonts.display === p.display &&
      state.fonts.body === p.body &&
      state.fonts.mono === p.mono
  ) ?? null

  const handleSlotChange = useCallback(
    (slot: "display" | "body" | "mono", family: string) => {
      const prev = state.fonts[slot]
      if (prev) removeFontLink(prev)
      injectFontLink(family)
      const actionType =
        slot === "display"
          ? "SET_DISPLAY_FONT"
          : slot === "body"
            ? "SET_BODY_FONT"
            : "SET_MONO_FONT"
      dispatch({ type: actionType, payload: family } as never)
    },
    [dispatch, state.fonts]
  )

  const handlePairClick = (pair: FontPairing) => {
    handleSlotChange("display", pair.display)
    handleSlotChange("body", pair.body)
    handleSlotChange("mono", pair.mono)
  }

  useEffect(() => {
    const { display, body, mono } = state.fonts
    if (display) injectFontLink(display)
    if (body) injectFontLink(body)
    if (mono) injectFontLink(mono)
  }, [])

  const slots: { slot: "display" | "body" | "mono"; label: string; category: string }[] = [
    { slot: "display", label: "Display", category: "display" },
    { slot: "body", label: "Body", category: "sans-serif" },
    { slot: "mono", label: "Mono", category: "monospace" },
  ]

  return (
    <div className="space-y-5">
      {!hasApiKey && (
        <p className="rounded-lg bg-warning/10 px-3 py-2 text-xs text-warning">
          Limited to 40 bundled fonts. Add Google Fonts API Key to unlock 1500+.
        </p>
      )}

      <div className="space-y-2">
        <span className="text-xs font-semibold text-foreground">Smart Pairings</span>
        <SmartPairingDropdown activePair={activePair} onChange={handlePairClick} />
      </div>

      <div className="space-y-3">
        {slots.map(({ slot, label, category }) => (
          <FontSlotCard
            key={slot}
            slot={slot}
            label={label}
            font={state.fonts[slot]}
            onRandomize={() => {
              const rf = randomFont(category)
              handleSlotChange(slot, rf.family)
            }}
            onClick={() => onOpenDrawer?.(slot)}
          />
        ))}
      </div>
    </div>
  )
}
