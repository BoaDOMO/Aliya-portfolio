import type { DesignTokensState } from "./design-tokens-store"
import { minimize as urlMinimize, expand as urlExpand } from "./url-state"

const AUTOSAVE_KEY = "aliya-ds:autosave"

export function saveToLocalStorage(state: DesignTokensState): void {
  try {
    const json = JSON.stringify(urlMinimize(state))
    localStorage.setItem(AUTOSAVE_KEY, json)
  } catch {
    // localStorage may be full or unavailable
  }
}

export function loadAutosave(): Partial<DesignTokensState> | null {
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return urlExpand(parsed)
  } catch {
    return null
  }
}

export function clearAutosave(): void {
  try {
    localStorage.removeItem(AUTOSAVE_KEY)
  } catch {
    // ignore
  }
}

let autosaveTimer: ReturnType<typeof setTimeout> | null = null

export function debouncedAutosave(state: DesignTokensState): void {
  if (autosaveTimer) clearTimeout(autosaveTimer)
  autosaveTimer = setTimeout(() => {
    saveToLocalStorage(state)
  }, 1000)
}

const ONBOARDING_KEY = "aliya-ds:onboarding-dismissed"

export function isOnboardingDismissed(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_KEY) === "1"
  } catch {
    return false
  }
}

export function dismissOnboarding(): void {
  try {
    localStorage.setItem(ONBOARDING_KEY, "1")
  } catch {
    // ignore
  }
}
