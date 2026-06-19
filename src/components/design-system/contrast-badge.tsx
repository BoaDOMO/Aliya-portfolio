import { getContrastRatio, getContrastGrade } from "@/lib/contrast-utils"

export default function ContrastBadge({ fg, bg }: { fg: string; bg: string }) {
  const ratio = getContrastRatio(fg, bg)
  const grade = getContrastGrade(ratio)

  const classes =
    grade === "aaa"
      ? "bg-success text-success-foreground"
      : grade === "aa"
        ? "bg-warning text-warning-foreground"
        : "bg-destructive text-destructive-foreground"

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-semibold leading-none ${classes}`}
    >
      {grade.toUpperCase()} {ratio.toFixed(1)}
    </span>
  )
}
