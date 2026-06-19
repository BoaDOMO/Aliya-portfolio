import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import { useDesignTokens } from "@/lib/design-tokens-store"
import {
  getCVDFilterId,
  type CVDType,
  PROTANOPIA_MATRIX,
  DEUTERANOPIA_MATRIX,
  TRITANOPIA_MATRIX,
} from "@/lib/color-blindness"
import type { ColorTokens, StateColors, DerivedTokens } from "@/lib/color-utils"
import type { FontSlots, Severity, FontCustomization } from "@/lib/design-tokens-store"
import type { StylePresetState } from "@/lib/style-preset-types"
import { generatePresetCssVars, generateStandardRadiusTheme } from "@/lib/style-preset-utils"
import { MonitorIcon, SmartphoneIcon, Layers, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import ComponentKitTab from "./preview-components/component-kit-tab"
import DashboardTab from "./preview-components/dashboard-tab"
import LandingTab from "./preview-components/landing-tab"
import ResponsiveFrame, { type DeviceType } from "./preview-components/responsive-frame"
import { SegmentedControl } from "@/components/ui/segmented-control"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const CVD_OPTIONS: { type: CVDType; label: string; name: string }[] = [
  { type: "protanopia", label: "P", name: "Protanopia" },
  { type: "deuteranopia", label: "D", name: "Deuteranopia" },
  { type: "tritanopia", label: "T", name: "Tritanopia" },
]

const DEVICE_OPTIONS = [
  { value: "desktop", label: <MonitorIcon className="size-3.5" /> },
  { value: "phone", label: <SmartphoneIcon className="size-3.5" /> },
]

const TABS = [
  { id: "landing" as const, label: "Application" },
  { id: "dashboard" as const, label: "Components" },
  { id: "kit" as const, label: "Foundation" },
]

export type PreviewTabId = "kit" | "dashboard" | "landing"

const TAB_COMPONENTS = {
  kit: ComponentKitTab,
  dashboard: DashboardTab,
  landing: LandingTab,
}

function buildCssVars(
  tokens: ColorTokens,
  states: StateColors,
  stylePreset: StylePresetState,
  fonts: FontSlots,
  derived: DerivedTokens,
  fontCustomization: FontCustomization,
  isDark: boolean,
): React.CSSProperties {
  const presetVars = generatePresetCssVars(stylePreset, isDark)
  const radiusVars = generateStandardRadiusTheme()

  return {
    "--primary": tokens.primary,
    "--primary-foreground": tokens["primary-foreground"],
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
    "--card-glow": `radial-gradient(ellipse at 50% 0%, ${tokens.card}0a 0%, transparent 70%)`,
    "--popover": tokens.popover,
    "--popover-foreground": tokens["popover-foreground"],
    "--border": tokens.border,
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
    "--font-size-display": `${fontCustomization.display.size}px`,
    "--font-size-body": `${fontCustomization.body.size}px`,
    "--font-size-mono": `${fontCustomization.mono.size}px`,
    "--font-weight-display": fontCustomization.display.weight,
    "--font-weight-body": fontCustomization.body.weight,
    "--font-weight-mono": fontCustomization.mono.weight,
    "--font-style-display": fontCustomization.display.italic ? "italic" : "normal",
    "--font-style-body": fontCustomization.body.italic ? "italic" : "normal",
    "--font-style-mono": fontCustomization.mono.italic ? "italic" : "normal",
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

export default function PreviewPanel({
  collapsed,
}: {
  collapsed?: boolean
}) {
  const state = useDesignTokens()
  const { light, dark, states, derived } = state.tokens
  const { fonts, stylePreset } = state

  const mode = state.previewMode
  const [activeCVD, setActiveCVD] = useState<CVDType | null>(null)
  const [activeTab, setActiveTab] = useState<"kit" | "dashboard" | "landing">("landing")
  const [device, setDevice] = useState<DeviceType>("desktop")
  const [splitView, setSplitView] = useState(false)
  const [qualityOpen, setQualityOpen] = useState(false)

  const isDark = mode === "dark"

  const { report } = state

  const contrastPairs = isDark ? report.contrast.darkPairs : report.contrast.pairs
  const contrastFailing = contrastPairs.filter(p => p.grade === "fail")
  const contrastStatus: Severity = contrastFailing.length > 0 ? "error" : "pass"
  const qualityCategories = [
    { key: "contrast", label: "WCAG", status: contrastStatus, details: contrastPairs.map(p => `${p.label}: ${p.ratio.toFixed(1)}:1 (${p.grade.toUpperCase()})`).join("\n") || "All contrast pairs pass." },
    { key: "cvd", label: "CVD", status: report.accessibility.status, details: report.accessibility.cvdWarnings.join("\n") || "No color-blind issues detected." },
    { key: "dark", label: "Dark", status: report.darkMode.status, details: report.darkMode.warnings.join("\n") || "Dark mode tokens ready." },
    { key: "tokens", label: "Tokens", status: report.completeness.status, details: report.completeness.missing.length > 0 ? `Missing: ${report.completeness.missing.join(", ")}` : "All tokens defined." },
  ]

  const STATUS_ICONS: Record<Severity, React.ReactNode> = {
    pass: <CheckCircle className="size-3 text-success" />,
    warning: <AlertCircle className="size-3 text-warning" />,
    error: <XCircle className="size-3 text-destructive" />,
  }

  const STATUS_COLORS: Record<Severity, string> = {
    pass: "text-success",
    warning: "text-warning",
    error: "text-destructive",
  }

  function statusSummary(status: Severity): string {
    switch (status) {
      case "pass": return "Passed"
      case "warning": return "Recommendations"
      case "error": return "Failed"
      default: return "Unknown"
    }
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scrollPositions = useRef<Record<string, number>>({})

  const handleTabChange = useCallback(
    (tab: "kit" | "dashboard" | "landing") => {
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

  const handleNavigateToTab = useCallback((tab: "kit" | "dashboard" | "landing") => {
    handleTabChange(tab)
  }, [handleTabChange])

  const activeTokens = isDark ? dark : light

  const previewCssVars = useMemo(
    () => ({
      ...buildCssVars(activeTokens, states, stylePreset, fonts, isDark ? derived.dark : derived.light, state.fontCustomization, isDark),
    }),
    [activeTokens, states, stylePreset, fonts, derived, isDark, state.fontCustomization]
  )

  const cvdFilter = activeCVD ? `url(#${getCVDFilterId(activeCVD)})` : undefined

  const ActiveTabComponent = TAB_COMPONENTS[activeTab]

  const previewContent = (
    <div
      ref={scrollContainerRef}
      className={`h-full overflow-y-auto bg-background text-foreground transition-colors duration-300 ${isDark ? "dark" : ""}`}
      style={{
        ...previewCssVars,
        ...(cvdFilter ? { filter: cvdFilter } : {}),
      }}
    >
      <ResponsiveFrame device={device} fullscreen={false}>
        <ActiveTabComponent onNavigateToTab={handleNavigateToTab} />
      </ResponsiveFrame>
    </div>
  )

  return (
    <div className="flex flex-1 flex-col overflow-hidden motion-reduce:transition-none">
      <CVDDefs />

      <div className="flex shrink-0 items-center justify-between bg-background px-4 h-[44px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 border-r pr-4">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                aria-label={`Preview: ${tab.label}`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute inset-x-2 -bottom-2 h-[3px] rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          {collapsed && (
            <button
              onClick={() => setSplitView(!splitView)}
              className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
                splitView ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Layers className="size-3.5" />
              Split View
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setQualityOpen(true)}
            className="flex items-center gap-2 rounded-md border bg-card px-2.5 h-8 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title="Quality Report"
          >
            {qualityCategories.map((c) => (
              <span key={c.key} className="flex items-center gap-1">
                {STATUS_ICONS[c.status as Severity]}
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</span>
              </span>
            ))}
          </button>
        </div>

        <div className="flex items-center gap-3">
           <SegmentedControl
             options={DEVICE_OPTIONS}
             value={device}
             onChange={(v) => setDevice(v as DeviceType)}
             size="sm"
           />
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-xl p-4 bg-muted/20">
        {/* Dot grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]" 
             style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        
        <div className="relative h-full w-full flex gap-4">
            <div
              className={`h-full bg-card overflow-hidden transition-all duration-500 ${splitView ? "flex-1" : "w-full"}`}
              style={{
                boxShadow: "var(--preset-shadow)",
                backgroundColor: "oklch(from var(--card) l c h / var(--preset-bg-opacity))",
                backdropFilter: "var(--preset-backdrop)",
              }}
            >
              {previewContent}
            </div>
          {splitView && (
            <div
              className="h-full flex-1 bg-card overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500"
              style={{
                boxShadow: "var(--preset-shadow)",
                backgroundColor: "oklch(from var(--card) l c h / var(--preset-bg-opacity))",
                backdropFilter: "var(--preset-backdrop)",
              }}
            >
                <div
                   className={`h-full overflow-y-auto bg-background text-foreground grayscale brightness-95 ${isDark ? "" : "dark"}`}
                  style={{
                    ...previewCssVars,
                    "--background": isDark ? "#ffffff" : "#0f172a",
                    "--foreground": isDark ? "#0f172a" : "#ffffff",
                    filter: isDark ? "invert(1)" : "none",
                  } as React.CSSProperties}
                >
                  <ResponsiveFrame device={device} fullscreen={false}>
                    <ActiveTabComponent onNavigateToTab={handleNavigateToTab} />
                  </ResponsiveFrame>
                </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={qualityOpen} onOpenChange={setQualityOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Design System Quality Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {qualityCategories.map((cat) => (
              <div key={cat.key} className="rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    {STATUS_ICONS[cat.status as Severity]}
                    <span className="text-xs font-semibold">{cat.label}</span>
                  </div>
                  <span className={`ml-auto text-xs font-medium ${STATUS_COLORS[cat.status as Severity]}`}>
                    {statusSummary(cat.status)}
                  </span>
                </div>
                <p className="mt-1 whitespace-pre-line text-xs text-muted-foreground">
                  {cat.details}
                </p>
                {cat.key === "cvd" && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase shrink-0">Simulate:</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setActiveCVD(null)}
                        className={`rounded px-2 py-1 text-xs font-medium transition-colors ${!activeCVD ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                      >
                        Normal
                      </button>
                      {CVD_OPTIONS.map((opt) => (
                        <button
                          key={opt.type}
                          onClick={() => setActiveCVD(opt.type)}
                          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${activeCVD === opt.type ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    {activeCVD && (
                      <button
                        onClick={() => setActiveCVD(null)}
                        className="ml-auto text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className={`rounded-lg p-3 text-center text-xs font-semibold ${
              report.exportReady
                ? "bg-success/10 text-success dark:bg-success/20"
                : "bg-destructive/10 text-destructive dark:bg-destructive/20"
            }`}>
              {report.exportReady ? "Ready for Production Export" : "Export Blocked — Check Missing Tokens"}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
