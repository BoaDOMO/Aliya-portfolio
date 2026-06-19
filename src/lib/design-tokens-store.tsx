import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react"
import { random, formatHex } from "culori"
import {
  type HarmonyType,
  type ColorTokens,
  type StateColors,
  type DerivedTokens,
  generateHarmony,
  generateNeutrals,
  generateStateColors,
  generateDarkTokens,
  generateDerivedTokens,
  computeForeground,
} from "./color-utils"
import { checkAllPairs, type ContrastResult } from "./contrast-utils"
import type { StylePresetState } from "./style-preset-types"
import { DEFAULT_STYLE_PRESET_ID } from "./style-preset-presets"
import {
  applyColorRulesToTokens,
  getEffectiveHarmonyType,
} from "./style-preset-utils"
import { getPresetById } from "./style-preset-presets"

const FOREGROUND_PAIRS: Record<string, string> = {
  primary: "primary-foreground",
  secondary: "secondary-foreground",
  accent: "accent-foreground",
  muted: "muted-foreground",
  background: "foreground",
  card: "card-foreground",
  popover: "popover-foreground",
}

export type ColorSpace = "hex" | "rgb" | "hsl" | "oklch"

export type Severity = "pass" | "warning" | "error"

export interface QualityReport {
  contrast: { status: Severity; pairs: ContrastResult[]; darkPairs: ContrastResult[] }
  accessibility: { status: Severity; cvdWarnings: string[] }
  darkMode: { status: Severity; warnings: string[] }
  completeness: { status: Severity; missing: string[] }
  exportReady: boolean
}

export interface FontSlots {
  display: string | null
  body: string | null
  mono: string | null
}

export interface FontCustomization {
  display: { size: number; weight: number; italic: boolean }
  body: { size: number; weight: number; italic: boolean }
  mono: { size: number; weight: number; italic: boolean }
}

export type ShadeMeta = Record<string, number | null>

export interface DesignTokensState {
  colorSpace: ColorSpace
  harmonyType: HarmonyType
  previewMode: "light" | "dark"
  tokens: {
    light: ColorTokens
    dark: ColorTokens
    states: StateColors
    derived: {
      light: DerivedTokens
      dark: DerivedTokens
    }
    harmonyPalette: string[]
  }
  fonts: FontSlots
  fontCustomization: FontCustomization
  stylePreset: StylePresetState
  borderSize: number
  shadeMeta: ShadeMeta
  report: QualityReport
}

export type TokenAction =
  | { type: "SET_PRIMARY_COLOR"; payload: string }
  | { type: "SET_HARMONY_TYPE"; payload: HarmonyType }
  | { type: "SET_COLOR_SPACE"; payload: ColorSpace }
  | { type: "RANDOMIZE_ALL" }
  | { type: "RANDOMIZE_COLORS" }
  | { type: "SET_PREVIEW_MODE"; payload: "light" | "dark" }
  | { type: "LOAD_THEME"; payload: Partial<DesignTokensState> }
  | { type: "SET_DISPLAY_FONT"; payload: string | null }
  | { type: "SET_BODY_FONT"; payload: string | null }
  | { type: "SET_MONO_FONT"; payload: string | null }
  | { type: "APPLY_STYLE_PRESET"; payload: string }
  | { type: "UPDATE_LIGHT_TOKEN"; payload: { key: keyof ColorTokens; value: string } }
  | { type: "UPDATE_STATE_TOKEN"; payload: { key: keyof StateColors; value: string } }
  | { type: "SET_FONT_SIZE"; payload: { slot: "display" | "body" | "mono"; value: number } }
  | { type: "SET_FONT_WEIGHT"; payload: { slot: "display" | "body" | "mono"; value: number } }
  | { type: "SET_FONT_STYLE"; payload: { slot: "display" | "body" | "mono"; value: "normal" | "italic" } }
  | { type: "UPDATE_DARK_TOKEN"; payload: { key: keyof ColorTokens; value: string } }
  | { type: "SHUFFLE_HARMONY" }
  | { type: "UPDATE_SHADE_META"; payload: { key: string; index: number | null } }

const DEFAULT_PRIMARY = "#2563EB"

function computeReport(lightTokens: ColorTokens, darkTokens?: ColorTokens): QualityReport {
  const lightPairs = checkAllPairs(lightTokens)
  const lightFailing = lightPairs.filter((p) => p.grade === "fail")
  const darkPairs = darkTokens ? checkAllPairs(darkTokens) : []
  const darkFailing = darkPairs.filter((p) => p.grade === "fail")
  const darkWarnings = darkPairs
    .filter((p) => p.grade === "fail")
    .map((p) => `${p.label}: ${p.ratio.toFixed(1)}:1`)

  return {
    contrast: {
      status: lightFailing.length > 0 ? "error" : "pass",
      pairs: lightPairs,
      darkPairs: darkPairs || [],
    },
    accessibility: { status: "pass", cvdWarnings: [] },
    darkMode: {
      status: darkFailing.length > 0 ? "error" : "pass",
      warnings: darkWarnings,
    },
    completeness: { status: "pass", missing: [] },
    exportReady: lightFailing.length === 0 && darkFailing.length === 0,
  }
}

