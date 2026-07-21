import type { ReactNode } from "react"
import { PresetBox } from "../preset-box"

export function CTA({
  title,
  subtitle,
  buttons,
}: {
  title: string
  subtitle: string
  buttons?: ReactNode
}) {
  return (
    <section className="py-12 px-6">
      <PresetBox className="mx-auto max-w-4xl space-y-5 p-8 text-center @[48rem]:p-12">
        <h2 className="font-display text-2xl font-bold @[48rem]:text-3xl">{title}</h2>
        <p className="font-body text-card-foreground/70 max-w-xl mx-auto">{subtitle}</p>
        {buttons && <div className="flex flex-wrap gap-3 justify-center pt-2">{buttons}</div>}
      </PresetBox>
    </section>
  )
}
