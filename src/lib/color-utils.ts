import { oklch, formatHex, wcagLuminance } from "culori"

export type HarmonyType =
  | "shadcn"
  | "monochromatic"
  | "analogous"
  | "complementary"
  | "split-complementary"
  | "triadic"
  | "tetradic"
  | "double-complementary"
  | "compound"
  | "golden-ratio"
  | "near-complementary"
  | "pentadic"
  | "analogous-accent"

export interface ColorTokens {
  primary: string
  "primary-foreground": string
  secondary: string
  "secondary-foreground": string
  accent: string
  "accent-foreground": string
  muted: string
  "muted-foreground": string
  background: string
  foreground: string
  card: string
  "card-foreground": string
  "surface-raised": string
  "surface-featured": string
  popover: string
  "popover-foreground": string
  border: string
  "border-strong": string
  input: string
  ring: string
}

export interface StateColors {
  info: string
  "info-foreground": string
  success: string
  "success-foreground": string
  warning: string
  "warning-foreground": string
  destructive: string
  "destructive-foreground": string
}

export interface DerivedTokens {
  sidebar: string
  "sidebar-foreground": string
  "sidebar-primary": string
  "sidebar-primary-foreground": string
  "sidebar-accent": string
  "sidebar-accent-foreground": string
  "sidebar-border": string
  "sidebar-ring": string
  "chart-1": string
  "chart-2": string
  "chart-3": string
  "chart-4": string
  "chart-5": string
}

const HARMONY_ANGLES: Record<HarmonyType, number[]> = {
  shadcn: [0],
  monochromatic: [0],
  analogous: [0, 30, -30],
  complementary: [0, 180],
  "split-complementary": [0, 150, 210],
  triadic: [0, 120, 240],
  tetradic: [0, 90, 180, 270],
  "double-complementary": [0, 60, 180, 240],
  compound: [0, 30, 180, 210],
  "golden-ratio": [0, 137.5, 275],
  "near-complementary": [0, 165],
  pentadic: [0, 72, 144, 216, 288],
  "analogous-accent": [0, 30, -30, 180],
}

function oklchFromHex(hex: string): [number, number, number] {
  const c = oklch(hex)
  return [c.l, c.c || 0, c.h || 0]
}

function hexFromOklch(l: number, c: number, h: number): string {
  return formatHex({
    mode: "oklch",
    l: Math.max(0, Math.min(1, l)),
    c: Math.max(0, Math.min(0.4, c)),
    h: ((h % 360) + 360) % 360,
  })
}

export function mixColors(a: string, b: string, percentA: number): string {
  const [la, ca, ha] = oklchFromHex(a)
  const [lb, cb, hb] = oklchFromHex(b)
  const t = percentA / 100
  const hueDelta = ((ha - hb + 540) % 360) - 180
  return hexFromOklch(
    la * t + lb * (1 - t),
    ca * t + cb * (1 - t),
    hb + hueDelta * t,
  )
}

export function computeForeground(bgHex: string): string {
  const bgLum = wcagLuminance(bgHex)
  const darkHex = "#1A1917"
  const lightHex = "#FFFCF5"
  const darkLum = wcagLuminance(darkHex)
  const lightLum = wcagLuminance(lightHex)
  const darkRatio = (bgLum + 0.05) / (darkLum + 0.05)
  const lightRatio = (lightLum + 0.05) / (bgLum + 0.05)
  if (darkRatio >= 4.5 && darkRatio >= lightRatio) return darkHex
  if (lightRatio >= 4.5) return lightHex
  return bgLum > 0.18 ? "#000000" : "#ffffff"
}

export function constrainPrimary(hex: string, mode: "light" | "dark"): string {
  const [l, c, h] = oklchFromHex(hex)
  if (mode === "light" && l > 0.55) {
    return hexFromOklch(Math.min(l, 0.50), c, h)
  }
  if (mode === "dark" && l < 0.55) {
    return hexFromOklch(Math.max(l, 0.60), c, h)
  }
  return hex
}

