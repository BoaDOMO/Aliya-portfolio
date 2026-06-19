interface DonutSegment {
  label: string
  value: number
  color: string
}

export default function DonutChart({
  segments,
  size = 120,
}: {
  segments: DonutSegment[]
  size?: number
}) {
  const total = segments.reduce((s, d) => s + d.value, 0)
  const r = size / 2 - 8
  const circumference = 2 * Math.PI * r
  const strokeWidth = size * 0.15

  const arcs = segments.map((seg, i) => {
    const pct = seg.value / total
    const dashLen = pct * circumference
    const offset = segments.slice(0, i).reduce((s, s2) => s + (s2.value / total) * circumference, 0)
    return { ...seg, dashLen, offset }
  })

  return (
    <div className="flex items-center gap-4">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shrink-0"
      >
        {arcs.map((seg) => (
          <circle
            key={seg.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${seg.dashLen} ${circumference}`}
            strokeDashoffset={-seg.offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="space-y-1">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className="flex items-center gap-1.5 text-xs"
          >
            <span
              className="inline-block rounded-full shrink-0"
              style={{
                width: 6,
                height: 6,
                backgroundColor: seg.color,
              }}
            />
            <span className="text-foreground">{seg.label}</span>
            <span className="text-muted-foreground">
              {Math.round((seg.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
