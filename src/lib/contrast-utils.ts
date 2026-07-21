import { wcagLuminance } from "culori"
import type { ColorTokens, StateColors } from "./color-utils"

export interface ContrastResult {
  label: string
  fg: string
  bg: string
  ratio: number
  grade: "fail" | "aa" | "aaa"
}

export function getLuminance(hex: string): number {
  return wcagLuminance(hex)
}

export function getContrastRatio(fg: string, bg: string): number {
  const l1 = getLuminance(fg)
  const l2 = getLuminance(bg)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function getContrastGrade(ratio: number): "fail" | "aa" | "aaa" {
  if (ratio >= 7) return "aaa"
  if (ratio >= 4.5) return "aa"
  return "fail"
}

export function checkAllPairs(tokens: ColorTokens): ContrastResult[] {
  const pairs: { label: string; fg: string; bg: string }[] = [
    {
      label: "primary-fg ↔ primary",
      fg: tokens["primary-foreground"],
      bg: tokens.primary,
    },
    {
      label: "foreground ↔ background",
      fg: tokens.foreground,
      bg: tokens.background,
    },
    {
      label: "foreground ↔ card",
      fg: tokens.foreground,
      bg: tokens.card,
    },
    {
      label: "muted-fg ↔ muted",
      fg: tokens["muted-foreground"],
      bg: tokens.muted,
    },
    {
      label: "secondary-fg ↔ secondary",
      fg: tokens["secondary-foreground"],
      bg: tokens.secondary,
    },
    {
      label: "accent-fg ↔ accent",
      fg: tokens["accent-foreground"],
      bg: tokens.accent,
    },
  ]

  return pairs.map((p) => {
    const ratio = getContrastRatio(p.fg, p.bg)
    return {
      label: p.label,
      fg: p.fg,
      bg: p.bg,
      ratio: Math.round(ratio * 100) / 100,
      grade: getContrastGrade(ratio),
    }
  })
}

export function checkStatePairs(states: StateColors): ContrastResult[] {
  const pairs: { label: string; fg: string; bg: string }[] = [
    {
      label: "success-fg ↔ success",
      fg: states["success-foreground"],
      bg: states.success,
    },
    {
      label: "warning-fg ↔ warning",
      fg: states["warning-foreground"],
      bg: states.warning,
    },
    {
      label: "destructive-fg ↔ destructive",
      fg: states["destructive-foreground"],
      bg: states.destructive,
    },
    {
      label: "info-fg ↔ info",
      fg: states["info-foreground"],
      bg: states.info,
    },
  ]

  return pairs.map((p) => {
    const ratio = getContrastRatio(p.fg, p.bg)
    return {
      label: p.label,
      fg: p.fg,
      bg: p.bg,
      ratio: Math.round(ratio * 100) / 100,
      grade: getContrastGrade(ratio),
    }
  })
}
