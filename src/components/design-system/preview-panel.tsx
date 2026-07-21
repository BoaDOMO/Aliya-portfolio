import { useState, useEffect, useRef, useCallback } from "react"
import { useDesignTokens, useDesignTokensDispatch } from "@/lib/design-tokens-store"
import {
  getCVDFilterId,
  type CVDType,
  PROTANOPIA_MATRIX,
  DEUTERANOPIA_MATRIX,
  TRITANOPIA_MATRIX,
} from "@/lib/color-blindness"
import type { ColorTokens, StateColors, DerivedTokens } from "@/lib/color-utils"
import { mixColors } from "@/lib/color-utils"
import type { FontSlots, FontCustomization } from "@/lib/design-tokens-store"
import type { SemanticTypeScale } from "@/lib/type-scale"
import type { StylePresetState } from "@/lib/style-preset-types"
import { generatePresetCssVars, generateStandardRadiusTheme } from "@/lib/style-preset-utils"
import { Columns, Desktop, DeviceMobile, DeviceTablet, Moon, Sun, GearSix } from "@phosphor-icons/react"
import DashboardTab from "./preview-components/dashboard-tab"
import WebviewRouter from "./preview-components/webviews/WebviewRouter"
import ResponsiveFrame, { type DeviceType } from "./preview-components/responsive-frame"
import DesignSpecs from "@/pages/DesignSpecs"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

const DEVICE_OPTIONS = [
  { value: "desktop", label: <Desktop className="size-3.5" />, accessibleLabel: "Desktop preview" },
  { value: "tablet", label: <DeviceTablet className="size-3.5" />, accessibleLabel: "Tablet preview" },
  { value: "phone", label: <DeviceMobile className="size-3.5" />, accessibleLabel: "Mobile preview" },
]

const TABS = [
  { id: "landing" as const, label: "Preview" },
  { id: "dashboard" as const, label: "Components" },
  { id: "specs" as const, label: "Spec" },
]

export type PreviewTabId = "dashboard" | "landing" | "specs"

const TAB_COMPONENTS: Record<Exclude<PreviewTabId, "specs">, React.ComponentType<{ onNavigateToTab?: (tab: PreviewTabId) => void }>> = {
  dashboard: DashboardTab,
  landing: WebviewRouter,
}

function buildCssVars(
  tokens: ColorTokens,
  states: StateColors,
  stylePreset: StylePresetState,
  fonts: FontSlots,
  derived: DerivedTokens,
  fontCustomization: FontCustomization,
  typeScale: SemanticTypeScale,
  isDark: boolean,
): React.CSSProperties {
  const presetVars = generatePresetCssVars(stylePreset, isDark)
  const radiusVars = generateStandardRadiusTheme()

  return {
    "--primary": tokens.primary,
    "--primary-foreground": tokens["primary-foreground"],
    "--primary-safe": mixColors(tokens.primary, tokens["card-foreground"], 85),
    "--secondary": tokens.secondary,
    "--secondary-foreground": tokens["secondary-foreground"],
    "--accent": tokens.accent,
    "--accent-foreground": tokens["accent-foreground"],
    "--muted": tokens.muted,
    "--muted-foreground": tokens["muted-foreground"],
    "--background": tokens.background,
    "--foreground": tokens.foreground,
    "--card": tokens.card,
    "--card-foreground": tokens["card-foreground"],
    "--surface-raised": tokens["surface-raised"],
    "--surface-featured": tokens["surface-featured"],
    "--card-glow": `radial-gradient(ellipse at 50% 0%, ${tokens.card}0a 0%, transparent 70%)`,
    "--popover": tokens.popover,
    "--popover-foreground": tokens["popover-foreground"],
    "--border": tokens.border,
    "--border-strong": tokens["border-strong"],
    "--input": tokens.input,
    "--ring": tokens.ring,
    "--destructive": states.destructive,
    "--destructive-foreground": states["destructive-foreground"],
    "--success": states.success,
    "--success-foreground": states["success-foreground"],
    "--warning": states.warning,
    "--warning-foreground": states["warning-foreground"],
    "--info": states.info,
    "--info-foreground": states["info-foreground"],
    "--sidebar": derived.sidebar,
    "--sidebar-foreground": derived["sidebar-foreground"],
    "--sidebar-primary": derived["sidebar-primary"],
    "--sidebar-primary-foreground": derived["sidebar-primary-foreground"],
    "--sidebar-accent": derived["sidebar-accent"],
    "--sidebar-accent-foreground": derived["sidebar-accent-foreground"],
    "--sidebar-border": derived["sidebar-border"],
    "--sidebar-ring": derived["sidebar-ring"],
    "--chart-1": derived["chart-1"],
    "--chart-2": derived["chart-2"],
    "--chart-3": derived["chart-3"],
    "--chart-4": derived["chart-4"],
    "--chart-5": derived["chart-5"],
    ...presetVars,
    ...radiusVars,
    "--font-display": fonts.display ?? "Archivo Narrow",
    "--font-body": fonts.body ?? "Inter",
    "--font-mono": fonts.mono ?? "JetBrains Mono",
    "--font-size-display": `${typeScale.display}px`,
    "--font-size-body": `${typeScale.body}px`,
    "--font-size-mono": `${typeScale.code}px`,
    "--font-weight-display": fontCustomization.display.weight,
    "--font-weight-body": fontCustomization.body.weight,
    "--font-weight-mono": fontCustomization.mono.weight,
    "--font-style-display": fontCustomization.display.italic ? "italic" : "normal",
    "--font-style-body": fontCustomization.body.italic ? "italic" : "normal",
    "--font-style-mono": fontCustomization.mono.italic ? "italic" : "normal",
    "--text-xs": `${typeScale.label}px`,
    "--text-sm": `${typeScale.small}px`,
    "--text-base": `${typeScale.body}px`,
    "--text-lg": `${typeScale.bodyLarge}px`,
    "--text-xl": `${typeScale.h3}px`,
    "--text-2xl": `${typeScale.h2}px`,
    "--text-3xl": `${typeScale.h1}px`,
    "--text-4xl": `${typeScale.h1}px`,
    "--text-5xl": `${typeScale.display}px`,
    "--text-6xl": `${typeScale.display}px`,
  } as React.CSSProperties
}

