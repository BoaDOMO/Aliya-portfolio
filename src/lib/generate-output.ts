import type { DesignTokensState } from "./design-tokens-store"
import type { ColorTokens, StateColors, DerivedTokens } from "./color-utils"
import { mixColors } from "./color-utils"
import { generatePresetCssVars, generateStandardRadiusTheme, generateStandardShadowTheme } from "./style-preset-utils"
import { getPresetById } from "./style-preset-presets"

const THEME_COLOR_MAP: Record<string, string> = {
  "primary": "--color-primary",
  "primary-foreground": "--color-primary-foreground",
  "primary-safe": "--color-primary-safe",
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
  "surface-raised": "--color-surface-raised",
  "surface-featured": "--color-surface-featured",
  "popover": "--color-popover",
  "popover-foreground": "--color-popover-foreground",
  "border": "--color-border",
  "border-strong": "--color-border-strong",
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
    "primary-safe": mixColors(tokens.primary, tokens["card-foreground"], 85),
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
    "surface-raised": tokens["surface-raised"],
    "surface-featured": tokens["surface-featured"],
    popover: tokens.popover,
    "popover-foreground": tokens["popover-foreground"],
    border: tokens.border,
    "border-strong": tokens["border-strong"],
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

function fontValues(fonts: DesignTokensState["fonts"]): Record<string, string> {
  const vals: Record<string, string> = {}
  if (fonts.display) vals["font-display"] = `"${fonts.display}", sans-serif`
  if (fonts.body) vals["font-body"] = `"${fonts.body}", sans-serif`
  if (fonts.mono) vals["font-mono"] = `"${fonts.mono}", monospace`
  return vals
}

function typographyScaleValues(
  state: DesignTokensState
): Record<string, string> {
  const { typeScale } = state
  return {
    display: `${typeScale.display}px`,
    h1: `${typeScale.h1}px`,
    h2: `${typeScale.h2}px`,
    h3: `${typeScale.h3}px`,
    "body-lg": `${typeScale.bodyLarge}px`,
    body: `${typeScale.body}px`,
    small: `${typeScale.small}px`,
    label: `${typeScale.label}px`,
    code: `${typeScale.code}px`,
  }
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

  themeLines.push("    --font-display: var(--ds-font-display);")
  themeLines.push("    --font-body: var(--ds-font-body);")
  themeLines.push("    --font-mono: var(--ds-font-mono);")
  for (const [k, v] of Object.entries(typographyScaleValues(state))) {
    themeLines.push(`    --text-${k}: ${v};`)
  }

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

  const rootExtras: Record<string, string> = Object.fromEntries(
    Object.entries(fontValues(fonts)).map(([key, value]) => [`ds-${key}`, value]),
  )

  const darkVals = { ...lightValues(dark, states), ...derivedValues(derived.dark) }
  const darkPresetVars = generatePresetCssVars(state.stylePreset, true)
  const darkExtras: Record<string, string> = { ...rootExtras }

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
  const extras = {
    ...fontValues(fonts),
    ...Object.fromEntries(
      Object.entries(typographyScaleValues(state)).map(([key, value]) => [`type-${key}`, value]),
    ),
  }

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
  const { fonts, stylePreset, harmonyType, colorIntent, typeScaleId, typeScale, typographyMatchPreset } = state

  const preset = getPresetById(stylePreset.activePreset)
  const typo = preset?.typography
  const cr = preset?.colorRules

  const lines: string[] = [
    "# Design System — AI Context",
    "",
    "When generating code for this project, use these design tokens.",
    "",
    "## Style Preset",
    `- Active preset: ${stylePreset.activePreset ?? "flat"}${preset ? ` (${preset.name})` : ""}`,
    `- Typography match preset: ${typographyMatchPreset}`,
    "",
    "### Preset Modifiers (light / dark)",
    ...(preset ? [
      `- border-radius: ${preset.modifiers.light.borderRadius} / ${preset.modifiers.dark.borderRadius}`,
      `- box-shadow: ${preset.modifiers.light.boxShadow} / ${preset.modifiers.dark.boxShadow}`,
      `- background-opacity: ${preset.modifiers.light.backgroundOpacity} / ${preset.modifiers.dark.backgroundOpacity}`,
      `- border-opacity: ${preset.modifiers.light.borderOpacity} / ${preset.modifiers.dark.borderOpacity}`,
      `- border-width: ${preset.modifiers.light.borderWidth} / ${preset.modifiers.dark.borderWidth}`,
      `- backdrop-filter: ${preset.modifiers.light.backdropFilter} / ${preset.modifiers.dark.backdropFilter}`,
      `- requires-scrim: ${preset.colorRules.requiresScrim}`,
    ] : []),
    "",
    "### Harmony Policy",
    ...(cr ? [
      `- Color intent: ${colorIntent}`,
      `- Resolved harmony: ${harmonyType}`,
      `- Allowed harmonies: ${cr.allowedHarmonies.join(", ")}`,
      `- Default harmony: ${cr.defaultHarmony}`,
    ] : []),
    "",
    "### Color Rules",
    ...(cr ? [
      `- chroma modifier (light/dark): ${cr.chromaModifier.light} / ${cr.chromaModifier.dark}`,
      `- warmth bias (light/dark): ${cr.warmthBias.light}° / ${cr.warmthBias.dark}°`,
      `- state color chroma modifier: ${cr.stateColors.chromaModifier} (desaturate: ${cr.stateColors.desaturate})`,
    ] : []),
    "",
    "### Dark Rules",
    ...(cr ? [
      `- bg-chroma: ${cr.darkRules.bgChroma}`,
      `- primary-min-lightness: ${cr.darkRules.primaryMinLightness}`,
      `- surface-hierarchy-boost: ${cr.darkRules.surfaceHierarchyBoost}`,
      `- preserve-chroma: ${cr.darkRules.preserveChroma}`,
    ] : []),
    "",
    "## Typography Profile",
    ...(typo ? [
      `- Display font: ${typo.displayFont}`,
      `- Body font: ${typo.bodyFont}`,
      `- Mono font: ${typo.monoFont}`,
      `- Display scale: ${typo.scale.display.size}px / weight ${typo.scale.display.weight}${typo.scale.display.letterSpacing ? ` / letter-spacing ${typo.scale.display.letterSpacing}` : ""}`,
      `- Body scale: ${typo.scale.body.size}px / weight ${typo.scale.body.weight}${typo.scale.body.letterSpacing ? ` / letter-spacing ${typo.scale.body.letterSpacing}` : ""}`,
      `- Mono scale: ${typo.scale.mono.size}px / weight ${typo.scale.mono.weight}`,
      `- Line height (display/body): ${typo.lineHeight?.display ?? "—"} / ${typo.lineHeight?.body ?? "—"}`,
      `- Density: ${typo.density} (spacing scale multiplier)`,
      `- Paragraph spacing: ${typo.paragraphSpacing}`,
    ] : []),
    "",
    "### Active Fonts (with overrides)",
    `- Display: ${fonts.display ?? "—"}`,
    `- Body: ${fonts.body ?? "—"}`,
    `- Mono: ${fonts.mono ?? "—"}`,
    `- Type scale: ${typeScaleId}`,
    `- Display / H1 / H2 / H3: ${typeScale.display}px / ${typeScale.h1}px / ${typeScale.h2}px / ${typeScale.h3}px`,
    `- Body large / body / small: ${typeScale.bodyLarge}px / ${typeScale.body}px / ${typeScale.small}px`,
    `- Label / code: ${typeScale.label}px / ${typeScale.code}px`,
    "",
    "## Colors (light → dark)",
    `- Primary: ${light.primary} → ${dark.primary}`,
    `- Secondary: ${light.secondary} → ${dark.secondary}`,
    `- Accent: ${light.accent} → ${dark.accent}`,
    `- Background: ${light.background} → ${dark.background}`,
    `- Foreground: ${light.foreground} → ${dark.foreground}`,
    `- Card: ${light.card} → ${dark.card}`,
    `- Raised surface: ${light["surface-raised"]} → ${dark["surface-raised"]}`,
    `- Featured surface: ${light["surface-featured"]} → ${dark["surface-featured"]}`,
    `- Border: ${light.border} → ${dark.border}`,
    `- Strong border: ${light["border-strong"]} → ${dark["border-strong"]}`,
    `- Muted: ${light.muted} → ${dark.muted}`,
    `- Muted Foreground: ${light["muted-foreground"]} → ${dark["muted-foreground"]}`,
    "",
    "## State Colors",
    `- Destructive: ${states.destructive} (fg: ${states["destructive-foreground"]})`,
    `- Success: ${states.success} (fg: ${states["success-foreground"]})`,
    `- Warning: ${states.warning} (fg: ${states["warning-foreground"]})`,
    `- Info: ${states.info} (fg: ${states["info-foreground"]})`,
    "",
    "## Sidebar (light → dark)",
    `- Sidebar: ${derived.light.sidebar} → ${derived.dark.sidebar}`,
    `- Sidebar Foreground: ${derived.light["sidebar-foreground"]} → ${derived.dark["sidebar-foreground"]}`,
    `- Sidebar Primary: ${derived.light["sidebar-primary"]} → ${derived.dark["sidebar-primary"]}`,
    `- Sidebar Accent: ${derived.light["sidebar-accent"]} → ${derived.dark["sidebar-accent"]}`,
    "",
    "## Chart Colors (light → dark)",
    `- chart-1: ${derived.light["chart-1"]} → ${derived.dark["chart-1"]}`,
    `- chart-2: ${derived.light["chart-2"]} → ${derived.dark["chart-2"]}`,
    `- chart-3: ${derived.light["chart-3"]} → ${derived.dark["chart-3"]}`,
    `- chart-4: ${derived.light["chart-4"]} → ${derived.dark["chart-4"]}`,
    `- chart-5: ${derived.light["chart-5"]} → ${derived.dark["chart-5"]}`,
    "",
    "## Tailwind Classes",
    "Use bg-primary, text-primary-foreground, bg-secondary, text-secondary-foreground,",
    "bg-accent, bg-muted, text-muted-foreground, bg-card, bg-surface-raised,",
    "bg-surface-featured, border, border-border-strong, ring, bg-destructive,",
    "text-destructive-foreground. Fonts: font-display, font-body, font-mono.",
    "Preset modifiers are available via --preset-* CSS variables (--preset-radius,",
    "--preset-shadow, --preset-bg-opacity, --preset-border-opacity, --preset-border-width,",
    "--preset-backdrop). Typography uses text-display, text-h1, text-h2, text-h3,",
    "text-body-lg, text-body, text-small, text-label, and text-code.",
    "",
  ]

  return lines.join("\n")
}

export function generateThemeJSON(state: DesignTokensState): string {
  const toColorValue = (hex: string) => {
    const normalized = hex.replace("#", "").slice(0, 6).padEnd(6, "0")
    return {
      colorSpace: "srgb",
      components: [0, 2, 4].map((offset) => Number((parseInt(normalized.slice(offset, offset + 2), 16) / 255).toFixed(5))),
      hex: `#${normalized.toUpperCase()}`,
    }
  }

  const colorTokens = (tokens: Record<string, string>) => Object.fromEntries(
    Object.entries(tokens).map(([name, value]) => [name, { $value: toColorValue(value) }])
  )

  const document = {
    $description: "Design tokens exported by Aliya Koy's Design Studio.",
    color: {
      $type: "color",
      light: colorTokens(state.tokens.light as unknown as Record<string, string>),
      dark: colorTokens(state.tokens.dark as unknown as Record<string, string>),
      state: colorTokens(state.tokens.states as unknown as Record<string, string>),
      derived: {
        light: colorTokens(state.tokens.derived.light as unknown as Record<string, string>),
        dark: colorTokens(state.tokens.derived.dark as unknown as Record<string, string>),
      },
    },
    font: {
      display: { $type: "fontFamily", $value: state.fonts.display ?? "Plus Jakarta Sans" },
      body: { $type: "fontFamily", $value: state.fonts.body ?? "Inter" },
      mono: { $type: "fontFamily", $value: state.fonts.mono ?? "JetBrains Mono" },
    },
    typography: {
      $type: "dimension",
      display: { $value: { value: state.typeScale.display, unit: "px" } },
      h1: { $value: { value: state.typeScale.h1, unit: "px" } },
      h2: { $value: { value: state.typeScale.h2, unit: "px" } },
      h3: { $value: { value: state.typeScale.h3, unit: "px" } },
      body: { $value: { value: state.typeScale.body, unit: "px" } },
      small: { $value: { value: state.typeScale.small, unit: "px" } },
      label: { $value: { value: state.typeScale.label, unit: "px" } },
      code: { $value: { value: state.typeScale.code, unit: "px" } },
    },
    $extensions: {
      "com.aliyakoy.design-system-studio": {
        harmonyType: state.harmonyType,
        colorIntent: state.colorIntent,
        typeScale: state.typeScaleId,
        activePreset: state.stylePreset.activePreset,
      },
    },
  }

  return JSON.stringify(document, null, 2)
}
