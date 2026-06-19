import { useState } from "react"
import { useDesignTokens } from "@/lib/design-tokens-store"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Severity } from "@/lib/design-tokens-store"
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react"

const STATUS_ICONS: Record<Severity, React.ReactNode> = {
  pass: <CheckCircle className="size-3.5 text-success" />,
  warning: <AlertCircle className="size-3.5 text-warning" />,
  error: <XCircle className="size-3.5 text-destructive" />,
}

function statusSummary(status: Severity): string {
  switch (status) {
    case "pass":
      return "Passed"
    case "warning":
      return "Recommendations"
    case "error":
      return "Failed"
  }
}

const STATUS_COLORS: Record<Severity, string> = {
  pass: "text-success",
  warning: "text-warning",
  error: "text-destructive",
}

export default function QualityStatusBar() {
  const state = useDesignTokens()
  const [open, setOpen] = useState(false)
  const { report } = state
  const isDark = state.previewMode === "dark"
  const contrastPairs = isDark ? report.contrast.darkPairs : report.contrast.pairs
  const contrastFailing = contrastPairs.filter(p => p.grade === "fail")

  const categories = [
    {
      key: "contrast",
      label: "WCAG",
      status: contrastFailing.length > 0 ? "error" : "pass",
      details: contrastPairs.map(p => `${p.label}: ${p.ratio.toFixed(1)}:1 (${p.grade.toUpperCase()})`).join("\n") || "All contrast pairs pass."
    },
    {
      key: "cvd",
      label: "CVD",
      status: report.accessibility.status,
      details: report.accessibility.cvdWarnings.join("\n") || "No color-blind issues detected."
    },
    {
      key: "dark",
      label: "Dark",
      status: report.darkMode.status,
      details: report.darkMode.warnings.join("\n") || "Dark mode tokens ready."
    },
    {
      key: "completeness",
      label: "Tokens",
      status: report.completeness.status,
      details: report.completeness.missing.length > 0 ? `Missing: ${report.completeness.missing.join(", ")}` : "All tokens defined."
    }
  ]

  const totalIssues = categories.filter(c => c.status !== 'pass').length

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-full items-center justify-between border-t bg-background/50 px-4 backdrop-blur-md transition-colors hover:bg-muted/50"
      >
        <div className="flex items-center gap-4">
          {categories.map((c) => (
            <div key={c.key} className="flex items-center gap-1.5">
              {STATUS_ICONS[c.status as Severity]}
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.label}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          {totalIssues > 0 && (
            <span className="rounded-full bg-warning/10 px-2 py-0.5 text-xs font-bold text-warning">
              {totalIssues} Issue{totalIssues > 1 ? 's' : ''}
            </span>
          )}
          <Info className="size-3.5 text-muted-foreground" />
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Design System Quality Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.key}
                className="rounded-lg border p-3"
              >
                <div className="flex items-center gap-2">
                   <div className="flex items-center gap-2">
                     {STATUS_ICONS[cat.status as Severity]}
                     <span className="text-xs font-semibold">{cat.label}</span>
                   </div>
                  <span
                    className={`ml-auto text-xs font-medium ${STATUS_COLORS[cat.status as Severity]}`}
                  >
                    {statusSummary(cat.status as Severity)}
                  </span>
                </div>
                <p className="mt-1 whitespace-pre-line text-xs text-muted-foreground">
                  {cat.details}
                </p>
              </div>
            ))}

            <div
              className={`rounded-lg p-3 text-center text-xs font-semibold ${
                report.exportReady
                  ? "bg-success/10 text-success dark:bg-success/20"
                  : "bg-destructive/10 text-destructive dark:bg-destructive/20"
              }`}
            >
              {report.exportReady
                ? "Ready for Production Export"
                : "Export Blocked — Check Missing Tokens"}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
