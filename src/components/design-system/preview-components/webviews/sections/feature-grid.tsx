import type { ReactNode } from "react"
import { PresetBox } from "../preset-box"

export function FeatureGrid({
  features,
  columns = 3,
}: {
  features: { icon?: ReactNode; title: string; description: string }[]
  columns?: 2 | 3 | 4
}) {
  const cols = { 2: "@[48rem]:grid-cols-2", 3: "@[48rem]:grid-cols-3", 4: "@[48rem]:grid-cols-4" }[columns]
  return (
    <section className="py-12 px-6">
      <div
        className={`max-w-5xl mx-auto grid grid-cols-1 ${cols}`}
        style={{ gap: "calc(1rem * var(--spacing-scale))" }}
      >
        {features.map((f, i) => (
          <PresetBox key={i} className="p-6 space-y-3">
            {f.icon && <div className="text-primary">{f.icon}</div>}
            <h3 className="font-display text-lg font-semibold">{f.title}</h3>
            <p className="font-body text-sm text-card-foreground/70">{f.description}</p>
          </PresetBox>
        ))}
      </div>
    </section>
  )
}
