import type { ReactNode } from "react"
import { Power } from "@phosphor-icons/react"
import { PresetBox } from "../preset-box"

export function ControlPanel({
  rooms,
  sensors,
}: {
  rooms: { name: string; icon: ReactNode; level: number }[]
  sensors: { label: string; value: string }[]
}) {
  return (
    <div
      className="grid grid-cols-1 @[48rem]:grid-cols-2"
      style={{ gap: "calc(1rem * var(--spacing-scale))" }}
    >
      {rooms.map((r) => (
        <PresetBox key={r.name} className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-primary">{r.icon}</div>
              <span className="font-display font-medium">{r.name}</span>
            </div>
            <button className="p-1.5 rounded-full text-primary hover:bg-primary/10 transition-colors">
              <Power className="size-4" weight="fill" />
            </button>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${r.level}%` }}
            />
          </div>
        </PresetBox>
      ))}
      {sensors.map((s) => (
        <PresetBox key={s.label} className="p-4 text-center space-y-1">
          <div className="font-mono text-xs text-card-foreground/70 uppercase tracking-wider">
            {s.label}
          </div>
          <div className="font-display text-2xl font-semibold text-primary-safe">
            {s.value}
          </div>
        </PresetBox>
      ))}
    </div>
  )
}
