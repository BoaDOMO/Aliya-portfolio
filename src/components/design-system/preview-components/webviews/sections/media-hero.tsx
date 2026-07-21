import type { ReactNode } from "react"

export function MediaHero({
  title,
  subtitle,
  widget,
}: {
  title: string
  subtitle: string
  widget?: ReactNode
}) {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/30" />
      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <h1 className="font-display text-4xl font-light tracking-tight @[48rem]:text-6xl">
          {title}
        </h1>
        <p className="font-body text-lg text-card-foreground/80 max-w-xl mx-auto">
          {subtitle}
        </p>
        {widget && <div className="pt-4">{widget}</div>}
      </div>
    </section>
  )
}