type HarmonySlot = {
  angleIdx: number
  lOffset: number
  chromaScale: number
}

const HARMONY_SLOTS: Record<string, { sec: HarmonySlot; acc: HarmonySlot; mut: HarmonySlot }> = {
  shadcn: {
    sec: { angleIdx: 0, lOffset: 0.18, chromaScale: 0 },
    acc: { angleIdx: 0, lOffset: -0.22, chromaScale: 0 },
    mut: { angleIdx: 0, lOffset: 0.30, chromaScale: 0 },
  },
  monochromatic: {
    sec: { angleIdx: 0, lOffset: 0.18, chromaScale: 0.40 },
    acc: { angleIdx: 0, lOffset: -0.22, chromaScale: 0.55 },
    mut: { angleIdx: 0, lOffset: 0.30, chromaScale: 0.06 },
  },
  analogous: {
    sec: { angleIdx: 1, lOffset: 0.18, chromaScale: 0.35 },
    acc: { angleIdx: 2, lOffset: -0.12, chromaScale: 0.55 },
    mut: { angleIdx: 0, lOffset: 0.32, chromaScale: 0.06 },
  },
  complementary: {
    sec: { angleIdx: 1, lOffset: 0.22, chromaScale: 0.85 },
    acc: { angleIdx: 1, lOffset: -0.12, chromaScale: 0.65 },
    mut: { angleIdx: 0, lOffset: 0.32, chromaScale: 0.06 },
  },
  "split-complementary": {
    sec: { angleIdx: 1, lOffset: 0.18, chromaScale: 0.35 },
    acc: { angleIdx: 2, lOffset: -0.12, chromaScale: 0.55 },
    mut: { angleIdx: 0, lOffset: 0.32, chromaScale: 0.06 },
  },
  triadic: {
    sec: { angleIdx: 1, lOffset: 0.18, chromaScale: 0.35 },
    acc: { angleIdx: 2, lOffset: -0.12, chromaScale: 0.55 },
    mut: { angleIdx: 0, lOffset: 0.32, chromaScale: 0.06 },
  },
  tetradic: {
    sec: { angleIdx: 1, lOffset: 0.18, chromaScale: 0.40 },
    acc: { angleIdx: 2, lOffset: -0.12, chromaScale: 0.50 },
    mut: { angleIdx: 3, lOffset: 0.28, chromaScale: 0.08 },
  },
  "double-complementary": {
    sec: { angleIdx: 1, lOffset: 0.18, chromaScale: 0.40 },
    acc: { angleIdx: 2, lOffset: -0.12, chromaScale: 0.50 },
    mut: { angleIdx: 3, lOffset: 0.28, chromaScale: 0.08 },
  },
  compound: {
    sec: { angleIdx: 1, lOffset: 0.18, chromaScale: 0.40 },
    acc: { angleIdx: 2, lOffset: -0.12, chromaScale: 0.50 },
    mut: { angleIdx: 3, lOffset: 0.28, chromaScale: 0.08 },
  },
  "golden-ratio": {
    sec: { angleIdx: 1, lOffset: 0.18, chromaScale: 0.40 },
    acc: { angleIdx: 2, lOffset: -0.12, chromaScale: 0.50 },
    mut: { angleIdx: 0, lOffset: 0.32, chromaScale: 0.06 },
  },
  "near-complementary": {
    sec: { angleIdx: 1, lOffset: 0.18, chromaScale: 0.85 },
    acc: { angleIdx: 1, lOffset: -0.10, chromaScale: 0.65 },
    mut: { angleIdx: 0, lOffset: 0.32, chromaScale: 0.06 },
  },
  pentadic: {
    sec: { angleIdx: 1, lOffset: 0.18, chromaScale: 0.40 },
    acc: { angleIdx: 2, lOffset: -0.12, chromaScale: 0.50 },
    mut: { angleIdx: 3, lOffset: 0.28, chromaScale: 0.08 },
  },
  "analogous-accent": {
    sec: { angleIdx: 1, lOffset: 0.18, chromaScale: 0.40 },
    acc: { angleIdx: 2, lOffset: -0.12, chromaScale: 0.55 },
    mut: { angleIdx: 3, lOffset: 0.28, chromaScale: 0.08 },
  },
}

