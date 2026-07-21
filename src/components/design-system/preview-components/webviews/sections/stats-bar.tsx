import { PresetBox } from "../preset-box"

export function StatsBar({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="py-10 px-6">
      <div
        className="mx-auto grid max-w-5xl grid-cols-2 @[48rem]:grid-cols-4"
        style={{ gap: "calc(1rem * var(--spacing-scale))" }}
      >
        {stats.map((s, i) => (
          <PresetBox key={i} className="p-5 text-center">
            <div className="font-display text-2xl font-bold text-primary-safe @[48rem]:text-3xl">
              {s.value}
            </div>
            <div className="font-body text-xs text-card-foreground/70 uppercase tracking-wide mt-1">
              {s.label}
            </div>
          </PresetBox>
        ))}
      </div>
    </section>
  )
}
