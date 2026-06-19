import type { StylePreset } from "./style-preset-types"

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
        borderOpacity: 0,
        borderWidth: "0px",
        backdropFilter: "none",
      },
      dark: {
        borderRadius: "0.5rem",
        boxShadow: "0 0 #0000",
        backgroundOpacity: 1,
        borderOpacity: 0,
        borderWidth: "0px",
        backdropFilter: "none",
      },
    },
    colorRules: {
      chromaModifier: 1,
      warmthBias: 0,
      shadowOpacityLight: 0,
      shadowOpacityDark: 0,
      requiresScrim: false,
      requiresNeon: false,
    },
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
      chromaModifier: 1,
      warmthBias: 0,
      shadowOpacityLight: 0.12,
      shadowOpacityDark: 0.28,
      requiresScrim: false,
      requiresNeon: false,
    },
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
      chromaModifier: 0.8,
      warmthBias: 0,
      shadowOpacityLight: 0.08,
      shadowOpacityDark: 0.18,
      requiresScrim: false,
      requiresNeon: false,
    },
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
      chromaModifier: 1,
      warmthBias: 0,
      shadowOpacityLight: 0,
      shadowOpacityDark: 0,
      requiresScrim: false,
      requiresNeon: false,
    },
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
      chromaModifier: 0.9,
      warmthBias: 0,
      shadowOpacityLight: 0,
      shadowOpacityDark: 0,
      requiresScrim: false,
      requiresNeon: false,
    },
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
      chromaModifier: 1,
      warmthBias: 0,
      shadowOpacityLight: 0.1,
      shadowOpacityDark: 0.22,
      requiresScrim: false,
      requiresNeon: false,
    },
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
      chromaModifier: 0.85,
      warmthBias: 0,
      shadowOpacityLight: 0.1,
      shadowOpacityDark: 0.2,
      requiresScrim: true,
      requiresNeon: false,
    },
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
      forceHarmony: "monochromatic",
      chromaModifier: 0.3,
      warmthBias: 0,
      shadowOpacityLight: 0.12,
      shadowOpacityDark: 0.35,
      requiresScrim: false,
      requiresNeon: false,
    },
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