function pickFromAngle(angles: number[], idx: number, baseHue: number): number {
  if (idx >= angles.length) return ((baseHue + angles[angles.length - 1]) % 360 + 360) % 360
  return ((baseHue + angles[idx]) % 360 + 360) % 360
}

export function generateHarmony(
  hex: string,
  type: HarmonyType
): { primary: string; secondary: string; accent: string; muted: string; palette: string[] } {
  if (type === "shadcn") {
    const [, , h] = oklchFromHex(hex)
    const surface = hexFromOklch(0.92, 0.012, h)
    return { primary: hex, secondary: surface, accent: surface, muted: surface, palette: [hex, surface] }
  }

  const [, c, h] = oklchFromHex(hex)
  const angles = HARMONY_ANGLES[type]
  const slots = HARMONY_SLOTS[type]

  if (!slots || !angles) {
    return { primary: hex, secondary: hex, accent: hex, muted: hex, palette: [hex] }
  }

  function makeColor(slot: HarmonySlot, targetL: number): string {
    const hue = pickFromAngle(angles, slot.angleIdx, h)
    const targetC = Math.max(c * slot.chromaScale, 0.02)
    return hexFromOklch(targetL, targetC, hue)
  }

  const palette: string[] = [hex]
  for (let i = 1; i < angles.length; i++) {
    const hue = ((h + angles[i]) % 360 + 360) % 360
    palette.push(hexFromOklch(0.55, Math.max(c * 0.5, 0.04), hue))
  }

  return {
    primary: hex,
    secondary: makeColor(slots.sec, 0.91),
    accent: makeColor(slots.acc, 0.84),
    muted: makeColor(slots.mut, 0.93),
    palette,
  }
}

export function generateNeutrals(primaryHex: string): ColorTokens {
  const [, , primaryHue] = oklchFromHex(primaryHex)
  const warmDelta = ((75 - primaryHue + 540) % 360) - 180
  const neutralHue = primaryHue + warmDelta * 0.7
  const primary = constrainPrimary(primaryHex, "light")
  const background = hexFromOklch(0.96, 0.018, neutralHue)
  const foreground = hexFromOklch(0.22, 0.018, neutralHue)
  const card = hexFromOklch(0.98, 0.012, neutralHue)
  const surfaceRaised = card
  const surfaceFeatured = hexFromOklch(0.995, 0.009, neutralHue)
  const popover = surfaceFeatured
  const border = hexFromOklch(0.82, 0.014, neutralHue)
  const borderStrong = hexFromOklch(0.72, 0.018, neutralHue)
  const input = border
  const ring = primary

  const secondary = hexFromOklch(0.91, 0.018, neutralHue)
  const accent = hexFromOklch(0.88, 0.024, neutralHue)
  const muted = hexFromOklch(0.92, 0.014, neutralHue)
  const mutedForeground = hexFromOklch(0.43, 0.018, neutralHue)

  return {
    primary,
    "primary-foreground": computeForeground(primary),
    secondary,
    "secondary-foreground": foreground,
    accent,
    "accent-foreground": foreground,
    muted,
    "muted-foreground": mutedForeground,
    background,
    foreground,
    card,
    "card-foreground": foreground,
    "surface-raised": surfaceRaised,
    "surface-featured": surfaceFeatured,
    popover,
    "popover-foreground": foreground,
    border,
    "border-strong": borderStrong,
    input,
    ring,
  }
}

