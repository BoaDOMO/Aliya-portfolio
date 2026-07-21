import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FadeInWhenVisible } from "@/components/fade-in-when-visible"
import { PageContainer, PageSection } from "@/components/page-layout"
import { SectionLabel } from "@/components/section-label"
import MiniChat from "@/components/lab/mini-chat"
import { SignalField } from "@/components/signal-graphics"
import { ArrowRight, Palette, SlidersHorizontal, TextT } from "@phosphor-icons/react"

const projects = [
  {
    label: "PROJECT 01",
    status: "Live prototype",
    title: "AI Assistant — Nova Finance",
    direction:
      "Build an assistant that answers only from information I give it, then make that source material editable.",
    failure:
      "Early answers wandered beyond the source, the suggestions felt generic, and the interface hid why an answer worked.",
    debugging:
      "I tightened the system prompt, structured the source material, added boundaries and error states, and kept testing awkward questions.",
    shipped:
      "A working assistant whose company data can be switched, edited, and tested live.",
    proof: ["Prompting", "Debugging", "AI integration"],
    link: "/rag",
    cta: "Try the assistant",
    preview: "chat" as const,
  },
  {
    label: "PROJECT 02",
    status: "Working tool",
    title: "Design System Studio",
    direction:
      "Turn three choices—style, color, and type—into a complete theme without dumping a wall of controls on the user.",
    failure:
      "Early color relationships drifted, font roles fought the presets, and responsive previews broke at smaller sizes.",
    debugging:
      "I separated user intent from generated values, rebuilt the font logic, and audited every preview, mode, and export state.",
    shipped:
      "A theme builder with live previews, accessibility checks, responsive modes, and usable exports.",
    proof: ["Vibe coding", "Systems debugging", "Frontend craft"],
    link: "/design-system",
    cta: "Open the studio",
    preview: "design" as const,
  },
]

function DesignSystemPreview() {
  return (
    <Card className="card-featured flex h-full min-h-[360px] flex-col overflow-hidden p-6 md:min-h-[420px]">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Live tokens</p>
          <p className="mt-1 font-display text-xl font-semibold">Warm Precision</p>
        </div>
        <SlidersHorizontal className="h-5 w-5 text-primary" />
      </div>
      <div className="grid flex-1 content-center gap-6 py-6 sm:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Palette className="h-4 w-4" /> Color roles
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-[4/3] rounded-lg bg-primary p-3 text-xs font-semibold text-primary-foreground">Primary</div>
            <div className="aspect-[4/3] rounded-lg bg-secondary p-3 text-xs font-semibold text-secondary-foreground">Secondary</div>
            <div className="aspect-[4/3] rounded-lg border bg-background p-3 text-xs font-semibold">Canvas</div>
            <div className="aspect-[4/3] rounded-lg border bg-card p-3 text-xs font-semibold">Surface</div>
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <TextT className="h-4 w-4" /> Type roles
          </div>
          <div className="space-y-3 rounded-lg border bg-surface-control p-4">
            <p className="font-display text-3xl font-bold tracking-tight">Display</p>
            <p className="text-sm leading-relaxed text-muted-foreground">Readable product copy with a calm editorial rhythm.</p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">Metadata 12PX</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
        <span>Contrast checks included</span>
        <span className="font-mono text-primary">AA ✓</span>
      </div>
    </Card>
  )
}

export default function Lab() {
  return (
    <div className="overflow-x-clip">
      <PageSection className="relative isolate overflow-hidden">
        <SignalField
          className="-right-[24rem] -top-[22rem] hidden h-[52rem] w-[66rem] opacity-70 md:block"
        />
        <div aria-hidden="true" className="diagnostic-grid absolute inset-y-0 right-0 hidden w-[48%] opacity-55 md:block" />
        <FadeInWhenVisible>
          <PageContainer className="relative z-10 grid gap-6 border-b pb-10 md:grid-cols-12 md:items-end md:pb-14">
            <div className="md:col-span-8">
              <SectionLabel>// the lab</SectionLabel>
              <h1 className="mt-3 max-w-3xl font-display text-5xl font-bold leading-none tracking-tight md:text-6xl">
                I vibe code for real.
              </h1>
            </div>
            <p className="max-w-md leading-relaxed text-muted-foreground md:col-span-4">
              Working experiments that show how I direct AI, inspect the output,
              debug what breaks, and finish the software.
            </p>
          </PageContainer>
        </FadeInWhenVisible>
      </PageSection>

      <PageSection>
        <PageContainer className="space-y-20 md:space-y-28">
          {projects.map((project, index) => (
            <FadeInWhenVisible key={project.title} delay={index * 0.08}>
              <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <div className={index % 2 ? "min-w-0 md:order-2 md:col-span-5" : "min-w-0 md:col-span-5"}>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{project.label}</p>
                    <Badge variant="outline" className="font-mono text-[10px] text-primary">{project.status}</Badge>
                  </div>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">{project.title}</h2>
                  <dl className="mt-6 divide-y border-y">
                    <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-primary">
                        Direction
                      </dt>
                      <dd className="text-sm leading-relaxed text-muted-foreground">
                        {project.direction}
                      </dd>
                    </div>
                    <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-primary">
                        Where it broke
                      </dt>
                      <dd className="text-sm leading-relaxed text-muted-foreground">
                        {project.failure}
                      </dd>
                    </div>
                    <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-primary">
                        The debugging
                      </dt>
                      <dd className="text-sm leading-relaxed text-muted-foreground">
                        {project.debugging}
                      </dd>
                    </div>
                    <div className="grid gap-1 py-4 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                      <dt className="font-mono text-[10px] uppercase tracking-wider text-primary">
                        What shipped
                      </dt>
                      <dd className="text-sm leading-relaxed text-muted-foreground">
                        {project.shipped}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.proof.map((item) => (
                      <Badge key={item} variant="secondary" className="font-mono text-[10px]">{item}</Badge>
                    ))}
                  </div>
                  <Link
                    to={project.link}
                    className={buttonVariants({
                      size: "sm",
                      className: "mt-7",
                    })}
                  >
                    {project.cta}<ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                <div className={index % 2 ? "min-w-0 md:order-1 md:col-span-7" : "min-w-0 md:col-span-7"}>
                  {project.preview === "chat" ? (
                    <div className="h-[420px] md:h-[460px]"><MiniChat /></div>
                  ) : (
                    <DesignSystemPreview />
                  )}
                </div>
              </article>
            </FadeInWhenVisible>
          ))}
        </PageContainer>
      </PageSection>
    </div>
  )
}