function computeTokens(
  primary: string,
  harmonyType: HarmonyType,
  stylePreset: StylePresetState
) {
  const effectiveHarmony = getEffectiveHarmonyType(harmonyType, getPresetById(stylePreset.activePreset))
  const harmony = generateHarmony(primary, effectiveHarmony)
  const lightTokens = generateNeutrals(primary)

  lightTokens.secondary = harmony.secondary
  lightTokens.accent = harmony.accent
  lightTokens.muted = harmony.muted

  const adjustedLight = applyColorRulesToTokens(
    lightTokens,
    getPresetById(stylePreset.activePreset)
  )

  const darkTokens = generateDarkTokens(adjustedLight)
  const adjustedDark = applyColorRulesToTokens(
    darkTokens,
    getPresetById(stylePreset.activePreset)
  )

  const states = generateStateColors(primary)
  const derivedLight = generateDerivedTokens(adjustedLight)
  const derivedDark = generateDerivedTokens(adjustedDark, true)

  return {
    light: adjustedLight,
    dark: adjustedDark,
    states,
    derived: { light: derivedLight, dark: derivedDark },
    harmonyPalette: harmony.palette,
  }
}

function initialTokens() {
  return computeTokens(DEFAULT_PRIMARY, "shadcn", { activePreset: DEFAULT_STYLE_PRESET_ID })
}

const defaultTokens = initialTokens()

const initialState: DesignTokensState = {
  colorSpace: "hex",
  harmonyType: "shadcn",
  previewMode: "light",
  tokens: defaultTokens,
  fonts: {
    display: "Archivo Narrow",
    body: "Inter",
    mono: "JetBrains Mono",
  },
  fontCustomization: {
    display: { size: 48, weight: 700, italic: false },
    body: { size: 16, weight: 400, italic: false },
    mono: { size: 14, weight: 400, italic: false },
  },
  stylePreset: { activePreset: DEFAULT_STYLE_PRESET_ID },
  borderSize: 1,
  shadeMeta: {},
  report: computeReport(defaultTokens.light, defaultTokens.dark),
}

