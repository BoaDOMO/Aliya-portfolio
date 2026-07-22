import { useRef, useState } from "react"
import { CaretDown, MagicWand, X } from "@phosphor-icons/react"
import { useDesignTokens, useDesignTokensDispatch } from "@/lib/design-tokens-store"
import { getPresetById } from "@/lib/style-preset-presets"
import { useQualityReport } from "@/lib/use-quality-report"
import ColorSection from "./color-section"
import FontSection from "./font-section"
import type { DrawerContext, DrawerType } from "./drawer-sheet"
import { ToolSectionLabel } from "@/components/tool-shell"

export default function LeftPanel({
  onClose,
  onOpenDrawer,
}: {
  onClose?: () => void
  onOpenDrawer?: (type: DrawerType, context?: DrawerContext) => void
}) {
  const dispatch = useDesignTokensDispatch()
  const state = useDesignTokens()
  const activePreset = getPresetById(state.stylePreset.activePreset)
  const [colorAdvancedOpen, setColorAdvancedOpen] = useState(false)
  const [typeAdvancedOpen, setTypeAdvancedOpen] = useState(false)
  const colorSectionRef = useRef<HTMLDivElement>(null)
  const typeSectionRef = useRef<HTMLDivElement>(null)
  const { categories } = useQualityReport()
  const contrastStatus = categories.find((category) => category.key === "contrast")?.status ?? "pass"

  const hasTokenOverrides =
    Object.keys(state.recipe.overrides.light).length > 0 ||
    Object.keys(state.recipe.overrides.dark).length > 0 ||
    Object.keys(state.recipe.overrides.states).length > 0
  const hasFontOverrides = Object.values(state.fontCustomizationOverridden).some(Boolean)
  const hasColorAdvancedChanges = hasTokenOverrides
  const hasTypeAdvancedChanges =
    hasFontOverrides || !state.typographyMatchPreset

  const openColor = (
    key: string,
    label: string,
    type?: "light" | "dark" | "states",
  ) => {
    onOpenDrawer?.("color", {
      colorKey: key,
      colorLabel: label,
      colorTokenType: type,
    })
  }

  const openFont = (slot: "display" | "body" | "mono") => {
    onOpenDrawer?.("typography", { fontSlot: slot })
  }

  const revealSection = (section: HTMLDivElement | null) => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const scrollToSection = () => {
      section?.scrollIntoView({
        block: "start",
        behavior: reducedMotion ? "auto" : "smooth",
      })
    }

    window.requestAnimationFrame(scrollToSection)
    if (!reducedMotion) window.setTimeout(scrollToSection, 220)
  }

  const handleColorAdvancedChange = (open: boolean) => {
    setColorAdvancedOpen(open)
    if (open) {
      setTypeAdvancedOpen(false)
      revealSection(colorSectionRef.current)
    }
  }

  const handleTypeAdvancedChange = (open: boolean) => {
    setTypeAdvancedOpen(open)
    if (open) {
      setColorAdvancedOpen(false)
      revealSection(typeSectionRef.current)
    }
  }

  return (
    <aside className="flex h-full min-h-0 flex-col bg-tool-panel/90 backdrop-blur-md">
      <div className="flex h-[var(--tool-bar-height)] shrink-0 items-center gap-2 border-b border-border px-4">
        <button
          type="button"
          onClick={() => onOpenDrawer?.("style")}
          aria-label={`Change style, current ${activePreset?.name ?? "Flat"}`}
          className="group flex min-w-0 items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="truncate font-display text-xl font-semibold tracking-tight text-foreground">
            {activePreset?.name ?? "Flat"}
          </span>
          <CaretDown className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:text-foreground" />
        </button>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => dispatch({ type: "RANDOMIZE_ALL" })}
            aria-label="Randomize theme"
            title="Randomize theme"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MagicWand className="size-4" />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close inspector"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:hidden"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth">
        <div className="border-b border-border/70 px-5 py-4 sm:px-6">
          <ToolSectionLabel>Token inspector</ToolSectionLabel>
          <p className="mt-2 max-w-[28rem] text-xs leading-relaxed text-muted-foreground">
            Shape the system, then inspect how it behaves across a real interface.
          </p>
        </div>
        <div aria-label="Theme controls" className="space-y-10 p-5 sm:p-6">
          {!typeAdvancedOpen && (
            <div ref={colorSectionRef} className="scroll-mt-6">
              <ColorSection
                onOpenDrawer={openColor}
                advancedOpen={colorAdvancedOpen}
                onAdvancedOpenChange={handleColorAdvancedChange}
                hasAdvancedChanges={hasColorAdvancedChanges}
              />
            </div>
          )}
          {!colorAdvancedOpen && (
            <div ref={typeSectionRef} className="scroll-mt-6 border-t border-border pt-8">
              <FontSection
                onOpenDrawer={openFont}
                advancedOpen={typeAdvancedOpen}
                onAdvancedOpenChange={handleTypeAdvancedChange}
                hasAdvancedChanges={hasTypeAdvancedChanges}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex h-12 shrink-0 items-center justify-between border-t border-border px-4 text-xs text-muted-foreground">
        <span>Contrast</span>
        <span className={contrastStatus === "pass" ? "font-mono text-primary" : "font-mono text-warning"}>
          {contrastStatus === "pass" ? "AA ✓" : "Review"}
        </span>
      </div>
    </aside>
  )
}
