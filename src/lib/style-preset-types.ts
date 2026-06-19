import type { HarmonyType } from "./color-utils"

export interface PresetModifiers {
  borderRadius: string
  boxShadow: string
  backgroundOpacity: number
  borderOpacity: number
  borderWidth: string
  backdropFilter: string
}

export interface ColorRules {
  forceHarmony?: HarmonyType
  chromaModifier: number
  warmthBias: number
  shadowOpacityLight: number
  shadowOpacityDark: number
  requiresScrim: boolean
  requiresNeon: boolean
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
}

export interface StylePresetState {
  activePreset: string | null
  overrides?: Partial<PresetModifiers>
}
