import {
  type ColorIntent,
  type DesignTokensState,
  type FontCustomization,
  type ThemeRecipe,
  type TokenOverrides,
} from "./design-tokens-store"
import { DEFAULT_THEME_RECIPE } from "./theme-recipe-defaults"
import type { HarmonyType } from "./color-utils"
import type { TypeScaleId } from "./type-scale"

type EncodedState = {
  v?: 2
  p?: string
  ci?: ColorIntent
  h?: HarmonyType
  cs?: DesignTokensState["colorSpace"]
  fd?: string | null
  fb?: string | null
  fm?: string | null
  fc?: FontCustomization
  fo?: ThemeRecipe["fontCustomizationOverridden"]
  tmp?: boolean
  ts?: TypeScaleId
  sp?: string
  ov?: TokenOverrides
}

const LS_KEY = "aliya-ds-theme"

function isEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right)
}

export function minimize(state: DesignTokensState): EncodedState {
  const { recipe } = state
  const encoded: EncodedState = { v: 2 }

  if (recipe.primaryColor !== DEFAULT_THEME_RECIPE.primaryColor) encoded.p = recipe.primaryColor
  if (recipe.colorIntent !== DEFAULT_THEME_RECIPE.colorIntent) encoded.ci = recipe.colorIntent
  if (recipe.harmonyType !== DEFAULT_THEME_RECIPE.harmonyType) encoded.h = recipe.harmonyType
  if (state.colorSpace !== "hex") encoded.cs = state.colorSpace
  if (recipe.fonts.display !== DEFAULT_THEME_RECIPE.fonts.display) encoded.fd = recipe.fonts.display
  if (recipe.fonts.body !== DEFAULT_THEME_RECIPE.fonts.body) encoded.fb = recipe.fonts.body
  if (recipe.fonts.mono !== DEFAULT_THEME_RECIPE.fonts.mono) encoded.fm = recipe.fonts.mono
  if (!isEqual(recipe.fontCustomization, DEFAULT_THEME_RECIPE.fontCustomization)) {
    encoded.fc = recipe.fontCustomization
  }
  if (!isEqual(
    recipe.fontCustomizationOverridden,
    DEFAULT_THEME_RECIPE.fontCustomizationOverridden,
  )) {
    encoded.fo = recipe.fontCustomizationOverridden
  }
  if (recipe.typographyMatchPreset !== DEFAULT_THEME_RECIPE.typographyMatchPreset) {
    encoded.tmp = recipe.typographyMatchPreset
  }
  if (recipe.typeScaleId !== DEFAULT_THEME_RECIPE.typeScaleId) encoded.ts = recipe.typeScaleId
  if (recipe.stylePreset.activePreset !== DEFAULT_THEME_RECIPE.stylePreset.activePreset) {
    encoded.sp = recipe.stylePreset.activePreset ?? undefined
  }
  if (
    Object.keys(recipe.overrides.light).length ||
    Object.keys(recipe.overrides.dark).length ||
    Object.keys(recipe.overrides.states).length
  ) {
    encoded.ov = recipe.overrides
  }

  return encoded
}

export function expand(encoded: EncodedState): Partial<DesignTokensState> {
  const recipe: ThemeRecipe = {
    ...DEFAULT_THEME_RECIPE,
    primaryColor: encoded.p ?? DEFAULT_THEME_RECIPE.primaryColor,
    colorIntent: encoded.ci ?? DEFAULT_THEME_RECIPE.colorIntent,
    harmonyType: encoded.h ?? DEFAULT_THEME_RECIPE.harmonyType,
    fonts: {
      display: encoded.fd ?? DEFAULT_THEME_RECIPE.fonts.display,
      body: encoded.fb ?? DEFAULT_THEME_RECIPE.fonts.body,
      mono: encoded.fm ?? DEFAULT_THEME_RECIPE.fonts.mono,
    },
    fontCustomization: encoded.fc ?? DEFAULT_THEME_RECIPE.fontCustomization,
    fontCustomizationOverridden:
      encoded.fo ?? DEFAULT_THEME_RECIPE.fontCustomizationOverridden,
    typographyMatchPreset:
      encoded.tmp ?? DEFAULT_THEME_RECIPE.typographyMatchPreset,
    typeScaleId: encoded.ts ?? DEFAULT_THEME_RECIPE.typeScaleId,
    stylePreset: {
      activePreset: encoded.sp ?? DEFAULT_THEME_RECIPE.stylePreset.activePreset,
    },
    overrides: encoded.ov ?? { light: {}, dark: {}, states: {} },
  }

  return {
    recipe,
    colorSpace: encoded.cs ?? "hex",
  }
}

export function encodeThemeState(state: DesignTokensState): string | null {
  const minimized = minimize(state)
  if (Object.keys(minimized).length === 1) return null

  try {
    const json = JSON.stringify(minimized)
    const base64 = btoa(unescape(encodeURIComponent(json)))
    const param = encodeURIComponent(base64)
    if (param.length > 2000) {
      saveToLocalStorage(state)
      return null
    }
    return param
  } catch {
    return null
  }
}

export function decodeThemeState(encoded: string): Partial<DesignTokensState> | null {
  try {
    const json = decodeURIComponent(escape(atob(decodeURIComponent(encoded))))
    return expand(JSON.parse(json) as EncodedState)
  } catch {
    return null
  }
}

export function saveToLocalStorage(state: DesignTokensState): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(minimize(state)))
  } catch {
    // localStorage may be full or unavailable
  }
}

export function loadFromLocalStorage(): Partial<DesignTokensState> | null {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? expand(JSON.parse(raw) as EncodedState) : null
  } catch {
    return null
  }
}

let syncTimer: ReturnType<typeof setTimeout> | null = null

export function syncToURL(state: DesignTokensState): void {
  if (syncTimer) clearTimeout(syncTimer)
  syncTimer = setTimeout(() => {
    const encoded = encodeThemeState(state)
    const url = new URL(window.location.href)
    if (encoded) url.searchParams.set("theme", encoded)
    else url.searchParams.delete("theme")
    window.history.replaceState(null, "", url.toString())
  }, 500)
}

export function readURLTheme(): Partial<DesignTokensState> | null {
  const encoded = new URLSearchParams(window.location.search).get("theme")
  return encoded ? decodeThemeState(encoded) : null
}

export function readURLPrimaryColor(): string | null {
  const decoded = readURLTheme()
  return decoded?.recipe?.primaryColor ?? null
}
