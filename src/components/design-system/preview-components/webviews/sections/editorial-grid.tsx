import { PresetBox } from "../preset-box"

export function EditorialGrid({
  issue,
  articles,
}: {
  issue: string
  articles: {
    category: string
    title: string
    dek: string
    image?: string
  }[]
}) {
  return (
    <section className="py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-foreground/70">
            {issue}
          </span>
        </div>
        <div
          className="grid grid-cols-1 @[48rem]:grid-cols-2 @[64rem]:grid-cols-3"
          style={{ gap: "calc(1.25rem * var(--spacing-scale))" }}
        >
          {articles.map((a, i) => (
            <PresetBox key={i} className="overflow-hidden p-0">
              {a.image && (
                <div
                  className="aspect-[4/3] bg-muted bg-cover bg-center"
                  style={{ backgroundImage: `url(${a.image})` }}
                />
              )}
              <div className="p-5 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary-safe">
                  {a.category}
                </span>
                <h3 className="font-display text-xl font-semibold leading-tight">
                  {a.title}
                </h3>
                <p className="font-body text-sm text-card-foreground/70">{a.dek}</p>
              </div>
            </PresetBox>
          ))}
        </div>
      </div>
    </section>
  )
}
