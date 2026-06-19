import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface BarDatum {
  label: string
  value: number
}

export default function BarChart({
  data,
  height = 130,
}: {
  data: BarDatum[]
  height?: number
}) {
  const [hovered, setHovered] = useState<number | null>(null)

  const max = Math.max(...data.map((d) => d.value), 1)
  const padding = { left: 30, right: 10, top: 8, bottom: 22 }
  const chartW = 300 - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom
  const barGap = 4
  const totalGaps = (data.length - 1) * barGap
  const barW = Math.min(20, (chartW - totalGaps) / data.length)

  return (
    <div className="relative">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 300 ${height}`}
        className="overflow-visible"
      >
        {data.map((d, i) => {
          const barH = (d.value / max) * chartH
          const x = padding.left + i * (barW + barGap)
          const y = padding.top + chartH - barH
          const isHovered = hovered === i
          return (
            <rect
              key={d.label}
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={2}
              fill={isHovered ? "var(--primary)" : "var(--muted)"}
              style={{ transition: "fill 0.15s", cursor: "pointer" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          )
        })}
        {data.map((d, i) => (
          <text
            key={`l-${d.label}`}
            x={padding.left + i * (barW + barGap) + barW / 2}
            y={height - 4}
            textAnchor="middle"
            fontSize={8}
            fill="var(--muted-foreground)"
          >
            {d.label}
          </text>
        ))}
      </svg>
      {data.map((d, i) => {
        if (hovered !== i) return null
        const barH = (d.value / max) * chartH
        const x = padding.left + i * (barW + barGap)
        const y = padding.top + chartH - barH
        return (
          <Popover key={d.label} open>
            <PopoverTrigger>
              <div
                className="absolute pointer-events-none"
                style={{
                  left: `${(x / 300) * 100}%`,
                  top: `${(y / height) * 100}%`,
                  width: `${(barW / 300) * 100}%`,
                  height: `${(barH / height) * 100}%`,
                }}
              />
            </PopoverTrigger>
            <PopoverContent
              className="w-auto px-2 py-1 text-xs"
              side="top"
              align="center"
            >
              {d.label}: {d.value.toLocaleString()}
            </PopoverContent>
          </Popover>
        )
      })}
    </div>
  )
}