function CVDDefs() {
  return (
    <svg className="absolute size-0" aria-hidden="true">
      <defs>
        <filter id={getCVDFilterId("protanopia")}>
          <feColorMatrix type="matrix" values={PROTANOPIA_MATRIX} />
        </filter>
        <filter id={getCVDFilterId("deuteranopia")}>
          <feColorMatrix type="matrix" values={DEUTERANOPIA_MATRIX} />
        </filter>
        <filter id={getCVDFilterId("tritanopia")}>
          <feColorMatrix type="matrix" values={TRITANOPIA_MATRIX} />
        </filter>
      </defs>
    </svg>
  )
}

export default function PreviewPanel() {
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()
  const { light, dark, states, derived } = state.tokens
  const { fonts, stylePreset } = state
  const mode = state.previewMode
  const [activeTab, setActiveTab] = useState<PreviewTabId>("landing")
  const [activeCVD, setActiveCVD] = useState<CVDType | null>(null)
  const [device, setDevice] = useState<DeviceType>("desktop")
  const [splitView, setSplitView] = useState(false)
  const isDark = mode === "dark"

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollPositions = useRef<Record<string, number>>({})

  const handleTabChange = useCallback(
    (tab: PreviewTabId) => {
      if (scrollContainerRef.current) {
        scrollPositions.current[activeTab] = scrollContainerRef.current.scrollTop
      }
      setActiveTab(tab)
    },
    [activeTab]
  )

  useEffect(() => {
    if (scrollContainerRef.current) {
      const saved = scrollPositions.current[activeTab]
      if (saved !== undefined) {
        requestAnimationFrame(() => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = saved
          }
        })
      } else {
        scrollContainerRef.current.scrollTop = 0
      }
    }
  }, [activeTab])

  const handleNavigateToTab = useCallback((tab: PreviewTabId) => {
    handleTabChange(tab)
  }, [handleTabChange])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey
      if (!meta) return
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return
      }
      if (e.key === "z" && !e.shiftKey) {
        e.preventDefault()
        dispatch({ type: "UNDO" })
      } else if ((e.key === "z" && e.shiftKey) || e.key === "y") {
        e.preventDefault()
        dispatch({ type: "REDO" })
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [dispatch])

  const activeTokens = isDark ? dark : light

  const cvdFilter = activeCVD ? `url(#${getCVDFilterId(activeCVD)})` : undefined

  const isSpecs = activeTab === "specs"

  function renderPane(
    paneTab: "dashboard" | "landing",
    paneTokens: ColorTokens,
    paneDerived: DerivedTokens,
    paneIsDark: boolean,
    paneStylePreset: StylePresetState
  ) {
    const PaneComponent = TAB_COMPONENTS[paneTab]
    const paneCssVars = buildCssVars(
      paneTokens,
      states,
      paneStylePreset,
      fonts,
      paneDerived,
      state.fontCustomization,
      state.typeScale,
      paneIsDark
    )
    return (
      <div
        ref={paneIsDark === isDark ? scrollContainerRef : undefined}
        data-design-system-preview
        className={`h-full overflow-x-hidden overflow-y-auto bg-background text-foreground transition-colors duration-300 [&_p]:mb-[calc(1em*var(--paragraph-spacing))] ${paneIsDark ? "dark" : ""}`}
        style={{
          ...paneCssVars,
          fontFamily: "var(--font-body)",
          ...(cvdFilter ? { filter: cvdFilter } : {}),
        }}
      >
        <ResponsiveFrame device={device} fullscreen={false}>
          <PaneComponent onNavigateToTab={handleNavigateToTab} />
        </ResponsiveFrame>
      </div>
    )
  }

  const previewContent = isSpecs
    ? null
    : renderPane(activeTab as "dashboard" | "landing", activeTokens, isDark ? derived.dark : derived.light, isDark, stylePreset)

  return (
    <div className="flex flex-1 flex-col overflow-hidden motion-reduce:transition-none">
      <CVDDefs />

      <div
        data-preview-toolbar
        className="flex min-h-14 shrink-0 flex-wrap items-center gap-2 border-b border-border bg-background px-3 py-2 print:hidden sm:h-14 sm:flex-nowrap sm:gap-3 sm:py-0 sm:px-4"
      >
        <div className="flex shrink-0 items-center gap-1 rounded-lg bg-muted/50 p-1" role="tablist" aria-label="Preview view">
            {TABS.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-3 ${
                  activeTab === tab.id
                    ? "bg-surface-featured text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
        </div>

        {!isSpecs && (
          <div className="flex w-full shrink-0 items-center justify-end gap-2 sm:ml-auto sm:w-auto sm:justify-start">
            <SegmentedControl
              options={[
                { value: "light", label: <Sun className="size-3.5" />, accessibleLabel: "Light mode" },
                { value: "dark", label: <Moon className="size-3.5" />, accessibleLabel: "Dark mode" },
                { value: "split", label: <Columns className="size-3.5" />, accessibleLabel: "Split view" },
              ]}
              value={splitView ? "split" : mode}
              onChange={(value) => {
                if (value === "split") {
                  setSplitView(true)
                } else {
                  setSplitView(false)
                  dispatch({ type: "SET_PREVIEW_MODE", payload: value as "light" | "dark" })
                }
              }}
              size="sm"
              ariaLabel="Preview color mode"
            />
            <SegmentedControl
              options={DEVICE_OPTIONS}
              value={device}
              onChange={(value) => setDevice(value as DeviceType)}
              size="sm"
              ariaLabel="Preview viewport"
            />
            <Popover>
              <PopoverTrigger
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Color vision settings"
              >
                <GearSix className="size-4" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-52 p-1.5 space-y-0.5">
                <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Color vision</p>
                <button
                  onClick={() => setActiveCVD(null)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${!activeCVD ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  Normal
                </button>
                <button
                  onClick={() => setActiveCVD("protanopia")}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${activeCVD === 'protanopia' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  Protanopia
                </button>
                <button
                  onClick={() => setActiveCVD("deuteranopia")}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${activeCVD === 'deuteranopia' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  Deuteranopia
                </button>
                <button
                  onClick={() => setActiveCVD("tritanopia")}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${activeCVD === 'tritanopia' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  Tritanopia
                </button>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {isSpecs ? (
        <div className="flex-1 overflow-hidden">
          <DesignSpecs />
        </div>
      ) : (
        <div
          data-preview-chrome
          className="relative flex-1 overflow-hidden rounded-xl bg-muted/20 print:hidden"
        >
          {/* Dot grid background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]"
               style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

          <div className="relative h-full w-full flex gap-4 p-4">
              <div
                className={`h-full overflow-hidden transition-all duration-500 ${splitView ? "flex-1" : "w-full"}`}
                style={{
                  boxShadow: "var(--preset-shadow)",
                  backgroundColor: "transparent",
                  backdropFilter: "var(--preset-backdrop)",
                }}
              >
                {splitView && (
                  <div className="flex items-center justify-center h-6 bg-card/80 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground border-b border-border">
                    {isDark ? "Dark" : "Light"}
                  </div>
                )}
                {previewContent}
              </div>
            {splitView && (
              <div
                className="h-full flex-1 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500"
                style={{
                  boxShadow: "var(--preset-shadow)",
                  backgroundColor: "transparent",
                  backdropFilter: "var(--preset-backdrop)",
                }}
              >
                <div className="flex items-center justify-center h-6 bg-card/80 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground border-b border-border">
                  {isDark ? "Light" : "Dark"}
                </div>
                {renderPane(
                  activeTab as "dashboard" | "landing",
                  isDark ? light : dark,
                  isDark ? derived.light : derived.dark,
                  !isDark,
                  stylePreset
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