export function generateStateColors(
  primaryHex: string,
  stateRules: { chromaModifier: number; desaturate: boolean } = {
    chromaModifier: 1,
    desaturate: false,
  }
): StateColors {
  const [, c] = oklchFromHex(primaryHex)
  const minChroma = Math.max(c, 0.12) * stateRules.chromaModifier
  const finalC = stateRules.desaturate ? Math.min(minChroma, 0.05) : minChroma

  const info = hexFromOklch(0.60, finalC * 0.75, 250)
  const success = hexFromOklch(0.55, finalC * 0.75, 145)
  const warning = hexFromOklch(0.62, finalC * 0.75, 48)
  const destructive = hexFromOklch(0.50, finalC * 0.85, 15)

  return {
    info,
    "info-foreground": computeForeground(info),
    success,
    "success-foreground": computeForeground(success),
    warning,
    "warning-foreground": computeForeground(warning),
    destructive,
    "destructive-foreground": computeForeground(destructive),
  }
}

function darkMap(l: number): number {
  // Surface tier — very light in light mode → dark in dark mode
  if (l >= 0.94) return 0.04 + (l - 0.94) * 1.0
  if (l >= 0.80) return 0.10 + (l - 0.80) * 0.4
  // Color tier — bright enough to contrast against dark backgrounds
  if (l >= 0.35) return 0.60 + (l - 0.35) * 0.5
  // Foreground tier — dark text inverts to light
  return 0.85 + (l - 0.05) * 0.35
}

function contrastRatio(a: string, b: string): number {
  const la = wcagLuminance(a) + 0.05
  const lb = wcagLuminance(b) + 0.05
  return Math.max(la, lb) / Math.min(la, lb)
}

function minContrastFallback(dark: ColorTokens): ColorTokens {
  const pairs: [keyof ColorTokens, keyof ColorTokens][] = [
    ["primary", "primary-foreground"],
    ["secondary", "secondary-foreground"],
    ["accent", "accent-foreground"],
    ["muted", "muted-foreground"],
    ["background", "foreground"],
    ["card", "card-foreground"],
    ["popover", "popover-foreground"],
  ]

  for (const [bgKey, fgKey] of pairs) {
    const bg = dark[bgKey]
    let fg = dark[fgKey]
    if (!bg || !fg) continue

    let iterations = 0
    while (contrastRatio(bg, fg) < 4.5 && iterations < 20) {
      const parsed = oklch(fg)
      const l = Math.min(0.985, (parsed.l ?? 0) + 0.05)
      fg = hexFromOklch(l, parsed.c ?? 0, parsed.h ?? 0)
      iterations++
    }
    dark[fgKey] = fg
  }

  return dark
}

export function generateDarkTokens(
  light: ColorTokens,
  darkRules: {
    bgChroma: number
    primaryMinLightness: number
    surfaceHierarchyBoost: number
    preserveChroma: boolean
  } = {
    bgChroma: 0.00375,
    primaryMinLightness: 0.60,
    surfaceHierarchyBoost: 0.08,
    preserveChroma: false,
  }
): ColorTokens {
  const [bgL] = oklchFromHex(light.background)
  const isDarkBg = bgL < 0.20
  const dark = {} as Record<string, string>

  for (const key of Object.keys(light) as (keyof ColorTokens)[]) {
    const value = light[key]

    if (key.endsWith("-foreground")) {
      const bgKey = key.replace("-foreground", "") as keyof ColorTokens
      const bgColor = dark[bgKey] ?? light[bgKey] ?? light.background
      dark[key] = computeForeground(bgColor)
    } else {
      const [l, c, h] = oklchFromHex(value)
      const rawL = isDarkBg ? Math.max(0.02, l * 0.45) : darkMap(l)
      const newL = (key === "primary" || key === "ring")
        ? Math.max(darkRules.primaryMinLightness, rawL)
        : rawL
      const newC = key === "background"
        ? (darkRules.preserveChroma ? Math.max(c, darkRules.bgChroma) : darkRules.bgChroma)
        : c
      dark[key] = hexFromOklch(newL, newC, h)
    }
  }

  // Ensure surface hierarchy: border/card/muted are visibly distinct from background
  const [dbgL, dbgC, dbgH] = oklchFromHex(dark.background)
  const boost = darkRules.surfaceHierarchyBoost
  const surfaceMin: Record<string, number> = {
    card: dbgL + boost,
    "surface-raised": dbgL + boost,
    "surface-featured": dbgL + boost * 1.25,
    popover: dbgL + boost,
    border: dbgL + boost * 1.5,
    "border-strong": dbgL + boost * 2,
    input: dbgL + boost * 1.5,
    muted: 0.27,
    secondary: 0.27,
    accent: 0.27,
  }
  for (const [key, minL] of Object.entries(surfaceMin)) {
    const v = dark[key as keyof ColorTokens]
    if (v) {
      const [l, c, h] = oklchFromHex(v)
      if (l < minL) {
        const isCard = key === "card" || key === "popover"
        const newC = isCard ? Math.max(0.012, c ?? dbgC) : (c ?? dbgC)
        dark[key as keyof ColorTokens] = hexFromOklch(minL, newC, h ?? dbgH)
      }
    }
  }

  return minContrastFallback(dark as unknown as ColorTokens)
}

