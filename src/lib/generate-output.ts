import type { DesignTokensState } from "./design-tokens-store"
import type { ColorTokens, StateColors, DerivedTokens } from "./color-utils"
import { generatePresetCssVars, generateStandardRadiusTheme, generateStandardShadowTheme } from "./style-preset-utils"

const THEME_COLOR_MAP: Record<string, string> = {
  "primary": "--color-primary",
  "primary-foreground": "--color-primary-foreground",
  "secondary": "--color-secondary",
  "secondary-foreground": "--color-secondary-foreground",
  "accent": "--color-accent",
  "accent-foreground": "--color-accent-foreground",
  "muted": "--color-muted",
  "muted-foreground": "--color-muted-foreground",
  "background": "--color-background",
  "foreground": "--color-foreground",
  "card": "--color-card",
  "card-foreground": "--color-card-foreground",
  "popover": "--color-popover",
  "popover-foreground": "--color-popover-foreground",
  "border": "--color-border",
  "input": "--color-input",
  "ring": "--color-ring",
  "destructive": "--color-destructive",
  "destructive-foreground": "--color-destructive-foreground",
  "success": "--color-success",
  "success-foreground": "--color-success-foreground",
  "warning": "--color-warning",
  "warning-foreground": "--color-warning-foreground",
  "info": "--color-info",
  "info-foreground": "--color-info-foreground",
  "sidebar": "--color-sidebar",
  "sidebar-foreground": "--color-sidebar-foreground",
  "sidebar-primary": "--color-sidebar-primary",
  "sidebar-primary-foreground": "--color-sidebar-primary-foreground",
  "sidebar-accent": "--color-sidebar-accent",
  "sidebar-accent-foreground": "--color-sidebar-accent-foreground",
  "sidebar-border": "--color-sidebar-border",
  "sidebar-ring": "--color-sidebar-ring",
  "chart-1": "--color-chart-1",
  "chart-2": "--color-chart-2",
  "chart-3": "--color-chart-3",
  "chart-4": "--color-chart-4",
  "chart-5": "--color-chart-5",
}

function lightValues(
  tokens: ColorTokens,
  states: StateColors
): Record<string, string> {
  return {
    primary: tokens.primary,
    "primary-foreground": tokens["primary-foreground"],
    secondary: tokens.secondary,
    "secondary-foreground": tokens["secondary-foreground"],
    accent: tokens.accent,
    "accent-foreground": tokens["accent-foreground"],
    muted: tokens.muted,
    "muted-foreground": tokens["muted-foreground"],
    background: tokens.background,
    foreground: tokens.foreground,
    card: tokens.card,
    "card-foreground": tokens["card-foreground"],
    popover: tokens.popover,
    "popover-foreground": tokens["popover-foreground"],
    border: tokens.border,
    input: tokens.input,
    ring: tokens.ring,
    destructive: states.destructive,
    "destructive-foreground": states["destructive-foreground"],
    success: states.success,
    "success-foreground": states["success-foreground"],
    warning: states.warning,
    "warning-foreground": states["warning-foreground"],
    info: states.info,
    "info-foreground": states["info-foreground"],
  }
}

function derivedValues(derived: DerivedTokens): Record<string, string> {
  return {
    sidebar: derived.sidebar,
    "sidebar-foreground": derived["sidebar-foreground"],
    "sidebar-primary": derived["sidebar-primary"],
    "sidebar-primary-foreground": derived["sidebar-primary-foreground"],
    "sidebar-accent": derived["sidebar-accent"],
    "sidebar-accent-foreground": derived["sidebar-accent-foreground"],
    "sidebar-border": derived["sidebar-border"],
    "sidebar-ring": derived["sidebar-ring"],
    "chart-1": derived["chart-1"],
    "chart-2": derived["chart-2"],
    "chart-3": derived["chart-3"],
    "chart-4": derived["chart-4"],
    "chart-5": derived["chart-5"],
  }
}

function formatVarBlock(
  values: Record<string, string>,
  indent = "  "
): string {
  return Object.entries(values)
    .map(([k, v]) => `${indent}--${k}: ${v};`)
    .join("\n")
}

