import type { CSSProperties } from "react"
import { Copy } from "@phosphor-icons/react"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  useDesignTokens,
  useDesignTokensDispatch,
  type ColorIntent,
} from "@/lib/design-tokens-store"
import type { ColorTokens, StateColors } from "@/lib/color-utils"
import { SegmentedControl } from "@/components/ui/segmented-control"
import AdvancedSettingsToggle from "./advanced-settings-toggle"

const INTENTS: Array<{ value: ColorIntent; label: string }> = [
  { value: "neutral", label: "Calm" },
  { value: "subtle", label: "Balanced" },
  { value: "expressive", label: "Expressive" },
]

const ADVANCED_TOKENS: Array<{ key: keyof ColorTokens; label: string }> = [
  { key: "primary-foreground", label: "On primary" },
  { key: "background", label: "Canvas" },
  { key: "foreground", label: "Main text" },
  { key: "card", label: "Card" },
  { key: "card-foreground", label: "Card text" },
  { key: "surface-raised", label: "Raised surface" },
  { key: "surface-featured", label: "Featured surface" },
  { key: "secondary", label: "Secondary" },
  { key: "accent", label: "Accent" },
  { key: "muted", label: "Muted" },
  { key: "muted-foreground", label: "Muted text" },
  { key: "border", label: "Border" },
  { key: "border-strong", label: "Strong border" },
  { key: "input", label: "Input" },
  { key: "ring", label: "Focus ring" },
]

const STATE_TOKENS: Array<{ key: keyof StateColors; label: string }> = [
  { key: "success", label: "Success" },
  { key: "warning", label: "Warning" },
  { key: "destructive", label: "Destructive" },
  { key: "info", label: "Info" },
]

const COLOR_ROLE_SWATCHES: Array<{
  key: keyof ColorTokens
  foreground: keyof ColorTokens
  label: string
  featured: boolean
}> = [
  { key: "background", foreground: "foreground", label: "Canvas", featured: true },
  { key: "primary", foreground: "primary-foreground", label: "Primary", featured: true },
  { key: "secondary", foreground: "secondary-foreground", label: "Secondary", featured: false },
  { key: "card", foreground: "card-foreground", label: "Surface", featured: false },
]

function copyColor(value: string, label: string) {
  navigator.clipboard.writeText(value).then(
    () => toast.success(`Copied ${label}`),
    () => toast.error("Failed to copy color"),
  )
}

function TokenRow({
  color,
  label,
  onEdit,
}: {
  color: string
  label: string
  onEdit: () => void
}) {
  return (
    <div className="flex min-h-10 items-center gap-2 rounded-lg px-2 transition-colors hover:bg-muted/60">
      <button
        type="button"
        onClick={onEdit}
        className="flex min-w-0 flex-1 items-center gap-2 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span
          className="size-6 shrink-0 rounded-md border border-border/70 shadow-sm"
          style={{ backgroundColor: color }}
        />
        <span className="min-w-0 flex-1 truncate text-xs font-medium text-foreground">{label}</span>
        <span className="font-mono text-[10px] text-muted-foreground">{color.toUpperCase()}</span>
      </button>
      <button
        type="button"
        onClick={() => copyColor(color, label)}
        aria-label={`Copy ${label} color`}
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-control hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Copy className="size-3.5" />
      </button>
    </div>
  )
}

export default function ColorSection({
  onOpenDrawer,
  advancedOpen,
  onAdvancedOpenChange,
  hasAdvancedChanges,
}: {
  onOpenDrawer?: (
    key: string,
    label: string,
    type?: "light" | "dark" | "states",
  ) => void
  advancedOpen: boolean
  onAdvancedOpenChange: (open: boolean) => void
  hasAdvancedChanges: boolean
}) {
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()
  const mode = state.previewMode
  const tokens = mode === "dark" ? state.tokens.dark : state.tokens.light

  return (
    <section>
      <Collapsible open={advancedOpen} onOpenChange={onAdvancedOpenChange}>
        <div className="mb-4 flex items-center gap-2">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Colors
          </h2>
          <div className="ml-auto flex min-w-0 items-center gap-2">
            <SegmentedControl
              options={INTENTS}
              value={state.colorIntent}
              onChange={(value) =>
                dispatch({ type: "SET_COLOR_INTENT", payload: value as ColorIntent })
              }
              size="sm"
              ariaLabel="Color personality"
              className="shrink-0 [&_button]:px-1.5 [&_button]:text-[10px] sm:[&_button]:px-2 sm:[&_button]:text-xs"
            />
            <AdvancedSettingsToggle
              label="color"
              open={advancedOpen}
              modified={hasAdvancedChanges}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:h-64 sm:grid-cols-3 sm:grid-rows-2">
          {COLOR_ROLE_SWATCHES.map((swatch) => {
            const swatchStyle = {
              "--dock-swatch": tokens[swatch.key],
              "--dock-swatch-foreground": tokens[swatch.foreground],
            } as CSSProperties

            return (
              <button
                key={swatch.key}
                type="button"
                onClick={() => onOpenDrawer?.(swatch.key, swatch.label, mode)}
                className={`group flex min-h-28 flex-col rounded-xl border border-border-strong bg-[var(--dock-swatch)] p-4 text-left text-[var(--dock-swatch-foreground)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0 ${
                  swatch.featured ? "sm:row-span-2" : ""
                }`}
                style={swatchStyle}
              >
                <span className="text-sm font-semibold">{swatch.label}</span>
                <span className="mt-auto font-mono text-xs opacity-75">
                  {tokens[swatch.key].toUpperCase()}
                </span>
              </button>
            )
          })}
        </div>
        <CollapsibleContent className="overflow-hidden data-closed:animate-accordion-up data-open:animate-accordion-down motion-reduce:animate-none">
          <div className="mt-5 border-t border-border pt-5">
            <ColorAdvancedSettings onOpenDrawer={onOpenDrawer} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  )
}

export function ColorAdvancedSettings({
  onOpenDrawer,
}: {
  onOpenDrawer?: (
    key: string,
    label: string,
    type?: "light" | "dark" | "states",
  ) => void
}) {
  const state = useDesignTokens()
  const mode = state.previewMode
  const tokens = mode === "dark" ? state.tokens.dark : state.tokens.light

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-end justify-between gap-3">
          <p className="text-xs font-semibold text-foreground">All roles</p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {mode}
          </span>
        </div>
        <div className="rounded-xl border border-border bg-surface-control px-1 py-2">
          {ADVANCED_TOKENS.map(({ key, label }) => (
            <TokenRow
              key={key}
              color={tokens[key]}
              label={label}
              onEdit={() => onOpenDrawer?.(key, label, mode)}
            />
          ))}
          <div className="mx-2 my-2 border-t border-border" />
          <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Feedback
          </p>
          {STATE_TOKENS.map(({ key, label }) => (
            <TokenRow
              key={key}
              color={state.tokens.states[key]}
              label={label}
              onEdit={() => onOpenDrawer?.(key, label, "states")}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
