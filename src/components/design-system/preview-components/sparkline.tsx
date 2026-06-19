import { useDesignTokens } from "@/lib/design-tokens-store"

function generatePath(data: number[], w: number, h: number): string {
  if (data.length < 2) return ""
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const padY = h * 0.15
  const chartH = h - padY * 2
  return data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * w
      const y = padY + chartH - ((d - min) / range) * chartH
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
}

export default function Sparkline({
  data,
  width = 64,
  height = 24,
  trend,
}: {
  data: number[]
  width?: number
  height?: number
  trend: "up" | "down"
}) {
  const state = useDesignTokens()
  const color =
    trend === "up"
      ? state.tokens.states.success
      : state.tokens.states.destructive

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible shrink-0"
    >
      <path
        d={generatePath(data, width, height)}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