export function generateShadeScale(hex: string): string[] {
  const stops = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const [l, c, h] = oklchFromHex(hex)

  // Exact lightness curve from Tailwind v4 neutral scale — monotonic descending
  const stdL = [0.985, 0.97, 0.922, 0.87, 0.708, 0.556, 0.439, 0.371, 0.269, 0.205, 0.145]
  const clippedL = Math.max(0.145, Math.min(0.985, l))
  const topL = stdL[0]
  const bottomL = stdL[stdL.length - 1]
  const anchorStdL = stdL[5] // 500 is always the anchor

  // Extrapolate bounds so the compressed side doesn't collapse to flat
  // when the input is at an extreme (e.g., foreground tokens at L=0.145/0.985)
  const effectiveTop = clippedL >= anchorStdL
    ? Math.min(1.0, clippedL * (topL / anchorStdL))
    : topL
  const effectiveBottom = clippedL <= anchorStdL
    ? clippedL * (bottomL / anchorStdL)
    : bottomL

  return stops.map((stop, i) => {
    const s = stdL[i]
    let targetL: number
    if (i === 5) {
      targetL = clippedL
    } else if (i < 5) {
      const ratio = (anchorStdL - s) / (anchorStdL - topL)
      targetL = clippedL + ratio * (effectiveTop - clippedL)
    } else {
      const ratio = (anchorStdL - s) / (anchorStdL - bottomL)
      targetL = clippedL - ratio * (clippedL - effectiveBottom)
    }

    // Chroma hump: peak at 500, taper at both ends
    const chromaScale =
      stop <= 500
        ? (stop / 500) * 0.8 + 0.2
        : 1 - ((stop - 500) / 450) * 0.5
    const targetC = c * Math.max(0.05, Math.min(1, chromaScale))
    return hexFromOklch(targetL, targetC, h)
  })
}

export const SHADE_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const CHART_LIGHT_HUES = [0, 72, 144, 216, 288]
const CHART_DARK_HUES = [30, 102, 174, 246, 318]

export function generateDerivedTokens(
  modeTokens: ColorTokens,
  isDark?: boolean
): DerivedTokens {
  const [, c, h] = oklchFromHex(modeTokens.primary)
  const chartChroma = Math.max(c * 0.7, 0.12)
  const chartHues = isDark ? CHART_DARK_HUES : CHART_LIGHT_HUES
  const chartLightness = isDark ? 0.65 : 0.6

  const chartColor = (i: number) => hexFromOklch(chartLightness, chartChroma, h + chartHues[i])

  return {
    sidebar: modeTokens.card,
    "sidebar-foreground": modeTokens["card-foreground"],
    "sidebar-primary": modeTokens.primary,
    "sidebar-primary-foreground": modeTokens["primary-foreground"],
    "sidebar-accent": modeTokens.accent,
    "sidebar-accent-foreground": modeTokens["accent-foreground"],
    "sidebar-border": modeTokens.border,
    "sidebar-ring": modeTokens.ring,
    "chart-1": chartColor(0),
    "chart-2": chartColor(1),
    "chart-3": chartColor(2),
    "chart-4": chartColor(3),
    "chart-5": chartColor(4),
  }
}
