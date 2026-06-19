import { useState, useMemo } from "react"
import { XIcon, Shuffle, ChevronLeft, Sun, Moon, Paintbrush, Type, LayoutTemplate } from "lucide-react"
import ColorSection from "./color-section"
import FontSection from "./font-section"
import StylePresetRow from "./style-preset-row"
import { useDesignTokensDispatch, useDesignTokens } from "@/lib/design-tokens-store"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  generateTailwindTheme,
  generatePlainCSS,
  generateAIContext,
} from "@/lib/generate-output"
import type { DrawerType, DrawerContext } from "./drawer-sheet"
import { SegmentedControl } from "@/components/ui/segmented-control"

const MODE_OPTIONS = [
  { value: "light", label: <Sun className="size-3.5" /> },
  { value: "dark", label: <Moon className="size-3.5" /> },
]

const EXPORT_TABS = [
  { id: "ai", label: "AI Context" },
  { id: "tailwind", label: "Tailwind v4" },
  { id: "css", label: "Plain CSS" },
  { id: "json", label: "Theme JSON" },
] as const

async function copyToClipboard(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(`Copied! Paste into your ${label}`)
  } catch {
    toast.error("Failed to copy")
  }
}

export default function LeftPanel({
  onClose,
  collapsed,
  onToggle,
  onOpenDrawer,
}: {
  onClose?: () => void
  collapsed?: boolean
  onToggle?: () => void
  onOpenDrawer?: (type: DrawerType, context?: DrawerContext) => void
}) {
  const dispatch = useDesignTokensDispatch()
  const state = useDesignTokens()

  const [exportOpen, setExportOpen] = useState(false)
  const [exportTab, setExportTab] = useState<string>("ai")

  const tailwindOutput = useMemo(() => generateTailwindTheme(state), [state])
  const plainCssOutput = useMemo(() => generatePlainCSS(state), [state])
  const aiContextOutput = useMemo(() => generateAIContext(state), [state])
  const jsonOutput = useMemo(() => JSON.stringify({
    primary: state.tokens.light.primary,
    harmony: state.harmonyType,
    fonts: state.fonts,
    fontCustomization: state.fontCustomization,
    stylePreset: state.stylePreset,
    colorSpace: state.colorSpace,
  }, null, 2), [state])

  const outputMap: Record<string, { code: string; label: string }> = {
    tailwind: { code: tailwindOutput, label: "globals.css" },
    css: { code: plainCssOutput, label: "globals.css" },
    ai: { code: aiContextOutput, label: "AI prompt" },
    json: { code: jsonOutput, label: "theme.json" },
  }

  const handleRandomize = () => {
    const prevState = { ...state }
    dispatch({ type: "RANDOMIZE_ALL" })
    toast("Generated a new theme!", {
      action: {
        label: "Undo",
        onClick: () => dispatch({ type: "LOAD_THEME", payload: prevState }),
      },
    })
  }

  const handleColorDrawer = (key: string, label: string, type?: "light" | "dark" | "states") => {
    onOpenDrawer?.("color", { colorKey: key, colorLabel: label, colorTokenType: type })
  }

  const handleFontDrawer = (slot: "display" | "body" | "mono") => {
    onOpenDrawer?.("typography", { fontSlot: slot })
  }

  const SIDEBAR_ICONS = [
    { type: "style" as DrawerType, icon: LayoutTemplate, title: "Style" },
    { type: "color" as DrawerType, icon: Paintbrush, title: "Color" },
    { type: "typography" as DrawerType, icon: Type, title: "Typography" },
  ]

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="flex w-[52px] shrink-0 flex-col">
        {/* Header row — matches left panel header height */}
        <div className="flex h-[44px] shrink-0 items-center justify-center">
          <button
            onClick={onToggle}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            title={collapsed ? "Expand panel" : "Collapse panel"}
          >
            <ChevronLeft className={`size-4 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
        {/* Icons area */}
        <div className="flex flex-1 flex-col items-center gap-3 pt-3">
          {SIDEBAR_ICONS.map(({ type, icon: Icon, title }) => (
            <button
              key={type}
              onClick={() => onOpenDrawer?.(type)}
              className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-muted hover:text-foreground hover:ring-1 hover:ring-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              title={title}
            >
              <Icon className="size-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Panel content */}
      {!collapsed && (
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center px-4 h-[44px] shrink-0">
            <span className="text-sm font-bold tracking-tight">Design System</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">Mode</span>
              <SegmentedControl
                options={MODE_OPTIONS}
                value={state.previewMode}
                onChange={(v) => dispatch({ type: "SET_PREVIEW_MODE", payload: v as "light" | "dark" })}
                size="sm"
              />
              {onClose && (
                <button
                  onClick={onClose}
                  className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors md:hidden"
                >
                  <XIcon className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 text-sm">
            <div className="mb-8 space-y-6">
              <button
                onClick={handleRandomize}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-muted py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-muted/80 hover:shadow-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <Shuffle className="size-4" />
                Random Theme
              </button>
              <button
                onClick={() => setExportOpen(true)}
                className="w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Export Theme
              </button>
              <StylePresetRow onClick={() => onOpenDrawer?.("style")} />
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border border-border/50 bg-muted/30 dark:bg-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Colors</span>
                  <div className="ml-auto flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); dispatch({ type: "RANDOMIZE_COLORS" }) }}
                      className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      title="Randomize colors"
                    >
                      <Shuffle className="size-3.5" />
                    </button>
                  </div>
                </div>
                <ColorSection onOpenDrawer={handleColorDrawer} />
              </div>

              <div className="rounded-xl border border-border/50 bg-muted/30 dark:bg-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">Typography</span>
                </div>
                <FontSection onOpenDrawer={handleFontDrawer} />
              </div>

            </div>
          </div>

          <Dialog open={exportOpen} onOpenChange={setExportOpen}>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Export Design System</DialogTitle>
              </DialogHeader>

              <Tabs value={exportTab} onValueChange={setExportTab}>
                <TabsList className="w-full">
                  {EXPORT_TABS.map((t) => (
                    <TabsTrigger key={t.id} value={t.id} className="flex-1 text-xs">{t.label}</TabsTrigger>
                  ))}
                </TabsList>

                {EXPORT_TABS.map((t) => (
                  <TabsContent key={t.id} value={t.id} className="mt-3">
                    <ScrollArea className="max-h-[50vh] rounded-md border">
                      <pre className="p-4 text-xs font-mono leading-relaxed whitespace-pre">
                        <code>{outputMap[t.id].code}</code>
                      </pre>
                    </ScrollArea>
                    <button
                      onClick={() => copyToClipboard(outputMap[t.id].code, outputMap[t.id].label)}
                      className="mt-3 w-full rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      Copy to Clipboard
                    </button>
                  </TabsContent>
                ))}
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}
