import { useDesignTokens } from "@/lib/design-tokens-store"
import { PRESET_CONFIGS } from "@/lib/preset-configs"
import WebviewRenderer from "./WebviewRenderer"

export default function WebviewRouter() {
  const { stylePreset } = useDesignTokens()
  const config = PRESET_CONFIGS.find((c) => c.id === stylePreset.activePreset) ?? PRESET_CONFIGS[0]
  return <WebviewRenderer config={config} />
}
