import { useState } from "react"
import { useDesignTokens } from "@/lib/design-tokens-store"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Severity } from "@/lib/design-tokens-store"

const STATUS_ICONS: Record<Severity, string> = {
  pass: "✓",
  warning: "⚠",
  error: "❌",
}

const STATUS_COLORS: Record<Severity, string> = {
  pass: "text-success",
  warning: "text-warning",
  error: "text-destructive",
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

export default function QualityReport() {
  const state = useDesignTokens()
  const [open, setOpen] = useState(false)
  const { report } = state
  const isDark = state.previewMode === "dark"
  const contrastPairs = isDark ? report.contrast.darkPairs : report.contrast.pairs
  const contrastFailing = contrastPairs.filter(p => p.grade === "fail")
  const contrastStatus: Severity = contrastFailing.length > 0 ? "error" : "pass"

  const categories = [
    {
      key: "contrast" as const,
      label: "WCAG Contrast",
      status: contrastStatus,
      details:
        contrastPairs.length > 0
          ? contrastPairs
              .map(
                (p) =>
                  `${p.label}: ${p.ratio.toFixed(1)}:1 (${p.grade.toUpperCase()})`
              )
              .join("\n")
          : "All contrast pairs pass.",
    },
    {
      key: "accessibility" as const,
      label: "Accessibility",
      status: report.accessibility.status,
      details:
        report.accessibility.cvdWarnings.length > 0
          ? report.accessibility.cvdWarnings.join("\n")
          : "No color-blind issues detected.",
    },
    {
      key: "darkMode" as const,
      label: "Dark Mode",
      status: report.darkMode.status,
      details:
        report.darkMode.warnings.length > 0
          ? report.darkMode.warnings.join("\n")
          : "Dark mode tokens auto-generated and ready.",
    },
    {
      key: "completeness" as const,
      label: "Completeness",
      status: report.completeness.status,
      details:
        report.completeness.missing.length > 0
          ? `Missing: ${report.completeness.missing.join(", ")}`
          : "All required tokens are defined.",
    },
  ]

  const issuesCount =
    categories.filter((c) => c.status === "warning").length +
    categories.filter((c) => c.status === "error").length

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-left text-xs transition-colors hover:bg-muted/50"
      >
        <span className="font-semibold">Accessibility &amp; Quality</span>
        <span className="flex items-center gap-1.5 font-mono text-xs">
          {categories.map((c) => (
            <span
              key={c.key}
              className={`${STATUS_COLORS[c.status]}`}
              title={`${c.label}: ${statusSummary(c.status)}`}
            >
              {STATUS_ICONS[c.status]}
            </span>
          ))}
          {issuesCount > 0 && (
            <span className="text-muted-foreground">
              {issuesCount} issue{issuesCount > 1 ? "s" : ""}
            </span>
          )}
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Accessibility &amp; Quality Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat.key}
                className="rounded-lg border p-3"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${STATUS_COLORS[cat.status]}`}>
                    {STATUS_ICONS[cat.status]}
                  </span>
                  <span className="text-xs font-semibold">{cat.label}</span>
                  <span
                    className={`ml-auto text-xs font-medium ${STATUS_COLORS[cat.status]}`}
                  >
                    {statusSummary(cat.status)}
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
                : "Export Blocked — Missing Required Tokens"}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
