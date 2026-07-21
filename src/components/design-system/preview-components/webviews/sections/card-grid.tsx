import { PresetBox } from "../preset-box"

export function CardGrid({
  cards,
  columns = 3,
}: {
  cards: {
    title: string
    description: string
    meta?: string
    image?: string
    badge?: string
  }[]
  columns?: 2 | 3 | 4
}) {
  const cols = { 2: "@[48rem]:grid-cols-2", 3: "@[48rem]:grid-cols-3", 4: "@[48rem]:grid-cols-4" }[columns]
  return (
    <section className="py-12 px-6">
      <div
        className={`max-w-5xl mx-auto grid grid-cols-1 ${cols}`}
        style={{ gap: "calc(1rem * var(--spacing-scale))" }}
      >
        {cards.map((c, i) => (
          <PresetBox key={i} className="overflow-hidden p-0">
            {c.image && (
              <div
                className="aspect-[16/10] bg-muted bg-cover bg-center"
                style={{ backgroundImage: `url(${c.image})` }}
              />
            )}
            <div className="p-5 space-y-2">
              {c.badge && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary-safe">
                  {c.badge}
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{c.title}</h3>
              <p className="font-body text-sm text-card-foreground/70">{c.description}</p>
              {c.meta && <p className="font-mono text-[10px] text-card-foreground/60">{c.meta}</p>}
            </div>
          </PresetBox>
        ))}
      </div>
    </section>
  )
}
