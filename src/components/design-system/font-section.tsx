import { useState } from "react"
import { CaretDown, Check, PencilSimple } from "@phosphor-icons/react"
import {
  useDesignTokens,
  useDesignTokensDispatch,
} from "@/lib/design-tokens-store"
import { SMART_PAIRINGS, type FontPairing } from "@/lib/google-fonts"
import type { TypeScaleId } from "@/lib/type-scale"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const TYPE_SCALE_OPTIONS: Array<{
  value: TypeScaleId
  label: string
  description: string
}> = [
  { value: "compact", label: "Compact", description: "Dense product tools" },
  { value: "balanced", label: "Balanced", description: "Everyday product UI" },
  { value: "editorial", label: "Editorial", description: "Larger storytelling type" },
]

function PairingDropdown({
  activePair,
  onChange,
}: {
  activePair: FontPairing | null
  onChange: (pair: FontPairing) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex w-full items-center gap-3 rounded-xl border border-border bg-background px-3 py-3 text-left transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-foreground">
            {activePair?.label ?? "Custom pairing"}
          </span>
          <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">
            {activePair
              ? `${activePair.display} · ${activePair.body} · ${activePair.mono}`
              : "Choose a curated role-based pairing"}
          </span>
        </span>
        <CaretDown className={`size-3.5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--anchor-width)] gap-1 p-1.5">
        {SMART_PAIRINGS.map((pair) => (
          <button
            key={pair.label}
            type="button"
            onClick={() => {
              onChange(pair)
              setOpen(false)
            }}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-foreground">{pair.label}</span>
              <span className="block truncate text-[10px] text-muted-foreground">
                {pair.display} · {pair.body}
              </span>
            </span>
            {activePair?.label === pair.label && <Check className="size-3.5 text-primary" weight="bold" />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}

function FontRoleRow({
  label,
  family,
  sample,
  onEdit,
}: {
  label: string
  family: string | null
  sample: string
  onEdit: () => void
}) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="w-14 shrink-0 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="min-w-0 flex-1 truncate text-base text-foreground" style={{ fontFamily: family ?? undefined }}>
        {sample}
      </span>
      <span className="max-w-24 truncate text-[10px] text-muted-foreground">{family}</span>
      <PencilSimple className="size-3.5 shrink-0 text-muted-foreground" />
    </button>
  )
}

export default function FontSection({
  onOpenDrawer,
}: {
  onOpenDrawer?: (slot: "display" | "body" | "mono") => void
}) {
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()
  const activePair = SMART_PAIRINGS.find(
    (pair) =>
      state.fonts.display === pair.display &&
      state.fonts.body === pair.body &&
      state.fonts.mono === pair.mono,
  ) ?? null

  const setPairing = (pair: FontPairing) => {
    dispatch({
      type: "SET_FONT_PAIR",
      payload: {
        display: pair.display,
        body: pair.body,
        mono: pair.mono,
      },
    })
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <span className="text-xs font-semibold text-foreground">Pairing</span>
        <PairingDropdown activePair={activePair} onChange={setPairing} />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold text-foreground">Type scale</legend>
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-muted/60 p-1">
          {TYPE_SCALE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={state.typeScaleId === option.value}
              title={option.description}
              onClick={() => dispatch({ type: "SET_TYPE_SCALE", payload: option.value })}
              className={`rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                state.typeScaleId === option.value
                  ? "bg-surface-featured text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="rounded-xl border border-border bg-background p-1">
        <FontRoleRow
          label="Display"
          family={state.fonts.display}
          sample="Build clearly"
          onEdit={() => onOpenDrawer?.("display")}
        />
        <FontRoleRow
          label="Body"
          family={state.fonts.body}
          sample="Readable product copy"
          onEdit={() => onOpenDrawer?.("body")}
        />
        <FontRoleRow
          label="Data"
          family={state.fonts.mono}
          sample="STATUS 12:42"
          onEdit={() => onOpenDrawer?.("mono")}
        />
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2.5">
        <div>
          <p className="text-xs font-semibold text-foreground">Match style preset</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">Update pairing when style changes</p>
        </div>
        <Switch
          checked={state.typographyMatchPreset}
          onCheckedChange={(checked) =>
            dispatch({ type: "SET_TYPOGRAPHY_MATCH_PRESET", payload: checked })
          }
          size="sm"
        />
      </div>
    </div>
  )
}
