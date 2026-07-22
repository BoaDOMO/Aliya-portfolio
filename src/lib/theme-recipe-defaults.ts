import type { ThemeRecipe } from "./design-tokens-store"
import { DEFAULT_STYLE_PRESET_ID } from "./style-preset-presets"

export const DEFAULT_THEME_RECIPE: ThemeRecipe = {
  primaryColor: "#185FA5",
  colorIntent: "neutral",
  harmonyType: "shadcn",
  fonts: {
    display: "Plus Jakarta Sans",
    body: "Inter",
    mono: "JetBrains Mono",
  },
  fontCustomization: {
    display: { size: 52, weight: 500, italic: false },
    body: { size: 16, weight: 400, italic: false },
    mono: { size: 13, weight: 400, italic: false },
  },
  fontCustomizationOverridden: { display: false, body: false, mono: false },
  typographyMatchPreset: true,
  typeScaleId: "balanced",
  stylePreset: { activePreset: DEFAULT_STYLE_PRESET_ID },
  overrides: { light: {}, dark: {}, states: {} },
}
