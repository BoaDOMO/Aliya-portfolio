import { useDesignTokens, type Severity } from "@/lib/design-tokens-store"

export function useQualityReport() {
  const state = useDesignTokens()
  const isDark = state.previewMode === "dark"
  const { report } = state

  const contrastPairs = [
    ...(isDark ? report.contrast.darkPairs : report.contrast.pairs),
    ...report.contrast.statePairs,
  ]

  const contrastStatus: Severity = contrastPairs.some((pair) => pair.grade === "fail") ? "error" : "pass"

  const categories = [
    { key: "contrast", label: "Contrast", status: contrastStatus, details: contrastPairs.map((pair) => `${pair.label}: ${pair.ratio.toFixed(1)}:1 (${pair.grade.toUpperCase()})`).join("\n") || "All contrast pairs pass." },
    { key: "cvd", label: "Color vision", status: report.accessibility.status, details: report.accessibility.cvdWarnings.join("\n") || "No color-vision issues detected." },
    { key: "dark", label: "Dark mode", status: report.darkMode.status, details: report.darkMode.warnings.join("\n") || "Dark-mode tokens are ready." },
    { key: "tokens", label: "Completeness", status: report.completeness.status, details: report.completeness.missing.length ? `Missing: ${report.completeness.missing.join(", ")}` : "All required tokens are defined." },
  ]

  const issueCount = categories.filter((category) => category.status !== "pass").length

  const overallStatus: Severity = categories.some((category) => category.status === "error")
    ? "error"
    : categories.some((category) => category.status === "warning")
      ? "warning"
      : "pass"

  return { categories, issueCount, overallStatus }
}
