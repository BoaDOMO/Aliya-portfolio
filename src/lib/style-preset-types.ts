import type { HarmonyType } from "./color-utils"

export interface PresetModifiers {
  borderRadius: string
  boxShadow: string
  backgroundOpacity: number
  borderOpacity: number
  borderWidth: string
  backdropFilter: string
}

export interface DarkRules {
  bgChroma: number
  primaryMinLightness: number
  surfaceHierarchyBoost: number
  preserveChroma: boolean
}

export interface StateColorRules {
  chromaModifier: number
  desaturate: boolean
}

export interface ColorRules {
  allowedHarmonies: HarmonyType[]
  defaultHarmony: HarmonyType
  chromaModifier: { light: number; dark: number }
  warmthBias: { light: number; dark: number }
  darkRules: DarkRules
  requiresScrim: boolean
  requiresNeon: boolean
  stateColors: StateColorRules
}

export interface PresetTypographyScale {
  size: number
  weight: number
  letterSpacing?: string
}

export interface PresetTypographyLineHeight {
  display: number
  body: number
}

export type PresetDensity = "tight" | "normal" | "airy"

export interface PresetTypography {
  displayFont: string
  bodyFont: string
  monoFont: string
  scale: {
    display: PresetTypographyScale
    body: PresetTypographyScale
    mono: PresetTypographyScale
  }
  lineHeight?: PresetTypographyLineHeight
  density: PresetDensity
  paragraphSpacing: number
  letterSpacing?: {
    body?: string
    mono?: string
  }
}

export interface StylePreset {
  id: string
  name: string
  description: string
  group: "default" | "advanced"
  modifiers: {
    light: PresetModifiers
    dark: PresetModifiers
  }
  colorRules: ColorRules
  typography: PresetTypography
}

export interface StylePresetState {
  activePreset: string | null
  overrides?: Partial<PresetModifiers>
}
