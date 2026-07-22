export interface FontDef {
  family: string
  category: "serif" | "sans-serif" | "display" | "monospace"
  weights: number[]
  italic: boolean
}

export interface FontPairing {
  label: string
  display: string
  body: string
  mono: string
}

export const BUNDLED_FONTS: FontDef[] = [
  { family: "Plus Jakarta Sans", category: "display", weights: [300, 400, 500, 600], italic: true },
  { family: "Archivo Narrow", category: "display", weights: [400, 500, 600, 700], italic: true },
  { family: "Inter", category: "sans-serif", weights: [300, 400, 500, 600, 700], italic: true },
  { family: "JetBrains Mono", category: "monospace", weights: [400, 500, 600, 700], italic: true },
  { family: "Sora", category: "display", weights: [300, 400, 500, 600, 700], italic: false },
  { family: "Quicksand", category: "display", weights: [300, 400, 500, 600, 700], italic: false },
  { family: "Nunito", category: "sans-serif", weights: [300, 400, 500, 600, 700], italic: true },
  { family: "Fraunces", category: "serif", weights: [300, 400, 500, 600, 700], italic: true },
  { family: "Roboto", category: "sans-serif", weights: [300, 400, 500, 600, 700], italic: true },
  { family: "DM Serif Display", category: "serif", weights: [400], italic: true },
  { family: "DM Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700], italic: true },
  { family: "Lora", category: "serif", weights: [400, 500, 600, 700], italic: true },
  { family: "Work Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700], italic: true },
  { family: "Fira Code", category: "monospace", weights: [400, 500, 600, 700], italic: false },
  { family: "IBM Plex Mono", category: "monospace", weights: [400, 500, 600, 700], italic: true },
  { family: "Space Mono", category: "monospace", weights: [400, 700], italic: true },
] as const

export const SMART_PAIRINGS: FontPairing[] = [
  { label: "Warm Precision", display: "Plus Jakarta Sans", body: "Inter", mono: "JetBrains Mono" },
  { label: "Modern Product", display: "Sora", body: "Inter", mono: "Fira Code" },
  { label: "Trustworthy", display: "DM Serif Display", body: "DM Sans", mono: "JetBrains Mono" },
  { label: "Warm Reading", display: "Lora", body: "Work Sans", mono: "IBM Plex Mono" },
  { label: "Soft Product", display: "Quicksand", body: "Nunito", mono: "JetBrains Mono" },
  { label: "Technical", display: "JetBrains Mono", body: "Inter", mono: "IBM Plex Mono" },
]

export function getPopularFonts(): readonly FontDef[] {
  return BUNDLED_FONTS
}

export function getSmartPairings(): readonly FontPairing[] {
  return SMART_PAIRINGS
}

export function injectFontLink(family: string): () => void {
  const id = `font-${family.replace(/\s+/g, "-").toLowerCase()}`
  if (document.getElementById(id)) return () => {}

  const link = document.createElement("link")
  link.id = id
  link.rel = "stylesheet"
  const font = BUNDLED_FONTS.find((candidate) => candidate.family === family)
  const weights = font?.weights ?? [400, 500, 600, 700]
  const familyParam = family.replace(/\s+/g, "+")
  if (font?.italic) {
    const variants = [
      ...weights.map((weight) => `0,${weight}`),
      ...weights.map((weight) => `1,${weight}`),
    ].join(";")
    link.href = `https://fonts.googleapis.com/css2?family=${familyParam}:ital,wght@${variants}&display=swap`
  } else {
    link.href = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weights.join(";")}&display=swap`
  }
  document.head.appendChild(link)

  return () => removeFontLink(family)
}

export function removeFontLink(family: string): void {
  const id = `font-${family.replace(/\s+/g, "-").toLowerCase()}`
  const link = document.getElementById(id)
  if (link) link.remove()
}

export function randomFont(category: string): FontDef {
  const filtered = BUNDLED_FONTS.filter((f) => f.category === category)
  if (filtered.length === 0)
    return BUNDLED_FONTS.filter((f) => f.category === "sans-serif")[0]
  return filtered[Math.floor(Math.random() * filtered.length)]
}

export function getFontDefinition(family: string | null): FontDef | undefined {
  if (!family) return undefined
  return BUNDLED_FONTS.find((font) => font.family === family)
}