function reducer(
  state: DesignTokensState,
  action: TokenAction
): DesignTokensState {
  switch (action.type) {
    case "SET_PRIMARY_COLOR": {
      const tokens = computeTokens(action.payload, state.harmonyType, state.stylePreset)
      return {
        ...state,
        tokens,
        shadeMeta: {},
        report: computeReport(tokens.light, tokens.dark),
      }
    }
    case "SET_HARMONY_TYPE": {
      const tokens = computeTokens(
        state.tokens.light.primary,
        action.payload,
        state.stylePreset
      )
      return {
        ...state,
        harmonyType: action.payload,
        tokens,
        shadeMeta: {},
        report: computeReport(tokens.light, tokens.dark),
      }
    }
    case "SET_COLOR_SPACE":
      return { ...state, colorSpace: action.payload }
    case "RANDOMIZE_ALL": {
      const harmonies: HarmonyType[] = [
        "analogous",
        "complementary",
        "triadic",
        "tetradic",
        "split-complementary",
        "monochromatic",
      ]
      let tokens: ReturnType<typeof computeTokens> = computeTokens(
        "#185FA5",
        "analogous",
        state.stylePreset
      )
      let randomHarmony: HarmonyType = "analogous"
      let report: QualityReport = computeReport(tokens.light, tokens.dark)
      for (let i = 0; i < 50; i++) {
        const randomColor = formatHex(random("oklch"))
        randomHarmony =
          harmonies[Math.floor(Math.random() * harmonies.length)]
        tokens = computeTokens(randomColor, randomHarmony, state.stylePreset)
        report = computeReport(tokens.light, tokens.dark)
        if (report.exportReady) break
      }
      return {
        ...state,
        harmonyType: randomHarmony,
        tokens,
        shadeMeta: {},
        report: report!,
      }
    }
    case "RANDOMIZE_COLORS": {
      const colorHarmonies: HarmonyType[] = [
        "analogous",
        "complementary",
        "triadic",
        "tetradic",
        "split-complementary",
        "monochromatic",
      ]
      let tokens: ReturnType<typeof computeTokens> = computeTokens(
        formatHex(random("oklch")),
        colorHarmonies[Math.floor(Math.random() * colorHarmonies.length)],
        state.stylePreset
      )
      let randomHarmony: HarmonyType = colorHarmonies[0]
      for (let i = 0; i < 50; i++) {
        const randomColor = formatHex(random("oklch"))
        randomHarmony = colorHarmonies[Math.floor(Math.random() * colorHarmonies.length)]
        tokens = computeTokens(randomColor, randomHarmony, state.stylePreset)
        const report = computeReport(tokens.light, tokens.dark)
        if (report.exportReady) break
      }
      return {
        ...state,
        harmonyType: randomHarmony,
        tokens,
        shadeMeta: {},
        report: computeReport(tokens.light, tokens.dark),
      }
    }
    case "SHUFFLE_HARMONY": {
      const randomPrimary = formatHex(random("oklch"))
      const tokens = computeTokens(randomPrimary, state.harmonyType, state.stylePreset)
      return {
        ...state,
        tokens,
        shadeMeta: {},
        report: computeReport(tokens.light, tokens.dark),
      }
    }
    case "SET_PREVIEW_MODE": {
      return { ...state, previewMode: action.payload }
    }
    case "LOAD_THEME":
      return { ...state, ...action.payload }
    case "SET_DISPLAY_FONT":
      return { ...state, fonts: { ...state.fonts, display: action.payload } }
    case "SET_BODY_FONT":
      return { ...state, fonts: { ...state.fonts, body: action.payload } }
    case "SET_MONO_FONT":
      return { ...state, fonts: { ...state.fonts, mono: action.payload } }
    case "APPLY_STYLE_PRESET": {
      const newStylePreset: StylePresetState = {
        activePreset: action.payload,
        overrides: undefined,
      }
      const tokens = computeTokens(
        state.tokens.light.primary,
        state.harmonyType,
        newStylePreset
      )
      return {
        ...state,
        stylePreset: newStylePreset,
        tokens,
        shadeMeta: {},
        report: computeReport(tokens.light, tokens.dark),
      }
    }
    case "UPDATE_LIGHT_TOKEN": {
      const newLight = { ...state.tokens.light, [action.payload.key]: action.payload.value }
      const fgKey = FOREGROUND_PAIRS[action.payload.key] as keyof ColorTokens | undefined
      if (fgKey) {
        newLight[fgKey] = computeForeground(action.payload.value)
      }
      const newDark = generateDarkTokens(newLight)
      const newStates = action.payload.key === "primary"
        ? generateStateColors(action.payload.value)
        : state.tokens.states
      const newDerivedLight = generateDerivedTokens(newLight)
      const newDerivedDark = generateDerivedTokens(newDark, true)
      return {
        ...state,
        tokens: { ...state.tokens, light: newLight, dark: newDark, states: newStates, derived: { light: newDerivedLight, dark: newDerivedDark } },
        report: computeReport(newLight, newDark),
      }
    }
    case "UPDATE_DARK_TOKEN": {
      const newDark = { ...state.tokens.dark, [action.payload.key]: action.payload.value }
      const fgKey = FOREGROUND_PAIRS[action.payload.key] as keyof ColorTokens | undefined
      if (fgKey) {
        newDark[fgKey] = computeForeground(action.payload.value)
      }
      const newDerivedDark = generateDerivedTokens(newDark, true)
      return {
        ...state,
        tokens: { ...state.tokens, dark: newDark, derived: { ...state.tokens.derived, dark: newDerivedDark } },
        report: computeReport(state.tokens.light, newDark),
      }
    }
    case "UPDATE_STATE_TOKEN": {
      return {
        ...state,
        tokens: { ...state.tokens, states: { ...state.tokens.states, [action.payload.key]: action.payload.value } },
      }
    }
    case "UPDATE_SHADE_META": {
      return {
        ...state,
        shadeMeta: { ...state.shadeMeta, [action.payload.key]: action.payload.index },
      }
    }
    case "SET_FONT_SIZE":
      return {
        ...state,
        fontCustomization: {
          ...state.fontCustomization,
          [action.payload.slot]: { ...state.fontCustomization[action.payload.slot], size: action.payload.value },
        },
      }
    case "SET_FONT_WEIGHT":
      return {
        ...state,
        fontCustomization: {
          ...state.fontCustomization,
          [action.payload.slot]: { ...state.fontCustomization[action.payload.slot], weight: action.payload.value },
        },
      }
    case "SET_FONT_STYLE":
      return {
        ...state,
        fontCustomization: {
          ...state.fontCustomization,
          [action.payload.slot]: { ...state.fontCustomization[action.payload.slot], italic: action.payload.value === "italic" },
        },
      }
    default:
      return state
  }
}

const DesignTokensContext = createContext<DesignTokensState | null>(null)
const DesignTokensDispatchContext = createContext<Dispatch<TokenAction> | null>(
  null
)

export function DesignTokensProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DesignTokensContext.Provider value={state}>
      <DesignTokensDispatchContext.Provider value={dispatch}>
        {children}
      </DesignTokensDispatchContext.Provider>
    </DesignTokensContext.Provider>
  )
}

export function useDesignTokens(): DesignTokensState {
  const ctx = useContext(DesignTokensContext)
  if (!ctx)
    throw new Error("useDesignTokens must be used within DesignTokensProvider")
  return ctx
}

export function useDesignTokensDispatch(): Dispatch<TokenAction> {
  const ctx = useContext(DesignTokensDispatchContext)
  if (!ctx)
    throw new Error(
      "useDesignTokensDispatch must be used within DesignTokensProvider"
    )
  return ctx
}

