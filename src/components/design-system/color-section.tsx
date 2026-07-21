import { Copy, CaretDown, SlidersHorizontal } from "@phosphor-icons/react"
import { toast } from "sonner"
import {
  useDesignTokens,
  useDesignTokensDispatch,
  type ColorIntent,
} from "@/lib/design-tokens-store"
import type { ColorTokens, StateColors } from "@/lib/color-utils"

const INTENTS: Array<{ value: ColorIntent; label: string; description: string }> = [
  { value: "neutral", label: "Neutral", description: "Quiet product UI" },
  { value: "subtle", label: "Subtle", description: "Tinted supporting roles" },
  { value: "expressive", label: "Expressive", description: "Stronger accent contrast" },
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
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Copy className="size-3.5" />
      </button>
    </div>
  )
}

export default function ColorSection({
  onOpenDrawer,
}: {
  onOpenDrawer?: (
    key: string,
    label: string,
    type?: "light" | "dark" | "states",
  ) => void
}) {
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()
  const mode = state.previewMode
  const tokens = mode === "dark" ? state.tokens.dark : state.tokens.light

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <span className="text-xs font-semibold text-foreground">Brand color</span>
        <div className="flex items-stretch gap-2">
          <button
            type="button"
            onClick={() => onOpenDrawer?.("primary", "Brand color", mode)}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-border bg-background p-3 text-left transition-colors hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              className="size-10 shrink-0 rounded-lg border border-black/10 shadow-sm"
              style={{ backgroundColor: tokens.primary }}
            />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground">Primary</span>
              <span className="block font-mono text-[11px] text-muted-foreground">
                {tokens.primary.toUpperCase()}
              </span>
            </span>
            <SlidersHorizontal className="ml-auto size-4 text-muted-foreground" />
          </button>
          <button
            type="button"
            onClick={() => copyColor(tokens.primary, "Brand color")}
            aria-label="Copy brand color"
            className="flex w-11 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Copy className="size-4" />
          </button>
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold text-foreground">Color intent</legend>
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-muted/60 p-1">
          {INTENTS.map((intent) => (
            <button
              key={intent.value}
              type="button"
              aria-pressed={state.colorIntent === intent.value}
              title={intent.description}
              onClick={() => dispatch({ type: "SET_COLOR_INTENT", payload: intent.value })}
              className={`rounded-lg px-2 py-2 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                state.colorIntent === intent.value
                  ? "bg-surface-featured text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {intent.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">System preview</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {mode}
          </span>
        </div>
        <div className="grid grid-cols-5 overflow-hidden rounded-xl border border-border">
          {[
            [tokens.background, "Canvas"],
            [tokens.card, "Card"],
            [tokens.muted, "Muted"],
            [tokens.accent, "Accent"],
            [tokens.foreground, "Text"],
          ].map(([color, label]) => (
            <div key={label} className="group relative aspect-square" style={{ backgroundColor: color }}>
              <span className="sr-only">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <details className="group rounded-xl border border-border bg-background">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-3 py-3 text-xs font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Fine-tune semantic tokens
          <span className="ml-auto text-[10px] font-normal text-muted-foreground">Advanced</span>
          <CaretDown className="size-3.5 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="border-t border-border px-1 py-2">
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
      </details>
    </div>
  )
}