export function generateTailwindTheme(state: DesignTokensState): string {
  const { light, dark, states, derived } = state.tokens
  const { fonts } = state

  const themeLines: string[] = []

  for (const v of Object.keys(THEME_COLOR_MAP)) {
    const mapped = THEME_COLOR_MAP[v]
    if (mapped) {
      themeLines.push(`    ${mapped}: var(--${v});`)
    }
  }

  themeLines.push("    --font-display: var(--font-display);")
  themeLines.push("    --font-body: var(--font-body);")
  themeLines.push("    --font-mono: var(--font-mono);")

  const radiusTokens = generateStandardRadiusTheme()
  for (const [key, val] of Object.entries(radiusTokens)) {
    themeLines.push(`    ${key}: ${val};`)
  }
  const shadowTokens = generateStandardShadowTheme()
  for (const [key, val] of Object.entries(shadowTokens)) {
    themeLines.push(`    ${key}: ${val};`)
  }

  const lightVals = { ...lightValues(light, states), ...derivedValues(derived.light) }
  const lightPresetVars = generatePresetCssVars(state.stylePreset, false)

  const rootExtras: Record<string, string> = {}
  if (fonts.display) rootExtras["font-display"] = `"${fonts.display}", sans-serif`
  if (fonts.body) rootExtras["font-body"] = `"${fonts.body}", sans-serif`
  if (fonts.mono) rootExtras["font-mono"] = `"${fonts.mono}", monospace`

  const darkVals = { ...lightValues(dark, states), ...derivedValues(derived.dark) }
  const darkPresetVars = generatePresetCssVars(state.stylePreset, true)
  const darkExtras: Record<string, string> = {}
  if (fonts.display) darkExtras["font-display"] = `"${fonts.display}", sans-serif`
  if (fonts.body) darkExtras["font-body"] = `"${fonts.body}", sans-serif`
  if (fonts.mono) darkExtras["font-mono"] = `"${fonts.mono}", monospace`

  return [
    "@theme inline {",
    themeLines.join("\n"),
    "}",
    "",
    ":root {",
    formatVarBlock(lightVals),
    formatVarBlock(lightPresetVars),
    formatVarBlock(rootExtras),
    "}",
    "",
    ".dark {",
    formatVarBlock(darkVals),
    formatVarBlock(darkPresetVars),
    formatVarBlock(darkExtras),
    "}",
    "",
  ].join("\n")
}

export function generatePresetTokensCSS(state: DesignTokensState): string {
  const radiusTokens = generateStandardRadiusTheme()
  const shadowTokens = generateStandardShadowTheme()
  const lightPresetVars = generatePresetCssVars(state.stylePreset, false)
  const darkPresetVars = generatePresetCssVars(state.stylePreset, true)

  const lines: string[] = []

  lines.push("/* ── Radius Scale ── */")
  lines.push("@theme inline {")
  for (const [key, val] of Object.entries(radiusTokens)) {
    lines.push(`  ${key}: ${val};`)
  }
  for (const [key, val] of Object.entries(shadowTokens)) {
    lines.push(`  ${key}: ${val};`)
  }
  lines.push("}")
  lines.push("")

  lines.push("/* ── Preset Modifier Variables ── */")
  lines.push(":root {")
  for (const [key, val] of Object.entries(lightPresetVars)) {
    lines.push(`  ${key}: ${val};`)
  }
  lines.push("}")
  lines.push("")

  lines.push(".dark {")
  for (const [key, val] of Object.entries(darkPresetVars)) {
    lines.push(`  ${key}: ${val};`)
  }
  lines.push("}")
  lines.push("")

  return lines.join("\n")
}

