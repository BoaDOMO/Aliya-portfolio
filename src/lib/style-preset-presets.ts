import type { StylePreset, DarkRules, StateColorRules, PresetTypography } from "./style-preset-types"
import type { HarmonyType } from "./color-utils"

const DEFAULT_DARK_RULES: DarkRules = {
  bgChroma: 0.00375,
  primaryMinLightness: 0.60,
  surfaceHierarchyBoost: 0.08,
  preserveChroma: false,
}

const DEFAULT_STATE_COLORS: StateColorRules = {
  chromaModifier: 1,
  desaturate: false,
}

const ALL_HARMONIES: HarmonyType[] = [
  "shadcn",
  "monochromatic",
  "analogous",
  "complementary",
  "split-complementary",
  "triadic",
  "tetradic",
  "double-complementary",
  "compound",
  "golden-ratio",
  "near-complementary",
  "pentadic",
  "analogous-accent",
]

function typography(profile: Partial<PresetTypography> & Omit<PresetTypography, "scale" | "density" | "paragraphSpacing">, scale: PresetTypography["scale"], density: PresetTypography["density"] = "normal", paragraphSpacing: number = 1.0): PresetTypography {
  return {
    ...profile,
    scale,
    density,
    paragraphSpacing,
  } as PresetTypography
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "flat",
    name: "Flat",
    description: "Clean, modern, no elevation. Solid surfaces only.",
    group: "default",
    modifiers: {
      light: {
        borderRadius: "0.5rem",
        boxShadow: "0 0 #0000",
        backgroundOpacity: 1,
        borderOpacity: 0.08,
        borderWidth: "1px",
        backdropFilter: "none",
      },
      dark: {
        borderRadius: "0.5rem",
        boxShadow: "0 0 #0000",
        backgroundOpacity: 1,
        borderOpacity: 0.08,
        borderWidth: "1px",
        backdropFilter: "none",
      },
    },
    colorRules: {
      allowedHarmonies: ALL_HARMONIES,
      defaultHarmony: "shadcn",
      chromaModifier: { light: 1.0, dark: 1.0 },
      warmthBias: { light: 0, dark: 0 },
      darkRules: DEFAULT_DARK_RULES,
      requiresScrim: false,
      requiresNeon: false,
      stateColors: DEFAULT_STATE_COLORS,
    },
    typography: typography(
      {
        displayFont: "Plus Jakarta Sans",
        bodyFont: "Inter",
        monoFont: "JetBrains Mono",
        lineHeight: { display: 1.1, body: 1.6 },
      },
      {
        display: { size: 48, weight: 500 },
        body: { size: 16, weight: 500 },
        mono: { size: 14, weight: 400 },
      },
      "normal",
      1.0
    ),
  },
  {
    id: "floating",
    name: "Floating",
    description: "Elevated cards with a soft shadow and no border.",
    group: "default",
    modifiers: {
      light: {
        borderRadius: "0.75rem",
        boxShadow: "0 8px 24px -4px oklch(0% 0 0 / 0.12)",
        backgroundOpacity: 1,
        borderOpacity: 0,
        borderWidth: "0px",
        backdropFilter: "none",
      },
      dark: {
        borderRadius: "0.75rem",
        boxShadow: "0 8px 24px -4px oklch(0% 0 0 / 0.28)",
        backgroundOpacity: 1,
        borderOpacity: 0,
        borderWidth: "0px",
        backdropFilter: "none",
      },
    },
    colorRules: {
      allowedHarmonies: [
        "shadcn",
        "monochromatic",
        "analogous",
        "complementary",
        "split-complementary",
        "near-complementary",
        "analogous-accent",
      ],
      defaultHarmony: "analogous",
      chromaModifier: { light: 1.0, dark: 1.0 },
      warmthBias: { light: 0, dark: 0 },
      darkRules: DEFAULT_DARK_RULES,
      requiresScrim: false,
      requiresNeon: false,
      stateColors: DEFAULT_STATE_COLORS,
    },
    typography: typography(
      {
        displayFont: "Sora",
        bodyFont: "Inter",
        monoFont: "JetBrains Mono",
        lineHeight: { display: 1.05, body: 1.6 },
      },
      {
        display: { size: 56, weight: 700 },
        body: { size: 16, weight: 700 },
        mono: { size: 14, weight: 400 },
      },
      "normal",
      1.1
    ),
  },
  {
    id: "soft",
    name: "Soft",
    description: "Large radius and a gentle shadow for a friendly feel.",
    group: "default",
    modifiers: {
      light: {
        borderRadius: "1.25rem",
        boxShadow: "0 4px 16px -2px oklch(0% 0 0 / 0.08)",
        backgroundOpacity: 1,
        borderOpacity: 0,
        borderWidth: "0px",
        backdropFilter: "none",
      },
      dark: {
        borderRadius: "1.25rem",
        boxShadow: "0 4px 16px -2px oklch(0% 0 0 / 0.18)",
        backgroundOpacity: 1,
        borderOpacity: 0,
        borderWidth: "0px",
        backdropFilter: "none",
      },
    },
    colorRules: {
      allowedHarmonies: ["monochromatic", "analogous", "analogous-accent", "shadcn"],
      defaultHarmony: "analogous",
      chromaModifier: { light: 0.8, dark: 0.7 },
      warmthBias: { light: 0, dark: 5 },
      darkRules: DEFAULT_DARK_RULES,
      requiresScrim: false,
      requiresNeon: false,
      stateColors: DEFAULT_STATE_COLORS,
    },
    typography: typography(
      {
        displayFont: "Quicksand",
        bodyFont: "Nunito",
        monoFont: "JetBrains Mono",
        lineHeight: { display: 1.2, body: 1.7 },
      },
      {
        display: { size: 52, weight: 300 },
        body: { size: 18, weight: 300 },
        mono: { size: 14, weight: 400 },
      },
      "airy",
      1.3
    ),
  },
  {
    id: "outline",
    name: "Outline",
    description: "Transparent background with a visible border only.",
    group: "default",
    modifiers: {
      light: {
        borderRadius: "0.5rem",
        boxShadow: "0 0 #0000",
        backgroundOpacity: 0,
        borderOpacity: 0.3,
        borderWidth: "1px",
        backdropFilter: "none",
      },
      dark: {
        borderRadius: "0.5rem",
        boxShadow: "0 0 #0000",
        backgroundOpacity: 0,
        borderOpacity: 0.5,
        borderWidth: "1px",
        backdropFilter: "none",
      },
    },
    colorRules: {
      allowedHarmonies: [
        "monochromatic",
        "analogous",
        "complementary",
        "near-complementary",
        "shadcn",
      ],
      defaultHarmony: "complementary",
      chromaModifier: { light: 1.0, dark: 1.0 },
      warmthBias: { light: 0, dark: 0 },
      darkRules: DEFAULT_DARK_RULES,
      requiresScrim: false,
      requiresNeon: false,
      stateColors: DEFAULT_STATE_COLORS,
    },
    typography: typography(
      {
        displayFont: "Fraunces",
        bodyFont: "Inter",
        monoFont: "JetBrains Mono",
        lineHeight: { display: 1.1, body: 1.6 },
        letterSpacing: { body: "0.01em" },
      },
      {
        display: { size: 64, weight: 400 },
        body: { size: 17, weight: 400 },
        mono: { size: 14, weight: 400 },
      },
      "normal",
      1.4
    ),
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Zero radius, thin borders, Swiss-style precision.",
    group: "default",
    modifiers: {
      light: {
        borderRadius: "0px",
        boxShadow: "0 0 #0000",
        backgroundOpacity: 1,
        borderOpacity: 0.15,
        borderWidth: "1px",
        backdropFilter: "none",
      },
      dark: {
        borderRadius: "0px",
        boxShadow: "0 0 #0000",
        backgroundOpacity: 1,
        borderOpacity: 0.2,
        borderWidth: "1px",
        backdropFilter: "none",
      },
    },
    colorRules: {
      allowedHarmonies: ["monochromatic"],
      defaultHarmony: "monochromatic",
      chromaModifier: { light: 0.9, dark: 0.9 },
      warmthBias: { light: 0, dark: 0 },
      darkRules: DEFAULT_DARK_RULES,
      requiresScrim: false,
      requiresNeon: false,
      stateColors: { chromaModifier: 0.4, desaturate: true },
    },
    typography: typography(
      {
        displayFont: "JetBrains Mono",
        bodyFont: "JetBrains Mono",
        monoFont: "JetBrains Mono",
        lineHeight: { display: 1.0, body: 1.4 },
      },
      {
        display: { size: 40, weight: 700 },
        body: { size: 14, weight: 400 },
        mono: { size: 14, weight: 400 },
      },
      "tight",
      1.0
    ),
  },
  {
    id: "material",
    name: "Material",
    description: "Layered elevation shadows for functional interfaces.",
    group: "default",
    modifiers: {
      light: {
        borderRadius: "0.5rem",
        boxShadow:
          "0 1px 3px oklch(0% 0 0 / 0.10), 0 1px 2px -1px oklch(0% 0 0 / 0.10)",
        backgroundOpacity: 1,
        borderOpacity: 0,
        borderWidth: "0px",
        backdropFilter: "none",
      },
      dark: {
        borderRadius: "0.5rem",
        boxShadow:
          "0 1px 3px oklch(0% 0 0 / 0.22), 0 1px 2px -1px oklch(0% 0 0 / 0.22)",
        backgroundOpacity: 1,
        borderOpacity: 0,
        borderWidth: "0px",
        backdropFilter: "none",
      },
    },
    colorRules: {
      allowedHarmonies: [
        "shadcn",
        "analogous",
        "complementary",
        "split-complementary",
        "triadic",
        "analogous-accent",
      ],
      defaultHarmony: "analogous",
      chromaModifier: { light: 1.0, dark: 1.0 },
      warmthBias: { light: 0, dark: 0 },
      darkRules: DEFAULT_DARK_RULES,
      requiresScrim: false,
      requiresNeon: false,
      stateColors: DEFAULT_STATE_COLORS,
    },
    typography: typography(
      {
        displayFont: "Roboto",
        bodyFont: "Inter",
        monoFont: "JetBrains Mono",
        lineHeight: { display: 1.1, body: 1.5 },
      },
      {
        display: { size: 48, weight: 500 },
        body: { size: 16, weight: 500 },
        mono: { size: 14, weight: 500 },
      },
      "normal",
      1.0
    ),
  },
  {
    id: "glass",
    name: "Glass",
    description: "Frosted blur with semi-transparent surfaces.",
    group: "advanced",
    modifiers: {
      light: {
        borderRadius: "1rem",
        boxShadow: "0 8px 32px oklch(0% 0 0 / 0.10)",
        backgroundOpacity: 0.15,
        borderOpacity: 0.2,
        borderWidth: "1px",
        backdropFilter: "blur(12px) saturate(180%)",
      },
      dark: {
        borderRadius: "1rem",
        boxShadow: "0 8px 32px oklch(0% 0 0 / 0.20)",
        backgroundOpacity: 0.1,
        borderOpacity: 0.15,
        borderWidth: "1px",
        backdropFilter: "blur(12px) saturate(180%)",
      },
    },
    colorRules: {
      allowedHarmonies: [
        "monochromatic",
        "analogous",
        "complementary",
        "near-complementary",
        "analogous-accent",
      ],
      defaultHarmony: "complementary",
      chromaModifier: { light: 0.85, dark: 1.15 },
      warmthBias: { light: 0, dark: 0 },
      darkRules: {
        ...DEFAULT_DARK_RULES,
        preserveChroma: true,
        bgChroma: 0.02,
      },
      requiresScrim: true,
      requiresNeon: false,
      stateColors: DEFAULT_STATE_COLORS,
    },
    typography: typography(
      {
        displayFont: "Inter",
        bodyFont: "Inter",
        monoFont: "JetBrains Mono",
        lineHeight: { display: 1.0, body: 1.6 },
        letterSpacing: { body: "0.02em" },
      },
      {
        display: { size: 60, weight: 300 },
        body: { size: 16, weight: 300 },
        mono: { size: 14, weight: 400 },
      },
      "airy",
      1.2
    ),
  },
  {
    id: "neumorphic",
    name: "Neumorphic",
    description: "Soft extruded and inset shadows on a monochrome surface.",
    group: "advanced",
    modifiers: {
      light: {
        borderRadius: "1rem",
        boxShadow:
          "8px 8px 16px oklch(0% 0 0 / 0.12), -8px -8px 16px oklch(100% 0 0 / 0.80)",
        backgroundOpacity: 1,
        borderOpacity: 0,
        borderWidth: "0px",
        backdropFilter: "none",
      },
      dark: {
        borderRadius: "1rem",
        boxShadow:
          "8px 8px 16px oklch(0% 0 0 / 0.35), -8px -8px 16px oklch(100% 0 0 / 0.05)",
        backgroundOpacity: 1,
        borderOpacity: 0,
        borderWidth: "0px",
        backdropFilter: "none",
      },
    },
    colorRules: {
      allowedHarmonies: ["monochromatic"],
      defaultHarmony: "monochromatic",
      chromaModifier: { light: 0.3, dark: 0.25 },
      warmthBias: { light: 0, dark: 8 },
      darkRules: DEFAULT_DARK_RULES,
      requiresScrim: false,
      requiresNeon: false,
      stateColors: { chromaModifier: 0.5, desaturate: false },
    },
    typography: typography(
      {
        displayFont: "Nunito",
        bodyFont: "Inter",
        monoFont: "JetBrains Mono",
        lineHeight: { display: 1.1, body: 1.5 },
      },
      {
        display: { size: 42, weight: 500 },
        body: { size: 15, weight: 500 },
        mono: { size: 14, weight: 400 },
      },
      "normal",
      1.1
    ),
  },
]

export const DEFAULT_STYLE_PRESET_ID = "flat"

export function getPresetById(id: string | null): StylePreset | undefined {
  if (!id) return undefined
  return STYLE_PRESETS.find((p) => p.id === id)
}

export function getDefaultPreset(): StylePreset {
  return STYLE_PRESETS.find((p) => p.id === DEFAULT_STYLE_PRESET_ID)!
}
