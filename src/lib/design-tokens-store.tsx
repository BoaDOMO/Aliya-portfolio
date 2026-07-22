import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type Dispatch,
} from "react"
import { formatHex, random } from "culori"
import {
  computeForeground,
  generateDarkTokens,
  generateDerivedTokens,
  generateHarmony,
  generateNeutrals,
  generateStateColors,
  type ColorTokens,
  type DerivedTokens,
  type HarmonyType,
  type StateColors,
} from "./color-utils"
import { checkAllPairs, checkStatePairs, type ContrastResult } from "./contrast-utils"
import { getCVDMatrix, type CVDType } from "./color-blindness"
import type { StylePresetState } from "./style-preset-types"
import {
  STYLE_PRESETS,
  getDefaultPreset,
  getPresetById,
} from "./style-preset-presets"
import { applyColorRulesToTokens, getEffectiveHarmony } from "./style-preset-utils"
import { SMART_PAIRINGS, injectFontLink, removeFontLink } from "./google-fonts"
import { getTypeScale, type SemanticTypeScale, type TypeScaleId } from "./type-scale"
import { DEFAULT_THEME_RECIPE } from "./theme-recipe-defaults"

const FOREGROUND_PAIRS: Partial<Record<keyof ColorTokens, keyof ColorTokens>> = {
  primary: "primary-foreground",
  secondary: "secondary-foreground",
  accent: "accent-foreground",
  muted: "muted-foreground",
  background: "foreground",
  card: "card-foreground",
  popover: "popover-foreground",
}

const STATE_FOREGROUND_PAIRS: Partial<Record<keyof StateColors, keyof StateColors>> = {
  info: "info-foreground",
  success: "success-foreground",
  warning: "warning-foreground",
  destructive: "destructive-foreground",
}

export type ColorSpace = "hex" | "rgb" | "hsl" | "oklch"
export type ColorIntent = "neutral" | "subtle" | "expressive"
export type Severity = "pass" | "warning" | "error"

