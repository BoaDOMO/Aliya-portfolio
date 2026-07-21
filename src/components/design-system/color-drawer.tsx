import { useState, useEffect, useRef, useCallback } from "react"
import { useDesignTokens, useDesignTokensDispatch } from "@/lib/design-tokens-store"
import { generateShadeScale, SHADE_STOPS, type ColorTokens, type StateColors } from "@/lib/color-utils"
import { hsv, formatHex } from "culori"
import { getContrastRatio } from "@/lib/contrast-utils"
import type { DrawerContext } from "./drawer-sheet"
import { X } from "@phosphor-icons/react"

const SURFACE_KEYS: Record<string, string | undefined> = {
  "primary-foreground": "primary",
  "secondary-foreground": "secondary",
  "accent-foreground": "accent",
  "muted-foreground": "muted",
  foreground: "background",
  "card-foreground": "card",
  "popover-foreground": "popover",
  "destructive-foreground": "destructive",
  "info-foreground": "info",
  "success-foreground": "success",
  "warning-foreground": "warning",
}

function SaturationCanvas({ hue, sat, val, onChange }: {
  hue: number; sat: number; val: number
  onChange: (s: number, v: number) => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const draw = useCallback(() => {
    const c = canvasRef.current
    const container = containerRef.current
    if (!c || !container) return
    const ctx = c.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = container.getBoundingClientRect()
    c.width = rect.width * dpr
    c.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width, h = rect.height
    const base = formatHex({ mode: "hsl", h: hue, s: 1, l: 0.5 })

    ctx.fillStyle = base; ctx.fillRect(0, 0, w, h)
    const wg = ctx.createLinearGradient(0, 0, w, 0)
    wg.addColorStop(0, "#fff"); wg.addColorStop(1, "transparent")
    ctx.fillStyle = wg; ctx.fillRect(0, 0, w, h)
    const bg = ctx.createLinearGradient(0, 0, 0, h)
    bg.addColorStop(0, "transparent"); bg.addColorStop(1, "#000")
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h)

    const cx = sat * w, cy = (1 - val) * h
    ctx.shadowColor = "rgba(0,0,0,0.15)"; ctx.shadowBlur = 4
    ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2)
    ctx.fillStyle = "#fff"; ctx.fill()
    ctx.shadowColor = "transparent"; ctx.shadowBlur = 0
    ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(0,0,0,0.15)"; ctx.lineWidth = 1.5; ctx.stroke()
  }, [hue, sat, val])

  const pos = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect()
    return {
      s: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
      v: 1 - Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
    }
  }

  const pd = (e: React.PointerEvent) => {
    isDragging.current = true
    canvasRef.current?.setPointerCapture(e.pointerId)
    const p = pos(e); onChange(p.s, p.v)
  }
  const pm = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const p = pos(e); onChange(p.s, p.v)
  }
  const pu = (e: React.PointerEvent) => {
    isDragging.current = false
    canvasRef.current?.releasePointerCapture(e.pointerId)
  }

  useEffect(() => { draw() }, [draw])
  useEffect(() => {
    const onResize = () => draw()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [draw])

  return (
    <div ref={containerRef} className="w-full h-36 rounded-lg ring-1 ring-border/50 shadow-sm overflow-hidden">
      <canvas
        ref={canvasRef}
        onPointerDown={pd} onPointerMove={pm} onPointerUp={pu}
        className="size-full cursor-crosshair outline-none"
        style={{ touchAction: "none" }}
      />
    </div>
  )
}

function HueStrip({ hue, onChange }: { hue: number; onChange: (h: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const getHue = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect()
    return Math.max(0, Math.min(360, ((e.clientX - r.left) / r.width) * 360))
  }

  const pd = (e: React.PointerEvent) => {
    isDragging.current = true
    ref.current?.setPointerCapture(e.pointerId)
    onChange(getHue(e))
  }
  const pm = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    onChange(getHue(e))
  }
  const pu = (e: React.PointerEvent) => {
    isDragging.current = false
    ref.current?.releasePointerCapture(e.pointerId)
  }

  return (
    <div
      ref={ref}
      onPointerDown={pd} onPointerMove={pm} onPointerUp={pu}
      className="relative w-full h-3 rounded-full cursor-ew-resize ring-1 ring-border/20"
      style={{
        background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
        touchAction: "none",
      }}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 size-5 rounded-full border-[3px] border-white shadow-lg ring-1 ring-black/10 bg-background pointer-events-none"
        style={{ left: `${(hue / 360) * 100}%`, marginLeft: "-10px" }}
      />
    </div>
  )
}

