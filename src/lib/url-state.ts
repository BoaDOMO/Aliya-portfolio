import type { DesignTokensState } from "./design-tokens-store"
import type { HarmonyType } from "./color-utils"
import { DEFAULT_STYLE_PRESET_ID } from "./style-preset-presets"

type EncodedState = {
  p?: string
  h?: HarmonyType
  cs?: DesignTokensState["colorSpace"]
  fd?: string | null
  fb?: string | null
  fm?: string | null
  sp?: string
}

const DEFAULTS: EncodedState = {
  p: "#2563EB",
  h: "analogous",
  cs: "hex",
  fd: "Archivo Narrow",
  fb: "Inter",
  fm: "JetBrains Mono",
  sp: DEFAULT_STYLE_PRESET_ID,
}

const LS_KEY = "aliya-ds-theme"

function minimize(state: DesignTokensState): EncodedState {
  const { tokens, harmonyType, colorSpace, fonts, stylePreset } = state
  const e: EncodedState = {}

  if (tokens.light.primary !== DEFAULTS.p) e.p = tokens.light.primary
  if (harmonyType !== DEFAULTS.h) e.h = harmonyType
  if (colorSpace !== DEFAULTS.cs) e.cs = colorSpace
  if (fonts.display !== DEFAULTS.fd) e.fd = fonts.display
  if (fonts.body !== DEFAULTS.fb) e.fb = fonts.body
  if (fonts.mono !== DEFAULTS.fm) e.fm = fonts.mono
  if (stylePreset.activePreset !== DEFAULTS.sp) e.sp = stylePreset.activePreset ?? undefined

  return e
}

function expand(encoded: EncodedState): Partial<DesignTokensState> {
  return {
    harmonyType: encoded.h ?? DEFAULTS.h!,
    colorSpace: encoded.cs ?? DEFAULTS.cs!,
    fonts: {
      display: encoded.fd ?? DEFAULTS.fd!,
      body: encoded.fb ?? DEFAULTS.fb!,
      mono: encoded.fm ?? DEFAULTS.fm!,
    },
    stylePreset: {
      activePreset: encoded.sp ?? DEFAULTS.sp!,
    },
  }
}

export function encodeThemeState(state: DesignTokensState): string | null {
  const mini = minimize(state)
  if (Object.keys(mini).length === 0) return null

  try {
    const json = JSON.stringify(mini)
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

export function decodeThemeState(
  encoded: string
): Partial<DesignTokensState> | null {
  try {
    const json = decodeURIComponent(escape(atob(decodeURIComponent(encoded))))
    const parsed = JSON.parse(json) as EncodedState
    return expand(parsed)
  } catch {
    return null
  }
}

export function saveToLocalStorage(state: DesignTokensState): void {
  try {
    const json = JSON.stringify(minimize(state))
    localStorage.setItem(LS_KEY, json)
  } catch {
    // localStorage may be full or unavailable
  }
}

export function loadFromLocalStorage(): Partial<DesignTokensState> | null {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as EncodedState
    return expand(parsed)
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

    if (encoded) {
      url.searchParams.set("theme", encoded)
    } else {
      url.searchParams.delete("theme")
    }

    window.history.replaceState(null, "", url.toString())
  }, 150)
}

export function readURLTheme(): Partial<DesignTokensState> | null {
  const params = new URLSearchParams(window.location.search)
  const encoded = params.get("theme")
  if (!encoded) return null
  return decodeThemeState(encoded)
}

export function readURLPrimaryColor(): string | null {
  const params = new URLSearchParams(window.location.search)
  const encoded = params.get("theme")
  if (!encoded) return null
  try {
    const json = decodeURIComponent(escape(atob(decodeURIComponent(encoded))))
    const parsed = JSON.parse(json) as EncodedState
    return parsed.p ?? null
  } catch {
    return null
  }
}