export interface QualityReport {
  contrast: {
    status: Severity
    pairs: ContrastResult[]
    darkPairs: ContrastResult[]
    statePairs: ContrastResult[]
  }
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

export interface TokenOverrides {
  light: Partial<ColorTokens>
  dark: Partial<ColorTokens>
  states: Partial<StateColors>
}

export interface ThemeRecipe {
  primaryColor: string
  colorIntent: ColorIntent
  harmonyType: HarmonyType
  fonts: FontSlots
  fontCustomization: FontCustomization
  fontCustomizationOverridden: { display: boolean; body: boolean; mono: boolean }
  typographyMatchPreset: boolean
  typeScaleId: TypeScaleId
  stylePreset: StylePresetState
  overrides: TokenOverrides
}

export interface HistoryState {
  past: ThemeRecipe[]
  future: ThemeRecipe[]
}

export interface DesignTokensState {
  recipe: ThemeRecipe
  colorSpace: ColorSpace
  harmonyType: HarmonyType
  colorIntent: ColorIntent
  previewMode: "light" | "dark"
  tokens: {
    light: ColorTokens
    dark: ColorTokens
    states: StateColors
    derived: { light: DerivedTokens; dark: DerivedTokens }
    harmonyPalette: string[]
  }
  fonts: FontSlots
  fontCustomization: FontCustomization
  fontCustomizationOverridden: { display: boolean; body: boolean; mono: boolean }
  typographyMatchPreset: boolean
  typeScaleId: TypeScaleId
  typeScale: SemanticTypeScale
  stylePreset: StylePresetState
  borderSize: number
  shadeMeta: ShadeMeta
  report: QualityReport
  history: HistoryState
}

export type TokenAction =
  | { type: "SET_PRIMARY_COLOR"; payload: string }
  | { type: "SET_COLOR_INTENT"; payload: ColorIntent }
  | { type: "SET_HARMONY_TYPE"; payload: HarmonyType }
  | { type: "SET_COLOR_SPACE"; payload: ColorSpace }
  | { type: "RANDOMIZE_ALL" }
  | { type: "RANDOMIZE_COLORS" }
  | { type: "SET_PREVIEW_MODE"; payload: "light" | "dark" }
  | { type: "LOAD_THEME"; payload: Partial<DesignTokensState> }
  | { type: "SET_DISPLAY_FONT"; payload: string | null }
  | { type: "SET_BODY_FONT"; payload: string | null }
  | { type: "SET_MONO_FONT"; payload: string | null }
  | { type: "SET_FONT_PAIR"; payload: FontSlots }
  | { type: "SET_TYPE_SCALE"; payload: TypeScaleId }
  | { type: "APPLY_STYLE_PRESET"; payload: string }
  | { type: "UPDATE_LIGHT_TOKEN"; payload: { key: keyof ColorTokens; value: string } }
  | { type: "UPDATE_STATE_TOKEN"; payload: { key: keyof StateColors; value: string } }
  | { type: "SET_FONT_SIZE"; payload: { slot: "display" | "body" | "mono"; value: number } }
  | { type: "SET_FONT_WEIGHT"; payload: { slot: "display" | "body" | "mono"; value: number } }
  | { type: "SET_FONT_STYLE"; payload: { slot: "display" | "body" | "mono"; value: "normal" | "italic" } }
  | { type: "UPDATE_DARK_TOKEN"; payload: { key: keyof ColorTokens; value: string } }
  | { type: "SHUFFLE_HARMONY" }
  | { type: "UPDATE_SHADE_META"; payload: { key: string; index: number | null } }
  | { type: "SET_TYPOGRAPHY_MATCH_PRESET"; payload: boolean }
  | { type: "UNDO" }
  | { type: "REDO" }

const HISTORY_LIMIT = 30
const INTENT_HARMONIES: Record<ColorIntent, HarmonyType> = {
  neutral: "shadcn",
  subtle: "analogous",
  expressive: "complementary",
}

function ensureExtendedTokens(tokens: ColorTokens): ColorTokens {
  const featuredSurface = tokens["surface-featured"] ?? tokens.popover
  return {
    ...tokens,
    "surface-raised": tokens.card,
    "surface-featured": featuredSurface,
    popover: featuredSurface,
    "popover-foreground": computeForeground(featuredSurface),
    "border-strong": tokens["border-strong"] ?? tokens.border,
  }
}

function applyTokenOverrides<T extends object>(
  base: T,
  overrides: Partial<T>,
  pairs: Partial<Record<keyof T, keyof T>>,
): T {
  const next = { ...base, ...overrides } as T
  const nextRecord = next as Record<string, string>
  const overrideRecord = overrides as Record<string, string>
  for (const [rawBackgroundKey, rawForegroundKey] of Object.entries(pairs) as Array<[string, string]>) {
    if (rawBackgroundKey in overrideRecord && !(rawForegroundKey in overrideRecord)) {
      nextRecord[rawForegroundKey] = computeForeground(nextRecord[rawBackgroundKey])
    }
  }
  return next
}

function colorIntentFromHarmony(harmony: HarmonyType): ColorIntent {
  if (harmony === "shadcn" || harmony === "monochromatic") return "neutral"
  if (harmony === "analogous" || harmony === "analogous-accent") return "subtle"
  return "expressive"
}

function scaleIdFromPreset(displaySize: number): TypeScaleId {
  if (displaySize <= 44) return "compact"
  if (displaySize >= 56) return "editorial"
  return "balanced"
}

function customizationFromScale(
  scaleId: TypeScaleId,
  current: FontCustomization,
): FontCustomization {
  const scale = getTypeScale(scaleId)
  return {
    display: { ...current.display, size: scale.display },
    body: { ...current.body, size: scale.body },
    mono: { ...current.mono, size: scale.code },
  }
}

function resolveTokens(recipe: ThemeRecipe) {
  const preset = getPresetById(recipe.stylePreset.activePreset)
  const requestedHarmony = INTENT_HARMONIES[recipe.colorIntent] ?? recipe.harmonyType
  const effectiveHarmony = getEffectiveHarmony(requestedHarmony, preset)
  const harmony = generateHarmony(recipe.primaryColor, effectiveHarmony)
  const neutralBase = generateNeutrals(recipe.primaryColor)

  if (recipe.colorIntent !== "neutral") {
    neutralBase.secondary = harmony.secondary
    neutralBase.accent = harmony.accent
    neutralBase.muted = harmony.muted
    neutralBase["secondary-foreground"] = computeForeground(harmony.secondary)
    neutralBase["accent-foreground"] = computeForeground(harmony.accent)
    neutralBase["muted-foreground"] = computeForeground(harmony.muted)
  }

  const presetLight = applyColorRulesToTokens(neutralBase, preset, false)
  const light = ensureExtendedTokens(
    applyTokenOverrides(presetLight, recipe.overrides.light, FOREGROUND_PAIRS),
  )
  const generatedDark = generateDarkTokens(light, preset?.colorRules.darkRules)
  const presetDark = applyColorRulesToTokens(generatedDark, preset, true)
  const dark = ensureExtendedTokens(
    applyTokenOverrides(presetDark, recipe.overrides.dark, FOREGROUND_PAIRS),
  )
  const generatedStates = generateStateColors(
    recipe.primaryColor,
    preset?.colorRules.stateColors,
  )
  const states = applyTokenOverrides(
    generatedStates,
    recipe.overrides.states,
    STATE_FOREGROUND_PAIRS,
  )

  return {
    light,
    dark,
    states,
    derived: {
      light: generateDerivedTokens(light),
      dark: generateDerivedTokens(dark, true),
    },
    harmonyPalette: harmony.palette,
    effectiveHarmony,
  }
}

function parseHex(hex: string): [number, number, number] | null {
  const match = /^#([0-9a-f]{6})$/i.exec(hex)
  if (!match) return null
  return [0, 2, 4].map((offset) => parseInt(match[1].slice(offset, offset + 2), 16)) as [number, number, number]
}

function simulateCVD(hex: string, type: CVDType): [number, number, number] | null {
  const rgb = parseHex(hex)
  if (!rgb) return null
  const matrix = getCVDMatrix(type).split(" ").map(Number)
  return [0, 1, 2].map((row) => {
    const offset = row * 5
    return Math.max(0, Math.min(255,
      rgb[0] * matrix[offset] + rgb[1] * matrix[offset + 1] + rgb[2] * matrix[offset + 2],
    ))
  }) as [number, number, number]
}

function colorDistance(a: [number, number, number], b: [number, number, number]): number {
  return Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
    Math.pow(a[1] - b[1], 2) +
    Math.pow(a[2] - b[2], 2),
  )
}

