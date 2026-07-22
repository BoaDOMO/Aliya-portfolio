import type { CSSProperties } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ArrowLeft,
  Check,
  Copy,
  LinkSimple,
} from "@phosphor-icons/react"
import { toast } from "sonner"
import {
  useDesignTokens,
  useDesignTokensDispatch,
  type ColorIntent,
} from "@/lib/design-tokens-store"
import { type ColorTokens, type StateColors } from "@/lib/color-utils"
import { SegmentedControl } from "@/components/ui/segmented-control"
import AdvancedSettingsToggle from "./advanced-settings-toggle"

const INTENTS: Array<{ value: ColorIntent; label: string }> = [
  { value: "neutral", label: "Calm" },
  { value: "subtle", label: "Balanced" },
  { value: "expressive", label: "Expressive" },
]

type ColorRole = {
  key: keyof ColorTokens
  label: string
  foreground?: keyof ColorTokens
  linkedTo?: keyof ColorTokens
}

const COLOR_GROUPS: Array<{
  label: string
  roles: ColorRole[]
}> = [
  {
    label: "Backgrounds",
    roles: [
      { key: "background", label: "Canvas", foreground: "foreground" },
      { key: "card", label: "Surface", foreground: "card-foreground" },
      { key: "muted", label: "Muted", foreground: "muted-foreground" },
      { key: "surface-featured", label: "Featured", foreground: "foreground" },
      { key: "surface-raised", label: "Raised", foreground: "foreground", linkedTo: "card" },
      { key: "popover", label: "Popover", foreground: "popover-foreground", linkedTo: "surface-featured" },
    ],
  },
  {
    label: "Text & icons",
    roles: [
      { key: "foreground", label: "Text" },
      { key: "card-foreground", label: "Surface text", linkedTo: "card" },
      { key: "muted-foreground", label: "Muted text", linkedTo: "muted" },
      { key: "primary-foreground", label: "On primary", linkedTo: "primary" },
      { key: "secondary-foreground", label: "On secondary", linkedTo: "secondary" },
      { key: "accent-foreground", label: "On accent", linkedTo: "accent" },
      { key: "popover-foreground", label: "On popover", linkedTo: "surface-featured" },
    ],
  },
  {
    label: "Controls",
    roles: [
      { key: "primary", label: "Primary", foreground: "primary-foreground" },
      { key: "secondary", label: "Secondary", foreground: "secondary-foreground" },
      { key: "accent", label: "Accent", foreground: "accent-foreground" },
    ],
  },
  {
    label: "Edges & focus",
    roles: [
      { key: "border", label: "Border" },
      { key: "border-strong", label: "Strong border" },
      { key: "input", label: "Input" },
      { key: "ring", label: "Focus ring" },
    ],
  },
]

type StateRoleKey = Exclude<keyof StateColors, `${string}-foreground`>

const STATE_GROUP: Array<{ key: StateRoleKey; label: string }> = [
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

function getColorRole(key: keyof ColorTokens): ColorRole {
  return COLOR_GROUPS.flatMap((group) => group.roles).find((role) => role.key === key) ?? {
    key,
    label: String(key),
  }
}

function copyColor(value: string, label: string) {
  navigator.clipboard.writeText(value).then(
    () => toast.success(`Copied ${label}`),
    () => toast.error("Failed to copy color"),
  )
}

function TokenRow({
  color,
  label,
  linkedLabel,
  onEdit,
}: {
  color: string
  label: string
  linkedLabel?: string
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
        {linkedLabel && <LinkSimple className="size-3 shrink-0 text-muted-foreground" aria-label={`Linked to ${linkedLabel}`} />}
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
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {advancedOpen ? (
          <motion.div
            key="color-room"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -28 }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onAdvancedOpenChange(false)}
                aria-label="Back to color overview"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ArrowLeft className="size-4" />
              </button>
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">All colors</h2>
              </div>
              <span className="ml-auto rounded-md bg-muted px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {mode}
              </span>
            </div>
            <ColorAdvancedSettings onOpenDrawer={onOpenDrawer} />
          </motion.div>
        ) : (
          <motion.div
            key="color-overview"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: shouldReduceMotion ? 0.12 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-4 flex items-center gap-2">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Colors</h2>
              <div className="ml-auto flex min-w-0 items-center gap-2">
                <SegmentedControl
                  options={INTENTS}
                  value={state.colorIntent}
                  onChange={(value) => dispatch({ type: "SET_COLOR_INTENT", payload: value as ColorIntent })}
                  size="sm"
                  ariaLabel="Color personality"
                  className="shrink-0 [&_button]:px-1.5 [&_button]:text-[10px] sm:[&_button]:px-2 sm:[&_button]:text-xs"
                />
                <AdvancedSettingsToggle
                  label="color"
                  open={advancedOpen}
                  modified={hasAdvancedChanges}
                  onClick={() => onAdvancedOpenChange(true)}
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
                    className={`group flex min-h-28 flex-col rounded-xl border border-border-strong bg-[var(--dock-swatch)] p-4 text-left text-[var(--dock-swatch-foreground)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0 ${swatch.featured ? "sm:row-span-2" : ""}`}
                    style={swatchStyle}
                  >
                    <span className="text-sm font-semibold">{swatch.label}</span>
                    <span className="mt-auto font-mono text-xs opacity-75">{tokens[swatch.key].toUpperCase()}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

  const renderTokenRow = (role: ColorRole) => {
    const linkedLabel = role.linkedTo ? getColorRole(role.linkedTo).label : undefined
    const editKey = role.linkedTo ?? role.key
    const editLabel = getColorRole(editKey).label

    return (
      <TokenRow
        key={role.key}
        color={tokens[role.key]}
        label={role.label}
        linkedLabel={linkedLabel}
        onEdit={() => onOpenDrawer?.(editKey, editLabel, mode)}
      />
    )
  }

  return (
    <div className="space-y-5">
      {COLOR_GROUPS.map((group) => (
        <div key={group.label} className="space-y-2">
          <div className="flex items-end justify-between gap-3">
            <p className="text-xs font-semibold text-foreground">{group.label}</p>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {group.roles.length} roles
            </span>
          </div>
          <div className="rounded-xl border border-border bg-surface-control px-1 py-2">
            {group.roles.map(renderTokenRow)}
          </div>
        </div>
      ))}
      <div className="space-y-2">
        <div className="flex items-end justify-between gap-3">
          <p className="text-xs font-semibold text-foreground">Feedback</p>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">4 states</span>
        </div>
        <div className="rounded-xl border border-border bg-surface-control px-1 py-2">
          {STATE_GROUP.map(({ key, label }) => (
            <TokenRow
              key={key}
              color={state.tokens.states[key]}
              label={label}
              onEdit={() => onOpenDrawer?.(key, label, "states")}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          <Check className="size-3.5 shrink-0 text-success" />
          Foreground colors are generated for readable contrast.
        </div>
      </div>
    </div>
  )
}
