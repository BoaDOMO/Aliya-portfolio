export interface FontDef {
  family: string
  category: "serif" | "sans-serif" | "display" | "monospace"
}

export interface FontPairing {
  label: string
  display: string
  body: string
  mono: string
}

export const BUNDLED_FONTS: FontDef[] = [
  { family: "Inter", category: "sans-serif" },
  { family: "Roboto", category: "sans-serif" },
  { family: "Open Sans", category: "sans-serif" },
  { family: "Lato", category: "sans-serif" },
  { family: "Montserrat", category: "sans-serif" },
  { family: "Poppins", category: "sans-serif" },
  { family: "Raleway", category: "sans-serif" },
  { family: "Nunito", category: "sans-serif" },
  { family: "DM Sans", category: "sans-serif" },
  { family: "Work Sans", category: "sans-serif" },
  { family: "Space Grotesk", category: "sans-serif" },
  { family: "Archivo Narrow", category: "sans-serif" },
  { family: "Rubik", category: "sans-serif" },
  { family: "Manrope", category: "sans-serif" },
  { family: "Playfair Display", category: "serif" },
  { family: "Lora", category: "serif" },
  { family: "Merriweather", category: "serif" },
  { family: "DM Serif Display", category: "serif" },
  { family: "Libre Baskerville", category: "serif" },
  { family: "Crimson Text", category: "serif" },
  { family: "Source Serif 4", category: "serif" },
  { family: "Playfair", category: "serif" },
  { family: "Cormorant Garamond", category: "serif" },
  { family: "Spectral", category: "serif" },
  { family: "JetBrains Mono", category: "monospace" },
  { family: "Fira Code", category: "monospace" },
  { family: "Source Code Pro", category: "monospace" },
  { family: "IBM Plex Mono", category: "monospace" },
  { family: "Space Mono", category: "monospace" },
  { family: "Roboto Mono", category: "monospace" },
  { family: "Ubuntu Mono", category: "monospace" },
  { family: "Cutive Mono", category: "monospace" },
  { family: "Oswald", category: "display" },
  { family: "Bebas Neue", category: "display" },
  { family: "Abril Fatface", category: "display" },
  { family: "Righteous", category: "display" },
  { family: "Fredoka One", category: "display" },
  { family: "Lobster", category: "display" },
  { family: "Pacifico", category: "display" },
  { family: "Comfortaa", category: "display" },
] as const

export const SMART_PAIRINGS: FontPairing[] = [
  { label: "Elegant Editorial", display: "Playfair Display", body: "Inter", mono: "JetBrains Mono" },
  { label: "Modern SaaS", display: "Space Grotesk", body: "Inter", mono: "Fira Code" },
  { label: "Trustworthy", display: "DM Serif Display", body: "DM Sans", mono: "JetBrains Mono" },
  { label: "Warm Reading", display: "Lora", body: "Work Sans", mono: "Source Code Pro" },
  { label: "Clean Minimal", display: "Raleway", body: "Inter", mono: "Roboto Mono" },
  { label: "Bold Tech", display: "Montserrat", body: "Open Sans", mono: "IBM Plex Mono" },
  { label: "Classic Pro", display: "Merriweather", body: "Lato", mono: "JetBrains Mono" },
  { label: "Creative Studio", display: "Poppins", body: "Nunito", mono: "Space Mono" },
  { label: "Geometric", display: "Rubik", body: "Manrope", mono: "Fira Code" },
  { label: "Literary", display: "Cormorant Garamond", body: "Inter", mono: "Ubuntu Mono" },
  { label: "Display Bold", display: "Oswald", body: "Roboto", mono: "Source Code Pro" },
  { label: "Playful Dev", display: "Comfortaa", body: "Nunito", mono: "JetBrains Mono" },
  { label: "Monospace First", display: "Space Mono", body: "Inter", mono: "JetBrains Mono" },
  { label: "Serif Code", display: "Spectral", body: "DM Sans", mono: "IBM Plex Mono" },
  { label: "Narrow Lead", display: "Archivo Narrow", body: "Inter", mono: "JetBrains Mono" },
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
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/\s+/g, "+")}:wght@400;500;600;700&display=swap`
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

export function fetchGoogleFonts(
  apiKey: string
): Promise<{ items: { family: string; category: string }[] } | null> {
  return fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`
  )
    .then((res) => res.json())
    .catch(() => null)
}