function ShadeBar({
  color,
  onSelect,
  activeStop,
  pairedSurfaceHex,
}: {
  color: string
  onSelect: (hex: string, stop: number) => void
  activeStop: number | null
  pairedSurfaceHex?: string
}) {
  const scale = generateShadeScale(color)

  return (
    <div className="space-y-2">
      <span className="text-xs font-semibold text-foreground">Shades</span>
      <div className="flex flex-col gap-0.5">
        {scale.map((hex, i) => {
          const stop = SHADE_STOPS[i]
          const isActive = activeStop === stop
          const ratio = pairedSurfaceHex ? getContrastRatio(hex, pairedSurfaceHex) : null
          return (
            <button
              key={stop}
              onClick={() => onSelect(hex, stop)}
              className={`flex items-center gap-3 rounded-md px-2 py-1.5 text-left transition-all hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                isActive ? "ring-2 ring-primary" : ""
              }`}
            >
              <div
                className="size-6 shrink-0 rounded border border-border/50"
                style={{ backgroundColor: hex }}
              />
              <span className={`font-mono text-xs w-8 ${isActive ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                {stop}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground flex-1">{hex}</span>
              {ratio !== null && (
                <span className={`text-[10px] font-semibold font-mono leading-none ${ratio >= 7 ? "text-green-600" : ratio >= 4.5 ? "text-green-600" : ratio >= 3 ? "text-amber-500" : "text-red-500"}`}>
                  {ratio.toFixed(1)}:1 {ratio >= 7 ? "(AAA)" : ratio >= 4.5 ? "(AA)" : ratio >= 3 ? "(AA?)" : "(FAIL)"}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function ColorDrawer({
  context,
  onClose,
}: {
  context?: DrawerContext
  onClose: () => void
}) {
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()
  const tokenType = context?.colorTokenType ?? "light"
  const key = context?.colorKey ?? "primary"
  const currentColor = tokenType === "states"
    ? state.tokens.states[key as keyof StateColors] ?? "#000000"
    : tokenType === "dark"
      ? state.tokens.dark[key as keyof ColorTokens] ?? "#000000"
      : state.tokens.light[key as keyof ColorTokens] ?? "#000000"

  // Derive paired surface hex for foreground drawers
  const surfaceKey = SURFACE_KEYS[key]
  const pairedSurfaceHex = surfaceKey
    ? tokenType === "states"
      ? state.tokens.states[surfaceKey as keyof StateColors]
      : tokenType === "dark"
        ? state.tokens.dark[surfaceKey as keyof ColorTokens]
        : state.tokens.light[surfaceKey as keyof ColorTokens]
    : undefined
  const [hexInput, setHexInput] = useState(currentColor)
  const [baseColor, setBaseColor] = useState(currentColor)
  const [draftColor, setDraftColor] = useState(currentColor)
  const [selectedStop, setSelectedStop] = useState<number | null>(
    state.shadeMeta[key] ?? null,
  )

  const [h, s, v] = (() => {
    try {
      const { h: hh, s: ss, v: vv } = hsv(baseColor)
      return [isNaN(hh) ? 0 : hh, isNaN(ss) ? 0 : ss, isNaN(vv) ? 1 : vv]
    } catch { return [0, 0, 1] }
  })()

  const scale = generateShadeScale(baseColor)
  const activeShadeIdx = scale.indexOf(draftColor)
  const activeStop = selectedStop ?? (activeShadeIdx >= 0 ? SHADE_STOPS[activeShadeIdx] : null)

  const updateDraft = (newHex: string) => {
    if (!/^#[0-9A-Fa-f]{6}$/.test(newHex)) return
    setHexInput(newHex)
    setDraftColor(newHex)
  }

  const handleCanvasChange = (sat: number, val: number) => {
    const newHex = formatHex({ mode: "hsv", h, s: sat, v: val })
    setBaseColor(newHex)
    updateDraft(newHex)
    setSelectedStop(null)
  }

  const handleHueChange = (newHue: number) => {
    const newHex = formatHex({ mode: "hsv", h: newHue, s, v })
    setBaseColor(newHex)
    updateDraft(newHex)
    setSelectedStop(null)
  }

  const handleHexSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
      setBaseColor(hexInput)
      updateDraft(hexInput)
      setSelectedStop(null)
    }
  }

  const handleHexBlur = () => {
    if (/^#[0-9A-Fa-f]{6}$/.test(hexInput)) {
      setBaseColor(hexInput)
      updateDraft(hexInput)
      setSelectedStop(null)
    } else {
      setHexInput(draftColor)
    }
  }

  const handleShadeSelect = (hex: string, stop: number) => {
    updateDraft(hex)
    setSelectedStop(stop)
  }

  const applyColor = () => {
    if (tokenType === "states") {
      dispatch({ type: "UPDATE_STATE_TOKEN", payload: { key: key as keyof StateColors, value: draftColor } })
    } else if (tokenType === "dark") {
      dispatch({ type: "UPDATE_DARK_TOKEN", payload: { key: key as keyof ColorTokens, value: draftColor } })
    } else if (key === "primary") {
      dispatch({ type: "SET_PRIMARY_COLOR", payload: draftColor })
    } else {
      dispatch({ type: "UPDATE_LIGHT_TOKEN", payload: { key: key as keyof ColorTokens, value: draftColor } })
    }
    dispatch({ type: "UPDATE_SHADE_META", payload: { key, index: selectedStop } })
    onClose()
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className="size-5 rounded ring-1 ring-black/10 shrink-0"
            style={{ backgroundColor: draftColor }}
          />
          <span className="text-sm font-bold capitalize">{context?.colorLabel ?? key}</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close color editor"
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div className="space-y-2.5">
          <SaturationCanvas hue={h} sat={s} val={v} onChange={handleCanvasChange} />
          <HueStrip hue={h} onChange={handleHueChange} />
        </div>

        <form onSubmit={handleHexSubmit}>
          <div className="flex items-center gap-2">
            <div
              className="size-9 rounded-lg border shrink-0 ring-1 ring-black/5"
              style={{ backgroundColor: draftColor }}
            />
            <input
              type="text"
              value={hexInput}
              onChange={(e) => setHexInput(e.target.value)}
              onBlur={handleHexBlur}
              placeholder="#000000"
              className="h-9 flex-1 rounded-lg border bg-background px-3 font-mono text-xs focus-visible:ring-2 focus-visible:ring-ring outline-none"
            />
          </div>
        </form>

        <ShadeBar color={baseColor} onSelect={handleShadeSelect} activeStop={activeStop} pairedSurfaceHex={pairedSurfaceHex} />
      </div>

      <div className="flex shrink-0 gap-2 border-t border-border p-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={applyColor}
          className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Apply color
        </button>
      </div>
    </div>
  )
}
