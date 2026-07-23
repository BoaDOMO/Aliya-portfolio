import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowCounterClockwise,
  ArrowClockwise,
  ArrowLeft,
  CheckCircle,
  Export,
  List,
  SidebarSimple,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react"
import { useDesignTokens, useDesignTokensDispatch, type Severity } from "@/lib/design-tokens-store"
import { useQualityReport } from "@/lib/use-quality-report"
import {
  generateAIContext,
  generatePlainCSS,
  generateTailwindTheme,
  generateThemeJSON,
} from "@/lib/generate-output"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { ModeToggle } from "@/components/mode-toggle"

const EXPORT_TABS = [
  { id: "ai", label: "AI Context" },
  { id: "tailwind", label: "Tailwind v4" },
  { id: "css", label: "Plain CSS" },
  { id: "json", label: "DTCG JSON" },
] as const

const STATUS_ICONS: Record<Severity, React.ReactNode> = {
  pass: <CheckCircle className="size-4 text-success" weight="fill" />,
  warning: <WarningCircle className="size-4 text-warning" weight="fill" />,
  error: <XCircle className="size-4 text-destructive" weight="fill" />,
}

async function copyToClipboard(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success(`Copied ${label}`)
  } catch {
    toast.error("Failed to copy")
  }
}

export default function DesignSystemAppHeader({
  inspectorOpen,
  onToggleInspector,
  onOpenMobileInspector,
}: {
  inspectorOpen: boolean
  onToggleInspector: () => void
  onOpenMobileInspector: () => void
}) {
  const state = useDesignTokens()
  const dispatch = useDesignTokensDispatch()
  const [qualityOpen, setQualityOpen] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)
  const [exportTab, setExportTab] = useState<string>("ai")

  const canUndo = state.history.past.length > 0
  const canRedo = state.history.future.length > 0
  const { categories: qualityCategories, issueCount, overallStatus } = useQualityReport()

  const exportOutput = useMemo(() => ({
    ai: { code: generateAIContext(state), label: "AI context" },
    tailwind: { code: generateTailwindTheme(state), label: "Tailwind theme" },
    css: { code: generatePlainCSS(state), label: "CSS variables" },
    json: { code: generateThemeJSON(state), label: "DTCG JSON" },
  }), [state])

  return (
    <>
      <header className="relative z-10 mt-4 flex h-[3.4rem] w-[calc(100%-2rem)] max-w-[52rem] shrink-0 self-center items-center rounded-full border border-border/70 bg-surface/95 px-2.5 shadow-[0_18px_48px_-24px_color-mix(in_oklch,var(--foreground)_36%,transparent)] backdrop-blur-2xl sm:px-3 print:hidden">
        <nav aria-label="Studio navigation" className="flex min-w-0 items-center">
          <Link
            to="/"
            className="hidden h-10 items-center rounded-full px-3 font-display text-sm font-semibold tracking-[-0.04em] outline-none transition-opacity hover:opacity-65 focus-visible:ring-2 focus-visible:ring-ring sm:flex"
          >
            ALIYA KOY
          </Link>
          <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-border sm:block" />
          <Link
            to="/lab"
            aria-label="Back to Lab"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-foreground/65 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <span className="flex h-9 items-center rounded-full bg-accent px-4 text-sm font-medium whitespace-nowrap text-accent-foreground">
            Design Studio
          </span>
        </nav>

        <span aria-hidden="true" className="mx-1 hidden h-5 w-px bg-border md:block" />
        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={onToggleInspector}
            aria-label={inspectorOpen ? "Hide inspector" : "Show inspector"}
            aria-pressed={inspectorOpen}
            className="hidden size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:flex"
          >
            <SidebarSimple className="size-4" />
          </button>
          <button
            type="button"
            onClick={onOpenMobileInspector}
            aria-label="Open inspector"
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:hidden"
          >
            <List className="size-4" />
          </button>
          <div className="hidden items-center gap-0.5 sm:flex" role="group" aria-label="Theme history">
            <button
              type="button"
              onClick={() => dispatch({ type: "UNDO" })}
              disabled={!canUndo}
              aria-label="Undo"
              className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowCounterClockwise className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "REDO" })}
              disabled={!canRedo}
              aria-label="Redo"
              className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowClockwise className="size-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setQualityOpen(true)}
            aria-label={issueCount ? `Theme quality: ${issueCount} issues` : "Theme quality"}
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface-raised px-2.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {STATUS_ICONS[overallStatus]}
            <span className="hidden sm:inline">{issueCount ? `${issueCount} issues` : "Quality"}</span>
          </button>
          <button
            type="button"
            onClick={() => setExportOpen(true)}
            aria-label="Export theme"
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-3 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Export className="size-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <ModeToggle />
        </div>
      </header>

      <Dialog open={qualityOpen} onOpenChange={setQualityOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Theme quality</DialogTitle>
            <DialogDescription>Checks update as you edit the active theme.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {qualityCategories.map((category) => (
              <div key={category.key} className="rounded-lg border border-border bg-surface-raised p-3">
                <div className="flex items-center gap-2">
                  {STATUS_ICONS[category.status as Severity]}
                  <span className="text-sm font-semibold">{category.label}</span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {category.status === "pass" ? "Passed" : category.status === "warning" ? "Review" : "Failed"}
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-muted-foreground">{category.details}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="flex h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[42rem] min-w-0 max-h-[46rem] flex-col gap-0 overflow-hidden p-0 sm:max-w-[42rem]">
          <DialogHeader className="shrink-0 px-5 pt-5 pr-12 pb-4">
            <DialogTitle>Export theme</DialogTitle>
            <DialogDescription>Choose the format that matches your next workflow.</DialogDescription>
          </DialogHeader>
          <Tabs value={exportTab} onValueChange={setExportTab} className="min-h-0 min-w-0 flex-1 gap-0">
            <TabsList className="grid h-auto! w-full shrink-0 grid-cols-2 gap-1 rounded-none border-y border-border bg-muted/60 p-2 sm:grid-cols-4">
              {EXPORT_TABS.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="min-h-8 min-w-0 px-2 py-1.5 text-xs">{tab.label}</TabsTrigger>
              ))}
            </TabsList>
            {EXPORT_TABS.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="m-0 min-h-0 min-w-0 flex-1 overflow-hidden p-4">
                <div className="flex h-full min-h-0 min-w-0 flex-col gap-3">
                  <div className="min-h-0 min-w-0 flex-1 overflow-auto rounded-lg border border-border bg-tool-canvas">
                    <pre className="min-w-max p-4 font-mono text-xs leading-relaxed whitespace-pre"><code>{exportOutput[tab.id].code}</code></pre>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(exportOutput[tab.id].code, exportOutput[tab.id].label)}
                    className="w-full shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Copy {tab.label}
                  </button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
