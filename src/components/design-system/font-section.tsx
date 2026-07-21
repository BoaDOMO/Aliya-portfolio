import { useState } from "react"
import { CaretDown, Check, PencilSimple } from "@phosphor-icons/react"
import {
  useDesignTokens,
  useDesignTokensDispatch,
} from "@/lib/design-tokens-store"
import { SMART_PAIRINGS, type FontPairing } from "@/lib/google-fonts"
import type { TypeScaleId } from "@/lib/type-scale"
import { Switch } from "@/components/ui/switch"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import AdvancedSettingsToggle from "./advanced-settings-toggle"

const TYPE_SCALE_OPTIONS: Array<{
  value: TypeScaleId
  label: string
}> = [
  { value: "compact", label: "Calm" },
  { value: "balanced", label: "Balanced" },
  { value: "editorial", label: "Expressive" },
]

function PairingDropdown({
  activePair,
  fonts,
  onChange,
}: {
  activePair: FontPairing | null
  fonts: {
    display: string | null
    body: string | null
    mono: string | null
  }
  onChange: (pair: FontPairing) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="group grid w-full grid-cols-1 gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-2">
        <span className="flex min-h-36 flex-col justify-between rounded-xl border border-border bg-surface-control p-5 transition-colors group-hover:border-border-strong group-hover:bg-surface-raised">
          <span className="text-sm font-semibold text-muted-foreground">Heading</span>
          <span
            className="break-words text-3xl font-semibold leading-none tracking-tight text-foreground"
            style={{ fontFamily: fonts.display ?? undefined }}
          >
            {fonts.display ?? "Display"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Display
          </span>
        </span>
        <span className="flex min-h-36 flex-col justify-between rounded-xl border border-border bg-surface-control p-5 transition-colors group-hover:border-border-strong group-hover:bg-surface-raised">
          <span className="text-sm font-semibold text-muted-foreground">Body</span>
          <span
            className="break-words text-3xl leading-none tracking-tight text-foreground"
            style={{ fontFamily: fonts.body ?? undefined }}
          >
            {fonts.body ?? "Body"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Reading
          </span>
        </span>
        <span className="flex min-h-20 items-center gap-4 rounded-xl border border-border bg-surface-control p-5 transition-colors group-hover:border-border-strong group-hover:bg-surface-raised sm:col-span-2">
          <span className="text-sm font-semibold text-muted-foreground">Data</span>
          <span
            className="min-w-0 flex-1 truncate text-xl text-foreground"
            style={{ fontFamily: fonts.mono ?? undefined }}
          >
            {fonts.mono ?? "Monospace"}
          </span>
          <span className="hidden truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
            {activePair?.label ?? "Custom pairing"}
          </span>
          <CaretDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
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
  advancedOpen,
  onAdvancedOpenChange,
  hasAdvancedChanges,
}: {
  onOpenDrawer?: (slot: "display" | "body" | "mono") => void
  advancedOpen: boolean
  onAdvancedOpenChange: (open: boolean) => void
  hasAdvancedChanges: boolean
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
    <section>
      <Collapsible open={advancedOpen} onOpenChange={onAdvancedOpenChange}>
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Typography
          </h2>
          <div className="ml-auto flex min-w-0 items-center gap-2">
            <SegmentedControl
              options={TYPE_SCALE_OPTIONS}
              value={state.typeScaleId}
              onChange={(value) =>
                dispatch({ type: "SET_TYPE_SCALE", payload: value as TypeScaleId })
              }
              size="sm"
              ariaLabel="Type scale"
              className="shrink-0 [&_button]:px-1.5 [&_button]:text-[10px] sm:[&_button]:px-2 sm:[&_button]:text-xs"
            />
            <AdvancedSettingsToggle
              label="typography"
              open={advancedOpen}
              modified={hasAdvancedChanges}
            />
          </div>
        </div>
        <PairingDropdown activePair={activePair} fonts={state.fonts} onChange={setPairing} />
        <CollapsibleContent className="overflow-hidden data-closed:animate-accordion-up data-open:animate-accordion-down motion-reduce:animate-none">
          <div className="mt-5 border-t border-border pt-5">
            <FontAdvancedSettings onOpenDrawer={onOpenDrawer} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  )
}

export function FontAdvancedSettings({
  onOpenDrawer,
}: {
  onOpenDrawer?: (slot: "display" | "body" | "mono") => void
}) {
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground">Font roles</p>
        <div className="rounded-xl border border-border bg-surface-control p-1">
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
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-control px-3 py-2.5">
        <p className="text-xs font-semibold text-foreground">Match type to style</p>
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