function colorVisionWarnings(states: StateColors): string[] {
  const warnings = new Set<string>()
  const pairs: Array<[keyof StateColors, keyof StateColors]> = [
    ["success", "destructive"],
    ["success", "warning"],
    ["info", "success"],
  ]
  const modes: CVDType[] = ["protanopia", "deuteranopia", "tritanopia"]

  for (const mode of modes) {
    for (const [leftKey, rightKey] of pairs) {
      const left = simulateCVD(states[leftKey], mode)
      const right = simulateCVD(states[rightKey], mode)
      if (left && right && colorDistance(left, right) < 48) {
        warnings.add(`${String(leftKey)} and ${String(rightKey)} are difficult to distinguish in ${mode}.`)
      }
    }
  }
  return Array.from(warnings)
}

function computeReport(
  lightTokens: ColorTokens,
  darkTokens: ColorTokens,
  states: StateColors,
): QualityReport {
  const lightPairs = checkAllPairs(lightTokens)
  const darkPairs = checkAllPairs(darkTokens)
  const statePairs = checkStatePairs(states)
  const lightFailing = lightPairs.filter((pair) => pair.grade === "fail")
  const darkFailing = darkPairs.filter((pair) => pair.grade === "fail")
  const stateFailing = statePairs.filter((pair) => pair.grade === "fail")
  const cvdWarnings = colorVisionWarnings(states)
  const allTokens = {
    ...lightTokens,
    ...Object.fromEntries(Object.entries(darkTokens).map(([key, value]) => [`dark.${key}`, value])),
    ...Object.fromEntries(Object.entries(states).map(([key, value]) => [`state.${key}`, value])),
  }
  const missing = Object.entries(allTokens)
    .filter(([, value]) => !/^#[0-9a-f]{6}$/i.test(value))
    .map(([key]) => key)
  const darkWarnings = darkFailing.map(
    (pair) => `${pair.label}: ${pair.ratio.toFixed(1)}:1`,
  )

  return {
    contrast: {
      status: lightFailing.length || stateFailing.length ? "error" : "pass",
      pairs: lightPairs,
      darkPairs,
      statePairs,
    },
    accessibility: {
      status: cvdWarnings.length ? "warning" : "pass",
      cvdWarnings,
    },
    darkMode: {
      status: darkFailing.length ? "error" : "pass",
      warnings: darkWarnings,
    },
    completeness: {
      status: missing.length ? "error" : "pass",
      missing,
    },
    exportReady:
      lightFailing.length === 0 &&
      darkFailing.length === 0 &&
      stateFailing.length === 0 &&
      missing.length === 0,
  }
}

function buildState(
  recipe: ThemeRecipe,
  current?: Pick<DesignTokensState, "colorSpace" | "previewMode" | "borderSize" | "shadeMeta">,
  history: HistoryState = { past: [], future: [] },
): DesignTokensState {
  const resolved = resolveTokens(recipe)
  return {
    recipe,
    colorSpace: current?.colorSpace ?? "hex",
    harmonyType: resolved.effectiveHarmony,
    colorIntent: recipe.colorIntent,
    previewMode: current?.previewMode ?? "light",
    tokens: resolved,
    fonts: recipe.fonts,
    fontCustomization: recipe.fontCustomization,
    fontCustomizationOverridden: recipe.fontCustomizationOverridden,
    typographyMatchPreset: recipe.typographyMatchPreset,
    typeScaleId: recipe.typeScaleId,
    typeScale: getTypeScale(recipe.typeScaleId),
    stylePreset: recipe.stylePreset,
    borderSize: current?.borderSize ?? 1,
    shadeMeta: current?.shadeMeta ?? {},
    report: computeReport(resolved.light, resolved.dark, resolved.states),
    history,
  }
}

function commitRecipe(state: DesignTokensState, recipe: ThemeRecipe): DesignTokensState {
  const past = [...state.history.past, state.recipe].slice(-HISTORY_LIMIT)
  return buildState(recipe, state, { past, future: [] })
}

function randomRecipeColor(state: DesignTokensState): ThemeRecipe {
  const intents: ColorIntent[] = ["neutral", "subtle", "expressive"]
  let candidate = state.recipe
  for (let attempt = 0; attempt < 50; attempt++) {
    candidate = {
      ...state.recipe,
      primaryColor: formatHex(random("oklch")),
      colorIntent: intents[Math.floor(Math.random() * intents.length)],
      overrides: { light: {}, dark: {}, states: {} },
    }
    const resolved = resolveTokens(candidate)
    if (computeReport(resolved.light, resolved.dark, resolved.states).exportReady) break
  }
  return candidate
}

const initialState = buildState(DEFAULT_THEME_RECIPE)

function reducer(state: DesignTokensState, action: TokenAction): DesignTokensState {
  switch (action.type) {
    case "SET_PRIMARY_COLOR":
      return commitRecipe(state, { ...state.recipe, primaryColor: action.payload })
    case "SET_COLOR_INTENT":
      return commitRecipe(state, {
        ...state.recipe,
        colorIntent: action.payload,
        harmonyType: INTENT_HARMONIES[action.payload],
      })
    case "SET_HARMONY_TYPE":
      return commitRecipe(state, {
        ...state.recipe,
        harmonyType: action.payload,
        colorIntent: colorIntentFromHarmony(action.payload),
      })
    case "SET_COLOR_SPACE":
      return { ...state, colorSpace: action.payload }
    case "RANDOMIZE_COLORS":
    case "SHUFFLE_HARMONY":
      return commitRecipe(state, randomRecipeColor(state))
    case "RANDOMIZE_ALL": {
      const preset = STYLE_PRESETS[Math.floor(Math.random() * STYLE_PRESETS.length)] ?? getDefaultPreset()
      const pairing = SMART_PAIRINGS[Math.floor(Math.random() * SMART_PAIRINGS.length)]
      const base = randomRecipeColor(state)
      const typeScaleId = scaleIdFromPreset(preset.typography.scale.display.size)
      const nextRecipe: ThemeRecipe = {
        ...base,
        stylePreset: { activePreset: preset.id },
        fonts: pairing
          ? { display: pairing.display, body: pairing.body, mono: pairing.mono }
          : base.fonts,
        typographyMatchPreset: false,
        typeScaleId,
        fontCustomization: customizationFromScale(typeScaleId, base.fontCustomization),
      }
      return commitRecipe(state, nextRecipe)
    }
    case "SET_PREVIEW_MODE":
      return { ...state, previewMode: action.payload }
    case "LOAD_THEME": {
      const payloadRecipe = action.payload.recipe
      const legacyPrimary = action.payload.tokens?.light.primary
      const recipe: ThemeRecipe = payloadRecipe
        ? {
            ...DEFAULT_THEME_RECIPE,
            ...payloadRecipe,
            fonts: { ...DEFAULT_THEME_RECIPE.fonts, ...payloadRecipe.fonts },
            fontCustomization: {
              ...DEFAULT_THEME_RECIPE.fontCustomization,
              ...payloadRecipe.fontCustomization,
            },
            fontCustomizationOverridden: {
              ...DEFAULT_THEME_RECIPE.fontCustomizationOverridden,
              ...payloadRecipe.fontCustomizationOverridden,
            },
            stylePreset: {
              ...DEFAULT_THEME_RECIPE.stylePreset,
              ...payloadRecipe.stylePreset,
            },
            overrides: {
              light: payloadRecipe.overrides?.light ?? {},
              dark: payloadRecipe.overrides?.dark ?? {},
              states: payloadRecipe.overrides?.states ?? {},
            },
          }
        : {
            ...state.recipe,
            primaryColor: legacyPrimary ?? state.recipe.primaryColor,
            harmonyType: action.payload.harmonyType ?? state.recipe.harmonyType,
            colorIntent: action.payload.colorIntent ?? state.recipe.colorIntent,
            fonts: action.payload.fonts ?? state.recipe.fonts,
            fontCustomization:
              action.payload.fontCustomization ?? state.recipe.fontCustomization,
            fontCustomizationOverridden:
              action.payload.fontCustomizationOverridden ??
              state.recipe.fontCustomizationOverridden,
            typographyMatchPreset:
              action.payload.typographyMatchPreset ?? state.recipe.typographyMatchPreset,
            typeScaleId: action.payload.typeScaleId ?? state.recipe.typeScaleId,
            stylePreset: action.payload.stylePreset ?? state.recipe.stylePreset,
          }
      return buildState(
        recipe,
        {
          ...state,
          colorSpace: action.payload.colorSpace ?? state.colorSpace,
          previewMode: action.payload.previewMode ?? state.previewMode,
        },
      )
    }
    case "SET_DISPLAY_FONT":
    case "SET_BODY_FONT":
    case "SET_MONO_FONT": {
      const slot = action.type === "SET_DISPLAY_FONT"
        ? "display"
        : action.type === "SET_BODY_FONT"
          ? "body"
          : "mono"
      return commitRecipe(state, {
        ...state.recipe,
        fonts: { ...state.recipe.fonts, [slot]: action.payload },
        typographyMatchPreset: false,
      })
    }
    case "SET_FONT_PAIR":
      return commitRecipe(state, {
        ...state.recipe,
        fonts: action.payload,
        typographyMatchPreset: false,
      })
    case "SET_TYPE_SCALE":
      return commitRecipe(state, {
        ...state.recipe,
        typeScaleId: action.payload,
        fontCustomization: customizationFromScale(
          action.payload,
          state.recipe.fontCustomization,
        ),
        typographyMatchPreset: false,
      })
    case "APPLY_STYLE_PRESET": {
      const preset = getPresetById(action.payload)
      if (!preset) return state
      const stylePreset = { activePreset: action.payload }
      const typeScaleId = scaleIdFromPreset(preset.typography.scale.display.size)
      const recipe: ThemeRecipe = {
        ...state.recipe,
        stylePreset,
        colorIntent: colorIntentFromHarmony(preset.colorRules.defaultHarmony),
        harmonyType: preset.colorRules.defaultHarmony,
        overrides: { light: {}, dark: {}, states: {} },
      }
      if (state.recipe.typographyMatchPreset) {
        recipe.fonts = {
          display: preset.typography.displayFont,
          body: preset.typography.bodyFont,
          mono: preset.typography.monoFont,
        }
        recipe.typeScaleId = typeScaleId
        recipe.fontCustomization = {
          display: {
            size: getTypeScale(typeScaleId).display,
            weight: preset.typography.scale.display.weight,
            italic: false,
          },
          body: {
            size: getTypeScale(typeScaleId).body,
            weight: preset.typography.scale.body.weight,
            italic: false,
          },
          mono: {
            size: getTypeScale(typeScaleId).code,
            weight: preset.typography.scale.mono.weight,
            italic: false,
          },
        }
      }
      return commitRecipe(state, recipe)
    }
    case "UPDATE_LIGHT_TOKEN": {
      if (action.payload.key === "primary") {
        return commitRecipe(state, {
          ...state.recipe,
          primaryColor: action.payload.value,
        })
      }
      return commitRecipe(state, {
        ...state.recipe,
        overrides: {
          ...state.recipe.overrides,
          light: {
            ...state.recipe.overrides.light,
            [action.payload.key]: action.payload.value,
          },
        },
      })
    }
    case "UPDATE_DARK_TOKEN":
      return commitRecipe(state, {
        ...state.recipe,
        overrides: {
          ...state.recipe.overrides,
          dark: {
            ...state.recipe.overrides.dark,
            [action.payload.key]: action.payload.value,
          },
        },
      })
    case "UPDATE_STATE_TOKEN":
      return commitRecipe(state, {
        ...state.recipe,
        overrides: {
          ...state.recipe.overrides,
          states: {
            ...state.recipe.overrides.states,
            [action.payload.key]: action.payload.value,
          },
        },
      })
    case "UPDATE_SHADE_META":
      return {
        ...state,
        shadeMeta: { ...state.shadeMeta, [action.payload.key]: action.payload.index },
      }
    case "SET_FONT_SIZE":
    case "SET_FONT_WEIGHT":
    case "SET_FONT_STYLE": {
      const slot = action.payload.slot
      const current = state.recipe.fontCustomization[slot]
      const nextSlot = action.type === "SET_FONT_SIZE"
        ? { ...current, size: action.payload.value }
        : action.type === "SET_FONT_WEIGHT"
          ? { ...current, weight: action.payload.value }
          : { ...current, italic: action.payload.value === "italic" }
      return commitRecipe(state, {
        ...state.recipe,
        fontCustomization: {
          ...state.recipe.fontCustomization,
          [slot]: nextSlot,
        },
        fontCustomizationOverridden: {
          ...state.recipe.fontCustomizationOverridden,
          [slot]: true,
        },
        typographyMatchPreset: false,
      })
    }
    case "SET_TYPOGRAPHY_MATCH_PRESET": {
      if (!action.payload) {
        return commitRecipe(state, {
          ...state.recipe,
          typographyMatchPreset: false,
        })
      }
      const preset = getPresetById(state.recipe.stylePreset.activePreset)
      if (!preset) return state
      const typeScaleId = scaleIdFromPreset(preset.typography.scale.display.size)
      return commitRecipe(state, {
        ...state.recipe,
        typographyMatchPreset: true,
        fonts: {
          display: preset.typography.displayFont,
          body: preset.typography.bodyFont,
          mono: preset.typography.monoFont,
        },
        typeScaleId,
        fontCustomization: customizationFromScale(
          typeScaleId,
          state.recipe.fontCustomization,
        ),
        fontCustomizationOverridden: { display: false, body: false, mono: false },
      })
    }
    case "UNDO": {
      const previous = state.history.past[state.history.past.length - 1]
      if (!previous) return state
      return buildState(previous, state, {
        past: state.history.past.slice(0, -1),
        future: [state.recipe, ...state.history.future].slice(0, HISTORY_LIMIT),
      })
    }
    case "REDO": {
      const next = state.history.future[0]
      if (!next) return state
      return buildState(next, state, {
        past: [...state.history.past, state.recipe].slice(-HISTORY_LIMIT),
        future: state.history.future.slice(1),
      })
    }
    default:
      return state
  }
}

export const DesignTokensContext = createContext<DesignTokensState | null>(null)
export const DesignTokensDispatchContext = createContext<Dispatch<TokenAction> | null>(null)

export function useDesignTokensStore() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const injected = useRef<Set<string>>(new Set())

  useEffect(() => {
    const families = [state.fonts.display, state.fonts.body, state.fonts.mono]
      .filter(Boolean) as string[]
    const familySet = new Set(families)

    for (const family of Array.from(injected.current)) {
      if (!familySet.has(family)) {
        removeFontLink(family)
        injected.current.delete(family)
      }
    }

    for (const family of families) {
      if (!injected.current.has(family)) {
        injectFontLink(family)
        injected.current.add(family)
      }
    }
  }, [state.fonts.display, state.fonts.body, state.fonts.mono])

  return [state, dispatch] as const
}

export function useDesignTokens(): DesignTokensState {
  const context = useContext(DesignTokensContext)
  if (!context) {
    throw new Error("useDesignTokens must be used within DesignTokensProvider")
  }
  return context
}

export function useDesignTokensDispatch(): Dispatch<TokenAction> {
  const context = useContext(DesignTokensDispatchContext)
  if (!context) {
    throw new Error("useDesignTokensDispatch must be used within DesignTokensProvider")
  }
  return context
}
