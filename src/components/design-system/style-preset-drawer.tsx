import { useState } from "react"
import { XIcon } from "lucide-react"
import { useDesignTokens, useDesignTokensDispatch } from "@/lib/design-tokens-store"
import { STYLE_PRESETS } from "@/lib/style-preset-presets"
import type { StylePreset } from "@/lib/style-preset-types"
import { SegmentedControl } from "@/components/ui/segmented-control"

const GROUP_TABS = [
  { value: "default", label: "Default" },
  { value: "advanced", label: "Advanced" },
]

function PresetListItem({
  preset,
  isActive,
  onClick,
}: {
  preset: StylePreset
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full flex-col rounded-xl border px-4 py-3 text-left transition-all focus-visible:ring-2 focus-visible:ring-ring ${
        isActive
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "border-border bg-card/50 hover:border-primary/50 hover:bg-card"
      }`}
    >
      <span className={`text-sm font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>
        {preset.name}
      </span>
      <span className="mt-0.5 text-xs text-muted-foreground/70">
        {preset.description}
      </span>
    </button>
  )
}

export default function StylePresetDrawer({
  onClose,
}: {
  onClose: () => void
}) {
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()
  const [activeGroup, setActiveGroup] = useState<"default" | "advanced">("default")

  const filteredPresets = STYLE_PRESETS.filter((p) => p.group === activeGroup)

  const handleSelect = (presetId: string) => {
    dispatch({ type: "APPLY_STYLE_PRESET", payload: presetId })
    onClose()
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 h-[56px] shrink-0">
        <span className="text-sm font-bold tracking-tight">Choose Style</span>
        <button
          onClick={onClose}
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close drawer"
        >
          <XIcon className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <SegmentedControl
            options={GROUP_TABS}
            value={activeGroup}
            onChange={(v) => setActiveGroup(v as "default" | "advanced")}
            className="w-full"
            size="sm"
          />

          <div className="space-y-2">
            {filteredPresets.map((preset) => (
              <PresetListItem
                key={preset.id}
                preset={preset}
                isActive={state.stylePreset.activePreset === preset.id}
                onClick={() => handleSelect(preset.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
