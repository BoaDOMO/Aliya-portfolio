import { useDesignTokens } from "@/lib/design-tokens-store"
import { DEFAULT_STYLE_PRESET_ID } from "@/lib/style-preset-presets"
import MarketplacePreview from "./MarketplacePreview"

export default function WebviewRouter() {
  const { stylePreset } = useDesignTokens()
  return <MarketplacePreview presetId={stylePreset.activePreset ?? DEFAULT_STYLE_PRESET_ID} />
}
