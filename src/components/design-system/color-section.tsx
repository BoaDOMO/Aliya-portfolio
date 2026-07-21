import { CaretRight, Copy } from "@phosphor-icons/react"
import { toast } from "sonner"
import {
  useDesignTokens,
  useDesignTokensDispatch,
  type ColorIntent,
} from "@/lib/design-tokens-store"
import type { ColorTokens, StateColors } from "@/lib/color-utils"

const INTENTS: Array<{ value: ColorIntent; label: string; description: string }> = [
  { value: "neutral", label: "Quiet", description: "Neutral supporting colors" },
  { value: "subtle", label: "Balanced", description: "Gently tinted supporting colors" },
  { value: "expressive", label: "Bold", description: "Stronger accent relationships" },
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
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-control hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
  const mode = state.previewMode
  const tokens = mode === "dark" ? state.tokens.dark : state.tokens.light

  return (
    <button
      type="button"
      onClick={() => onOpenDrawer?.("primary", "Brand color", mode)}
      className="group flex min-h-24 w-full items-start gap-3 rounded-xl border border-border bg-surface-control p-3.5 text-left transition-colors hover:border-border-strong hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted font-mono text-[10px] font-semibold text-muted-foreground">
        02
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold text-muted-foreground">
          Choose a brand color
        </span>
        <span className="mt-1 flex items-center gap-2">
          <span
            className="size-5 shrink-0 rounded-md border border-border-strong shadow-sm"
            style={{ backgroundColor: tokens.primary }}
          />
          <span className="font-mono text-xs font-semibold text-foreground">
            {tokens.primary.toUpperCase()}
          </span>
        </span>
        <span className="mt-1 block text-[11px] leading-4 text-muted-foreground">
          One color generates every semantic role.
        </span>
      </span>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground">
        <CaretRight className="size-4" />
      </span>
    </button>
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
  const dispatch = useDesignTokensDispatch()
  const mode = state.previewMode
  const tokens = mode === "dark" ? state.tokens.dark : state.tokens.light

  return (
    <div className="space-y-5">
      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold text-foreground">Color personality</legend>
        <p className="text-[11px] leading-4 text-muted-foreground">
          Control how strongly the brand color influences supporting roles.
        </p>
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-muted p-1">
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
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-foreground">Color roles</p>
            <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground">
              Override generated colors only when needed.
            </p>
          </div>
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
