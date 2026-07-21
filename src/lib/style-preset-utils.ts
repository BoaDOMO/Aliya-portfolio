import { oklch, formatHex } from "culori"
import { computeForeground } from "./color-utils"
import type { ColorTokens, HarmonyType } from "./color-utils"
import type { PresetModifiers, StylePreset, StylePresetState } from "./style-preset-types"
import { DEFAULT_STYLE_PRESET_ID, getDefaultPreset, getPresetById } from "./style-preset-presets"

export function getEffectiveHarmony(
  userHarmony: HarmonyType,
  preset?: StylePreset
): HarmonyType {
  if (!preset) return userHarmony
  return preset.colorRules.allowedHarmonies.includes(userHarmony)
    ? userHarmony
    : preset.colorRules.defaultHarmony
}

export function getActiveModifiers(
  state: StylePresetState,
  isDark: boolean
): PresetModifiers {
  const preset = getPresetById(state.activePreset) ?? getDefaultPreset()
  const base = isDark ? preset.modifiers.dark : preset.modifiers.light

  if (!state.overrides) return base

  return {
    borderRadius: state.overrides.borderRadius ?? base.borderRadius,
    boxShadow: state.overrides.boxShadow ?? base.boxShadow,
    backgroundOpacity: state.overrides.backgroundOpacity ?? base.backgroundOpacity,
    borderOpacity: state.overrides.borderOpacity ?? base.borderOpacity,
    borderWidth: state.overrides.borderWidth ?? base.borderWidth,
    backdropFilter: state.overrides.backdropFilter ?? base.backdropFilter,
  }
}

export function generatePresetCssVars(
  state: StylePresetState,
  isDark: boolean
): Record<string, string> {
  const m = getActiveModifiers(state, isDark)
  const preset = getPresetById(state.activePreset)

  const densityScale: Record<"tight" | "normal" | "airy", string> = {
    tight: "0.85",
    normal: "1.0",
    airy: "1.2",
  }

  const vars: Record<string, string> = {
    "--preset-radius": m.borderRadius,
    "--preset-shadow": m.boxShadow,
    "--preset-bg-opacity": String(m.backgroundOpacity),
    "--preset-border-opacity": String(m.borderOpacity),
    "--preset-border-width": m.borderWidth,
    "--preset-backdrop": m.backdropFilter,
    "--radius": m.borderRadius,
    "--spacing-scale": densityScale[preset?.typography.density ?? "normal"],
    "--paragraph-spacing": String(preset?.typography.paragraphSpacing ?? 1.0),
  }

  if (preset?.typography.lineHeight) {
    vars["--line-height-display"] = String(preset.typography.lineHeight.display)
    vars["--line-height-body"] = String(preset.typography.lineHeight.body)
  }

  return vars
}

export function generateStandardRadiusTheme(): Record<string, string> {
  return {
    "--radius-sm": "calc(var(--radius) * 0.6)",
    "--radius-md": "calc(var(--radius) * 0.8)",
    "--radius-lg": "var(--radius)",
    "--radius-xl": "calc(var(--radius) * 1.4)",
    "--radius-2xl": "calc(var(--radius) * 1.8)",
    "--radius-3xl": "calc(var(--radius) * 2.2)",
    "--radius-4xl": "calc(var(--radius) * 2.6)",
  }
}

export function generateStandardShadowTheme(): Record<string, string> {
  return {
    "--shadow-none": "0 0 #0000",
    "--shadow-2xs": "0 1px rgb(0 0 0 / 0.05)",
    "--shadow-xs": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "--shadow-sm": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "--shadow-md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "--shadow-lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "--shadow-xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "--shadow-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  }
}

export const RADIUS_SCALE: { token: string; value: string }[] = [
  { token: "none", value: "0px" },
  { token: "sm", value: "calc(var(--radius) * 0.6)" },
  { token: "md", value: "calc(var(--radius) * 0.8)" },
  { token: "lg", value: "var(--radius)" },
  { token: "xl", value: "calc(var(--radius) * 1.4)" },
  { token: "2xl", value: "calc(var(--radius) * 1.8)" },
  { token: "3xl", value: "calc(var(--radius) * 2.2)" },
  { token: "4xl", value: "calc(var(--radius) * 2.6)" },
  { token: "full", value: "9999px" },
]

