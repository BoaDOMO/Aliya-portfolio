import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { capabilities } from "@/lib/portfolio-content"

export function CapabilityGrid() {
  return (
    <div className="mt-14 grid border-y md:mt-20 md:grid-cols-3 md:border-y-0">
      {capabilities.map((capability, index) => (
        <FadeInWhenVisible
          key={capability.number}
          delay={index * 0.1}
          className="border-b py-9 last:border-b-0 md:min-h-64 md:border-b-0 md:border-l md:px-10 md:py-10 md:first:border-l-0 md:first:pl-8 md:last:pr-8"
        >
          <article>
            <p className="font-mono text-sm text-primary">{capability.number}</p>
            <h3 className="mt-10 font-display text-2xl font-medium tracking-[-0.035em]">
              {capability.title}
            </h3>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
              {capability.description}
            </p>
          </article>
        </FadeInWhenVisible>
      ))}
    </div>
  )
}