export function generatePlainCSS(state: DesignTokensState): string {
  const { light, dark, states, derived } = state.tokens
  const { fonts } = state

  const lightVals = { ...lightValues(light, states), ...derivedValues(derived.light) }
  const darkVals = { ...lightValues(dark, states), ...derivedValues(derived.dark) }
  const lightPresetVars = generatePresetCssVars(state.stylePreset, false)
  const darkPresetVars = generatePresetCssVars(state.stylePreset, true)

  const extras: Record<string, string> = {}
  if (fonts.display) extras["font-display"] = `"${fonts.display}", sans-serif`
  if (fonts.body) extras["font-body"] = `"${fonts.body}", sans-serif`
  if (fonts.mono) extras["font-mono"] = `"${fonts.mono}", monospace`

  return [
    ":root {",
    formatVarBlock(lightVals),
    formatVarBlock(lightPresetVars),
    formatVarBlock(extras),
    "}",
    "",
    '[data-theme="dark"] {',
    formatVarBlock(darkVals),
    formatVarBlock(darkPresetVars),
    formatVarBlock(extras),
    "}",
    "",
  ].join("\n")
}

export function generateAIContext(state: DesignTokensState): string {
  const { light, dark, states, derived } = state.tokens
  const { fonts, stylePreset, harmonyType } = state

  const lines: string[] = [
    "# Design System — AI Context",
    "",
    "When generating code for this project, use these design tokens:",
    "",
    "## Colors",
    `- Primary: ${light.primary} (light), ${dark.primary} (dark)`,
    `- Secondary: ${light.secondary} (light), ${dark.secondary} (dark)`,
    `- Accent: ${light.accent} (light), ${dark.accent} (dark)`,
    `- Background: ${light.background} (light), ${dark.background} (dark)`,
    `- Foreground: ${light.foreground} (light), ${dark.foreground} (dark)`,
    `- Card: ${light.card} (light), ${dark.card} (dark)`,
    `- Border: ${light.border} (light), ${dark.border} (dark)`,
    `- Muted: ${light.muted} (light), ${dark.muted} (dark)`,
    `- Muted Foreground: ${light["muted-foreground"]} (light), ${dark["muted-foreground"]} (dark)`,
    "",
    "### State Colors",
    `- Destructive: ${states.destructive}`,
    `- Success: ${states.success}`,
    `- Warning: ${states.warning}`,
    `- Info: ${states.info}`,
    "",
    "### Sidebar",
    `- Sidebar: ${derived.light.sidebar} (light), ${derived.dark.sidebar} (dark)`,
    `- Sidebar Foreground: ${derived.light["sidebar-foreground"]} (light), ${derived.dark["sidebar-foreground"]} (dark)`,
    `- Sidebar Primary: ${derived.light["sidebar-primary"]} (light), ${derived.dark["sidebar-primary"]} (dark)`,
    `- Sidebar Accent: ${derived.light["sidebar-accent"]} (light), ${derived.dark["sidebar-accent"]} (dark)`,
    "",
    "### Chart Colors",
    `- Chart 1: ${derived.light["chart-1"]} (light), ${derived.dark["chart-1"]} (dark)`,
    `- Chart 2: ${derived.light["chart-2"]} (light), ${derived.dark["chart-2"]} (dark)`,
    `- Chart 3: ${derived.light["chart-3"]} (light), ${derived.dark["chart-3"]} (dark)`,
    `- Chart 4: ${derived.light["chart-4"]} (light), ${derived.dark["chart-4"]} (dark)`,
    `- Chart 5: ${derived.light["chart-5"]} (light), ${derived.dark["chart-5"]} (dark)`,
    "",
    `Harmony: ${harmonyType}`,
    "",
    "## Typography",
    `- Display: ${fonts.display ?? "Archivo Narrow"}`,
    `- Body: ${fonts.body ?? "Inter"}`,
    `- Mono: ${fonts.mono ?? "JetBrains Mono"}`,
    "",
    "## Style Preset",
    `- Active preset: ${stylePreset.activePreset ?? "flat"}`,
    "",
    "## Tailwind Classes",
    "Use bg-primary, text-primary-foreground, bg-secondary, text-secondary-foreground,",
    "bg-accent, bg-muted, text-muted-foreground, bg-card, border, ring, bg-destructive,",
    "text-destructive-foreground. Fonts: font-display, font-body, font-mono.",
    "Preset modifiers are available via --preset-* CSS variables.",
    "",
  ]

  return lines.join("\n")
}