export const RADIUS_CSS_MAP: Record<string, string> = {
  none: "0px",
  sm: "calc(var(--radius) * 0.6)",
  md: "calc(var(--radius) * 0.8)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) * 1.4)",
  "2xl": "calc(var(--radius) * 1.8)",
  "3xl": "calc(var(--radius) * 2.2)",
  "4xl": "calc(var(--radius) * 2.6)",
  full: "9999px",
}

export const SHADOW_SCALE: { token: string; value: string }[] = [
  { token: "none", value: "0 0 #0000" },
  { token: "2xs", value: "0 1px rgb(0 0 0 / 0.05)" },
  { token: "xs", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  { token: "sm", value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" },
  { token: "md", value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" },
  { token: "lg", value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" },
  { token: "xl", value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" },
  { token: "2xl", value: "0 25px 50px -12px rgb(0 0 0 / 0.25)" },
]

function oklchFromHex(hex: string): { l: number; c: number; h: number } {
  const parsed = oklch(hex)
  return {
    l: parsed.l ?? 0,
    c: parsed.c ?? 0,
    h: parsed.h ?? 0,
  }
}

function hexFromOklch(l: number, c: number, h: number): string {
  return formatHex({
    mode: "oklch",
    l: Math.max(0, Math.min(1, l)),
    c: Math.max(0, Math.min(0.4, c)),
    h: ((h % 360) + 360) % 360,
  })
}

function adjustColor(hex: string, preset: StylePreset, isDark?: boolean): string {
  const { chromaModifier, warmthBias, requiresNeon } = preset.colorRules
  const mode = isDark ? "dark" : "light"

  const { l, c: baseC, h: baseH } = oklchFromHex(hex)

  let h = baseH
  if (warmthBias[mode] !== 0) {
    h = (h + warmthBias[mode]) % 360
  }

  let modifier = chromaModifier[mode]
  if (requiresNeon) {
    modifier *= 1.3
  }

  const c = Math.min(0.4, baseC * modifier)

  return hexFromOklch(l, c, h)
}

export function applyColorRulesToTokens(
  tokens: ColorTokens,
  preset?: StylePreset,
  isDark?: boolean
): ColorTokens {
  if (!preset) return tokens

  const adjusted = { ...tokens }

  const surfaceKeys: (keyof ColorTokens)[] = [
    "secondary",
    "accent",
    "muted",
    "background",
    "card",
    "surface-raised",
    "surface-featured",
    "popover",
    "border",
    "border-strong",
    "input",
  ]

  for (const key of surfaceKeys) {
    adjusted[key] = adjustColor(adjusted[key], preset, isDark)
  }

  // Recompute foregrounds for adjusted surface colors
  for (const key of surfaceKeys) {
    const fgKey = `${key}-foreground` as keyof ColorTokens
    if (fgKey in adjusted) {
      adjusted[fgKey] = computeForeground(adjusted[key])
    }
  }

  return adjusted
}

export function encodePresetState(state: StylePresetState): string {
  if (!state.activePreset) return ""
  const payload: Record<string, unknown> = { preset: state.activePreset }
  if (state.overrides && Object.keys(state.overrides).length > 0) {
    payload.overrides = state.overrides
  }
  return btoa(JSON.stringify(payload))
}

export function decodePresetState(encoded: string): StylePresetState {
  try {
    const parsed = JSON.parse(atob(encoded))
    if (typeof parsed.preset === "string") {
      return {
        activePreset: parsed.preset,
        overrides: parsed.overrides as Partial<PresetModifiers> | undefined,
      }
    }
  } catch {
    // ignore malformed encoded strings
  }
  return { activePreset: DEFAULT_STYLE_PRESET_ID }
}
